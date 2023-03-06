"use strict";

class TestProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = (e) => {
            switch (e.data.cmd) {
                case "OPL3": {
                    // self is needed for browserify'd module
                    // rollup's umd doesn't need it
                    const opl3module = new Function("self", e.data.value);
                    opl3module(globalThis);
                    console.log(globalThis)

                    this.player = new OPL3.WorkletPlayer(null, {
                        sampleRate: 48000,
                        prebuffer: 3000,
                        volume: 3
                    });
                    console.log(this.player)

                    break;
                }
                case "load": {
                    this.player.load(e.data.value, null, this.port.postMessage);
                    break;
                }
            }
        }
    }

    process(inputs, outputs, parameters) {
        // Float32Array(128)
        this.player.update(outputs[0]);

        return true;
    }
}

registerProcessor("test-generator", TestProcessor);
