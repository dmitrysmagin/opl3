"use strict";

class TestProcessor extends AudioWorkletProcessor {
    f = true;

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

                    this.player = new OPL3.Player(null, {
                        prebuffer: 3000,
                        volume: 3
                    });
                    console.log(this.player)

                    break;
                }
                case "load": {
                    this.player.worklet_load(e.data.value, null, this.port.postMessage);
                    break;
                }
            }
        }
    }
f = true;
    process(inputs, outputs, parameters) {
        this.f && console.log(outputs); this.f = false;
        const output = outputs[0];
        // Float32Array(128)
        if (this.player.worklet_player) {
            this.player.worklet_update(outputs[0]);
        } /*else {
            output.forEach((channel) => {
                for (let i = 0; i < channel.length; i++) {
                    channel[i] = Math.random() * 2 - 1;
                }
            });
        }*/

        return true;
    }
}

registerProcessor("test-generator", TestProcessor);
