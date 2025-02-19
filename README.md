# OPL3 emulator

This is a fork of https://github.com/doomjs/opl3 with some useful changes:

* Deprecated [Worker+ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) are replaced with newer [AudioWorkletNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode). This means less load on the cpu and less data moved around between the Worker and main thread.
* Removed CLI tool because the change above makes the code browser-only
* [Browserify](https://browserify.org/) is dropped in favor of [Rollup](https://rollupjs.org/)
* JS syntax updated to ES2015 (`import` instead of `require()`, `class` instead of `function`)
* The code is refactored to properly separate parts that run in the main thread and in the AudioWorklet
* Added RAD format, disabled MUS because of large instruments

The ultimate goal is to add A2M format replayer which is yet to be ported from [here](https://github.com/dmitrysmagin/a2t_play)

## Usage example

Bundled opl3.js should be included into the page as an external script:
```html
    <script type="text/javascript" src="/js/opl3.js" />
```

Then it could be invoked in the main script:
```js
    var counter = document.querySelector(".counter");
    var info = document.querySelector("#info");
    var player = new OPL3.Player({ prebuffer: 3000, sampleRate: 48000 });

    player.on("currentTime", (value) => {
        counter.innerHTML = `currentFrame: ${value.currentFrame}, currentTime: ${value.currentTime.toFixed(2)} s`;
    })

    function FileToArrayBuffer(file) {
        const fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new Error('Problem parsing input file'))
            };

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.readAsArrayBuffer(file);
        });
    }

    async function loadFileWorklet(files) {
        if (files instanceof FileList && files.length) {
            var file = files[0];
            var data = await FileToArrayBuffer(file);

            player.play(data);
        }
    }

    function PlayerPause() {
        player.pause();
    }

    function PlayerResume() {
        player.resume();
    }

    function PlayerStop() {
        player.stop();
```

Full example [here](https://github.com/dmitrysmagin/opl3/example/webaudio.html)
