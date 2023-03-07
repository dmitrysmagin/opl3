//
// The main thread part of the Player running in a browser context
//

import { Readable } from "stream";

var currentScriptSrc = null;
try { currentScriptSrc = document.currentScript.src; } catch (err) { }

class MainPlayer extends Readable {
    #options = {};

    audioContext = null;
    worklet = null;

    constructor(format, options) {
        super();

        this.#options = options || {};
        this.init();
    }

    async init() {
        fetch(currentScriptSrc).then((script) => script.text()).then(async (text) => {
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
            this.worklet.port.postMessage({ cmd: 'OPL3', value: text });
            this.worklet.connect(gainNode);
        })
    }

    play(buffer) {

    }

    load(buffer) { // ArrayBuffer
        this.worklet && this.worklet.port.postMessage({ cmd: 'load', value: buffer });
    }
}

export default MainPlayer;
