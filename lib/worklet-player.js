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

    postMessage = null;

    constructor(options, postMessage) {
        this.postMessage = postMessage;
        this.#options = options || {};
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

        // buffer for 1 frame, L/R
        this.#samplesBuffer = new Float32Array(2);
        this.sampleRate = this.#options.sampleRate || 48000;
        this.#chunkSize = 0;
    }

    update(outputs) {
        if (!this.format || !outputs)
            return;

        for (let i = 0; i < outputs[0].length; i++) {
            if (this.#chunkSize <= 0) {
                this.format.update();
                this.format.getContext && this.postMessage?.({ cmd: "context", value: this.format?.getContext() || 0 })
                this.#chunkSize = 2 * ((this.sampleRate * this.format.refresh()) | 0);
            }

            // Read one frame
            this.format.opl.read(this.#samplesBuffer);

            outputs[0][i] = this.#samplesBuffer[0];
            outputs[1][i] = this.#samplesBuffer[1];

            this.#chunkSize -= 2;
        }
    }
}

module.exports = WorkletPlayer;
