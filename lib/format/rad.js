class RAD {
    #rad = {
        speed: 6,
        speedCnt: 6,
        //pOrderList: null,
        orderSize: 0,
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

    rad_playnote(ch, v0, v1, v3) {
        const note = v0 & 0x0f;
        const octave = (v0 >> 4) & 7;
        const instrument = ((v1 >> 4) & 3) | (v0 >> 4);
        const effect = v1 & 0x0f;
        const effect_value = effect ? v3 : 0;

        // check if doing noteslide
        if (note && effect === 3) {

        }
        //console.log(`ch: ${ch}, note: ${note}-${octave}, ins: ${instrument}`)
    }

    rad_next_pattern() {
        if (++this.#rad.orderPos >= this.#rad.orderSize)
            this.#rad.orderPos = 0;

        if (this.#rad.order[this.#rad.orderPos] & 0x80)
            this.#rad.orderPos = this.#rad.order[this.#rad.orderPos] & 0x7f;

        this.#rad.patternPos = 0;
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

        this.#rad.orderSize = ptune.getUint8(off);
        this.#rad.order = Array.from(new Uint8Array(ptune.buffer.slice(off + 1, off + 1 + this.#rad.orderSize)));
        //console.log('Order size: ', this.#rad.orderSize);
        //console.log(this.#rad.order);

        off += this.#rad.orderSize + 1;

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

            this.#rad.patterns[p] = new Uint8Array(ptune.buffer.slice(patternList[p], offset));
        }

        console.log(this.#rad.patterns);
    }

    update() { // rad_update_frame()
        // offset inside each pattern
        let i = this.#rad.patternPos;
        const p = this.#rad.patterns[this.#rad.order[this.#rad.orderPos] & 0x7f];
        var ch;

        if (this.#rad.speedCnt-- > 0) {
            //rad_update_notes();
            return;
        }

        //console.log(this.#rad.orderPos, this.#rad.currentLine, i)

        if (i < p.length)
        if ((p[i] & 0x7f) === this.#rad.currentLine) {
            if(p[i] & 0x80) { // last line in the pattern?
                this.#rad.patternPos = p.length;
            }

            i++;  // move to first channel
            do {
                ch = p[i];
                const e = p[i + 2] & 0x0f; // if eff val present

                this.rad_playnote(ch & 0x7f, p[i+1], p[i+2], e ? p[i+3] : 0);

                i += e ? 4 : 3;

                // pattern jump

            } while (!(ch & 0x80));

            this.#rad.patternPos = i;
        }

        this.#rad.speedCnt = this.#rad.speed - 1;
        if (++this.#rad.currentLine >= 64) {
            this.#rad.currentLine = 0;
            this.rad_next_pattern();
        }

        //rad_update_notes();
    }

    rewind() {}

    refresh() {
        return 1.0 / this.#Hz;
    }
}

module.exports = RAD;
