# OPL3 emulator

This is a fork of https://github.com/doomjs/opl3 with some useful changes:

* Deprecated [Worker+ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) are replaced with newer [AudioWorkletNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode). This means less load on the cpu and less data moved around between the Worker and main thread.
* Removed CLI tool because the change above makes the code browser-only
* [Browserify](https://browserify.org/) is dropped in favor of [Rollup](https://rollupjs.org/)
* JS syntax updated to ES2015 (`import` instead of `require()`)
* Added RAD format, disabled MUS beacuse of large instruments

The ultimate goal is to add A2M format replayer which is yet to be ported from [here](https://github.com/dmitrysmagin/a2t_play)

## Player architecture
