import OPL3 from "./opl3";

import LAA from "./format/laa";
//import MUS from "./format/mus";
import DRO from "./format/dro";
import IMF from "./format/imf";
import RAW from "./format/raw";
import RAD from "./format/rad";
import Player from "./player";
import WorkletPlayer from "./worklet-player";

export default {
    OPL3,
    formats: [
        LAA, /*MUS,*/ DRO, IMF, RAW, RAD
    ],
    Player,
    WorkletPlayer
}
