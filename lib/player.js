var Readable = require('stream').Readable;
var WritableStreamBuffer = require('stream-buffers').WritableStreamBuffer;
require('setimmediate');

var OPL3 = require('./opl3');

var DRO = require('../format/dro');
var IMF = require('../format/imf');
var LAA = require('../format/laa');
//var MUS = require('../format/mus');
var RAW = require('../format/raw');
var RAD = require('../format/rad');

var currentScriptSrc = null;
try {
    currentScriptSrc = document.currentScript.src;
} catch (err) { }

class Player extends Readable {
    #options = {};
    #format = null;

    #context = null;
    #gain = null; /* GainNode */
    #isPlayInit = false;

    #queuePos = 0;
    #bufferPerMs = 0;
    #queue = [];
    #backupQueue = null;

    #worker = null;
    #aborted = false;

    // Main thread: do nothing
    // Worker: forward messages to main thread
    #sendPostMessage = false;

    #bufferWriter = null;

    #callback = null;

    // Worklet player
    worklet_player = null;

    get position() { return Math.floor(this.#queuePos / this.#bufferPerMs); }
    get length() { return Math.floor((this.#backupQueue || this.#queue).length / this.#bufferPerMs); }

    get volume() { return this.#gain.gain.value; }
    set volume(value) { this.#gain.gain.value = value; }

    constructor(format, options) {
        super();

        this.#options = options || {};
        this.#options.prebuffer = this.#options.prebuffer || 200;
        this.#options.bufferSize = this.#options.bufferSize || 64;

        this.#format = format;

        // Forward events from Worker to main thread if needed
        this.on('end', () => {
            if (this.#bufferWriter) {
                var pcmBuffer = this.#bufferWriter.getContents().buffer;
                if (typeof this.#callback == 'function') this.#callback(null, pcmBuffer);
                this.#options.prebuffer = -1;
            }

            if (this.#sendPostMessage)
                postMessage({ cmd: 'end' });
        });

        this.on('progress', (value) => {
            if (this.#sendPostMessage)
                postMessage({ cmd: 'progress', value: value });
        });

        this.on('error', (err) => {
            throw err;
        });

        this.on('midi', (midi) => {
            if (this.#sendPostMessage)
                postMessage({ cmd: 'midi', value: midi }, [midi]);
        });

        this.on('data', (chunk) => {
            // if in main thread
            if (typeof AudioContext != 'undefined') {
                if (this.#backupQueue) this.#backupQueue.push(chunk);
                else this.#queue.push(chunk);
            }

            if (this.#sendPostMessage)
                postMessage({ cmd: 'data', value: chunk.buffer }, [chunk.buffer]);
        });

        this.on('abort', this.pause);
    }

    detectFormat(buffer /*: ArrayBuffer | Buffer*/) {
        const header = (offset, length) =>
            String.fromCharCode.apply(null, new Uint8Array(buffer.slice(offset, length)));

        // TODO: move testing signatures into driver file
        if (header(0, 3) == 'ADL') return LAA;
        if (header(0, 8) == 'RAWADATA') return RAW;
        if (header(0, 8) == 'DBRAWOPL') return DRO;
        //if (header(0, 4) == 'MUS\x1a') return MUS;
        if (header(0,16) == 'RAD by REALiTY!!') return RAD;
        // IMF has no ID :(

        return IMF;
    };

    _read() { }

    pause() {
        if (this.#context) {
            this.#context.suspend();
        }

        //this.#backupQueue = this.#queue;
        //this.#queue = [];
    };

    resume() {
        if (this.#context) {
            this.#context.resume();
        }
    }

    seek(ms) {
        this.#queuePos = Math.floor(ms * this.#bufferPerMs);
    };

    stop() {
        if (this.#context) {
            this.#context.close();
            this.#context = null;
            this.#isPlayInit = false;
        }
    }

    abort() {
        if (this.#worker) this.#worker.terminate();
        this.#aborted = true;
        this.emit('abort');
    };

    // Note: omitted inside Worker because AudioContext is non-existent there
    // Runs in main thread only
    play(buffer) {
        // works on main thread with AudioContext available
        if (typeof AudioContext != 'undefined') {
            if (this.#isPlayInit) {
                this.stop();
            }

            this.#context = new AudioContext();
            var source = this.#context.createBufferSource();
            var processor = this.#context.createScriptProcessor(2048, 0, 2);
            this.#gain = this.#context.createGain();
            this.#gain.gain.value = this.#options.volume || 1;

            this.#queue = [];

            var bufferLeft, bufferRight, silence;
            var audioQueueFn = (e) => {
                var outputBuffer = e.outputBuffer;

                if (this.length >= this.#options.prebuffer) {
                    for (var i = 0; i < processor.bufferSize / this.#options.bufferSize; i++) {
                        var tmp = this.#queue[this.#queuePos];
                        if (tmp) {
                            this.#queuePos++;
                            this.emit('position', this.position);
                            var dv = new DataView(tmp.buffer || tmp);
                            for (var j = 0, offset = 0; j < this.#options.bufferSize; j++, offset += 8) {
                                bufferLeft[j] = dv.getFloat32(offset, true);
                                bufferRight[j] = dv.getFloat32(offset + 4, true);
                            }
                        } else {
                            bufferLeft.set(silence);
                            bufferRight.set(silence);
                        }

                        outputBuffer.copyToChannel(bufferLeft, 0, i * this.#options.bufferSize);
                        outputBuffer.copyToChannel(bufferRight, 1, i * this.#options.bufferSize);
                    }
                }
            };

            this.#backupQueue = null;

            this.#isPlayInit = false;

            if (!this.#isPlayInit) {
                this.#options.bufferSize = this.#options.bufferSize || 64;
                this.#options.sampleRate = this.#context.sampleRate;
                this.#options.bitDepth = 32; // other values don't work at all

                bufferLeft = new Float32Array(this.#options.bufferSize);
                bufferRight = new Float32Array(this.#options.bufferSize);
                silence = new Float32Array(this.#options.bufferSize);
                this.#queuePos = 0;

                this.#bufferPerMs = (this.#options.sampleRate / 1000) / this.#options.bufferSize;

                this.load(buffer);

                processor.onaudioprocess = audioQueueFn;
                source.connect(processor);
                processor.connect(this.#gain);
                this.#gain.connect(this.#context.destination);
                source.start();

                this.#isPlayInit = true;
            }

            if (this.#backupQueue) {
                this.#queue = this.#backupQueue;
                this.#backupQueue = null;
            }
        }
    }

    #samplesBuffer = null;
    #sampleRate = null;
    #chunkSize = 0;

    // call before worklet_play
    worklet_load(buffer, callback = null, sendPostMessage = false) {
        if (buffer instanceof ArrayBuffer)
            buffer = new Buffer.from(buffer);

        this.#sendPostMessage = sendPostMessage;
        this.#format = this.#format || this.detectFormat(buffer);
        if (!this.#format)
            throw 'File format not detected';

        this.worklet_player = new this.#format(new OPL3(), this.#options);
        this.worklet_player.load(buffer);

        this.#aborted = false;

        this.#samplesBuffer = new Float32Array(this.#options.bufferSize * 4);
        console.log(this.#samplesBuffer.length)
        this.#sampleRate = 49700 * ((this.#options.sampleRate || 49700) / 49700);
        this.#chunkSize = 0;

        console.log("worklet_load called", this.worklet_player);
    }

    worklet_update(outputs) {
        if (!this.worklet_player || !outputs)
            return;

        if (this.#chunkSize === 0) {
            this.worklet_player.update();
            this.#chunkSize = 2 * ((sampleRate * this.worklet_player.refresh()) | 0);
        }

        // TODO: need to handle when chunkSize < 256
        if (this.#chunkSize > 0) {
            var samplesSize = Math.min(this.#options.bufferSize * 4, this.#chunkSize);
            //console.log("chunkSize: " + this.#chunkSize + " samplesSize: " + samplesSize);
            this.#chunkSize -= samplesSize;

            this.worklet_player.opl.read(this.#samplesBuffer);

            // convert interleaved channels into separate ones
            for (let i = 0; i < this.#samplesBuffer.length; i += 2) {
                outputs[0][i >> 1] = this.#samplesBuffer[i];
                outputs[1][i >> 1] = this.#samplesBuffer[i + 1];
            }
        }
    }

    load(buffer, callback = null, sendPostMessage = false) {
        this.#callback = callback;

        if (!this.#options.disableWorker && process.browser && typeof window != 'undefined' && 'Worker' in window) {
            this._load_worker(buffer, callback, sendPostMessage);
        } else {
            this._load_internal(buffer, callback, sendPostMessage);
        }
    }

    // Runs either on main thread or inside Worker
    // Process the whole music file and generate buffer
    _load_internal(buffer, callback = null, sendPostMessage = false) {
        try {
            this.#bufferWriter = new WritableStreamBuffer({
                initialSize: (1024 * 1024),
                incrementAmount: (512 * 1024)
            });

            this.pipe(this.#bufferWriter);

            if (buffer instanceof ArrayBuffer) buffer = new Buffer.from(buffer);

            this.#sendPostMessage = sendPostMessage;

            this.#format = this.#format || this.detectFormat(buffer);
            if (!this.#format) throw 'File format not detected';

            // Make player global?
            var player = new this.#format(new OPL3(), this.#options);
            player.load(buffer);

            this.#aborted = false;

            var samplesBuffer = new Float32Array(this.#options.bufferSize * 2);
            var sampleRate = 49700 * ((this.#options.sampleRate || 49700) / 49700);

            var fn = () => {
                if (this.#aborted) return;

                while (player.update()) {
                    if (this.#aborted)
                        return;

                    this.emit('progress', Math.floor(player.position / player.data.byteLength * 1000) / 10);

                    var chunkSize = 2 * ((sampleRate * player.refresh()) | 0);

                    while (chunkSize > 0) {
                        var samplesSize = Math.min(this.#options.bufferSize * 2, chunkSize);
                        chunkSize -= samplesSize;

                        player.opl.read(samplesBuffer);

                        // .slice(0) creates a full copy of an array which is invalidated after Buffer.from()
                        this.emit('data', new Buffer.from(samplesBuffer.slice(0).buffer));
                    }

                    return setImmediate(fn);
                }

                this.emit('progress', 100);
                if (player.midiBuffer)
                    this.emit('midi', new Buffer.from(player.midiBuffer, 'binary').buffer);

                this.emit('end');
            };

            fn();
        } catch (err) {
            this.emit('error', err);
            if (typeof callback == 'function') callback(err, null);
        }
    }

    _load_worker(buffer, callback = null, sendPostMessage = false) {
        this.#sendPostMessage = sendPostMessage;

        this.#format = this.#format || this.detectFormat(buffer);
        if (!this.#format) throw 'File format not detected';

        var workerSrc =
            'importScripts("' + currentScriptSrc + '");\n' +
            'onmessage = (msg) => {\n' +
            '   var player = new OPL3.Player(null, msg.data.options);\n' +
            '   player.load(msg.data.buffer, ' + (typeof callback == 'function' ? '(err, buffer) => {\n' +
            '       if (err) throw err;\n' +
            '       postMessage({ cmd: "callback", value: buffer }, [buffer]);\n' +
            '   }' : 'null') + ', true);\n' +
            '};';

        var blob = new Blob([workerSrc], { type: 'application/javascript' });

        // Or don't recreate worker?
        if (this.#worker) {
            this.#worker.terminate();
        }

        this.#worker = new Worker(URL.createObjectURL(blob));
        this.#worker.onmessage = (msg) => {
            this.emit(msg.data.cmd, msg.data.value);
            if (msg.data.cmd == 'callback') {
                if (typeof callback == 'function') callback(null, msg.data.value);
                this.#worker.terminate();
            }
        };
        this.#worker.onerror = (err) => {
            this.emit('error', err);
            if (typeof callback == 'function') callback(err, null);
        };

        // Start worker ;)
        const options = { ...this.#options, prebuffer: Infinity };
        this.#worker.postMessage({ buffer: buffer, options: options }, [buffer]);
    }
}

module.exports = Player;
