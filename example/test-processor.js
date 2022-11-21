import Module from './module.js';

class TestProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = (e) => {
            //console.log(e.data);
            if (e.data.cmd === "OPL3") {
                // self is needed for browserify'd module
                // rollup's umd doesn't need it
                const opl3module = new Function("self", e.data.value);
                opl3module(globalThis);

                console.log(this);
                console.log(globalThis)
                Module.method();

                let player = new OPL3.Player(null, {
                    prebuffer: 5000,
                    volume: 3
                });
                console.log(player)
            }
        }
    }
    process(inputList, outputList, parameters) {
        return true;
    }
}

registerProcessor("test-generator", TestProcessor);
