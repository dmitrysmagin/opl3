export default class IMF {
    constructor(opl) {
        this.opl = opl;
    }

    static probe(buffer) {
        const invalidRegs = [
            5, 6, 7, 9, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15,
            0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
            0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x3f,
            0x56, 0x57, 0x58, 0x59, 0x5a, 0x5b, 0x5c, 0x5d, 0x5e, 0x5f,
            0x76, 0x77, 0x78, 0x79, 0x7a, 0x7b, 0x7c, 0x7d, 0x7e, 0x7f,
            0x96, 0x97, 0x98, 0x99, 0x9a, 0x9b, 0x9c, 0x9d, 0x9e, 0x9f,
            0xa9, 0xaa, 0xab, 0xac, 0xad, 0xae, 0xaf,
            0xb9, 0xba, 0xbb, 0xbc,       0xbe, 0xbf,
            0xc9, 0xca, 0xcb, 0xcc, 0xcd, 0xce, 0xcf,
            0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff,

        ];

        const allowedVals = [ 0, 0x3f, 0xff ];

        let position = 0;
        const data = new DataView(buffer.buffer);
        let size = data.getUint16(0);

        if (!size) {
            position = 0;
            size = data.byteLength;
        } else {
            size = Math.min(size, data.byteLength);
            position = 2;
        }

        for (; position < size; position += 4) {
            var reg = data.getUint8(position);
            var value = data.getUint8(position + 1);

            // titlermx.imf writes:
            // regs 0 .. 0x3f with 0
            // regs 0x40 .. 0x55 with 0x3f
            // regs 0x60 .. 0x95 with 0xff
            // regs 0xa0 .. 0xf5 with 0
            if (invalidRegs.some(r => r === reg)) {
                console.log("Data: " +
                    data.getUint8(position, true).toString(16) + " " +
                    data.getUint8(position + 1, true).toString(16)
                );

                /* Corridor 7 tunes write to non existent regs c9 and ca */
                if (reg == 0xc9 || reg == 0xca)
                    continue;

                if (!allowedVals.some(v => v === value))
                    return false;
            }
        }

        return true;
    }

    load(buffer) {
        this.data = new DataView(buffer.buffer);
        this.size = this.data.getUint16(0, true);

        if (!this.size) {
            this.type = 0;
            this.position = 0;
            this.size = this.data.byteLength;
        } else {
            this.type = 1;
            this.position = 2;
        }
    }

    update() {
        this.delay = 0;
        while (!this.delay && this.position < this.size) {
            try {
                var reg = this.data.getUint8(this.position++);
                var value = this.data.getUint8(this.position++);
                this.delay = this.data.getUint16(this.position, true);
                this.position += 2;

                this.midi_write_adlib(reg, value);
                if (this.delay) return true;
            } catch (err) {
                break;
            }
        }

        return false;
    }

    rewind() {
        this.position = 0;
    }

    // IMF usually have 3 timers: 280Hz, 560Hz or 700Hz
    // Adplug chooses it by db
    refresh() {
        return this.delay / 560;
    }

    midi_write_adlib(r, v) {
        var a = 0;
        if (r >= 0x100) {
            a = 1;
            r -= 0x100;
        }

        this.opl.write(a, r, v);
    }
}
