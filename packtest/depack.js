/*
 * Adapted from depack.c by Joergen Ibsen, Copyright (c) 1998-2014
 * REFERENCES:
 *     http://www.ibsensoftware.com/
 *
 * NOTE: aPLib v0.26b decompressor
 *       incompatible with current releases
 *       changes up to v1.1.0 have been removed
 * 
 */

fs = require('fs');

// source: Uint8Array
// dest: Uint8Array
function aP_depack(source, dest)
{
    let s = 0, d = 0;
    let tag, bitcount;

    function aP_getbit() {
        let bit;

        /* check if tag is empty */
        if (!bitcount--) {
            /* load next tag */
            tag = source[s++];
            bitcount = 7;
        }

        /* shift bit out of tag */
        bit = (tag >> 7) & 0x01;
        tag <<= 1;

        return bit;
    }

    function aP_getgamma() {
        let result = 1;

        /* input gamma2-encoded bits */
        do {
            result = (result << 1) + aP_getbit();
        } while (aP_getbit());

        return result;
    }

    let offs, len, R0 = -1;
	let done = 0;
	let i;

	bitcount = 0;

	/* first byte verbatim */
	dest[d++] = source[s++];

	/* main decompression loop */
	while (!done) {
		if (aP_getbit()) {
			if (aP_getbit()) {
				if (aP_getbit()) {
					offs = 0;

					for (i = 4; i; i--) {
						offs = (offs << 1) + aP_getbit();
					}

					if (offs) {
						dest[d] = dest[d - offs];
						d++;
					}
					else {
						dest[d++] = 0x00;
					}
				} else {
					offs = source[s++];

					len = 2 + (offs & 0x0001);

					offs >>= 1;

					if (offs) {
						for (; len; len--) {
							dest[d] = dest[d - offs];
							d++;
						}
					}
					else {
						done = 1;
					}

					R0 = offs;
				}
			} else {
				offs = aP_getgamma();

				if (offs == 2) {
					offs = R0;

					len = aP_getgamma();

					for (; len; len--) {
						dest[d] = dest[d - offs];
						d++;
					}
				} else {
					offs -= 3;

					offs <<= 8;
					offs += source[s++];

					len = aP_getgamma();

					if (offs >= 32000) {
						len++;
					}
					if (offs >= 1280) {
						len++;
					}
					if (offs < 128) {
						len += 2;
					}

					for (; len; len--) {
						dest[d] = dest[d - offs];
						d++;
					}

					R0 = offs;
				}
			}
		}
		else {
			dest[d++] = source[s++];
		}
	}

	return d;
}

var ibuf /* Buffer */ = fs.readFileSync('./packtest/songdata_aplib.pck', null);
var input = new Uint8Array(ibuf);
var output = new Uint8Array(1138338); // sizeof(A2M_SONGDATA_V9_14)

aP_depack(input, output);

fs.writeFileSync('./packtest/test_depack', output);
