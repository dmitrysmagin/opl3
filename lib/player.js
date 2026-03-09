//
// The main thread part of the Player running in a browser context
//

import { EventEmitter } from "events";

// included as text string with rollup-plugin-string
import processor from "../dist/opl3-worklet";

class Player extends EventEmitter {
    #options = {};

    opl3module = null; // source of opl3.js
    audioContext = null;
    worklet = null;

    constructor(options) {
        super();

        this.#options = options || {};
    }

    async initContext() {
        const blob = new Blob([processor], { type: 'application/javascript' });
        const objectURL = URL.createObjectURL(blob);

        this.audioContext = new AudioContext({
            sampleRate: this.#options.sampleRate || 48000, // 8..9kHz
        });
        await this.audioContext.audioWorklet.addModule(objectURL);

        this.worklet = new AudioWorkletNode(this.audioContext, "opl3-generator", {
            numberOfOutputs: 1,
            outputChannelCount : [2]
        });

        var gainNode = this.audioContext.createGain();
        gainNode.gain.value = 4;
        gainNode.connect(this.audioContext.destination);

        // Init audio worklet and pass options
        this.worklet.port.postMessage({ cmd: 'init', value: null, options: this.#options });

        // Redirect postMessage from worklet to player.on() handlers
        this.worklet.port.onmessage = (e) => this.emit(e.data.cmd, e.data.value);
        this.worklet.connect(gainNode);
    }

    play(buffer) {
        this.load(buffer);
    }

    pause() {
        this.audioContext?.suspend();
    }

    resume() {
        this.audioContext?.resume();
    }

    stop() {
        this.audioContext?.close();
        this.audioContext = null;
        this.worklet = null;
    }

    async load(buffer) { // ArrayBuffer | Uint8Array
        if (!this.audioContext || !this.worklet) {
            // init context and worklet
            await this.initContext();
        }

        this.worklet?.port.postMessage({ cmd: 'load', value: buffer });
    }
}

export default Player;
