const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const globals = require('rollup-plugin-node-globals');
const builtins = require('rollup-plugin-node-builtins');

module.exports = {
    input: 'index.js',
    output: {
        file: 'dist/opl3.js',
        name: 'OPL3',
        format: 'umd'
    },
    plugins: [
        json(),
        commonjs({ transformMixedEsModules: true }),
        nodeResolve({ browser: true, preferBuiltins: true, }),
        babel({ babelHelpers: 'bundled' }),
        globals(),
        builtins(),
    ],
};
