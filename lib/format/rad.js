class RAD {
    #rad = {
        speed: 6,
        speedCnt: 6,
        //pOrderList: null,
        //orderSize: 0,
        order: [],
        orderPos: 0,
        //pPatternList: null,
        //pPatterns: [],
        //pPatternPos: null,
        patterns: new Array(32),
        patternPos: 0,
        currentLine: 0,
        instruments: new Array(32),
        //pInstr: [], // 31
        Old43: [], // 9
        OldA0B0: [], // 9
        ToneSlideSpeed: [], // 9
        ToneSlideFreq: [], // 9
        ToneSlide: [], // 9
        PortSlide: [], // 9
        VolSlide: [], // 9
    };

    rad_NoteFreq = [ 0x16b, 0x181, 0x198, 0x1b0, 0x1ca, 0x1e5, 0x202, 0x220, 0x241, 0x263, 0x287, 0x2ae ];
    rad_ChannelOffs = [ 0x20, 0x21, 0x22, 0x28, 0x29, 0x2a, 0x30, 0x31, 0x32 ];

    #Hz = 50;

    constructor(opl) {
        this.opl = opl;
    }

    load(buffer) {
        var header = new Buffer.from(buffer.buffer).slice(0, 16).toString();
        if (header != 'RAD by REALiTY!!')
            throw new Error('Buffer is not a "RAD by REALiTY!!" file');
    
        var ptune = this.data = new DataView(buffer.buffer);

        var version = ptune.getUint8(16);
        if (version != 0x10)
            throw new Error('Unsupported RAD version: 0x' + version.toString(16));

        var off = 17;

        const speed = ptune.getUint8(off);
        this.#rad.speed = speed & 0x3f;
        console.log('Speed: ', this.#rad.speed);

        this.#Hz = (speed & 0x60 ? 18.2 : 50);
        console.log('Timer: ', speed & 0x60 ? 18 : 50);

        if (speed & 0x80) {
            off++; // Skip description
            while (ptune.getUint8(off)) off++;
        }

        off++;
    
        // read initial instruments
        while (ptune.getUint8(off)) {
            const i = ptune.getUint8(off);
            this.#rad.instruments[i] = Array.from(new Uint8Array(ptune.buffer.slice(off + 1, off + 12)));
            off += 12;
        }

        off++;

        const orderSize = ptune.getUint8(off);
        this.#rad.order = Array.from(new Uint8Array(ptune.buffer.slice(off + 1, off + 1 + orderSize)));
        console.log('Order size: ', orderSize);
        console.log(this.#rad.order);

        off += orderSize + 1;

        const patternList = new Uint16Array(ptune.buffer.slice(off, off + 32 * 2));
        console.log(patternList);

        for (let p = 0; p < 32; p++) {
            if (!patternList[p]) {
                this.#rad.patterns[p] = [];
                continue;
            }

            // calculate the length of each pattern in the stream and slice them into an array
            var offset = patternList[p];
            var line;
            do {
                line = ptune.getUint8(offset++);
                var ch;
                do {
                    ch = ptune.getUint8(offset++);
                    var note = ptune.getUint8(offset++);
                    var eff = ptune.getUint8(offset++);
                    if (eff & 0x0f)
                        offset++;
                } while (!(ch & 0x80));
            } while (!(line & 0x80))

            this.#rad.patterns[p] = Array.from(new Uint8Array(ptune.buffer.slice(patternList[p], offset)));
        }

        console.log(this.#rad.patterns);
    }

    update() { // rad_update_frame()
        // offset inside each pattern
        var p = this.#rad.patternPos;
        var ch;

        if (this.#rad.speedCnt-- > 0) {
            //rad_update_notes();
            //return;
        }


    }

    rewind() {}

    refresh() {
        return 1.0 / this.#Hz;
    }
}

module.exports = RAD;
