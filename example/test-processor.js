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

                    this.player = new OPL3.WorkletPlayer(this.port.postMessage, {
                        sampleRate: 48000,
                    });
                    console.log(this.player)

                    break;
                }
                case "load": {
                    this.player.load(e.data.value);
                    break;
                }
                case "play": {
                    break;
                }
                case "stop": {
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
