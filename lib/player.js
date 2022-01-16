var Readable = require('stream').Readable;
var WritableStreamBuffer = require('stream-buffers').WritableStreamBuffer;

var OPL3 = require('./opl3');

var DRO = require('../format/dro');
var IMF = require('../format/imf');
var LAA = require('../format/laa');
var MUS = require('../format/mus');
var RAW = require('../format/raw');

var currentScriptSrc = null;
try {
    currentScriptSrc = document.currentScript.src;
} catch (err) { }

class Player extends Readable {
    #options = {};
    #format = null;

    #queuePos = 0;
    #bufferPerMs = 0;
    #queue = [];
    #backupQueue = null;
    #gain = null; /* GainNode */

    #worker = null;
    #aborted = false;

    // Main thread: do nothing
    // Worker: forward messages to main thread
    #sendPostMessage = false;

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

        // Note: omitted inside Worker because AudioContext is non-existent there
        // Runs in main thread only
        if (typeof AudioContext != 'undefined') {
            var context = new AudioContext();
            var source = context.createBufferSource();
            var processor = context.createScriptProcessor(2048, 0, 2);
            this.#gain = context.createGain();
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

            var isPlayInit = false;
            this.play = (buffer) => {
                if (!isPlayInit) {
                    this.#options.bufferSize = this.#options.bufferSize || 64;
                    this.#options.sampleRate = context.sampleRate;
                    this.#options.bitDepth = 32;

                    bufferLeft = new Float32Array(this.#options.bufferSize);
                    bufferRight = new Float32Array(this.#options.bufferSize);
                    silence = new Float32Array(this.#options.bufferSize);
                    this.#queuePos = 0;

                    this.#bufferPerMs = (this.#options.sampleRate / 1000) / this.#options.bufferSize;

                    this.load(buffer);
                    this.on('data', (buffer) => {
                        if (this.#backupQueue) this.#backupQueue.push(buffer);
                        else this.#queue.push(buffer);
                    });

                    processor.onaudioprocess = audioQueueFn;
                    source.connect(processor);
                    processor.connect(this.#gain);
                    this.#gain.connect(context.destination);
                    source.start();

                    isPlayInit = true;
                }

                if (this.#backupQueue) {
                    this.#queue = this.#backupQueue;
                    this.#backupQueue = null;
                }
            };
        }

        // Omitted inside Worker because 'window' is non-existent there
        // 'Worker' is non-existent in Node
        if (!this.#options.disableWorker && process.browser && typeof window != 'undefined' && 'Worker' in window) {
        } else {
            this.#options.prebuffer = Infinity;
        }

        // Forward events from Worker to main thread if needed
        this.on('end', () => {
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
            if (this.#sendPostMessage)
                postMessage({ cmd: 'data', value: chunk.buffer }, [chunk.buffer]);
        });

        this.on('abort', this.pause);
    }

    detectFormat(buffer) {
        const header = (offset, length) =>
            String.fromCharCode.apply(null, new Uint8Array(buffer.slice(offset, length)));

        if (header(0, 3) == 'ADL') return LAA;
        if (header(0, 8) == 'RAWADATA') return RAW;
        if (header(0, 8) == 'DBRAWOPL') return DRO;
        if (header(0, 4) == 'MUS\x1a') return MUS;
        // IMF has no ID :(

        return IMF;
    };

    _read() { }

    pause() {
        this.#backupQueue = this.#queue;
        this.#queue = [];
    };

    seek(ms) {
        this.#queuePos = Math.floor(ms * this.#bufferPerMs);
    };

    stop() {
        // Should release audio context here
    }

    abort() {
        if (this.#worker) this.#worker.terminate();
        this.#aborted = true;
        this.emit('abort');
    };

    load(buffer, callback = null, sendPostMessage = false) {
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
            var bufferWriter = new WritableStreamBuffer({
                initialSize: (1024 * 1024),
                incrementAmount: (512 * 1024)
            });

            var onEnd = () => {
                var pcmBuffer = bufferWriter.getContents().buffer;
                if (typeof callback == 'function') callback(null, pcmBuffer);
                this.#options.prebuffer = -1;
            };

            this.pipe(bufferWriter);
            this.on('end', onEnd);

            if (buffer instanceof ArrayBuffer) buffer = new Buffer.from(buffer);

            this.#sendPostMessage = sendPostMessage;

            this.#format = this.#format || this.detectFormat(buffer);
            if (!this.#format) throw 'File format not detected';

            var player = new this.#format(new OPL3(), this.#options);
            player.load(buffer);

            this.#aborted = false;

            var samplesBuffer = null;
            var bufferType = this.#options.bitDepth == 32 ? Float32Array : Int16Array;
            if (this.#options.bufferSize) {
                samplesBuffer = new bufferType(this.#options.bufferSize * 2);
            }
            var sampleRate = 49700 * ((this.#options.sampleRate || 49700) / 49700);
            var fn = () => {
                if (this.#aborted) return;

                while (player.update()) {
                    if (this.#aborted) return;

                    var d = player.refresh();
                    var n = 4 * ((sampleRate * d) | 0);

                    this.emit('progress', Math.floor(player.position / player.data.byteLength * 1000) / 10);

                    var chunkSize = (n / 2) | 0;
                    if (this.#options.bufferSize) {
                        while (chunkSize > 0) {
                            var samplesSize = Math.min(this.#options.bufferSize * 2, chunkSize);
                            chunkSize -= samplesSize;

                            player.opl.read(samplesBuffer);

                            this.emit('data', new Buffer.from(samplesBuffer.buffer));
                            samplesBuffer = new bufferType(this.#options.bufferSize * 2);
                        }
                    } else {
                        // Most probably we never get there
                        var buffer = new bufferType(chunkSize);
                        player.opl.read(buffer);
                        this.emit('data', new Buffer.from(buffer.buffer));
                    }

                    return setImmediate(fn);
                }

                this.emit('progress', 100);
                if (player.midiBuffer) this.emit('midi', new Buffer.from(player.midiBuffer, 'binary').buffer);
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
            '   var player = new OPL3.Player(null, msg.data.options);console.log(player)\n' +
            '   player.load(msg.data.buffer, ' + (typeof callback == 'function' ? '(err, buffer) => {\n' +
            '       if (err) throw err;\n' +
            '       postMessage({ cmd: "callback", value: buffer }, [buffer]);\n' +
            '   }' : 'null') + ', true);\n' +
            '};';

        var blob = new Blob([workerSrc], { type: 'application/javascript' });
        this.#worker = new Worker(URL.createObjectURL(blob));
        this.#worker.onmessage = (msg) => {
            this.emit(msg.data.cmd, msg.data.value);
            if (msg.data.cmd == 'callback') {
                if (typeof callback == 'function') callback(null, msg.data.value);
                worker.terminate();
            }
        };
        this.#worker.onerror = (err) => {
            this.emit('error', err);
            if (typeof callback == 'function') callback(err, null);
        };

        // Start worker ;)
        this.#worker.postMessage({ buffer: buffer, options: this.#options }, [buffer]);
    }
}

module.exports = Player;