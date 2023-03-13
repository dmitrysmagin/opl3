// To be executed inside AudioWorklet in AudioWorkletGlobalScope

import OPL3 from "./opl3";
import IMF from "./format/imf";

class WorkletPlayer {
    #options = {};
    format = null;
    #formats = [];

    #samplesBuffer = null;
    sampleRate = null; // 48000 for audio worklet
    #chunkSize = 0;

    postMessage = null;

    constructor(formats, options, postMessage) {
        this.#formats = formats;
        this.postMessage = postMessage;
        this.#options = options || {};
    }

    detectFormat(buffer /*: ArrayBuffer | Buffer*/) {
        for (let format of this.#formats) {
            if (format.probe && format.probe(buffer)) {
                return format;
            }
        }

        return false;
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

export default WorkletPlayer;
