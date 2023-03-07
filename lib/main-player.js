//
// The main thread part of the Player running in a browser context
//

import { Readable } from "stream";

var currentScriptSrc = null;
try { currentScriptSrc = document.currentScript.src; } catch (err) { }

class MainPlayer extends Readable {
    #options = {};

    opl3module = null; // source of opl3.js
    audioContext = null;
    worklet = null;

    constructor(format, options) {
        super();

        this.#options = options || {};
        this.init();
    }

    async init() {
        this.opl3module = await fetch(currentScriptSrc).then((script) => script.text());
    }

    async initContext() {
        this.audioContext = new AudioContext();
        await this.audioContext.audioWorklet.addModule("test-processor.js");

        this.worklet = new AudioWorkletNode(this.audioContext, "test-generator", {
            numberOfOutputs: 1,
            outputChannelCount : [2]
        });

        var gainNode = this.audioContext.createGain();
        gainNode.gain.value = 4;
        gainNode.connect(this.audioContext.destination);

        // Pass the whole OPL3 module into the worklet
        this.worklet.port.postMessage({ cmd: 'OPL3', value: this.opl3module });
        this.worklet.connect(gainNode);
    }

    play(buffer) {
        //this.audioContext.resume();
    }

    async load(buffer) { // ArrayBuffer
        if (!this.audioContext || !this.worklet) {
            // init context and worklet
            await this.initContext();
        }
        this.worklet && this.worklet.port.postMessage({ cmd: 'load', value: buffer });
    }
}

export default MainPlayer;
