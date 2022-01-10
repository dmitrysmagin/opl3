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
    constructor(format, options) {
        super();

        this.options = options || {};

        // This allows passing messages from Worker to main thread
        var initPostMessage = (postMessage) => {
            // Does nothing on main thread
            if (typeof postMessage == 'function') {
                this.on('end', () => {
                    postMessage({ cmd: 'end' });
                });
                this.on('progress', (value) => {
                    postMessage({ cmd: 'progress', value: value });
                });
                this.on('error', (err) => {
                    throw err;
                });
                this.on('midi', (midi) => {
                    postMessage({ cmd: 'midi', value: midi }, [midi]);
                });
                this.on('data', (chunk) => {
                    postMessage({ cmd: 'data', value: chunk.buffer }, [chunk.buffer]);
                });
            }
        };

        var detectFormat = (buffer) => {
            const header = (offset, length) =>
                String.fromCharCode.apply(null, new Uint8Array(buffer.slice(offset, length)));

            if (header(0, 3) == 'ADL') return LAA;
            if (header(0, 8) == 'RAWADATA') return RAW;
            if (header(0, 8) == 'DBRAWOPL') return DRO;
            if (header(0, 4) == 'MUS\x1a') return MUS;
            // IMF has no ID :(

            return IMF;
        };

        // Note: this 'load' remains in the Worker
        var load = (buffer, callback, postMessage) => {
            return new Promise((resolve, reject) => {
                try {
                    var bufferWriter = new WritableStreamBuffer({
                        initialSize: (1024 * 1024),
                        incrementAmount: (512 * 1024)
                    });

                    var onEnd = () => {
                        var pcmBuffer = bufferWriter.getContents().buffer;
                        if (typeof callback == 'function') callback(null, pcmBuffer);
                        resolve(pcmBuffer);
                        this.options.prebuffer = -1;
                    };

                    this.pipe(bufferWriter);
                    this.on('end', onEnd);

                    this.on('error', reject);

                    if (buffer instanceof ArrayBuffer) buffer = new Buffer.from(buffer);
                    initPostMessage(postMessage);

                    format = format || detectFormat(buffer);
                    if (!format) throw 'File format not detected';

                    var player = new format(new OPL3(), options);
                    player.load(buffer);

                    var aborted = false;
                    this.abort = () => {
                        this.emit('abort');
                        aborted = true;
                    };

                    var samplesBuffer = null;
                    var bufferType = this.options.bitDepth == 32 ? Float32Array : Int16Array;
                    if (this.options.bufferSize) {
                        samplesBuffer = new bufferType(this.options.bufferSize * 2);
                    }
                    var sampleRate = 49700 * ((this.options.sampleRate || 49700) / 49700);
                    var fn = () => {
                        if (aborted) return;

                        var start = Date.now();
                        while (player.update()) {
                            if (aborted) return;

                            var d = player.refresh();
                            var n = 4 * ((sampleRate * d) | 0);

                            this.emit('progress', Math.floor(player.position / player.data.byteLength * 1000) / 10);

                            var chunkSize = (n / 2) | 0;
                            if (this.options.bufferSize) {
                                while (chunkSize > 0) {
                                    var samplesSize = Math.min(this.options.bufferSize * 2, chunkSize);
                                    chunkSize -= samplesSize;

                                    player.opl.read(samplesBuffer);

                                    this.emit('data', new Buffer.from(samplesBuffer.buffer));
                                    samplesBuffer = new bufferType(this.options.bufferSize * 2);
                                }
                            } else {
                                var buffer = new bufferType(chunkSize);
                                player.opl.read(buffer);
                                this.emit('data', new Buffer.from(buffer.buffer));
                            }

                            if (Date.now() - start > 1000) return setImmediate(fn);
                        }

                        this.emit('progress', 100);
                        if (player.midiBuffer) this.emit('midi', new Buffer.from(player.midiBuffer, 'binary').buffer);
                        this.emit('end');
                    };

                    fn();
                } catch (err) {
                    this.emit('error', err);
                    if (typeof callback == 'function') callback(err, null);
                    reject(err);
                }
            });
        };

        this.options.prebuffer = this.options.prebuffer || 200;
        // Note: omitted inside Worker because AudioContext is non-existent there
        // Runs in main thread only
        if (typeof AudioContext != 'undefined') {
            var context = new AudioContext();
            var source = context.createBufferSource();
            var processor = context.createScriptProcessor(2048, 0, 2);
            var gain = context.createGain();
            gain.gain.value = this.options.volume || 1;
            var queue = [];

            var bufferLeft, bufferRight, silence, queuePos, bufferPerMs;
            var audioQueueFn = (e) => {
                var outputBuffer = e.outputBuffer;

                if (this.length >= this.options.prebuffer) {
                    for (var i = 0; i < processor.bufferSize / this.options.bufferSize; i++) {
                        var tmp = queue[queuePos];
                        if (tmp) {
                            queuePos++;
                            this.emit('position', this.position);
                            var dv = new DataView(tmp.buffer || tmp);
                            for (var j = 0, offset = 0; j < this.options.bufferSize; j++, offset += 8) {
                                bufferLeft[j] = dv.getFloat32(offset, true);
                                bufferRight[j] = dv.getFloat32(offset + 4, true);
                            }
                        } else {
                            bufferLeft.set(silence);
                            bufferRight.set(silence);
                        }

                        outputBuffer.copyToChannel(bufferLeft, 0, i * this.options.bufferSize);
                        outputBuffer.copyToChannel(bufferRight, 1, i * this.options.bufferSize);
                    }
                }
            };
            var backupQueue = null;

            var isPlayInit = false;
            this.play = (buffer) => {
                if (!isPlayInit) {
                    this.options.bufferSize = this.options.bufferSize || 64;
                    this.options.sampleRate = context.sampleRate;
                    this.options.bitDepth = 32;

                    bufferLeft = new Float32Array(this.options.bufferSize);
                    bufferRight = new Float32Array(this.options.bufferSize);
                    silence = new Float32Array(this.options.bufferSize);
                    queuePos = 0;

                    bufferPerMs = (this.options.sampleRate / 1000) / this.options.bufferSize;

                    this.load(buffer);
                    this.on('data', (buffer) => {
                        if (backupQueue) backupQueue.push(buffer);
                        else queue.push(buffer);
                    });

                    processor.onaudioprocess = audioQueueFn;
                    source.connect(processor);
                    processor.connect(gain);
                    gain.connect(context.destination);
                    source.start();

                    isPlayInit = true;
                }

                if (backupQueue) {
                    queue = backupQueue;
                    backupQueue = null;
                }
            };
            this.pause = () => {
                backupQueue = queue;
                queue = [];
            };
            this.on('abort', this.pause);

            this.seek = (ms) => {
                queuePos = Math.floor(ms * bufferPerMs);
            };
            Object.defineProperty(this, 'position', {
                get: function () { return Math.floor(queuePos / bufferPerMs); }
            });
            Object.defineProperty(this, 'length', {
                get: function () { return Math.floor((backupQueue || queue).length / bufferPerMs); }
            });
            Object.defineProperty(this, 'volume', {
                get: function () { return gain.gain.value; },
                set: function (value) { gain.gain.value = value; }
            });
        }

        // Omitted inside Worker because 'window' is non-existent there
        if (!this.options.disableWorker && process.browser && typeof window != 'undefined' && 'Worker' in window) {
            try {
                this.load = (buffer, callback, postMessage) => {
                    initPostMessage(postMessage);

                    format = format || detectFormat(buffer);
                    if (!format) throw 'File format not detected';

                    var workerSrc =
                        'importScripts("' + currentScriptSrc + '");\n' +
                        'onmessage = (msg) => {\n' +
                        '   var player = new OPL3.Player(null, msg.data.options);\n' +
                        '   player.load(msg.data.buffer, ' + (typeof callback == 'function' ? '(err, buffer) => {\n' +
                        '       if (err) throw err;\n' +
                        '       postMessage({ cmd: "callback", value: buffer }, [buffer]);\n' +
                        '   }' : 'null') + ', postMessage);\n' +
                        '};';

                    var blob;
                    try {
                        blob = new Blob([workerSrc], { type: 'application/javascript' });
                    } catch (e) { // Backwards-compatibility
                        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
                        blob = new BlobBuilder();
                        blob.append(workerSrc);
                        blob = blob.getBlob();
                    }
                    var worker = new Worker(URL.createObjectURL(blob));
                    worker.onmessage = (msg) => {
                        this.emit(msg.data.cmd, msg.data.value);
                        if (msg.data.cmd == 'callback') {
                            if (typeof callback == 'function') callback(null, msg.data.value);
                            worker.terminate();
                        }
                    };
                    worker.onerror = (err) => {
                        this.emit('error', err);
                        if (typeof callback == 'function') callback(err, null);
                    };
                    this.abort = () => {
                        worker.terminate();
                        this.emit('abort');
                    };

                    // Start worker ;)
                    worker.postMessage({ buffer: buffer, options: options }, [buffer]);
                };
            } catch (err) {
                console.warn('OPL3 WebWorker not supported! :(');
                this.options.prebuffer = Infinity;
                this.load = load;
            }
        } else {
            this.options.prebuffer = Infinity;
            this.load = load;
        }

        this._read = () => { };
    }

    stop() {
        // Should release audio context here and remove listeners
        this.removeAllListeners();
    }
}

module.exports = Player;