// To be executed inside AudioWorklet in AudioWorkletGlobalScope

var OPL3 = require('./opl3');

var DRO = require('./format/dro');
var IMF = require('./format/imf');
var LAA = require('./format/laa');
var RAW = require('./format/raw');
var RAD = require('./format/rad');

class WorkletPlayer {
    #options = {};
    format = null;

    #samplesBuffer = null;
    sampleRate = null; // 48000 for audio worklet
    #chunkSize = 0;

    #postMessage = null;

    constructor(postMessage, options) {
        this.#postMessage = postMessage;
        this.#options = options || {};
        this.#options.bufferSize = 128; // length of output in processor    
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

    play() {}
    pause() {}

    load(buffer) {
        if (buffer instanceof ArrayBuffer)
            buffer = new Buffer.from(buffer);

        const formatType = this.detectFormat(buffer);
        if (!formatType)
            throw 'File format not detected';

        this.format = new formatType(new OPL3(), this.#options);
        this.format.load(buffer);

        this.#samplesBuffer = new Float32Array(this.#options.bufferSize * 2);
        this.sampleRate = this.#options.sampleRate || 48000;
        this.#chunkSize = 0;
    }

    update(outputs) {
        if (!this.format || !outputs)
            return;

        var seek = 0;
        this.#samplesBuffer.fill(0.0);

        if (this.#chunkSize === 0) {
            this.format.update();
            this.#chunkSize = 2 * ((this.sampleRate * this.format.refresh()) | 0);
        }

        if (this.#chunkSize < this.#options.bufferSize * 2) {
            this.format.opl.read(this.#samplesBuffer, seek, this.#chunkSize);
            seek += this.#chunkSize;

            this.format.update();
            this.#chunkSize = 2 * ((this.sampleRate * this.format.refresh()) | 0);
        }

        if (this.#chunkSize > 0) {
            var samplesSize = Math.min(this.#options.bufferSize * 2 - seek, this.#chunkSize);
            this.#chunkSize -= samplesSize;

            this.format.opl.read(this.#samplesBuffer, seek);

            // convert interleaved channels into separate ones
            for (let i = 0; i < this.#samplesBuffer.length; i += 2) {
                outputs[0][i >> 1] = this.#samplesBuffer[i];
                outputs[1][i >> 1] = this.#samplesBuffer[i + 1];
            }
        }
    }
}

module.exports = WorkletPlayer;
