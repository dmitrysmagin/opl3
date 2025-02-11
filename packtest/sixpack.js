/*
 * Adapted from sixpack.c by Philip G. Gage, April 1991
 * REFERENCES:
 *     https://www.sac.sk/download/pack/ddjcompr.zip
 *     https://github.com/70MM13/Step5Archive/blob/main/resources/sixpack/sixpack.c
 *
 * NOTE: When converting from C don't forget about type limiting guards:
 * 1) Division gives float result, truncate to int: a = b / c | 0
 * 2) Restrict bit shifts to type width (ushort in this case): a <<= 1; a &= 0xffff;
 * 
 */



fs = require('fs');

// source: Uint8Array
// dest: Uint8Array
// size: int
function sixdepak(source, dest, size) {
    const MAXFREQ = 2000;
    const MINCOPY = 3;
    const MAXCOPY = 255;
    const COPYRANGES = 6;
    const CODESPERRANGE = (MAXCOPY - MINCOPY + 1);
    const TERMINATE = 256;
    const FIRSTCODE = 257;
    const MAXCHAR = (FIRSTCODE + COPYRANGES * CODESPERRANGE - 1);
    const SUCCMAX = (MAXCHAR + 1);
    const TWICEMAX = (2 * MAXCHAR + 1);
    const ROOT = 1
    const MAXBUF = (42 * 1024);
    const MAXDISTANCE = 21389;
    const MAXSIZE = (21389 + MAXCOPY);

    const bitvalue/*[14]*/ = [ 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192 ];
    const copybits/*[COPYRANGES]*/ = [ 4, 6, 8, 10, 12, 14 ];
    const copymin/*[COPYRANGES]*/ = [ 0, 16, 80, 336, 1360, 5456 ];


    let ibitcount, ibitbuffer, ibufcount, obufcount, input_size, output_size,
        leftc = new Uint16Array(MAXCHAR + 1),
        rghtc = new Uint16Array(MAXCHAR + 1),
        dad = new Uint16Array(TWICEMAX + 1),
        freq = new Uint16Array(TWICEMAX + 1);

    let wdbuf, obuf, buf;

    function inittree() {
        for (let i = 2; i <= TWICEMAX; i++) {
            dad[i] = i / 2 | 0; // js: int div guard
            freq[i] = 1;
        }

        for (let i = 1; i <= MAXCHAR; i++) {
            leftc[i] = 2 * i;
            rghtc[i] = 2 * i + 1;
        }
    }

    function updatefreq(a, b) {
        do {
            freq[dad[a]] = freq[a] + freq[b];
            a = dad[a];
            if (a != ROOT) {
                if (leftc[dad[a]] == a)
                    b = rghtc[dad[a]];
                else
                    b = leftc[dad[a]];
            }
        } while (a != ROOT);

        if (freq[ROOT] == MAXFREQ)
            for (a = 1; a <= TWICEMAX; a++)
                freq[a] >>= 1;
    }

    function updatemodel(code) {
        let a = code + SUCCMAX, b, c, code1, code2;

        freq[a]++;
        if (dad[a] != ROOT) {
            code1 = dad[a];
            if (leftc[code1] == a)
                updatefreq(a, rghtc[code1]);
            else
                updatefreq(a, leftc[code1]);

            do {
                code2 = dad[code1];
                if (leftc[code2] == code1)
                    b = rghtc[code2];
                else
                    b = leftc[code2];

                if (freq[a] > freq[b]) {
                    if (leftc[code2] == code1)
                        rghtc[code2] = a;
                    else
                        leftc[code2] = a;

                    if (leftc[code1] == a) {
                        leftc[code1] = b;
                        c = rghtc[code1];
                    } else {
                        rghtc[code1] = b;
                        c = leftc[code1];
                    }

                    dad[b] = code1;
                    dad[a] = code2;
                    updatefreq(b,c);
                    a = b;
                }

                a = dad[a];
                code1 = dad[a];
            } while (code1 != ROOT);
        }
    }

    function inputcode(bits) {
        let i, code = 0;

        for (i = 1; i <= bits; i++) {
            if (!ibitcount) {
                if (ibitcount == MAXBUF)
                    ibufcount = 0;
                ibitbuffer = wdbuf[ibufcount];
                ibufcount++;
                ibitcount = 15;
            } else
                ibitcount--;

            if (ibitbuffer > 0x7fff)
                code |= bitvalue[i - 1];
            ibitbuffer <<= 1;
            ibitbuffer &= 0xffff; // js: ushort guard
        }

        return code;
    }

    function uncompress() {
        let a = 1;

        do {
            if (!ibitcount) {
                if (ibufcount == MAXBUF)
                    ibufcount = 0;
                ibitbuffer = wdbuf[ibufcount];
                ibufcount++;
                ibitcount = 15;
            } else
                ibitcount--;

            if (ibitbuffer > 0x7fff)
                a = rghtc[a];
            else
                a = leftc[a];
            ibitbuffer <<= 1;
            ibitbuffer &= 0xffff; // js: ushort guard
        } while (a <= MAXCHAR);

        a -= SUCCMAX;
        updatemodel(a);
        return a;
    }

    function decode() {
        let i, j, k, t, c, count = 0, dist, len, index;

        inittree();
        c = uncompress();

        while (c != TERMINATE) {
            if (c < 256) {
                obuf[obufcount] = c;
                obufcount++;
                if (obufcount == MAXBUF) {
                    output_size = MAXBUF;
                    obufcount = 0;
                }

                buf[count] = c;
                count++;
                if (count == MAXSIZE)
                    count = 0;
            } else {
                t = c - FIRSTCODE;
                index = t / CODESPERRANGE | 0; // js: int div guard
                len = t + MINCOPY - index * CODESPERRANGE;
                dist = inputcode(copybits[index]) + len + copymin[index];

                j = count;
                k = count - dist;
                if (count < dist)
                    k += MAXSIZE;

                for (i = 0; i <= len - 1; i++) {
                    obuf[obufcount] = buf[k];
                    obufcount++;
                    if (obufcount == MAXBUF) {
                        output_size = MAXBUF;
                        obufcount = 0;
                    }

                    buf[j] = buf[k];
                    j++; k++;
                    if (j == MAXSIZE) j = 0;
                    if (k == MAXSIZE) k = 0;
                }

                count += len;
                if (count >= MAXSIZE)
                    count -= MAXSIZE;
            }
            c = uncompress();
        }
        output_size = obufcount;
    }

    // sixdepak(source, dest, size)

    if (size + 4096 > MAXBUF)
        return 0;

    buf = new Uint8Array(MAXSIZE);
    input_size = size;
    ibitcount = 0; ibitbuffer = 0;
    obufcount = 0; ibufcount = 0;
    wdbuf = new Uint16Array(source.buffer); obuf = dest;

    decode();

    buf = undefined;
    wdbuf = undefined;

    return output_size;
}

var ibuf = fs.readFileSync('./packtest/songdata_sixpack.pck', null); // Buffer
var input = new Uint8Array(ibuf);
var output = new Uint8Array(11717); // sizeof(A2M_SONGDATA_V1_8)

sixdepak(input, output, input.byteLength);

/*
typedef struct {
    union {
        struct {
            uint8_t multipM: 4, ksrM: 1, sustM: 1, vibrM: 1, tremM : 1;
            uint8_t multipC: 4, ksrC: 1, sustC: 1, vibrC: 1, tremC : 1;
            uint8_t volM: 6, kslM: 2;
            uint8_t volC: 6, kslC: 2;
            uint8_t decM: 4, attckM: 4;
            uint8_t decC: 4, attckC: 4;
            uint8_t relM: 4, sustnM: 4;
            uint8_t relC: 4, sustnC: 4;
            uint8_t wformM: 3, : 5;
            uint8_t wformC: 3, : 5;
            uint8_t connect: 1, feedb: 3, : 4; // panning is not used here
        };
        uint8_t data[11];
    };
} tFM_INST_DATA;

*/

class tFM_INST_DATA {
    constructor(uint8array /* Uint8Array(11) */) {
        this.data = uint8array;
        const keytable = {
            multipM: [ 0, 0x0f, 0 ],
            ksrM:    [ 0, 0x10, 4 ],
            sustM:   [ 0, 0x20, 5 ],
            vibrM:   [ 0, 0x40, 6 ],
            tremM:   [ 0, 0x80, 6 ],
            multipC: [ 1, 0x0f, 0 ],
            ksrC:    [ 1, 0x10, 4 ],
            sustC:   [ 1, 0x20, 5 ],
            vibrC:   [ 1, 0x40, 6 ],
            tremC:   [ 1, 0x80, 6 ],
            volM:    [ 2, 0x3f, 0 ],
            kslM:    [ 2, 0xc0, 6 ],
            volC:    [ 3, 0x3f, 0 ],
            kslC:    [ 3, 0xc0, 6 ],
            decM:    [ 4, 0x0f, 0 ],
            attckM:  [ 4, 0xf0, 4 ],
            decC:    [ 5, 0x0f, 0 ],
            attckC:  [ 5, 0xf0, 4 ],
            relM:    [ 6, 0x0f, 0 ],
            sustnM:  [ 6, 0xf0, 4 ],
            relC:    [ 7, 0x0f, 0 ],
            sustnC:  [ 7, 0xf0, 4 ],
            wformM:  [ 8, 0x03, 0 ],
            wformC:  [ 9, 0x03, 0 ],
            connect: [ 10, 0x01, 0 ],
            feedb:   [ 10, 0x0e, 1 ]
        };

        // Dynamically generate getters/setters
        Object.keys(keytable).forEach((key) => {
            Object.defineProperty(this, key, {
                get() {
                    const [ offset, mask, shift ] = keytable[key];
                    return (this.data[offset] & mask) >> shift;
                },
                set(value) {
                    const [ offset, mask, shift ] = keytable[key];
                    this.data[offset] = (this.data[offset] & ~mask) | ((value << shift) & mask);
                },
            });
        });
    }
}

/*
typedef struct {
    tFM_INST_DATA fm;
    uint8_t panning;
    int8_t  fine_tune;
} tINSTR_DATA_V1_8;
*/

class tINSTR_DATA_V1_8 {
    constructor(uint8array /* Uint8Array(13) */) {
        const { buffer, byteOffset } = uint8array;
        const view = new DataView(buffer, byteOffset, 13);

        this.fm = new tFM_INST_DATA(new Uint8Array(buffer, byteOffset, 11));

        Object.defineProperty(this, "panning", {
            get() { return view.getUint8(11); },
            set(value) { view.setUint8(11, value); }
        });
        Object.defineProperty(this, "fine_tune", {
            get() { return view.getInt8(12) },
            set(value) { view.setInt8(11, value); }
        });
    }
}

/*var ins1 = new tINSTR_DATA_V1_8(new Uint8Array([0xff, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, -5]));
var d0 = ins1.fm.data[0];
var m = ins1.fm.multipM;
ins1.fm.multipM = 7;
var d1 = ins1.fine_tune;*/

/*
typedef struct {
    char songname[43];
    char composer[43];
    char instr_names[250][33];
    tINSTR_DATA_V1_8 instr_data[250];
    uint8_t pattern_order[128];
    uint8_t tempo;
    uint8_t speed;
    uint8_t common_flag; // A2M_SONGDATA_V5678
} A2M_SONGDATA_V1_8;
*/


class A2M_SONGDATA_V1_8 {
    constructor(songdata /* Uint8Array(11717) */) {
        const { buffer, byteOffset } = songdata;

        this.songname = new Uint8Array(buffer, byteOffset + 0, 43);
        this.composer = new Uint8Array(buffer, byteOffset + 0x2b, 43);
        this.instr_names = new Array(250).fill(0).map((_, index) => {
            return new Uint8Array(buffer, byteOffset + 0x56 + index * 33, 33);
        });
        this.instr_data = new Array(250).fill(0).map((_, i) => {
            return new tINSTR_DATA_V1_8(new Uint8Array(buffer, byteOffset + 0x2090 + i * 13, 13));
        });
        this.pattern_order = new Uint8Array(buffer, byteOffset + 0x2d42, 128);
        Object.defineProperty(this, "tempo", {
            get() { return songdata[0x2dc2]; },
            set(value) { songdata[0x2dc2] = value; }
        });
        Object.defineProperty(this, "speed", {
            get() { return songdata[0x2dc3]; },
            set(value) { songdata[0x2dc3] = value; }
        });
        Object.defineProperty(this, "common_flag", {
            get() { return songdata[0x2dc4]; },
            set(value) { songdata[0x2dc4] = value; }
        });
    }

    get_songname() {
        return new TextDecoder().decode(this.songname);
    }

    get_inst_name(index) {
        return new TextDecoder().decode(this.instr_names[index]);
    }
}

var songinfo = new A2M_SONGDATA_V1_8(output);

//process.stdout.write(output.slice(0, 48));
fs.writeFileSync('./packtest/test', output);

var name = songinfo.get_songname();
var iname0 = songinfo.get_inst_name(1);
var ins1 = songinfo.instr_data[0];

process.stdout.write(name);
