/*
 * Adapted from sixpack.c by Philip G. Gage, April 1991
 * REFERENCE: https://github.com/70MM13/Step5Archive/blob/main/resources/sixpack/sixpack.c
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
                index = t / CODESPERRANGE | 0; // int div
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

    return output_size;
}

var ibuf = fs.readFileSync('./packtest/songdata_sixpack.pck', null); // Buffer
var input = new Uint8Array(ibuf);
var output = new Uint8Array(11717); // sizeof(A2M_SONGDATA_V1_8)

sixdepak(input, output, input.byteLength);

//process.stdout.write(output.slice(0, 48));
fs.writeFileSync('./packtest/test', output);
