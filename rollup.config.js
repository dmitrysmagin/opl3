//const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
//const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const globals = require('rollup-plugin-node-globals');
const builtins = require('rollup-plugin-node-builtins');
const { string } = require('rollup-plugin-string');
const terser = require('@rollup/plugin-terser');

const plugins = [
    json(),
    string({ include: "**/opl3-worklet.js", }),
    //commonjs({ transformMixedEsModules: true }),
    //nodeResolve({ browser: true, preferBuiltins: true, }),
    babel({ babelHelpers: 'bundled' }),
    //globals(),
    builtins(),
    terser(),
]

module.exports = [
    {
        input: 'lib/worklet-processor.js',
        output: {
            file: 'dist/opl3-worklet.js',
            name: 'OPL3-AudioWorklet',
            format: 'umd'
        },
        plugins
    },
    {
        input: 'lib/index.js',
        output: {
            file: 'dist/opl3.js',
            name: 'OPL3',
            format: 'umd'
        },
        plugins,
    }
];
