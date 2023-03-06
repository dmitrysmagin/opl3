// To be executed inside AudioWorklet in AudioWorkletGlobalScope

var OPL3 = require('./opl3');

var DRO = require('../format/dro');
var IMF = require('../format/imf');
var LAA = require('../format/laa');
var RAW = require('../format/raw');
var RAD = require('../format/rad');

class WorkletPlayer {
    #options = {};
    #format = null;
    format_player = null;

    #samplesBuffer = null;
    #sampleRate = null; // 48000 for audio worklet
    #chunkSize = 0;

    #sendPostMessage = null;

    constructor(format, options) {
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

    load(buffer, callback = null, sendPostMessage = false) {
        if (buffer instanceof ArrayBuffer)
            buffer = new Buffer.from(buffer);

        this.#sendPostMessage = sendPostMessage;
        this.#format = this.#format || this.detectFormat(buffer);
        if (!this.#format)
            throw 'File format not detected';

        this.format_player = new this.#format(new OPL3(), this.#options);
        this.format_player.load(buffer);

        //this.#aborted = false;

        this.#samplesBuffer = new Float32Array(this.#options.bufferSize * 2);
        this.#sampleRate = 49700 * ((this.#options.sampleRate || 49700) / 49700);
        this.#chunkSize = 0;

        console.log("worklet_load called", this.format_player);
    }

    update(outputs) {
        if (!this.format_player || !outputs)
            return;

        var seek = 0;
        this.#samplesBuffer.fill(0.0);

        if (this.#chunkSize === 0) {
            this.format_player.update();
            this.#chunkSize = 2 * ((this.#sampleRate * this.format_player.refresh()) | 0);
        }

        if (this.#chunkSize < this.#options.bufferSize * 2) {
            this.format_player.opl.read(this.#samplesBuffer, seek, this.#chunkSize);
            seek += this.#chunkSize;

            this.format_player.update();
            this.#chunkSize = 2 * ((this.#sampleRate * this.format_player.refresh()) | 0);
        }

        if (this.#chunkSize > 0) {
            var samplesSize = Math.min(this.#options.bufferSize * 2 - seek, this.#chunkSize);
            this.#chunkSize -= samplesSize;

            this.format_player.opl.read(this.#samplesBuffer, seek);

            // convert interleaved channels into separate ones
            for (let i = 0; i < this.#samplesBuffer.length; i += 2) {
                outputs[0][i >> 1] = this.#samplesBuffer[i];
                outputs[1][i >> 1] = this.#samplesBuffer[i + 1];
            }
        }
    }
}

module.exports = WorkletPlayer;
