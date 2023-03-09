class RAD {
    #rad = {
        speed: 6,
        speedCnt: 6,
        orderSize: 0,
        order: [],
        orderPos: 0,
        patterns: new Array(32),
        patternPos: 0,
        currentLine: 0,
        instruments: new Array(32),
        Old43: new Uint8Array(9), // 9
        OldA0B0: new Uint16Array(9), // 9
        ToneSlideSpeed: new Uint16Array(9), // 9
        ToneSlideFreq: new Uint16Array(9), // 9
        ToneSlide: new Int8Array(9), // 9
        PortSlide: new Int8Array(9), // 9
        VolSlide: new Int8Array(9), // 9

        pattern_jmp_f: 0,
    };

    rad_NoteFreq = [ 0x157, 0x16b, 0x181, 0x198, 0x1b0, 0x1ca, 0x1e5, 0x202, 0x220, 0x241, 0x263, 0x287 ];
    rad_ChannelOffs = [ 0x00, 0x01, 0x02, 0x08, 0x09, 0x0a, 0x10, 0x11, 0x12 ];

    #Hz = 50;

    constructor(opl, options) {
        this.opl = opl;
    }

    getContext() {
        return this.#rad;
    }

    rad_adlib_write(reg, value) {
        this.opl.write(0, reg, value);
    }

    rad_load_instrument(channel, ins) {
        let r = this.rad_ChannelOffs[channel];
        const p = this.#rad.instruments[ins];

        if (p.length) {
            this.#rad.Old43[channel] = p[2];

            this.rad_adlib_write(r + 0x23, p[0]);
            this.rad_adlib_write(r + 0x20, p[1]);
            this.rad_adlib_write(r + 0x43, p[2]);
            this.rad_adlib_write(r + 0x40, p[3]);
            this.rad_adlib_write(r + 0x63, p[4]);
            this.rad_adlib_write(r + 0x60, p[5]);
            this.rad_adlib_write(r + 0x83, p[6]);
            this.rad_adlib_write(r + 0x80, p[7]);

            this.rad_adlib_write(channel + 0xc0, p[8]);

            this.rad_adlib_write(r + 0xe3, p[9]);
            this.rad_adlib_write(r + 0xe0, p[10]);
        }
    }

    rad_set_volume(channel, new_volume) {
        if (new_volume > 63)
            new_volume = 63;

        this.#rad.Old43[channel] = (this.#rad.Old43[channel] & 0xc0) + (new_volume ^ 0x3f);
        this.rad_adlib_write(this.rad_ChannelOffs[channel] + 0x43, this.#rad.Old43[channel]);
    }

    rad_get_freq(ch) {
        const freq = this.#rad.OldA0B0[ch] & 0x3ff;
        const octave = (this.#rad.OldA0B0[ch] >> 10) & 7;
        return (freq - 0x157) + octave * (0x2ae - 0x157);
    }

    rad_set_freq(ch, new_freq) {
        const freq = new_freq % (0x2ae - 0x157) + 0x157;
        const octave = new_freq / (0x2ae - 0x157);
        this.#rad.OldA0B0[ch] =
            (this.#rad.OldA0B0[ch] & 0x2000) | freq | (octave << 10);

        this.rad_adlib_write(0xa0 + ch, this.#rad.OldA0B0[ch] & 0xff);
        this.rad_adlib_write(0xb0 + ch, this.#rad.OldA0B0[ch] >> 8);
    }

    rad_update_notes() {
        // process portamentos
        for (let i = 0; i <= 8; i++) {
            if (this.#rad.PortSlide[i])
                this.rad_set_freq(i, this.rad_get_freq(i) + this.#rad.PortSlide[i]);
        }

        // process volume slides
        for (let i = 0; i <= 8; i++) {
            let v;
            if (this.#rad.VolSlide[i] > 0) {
                v = ((this.#rad.Old43[i] & 0x3f) ^ 0x3f) - this.#rad.VolSlide[i];
                if (v > 63)
                    v = 63;
                this.rad_set_volume(i, v);
            } else {
                v = ((this.#rad.Old43[i] & 0x3f) ^ 0x3f) - this.#rad.VolSlide[i];
                if (v < 0)
                    v = 0;
                this.rad_set_volume(i, v);
            }
        }

        // process tone slides
        for (let i = 0; i <= 8; i++) {
            if (this.#rad.ToneSlide[i]) {
                if (this.rad_get_freq(i) > this.#rad.ToneSlideFreq[i]) {
                    if (this.rad_get_freq(i) - this.#rad.ToneSlideSpeed[i] < this.#rad.ToneSlideFreq[i]) {
                        this.#rad.ToneSlide[i] = 0;
                        this.rad_set_freq(i, this.#rad.ToneSlideFreq[i]);
                        continue;
                        //goto _jmp_0;
                    }
                    this.rad_set_freq(i, this.rad_get_freq(i) - this.#rad.ToneSlideSpeed[i]);
                } else {
                    if (this.rad_get_freq(i) < this.#rad.ToneSlideFreq[i]) {
                        if (this.rad_get_freq(i) + this.#rad.ToneSlideSpeed[i] > this.#rad.ToneSlideFreq[i]) {
                            this.#rad.ToneSlide[i] = 0;
                            this.rad_set_freq(i, this.#rad.ToneSlideFreq[i]);
                            continue;
                            //goto _jmp_0;
                        }
                        this.rad_set_freq(i, this.rad_get_freq(i) + this.#rad.ToneSlideSpeed[i]);
                    } else {
                    //_jmp_0:
                        this.#rad.ToneSlide[i] = 0;
                        this.rad_set_freq(i, this.#rad.ToneSlideFreq[i]);
                    }
                }
            }
        }
    }

    rad_playnote(channel, v0, v1, v2) {

        const note = v0 & 0x0f;
        const octave = (v0 >> 4) & 7;
        const instrument = ((v1 >> 4) & 0xf) | ((v0 >> 3) & 0x10);
        const effect = v1 & 0x0f;
        const effect_value = effect ? v2 : 0;

        // check if doing noteslide
        if (note && effect === 3) {
            this.#rad.ToneSlideFreq[channel] = octave * (0x2ae - 0x157) + this.rad_NoteFreq[note - 1] - 0x157;
            this.#rad.ToneSlide[channel] = 1;

            if (effect_value > 0)
                this.#rad.ToneSlideSpeed[channel] = effect_value;

            return;
        }

        // play note
        if (note) {
            // first key off previous note
            this.#rad.OldA0B0[channel] &= ~0x2000;
            this.rad_adlib_write(0xb0 + channel, this.#rad.OldA0B0[channel] >> 8);

            if (instrument) {
                this.rad_set_volume(channel, 0);
                this.rad_load_instrument(channel, instrument);
            }

            if (note != 15) {
                this.#rad.OldA0B0[channel] = this.rad_NoteFreq[note - 1] | (octave << 10) | 0x2000;

                this.rad_adlib_write(0xa0 + channel, this.#rad.OldA0B0[channel] & 0xff);
                this.rad_adlib_write(0xb0 + channel, this.#rad.OldA0B0[channel] >> 8);
            }
        }

        switch (effect) {
            case 1: // portamento up
                this.#rad.PortSlide[channel] = effect_value;
                break;
            case 2: // portamento down
                this.#rad.PortSlide[channel] = -effect_value;
                break;
            case 3: // portamento (no note given)
                if (effect_value)
                    this.#rad.ToneSlideSpeed[channel] = effect_value;
                this.#rad.ToneSlide[channel] = 1;
                break;
            case 5: // tone+volume slide
                this.#rad.ToneSlide[channel] = 1; // no break after!!
            case 0x0a: // volume slide
                if (effect_value >= 50)
                    this.#rad.VolSlide[channel] = -(effect_value - 50);
                else
                    this.#rad.VolSlide[channel] = effect_value;
                break;
            case 0x0c: // set volume
                this.rad_set_volume(channel, effect_value);
                break;
            case 0x0d: // jump to line
                if (effect_value < 64)
                    this.#rad.pattern_jmp_f = effect_value | 0x80;
                break;
            case 0x0f: // set speed
                this.#rad.speed = effect_value;
                break;
        }
    }

    rad_next_pattern() {
        if (++this.#rad.orderPos >= this.#rad.orderSize)
            this.#rad.orderPos = 0;

        if (this.#rad.order[this.#rad.orderPos] & 0x80)
            this.#rad.orderPos = this.#rad.order[this.#rad.orderPos] & 0x7f;

        this.#rad.patternPos = 0;
    }

    rad_update_frame() {
        // offset inside each pattern
        let i = this.#rad.patternPos;
        let p = this.#rad.patterns[this.#rad.order[this.#rad.orderPos] & 0x7f];
        var ch;

        if (this.#rad.speedCnt-- > 0) {
            this.rad_update_notes();
            return;
        }

        // switch off any effects
        for (let i = 0; i <= 8; i++) {
            this.#rad.ToneSlide[i] = 0;
            this.#rad.VolSlide[i] = 0;
            this.#rad.PortSlide[i] = 0;
        }

        if (i < p.length && (p[i] & 0x7f) === this.#rad.currentLine) {
            if(p[i] & 0x80) { // last line in the pattern?
                this.#rad.patternPos = p.length;
            }

            i++;  // move to first channel
            do {
                ch = p[i];
                const e = p[i + 2] & 0x0f; // if eff val present

                this.rad_playnote(ch & 0x7f, p[i+1], p[i+2], e ? p[i+3] : 0);

                i += e ? 4 : 3;

                // pattern jump command
                if (this.#rad.pattern_jmp_f & 0x80) {
                    this.#rad.speedCnt = this.#rad.speed - 1;
                    this.#rad.currentLine = this.#rad.pattern_jmp_f & 0x7f;
                    this.rad_next_pattern();

                    i = this.#rad.patternPos;
                    p = this.#rad.patterns[this.#rad.order[this.#rad.orderPos] & 0x7f];

                    while ((p[i] & 0x7f) < (this.#rad.pattern_jmp_f & 0x7f)) {
                        if (p[i] & 0x80) {
                            this.#rad.pattern_jmp_f = 0;
                            this.#rad.patternPos = i;
                            this.rad_update_notes();
                            return;
                        }

                        i++;
                        while (!(p[i] & 0x80)) {
                            i += (p[i + 2] & 0x0f ? 4 : 3);
                        }

                        this.#rad.pattern_jmp_f = 0;
                        this.#rad.patternPos = i;
                        this.rad_update_notes();
                        return;
                    }
                }
            } while (!(ch & 0x80));

            this.#rad.patternPos = i;
        }

        this.#rad.speedCnt = this.#rad.speed - 1;
        if (++this.#rad.currentLine >= 64) {
            this.#rad.currentLine = 0;
            this.rad_next_pattern();
        }

        this.rad_update_notes();
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
        this.#rad.speedCnt = this.#rad.speed - 1;
        this.#Hz = (speed & 0x60 ? 18.2 : 50);

        if (speed & 0x80) {
            off++; // Skip description
            while (ptune.getUint8(off)) off++;
        }

        off++;

        // read initial instruments
        while (ptune.getUint8(off)) {
            const i = ptune.getUint8(off);
            this.#rad.instruments[i] = new Uint8Array(ptune.buffer.slice(off + 1, off + 12));
            off += 12;
        }

        off++;

        this.#rad.orderSize = ptune.getUint8(off);
        this.#rad.order = Array.from(new Uint8Array(ptune.buffer.slice(off + 1, off + 1 + this.#rad.orderSize)));

        off += this.#rad.orderSize + 1;

        const patternList = new Uint16Array(ptune.buffer.slice(off, off + 32 * 2));

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
    }

    update() {
        this.rad_update_frame();
    }

    rewind() {}

    refresh() {
        return 1.0 / this.#Hz;
    }
}

module.exports = RAD;
