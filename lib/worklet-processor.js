// Note: all imports will be bundled by rollup
import LAA from "./format/laa";
//import MUS from "./format/mus";
import DRO from "./format/dro";
import IMF from "./format/imf";
import RAW from "./format/raw";
import RAD from "./format/rad";

import WorkletPlayer from "./worklet-player";

const formats = [
    LAA, /*MUS,*/ DRO, RAW, RAD,
    // Formats with no id (imf, hsc),
    IMF
];

class WorkletProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = (e) => {
            switch (e.data.cmd) {
                case "init": {
                    this.player = new WorkletPlayer(
                        formats,
                        e.data.options || {},
                        (message) => this.port.postMessage(message)
                    );
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
        this.port.postMessage({ cmd: "currentTime", value: { currentFrame, currentTime } })

        return true;
    }
}

registerProcessor("opl3-generator", WorkletProcessor);
