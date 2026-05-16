# Migration Report: Rollup + JS → Vite + TypeScript

## Summary

The project has been migrated from a Rollup-based JavaScript build to Vite + TypeScript. The original `lib/` directory was moved to `src/lib/` with all `.js` files renamed to `.ts`.

## What changed

### Structure

| Before | After |
|---|---|
| `lib/*.js` | `src/lib/*.ts` |
| `lib/format/*.js` | `src/lib/format/*.ts` |
| `example/webaudio.html` | `src/index.html` |
| — | `src/env.d.ts` (`?raw` import type declarations) |
| — | `src/audio-worklet.d.ts` (AudioWorklet API types) |
| `rollup.config.js` | `vite.config.ts` |
| `babel.config.json` | removed (Vite uses esbuild) |
| `.eslintrc.json` | removed (pending replacement) |

### Build

Dual Vite build selected via `--mode`:

```
npm run build:worklet   →  vite build --mode worklet   →  dist/opl3-worklet.js  (49.8 kB IIFE)
npm run build           →  build:worklet + vite build   →  dist/opl3.js          (51.7 kB UMD)
```

- **Worklet build** (mode=worklet): bundles `src/lib/worklet-processor.ts` and all format parsers + OPL3 core into an IIFE that runs in `AudioWorkletGlobalScope`.
- **Library build** (default): bundles `src/lib/index.ts` into a UMD global (`OPL3`). Imports the worklet file as a raw string via Vite's `?raw` suffix, then loads it as a Blob URL — same pattern as the original `rollup-plugin-string`.

### Dependencies

Removed 30+ unused dependencies including:
- `rollup`, `@rollup/*`, `rollup-plugin-*` (replaced by Vite)
- `@babel/core`, `@babel/preset-env` (replaced by esbuild)
- `events`, `readable-stream`, `stream-buffers`, `setimmediate`, `util` (browser polyfills, no longer needed)
- `uglify-js` (replaced by Vite's built-in minification)
- `async`, `yargs`, `chalk`, `glob`, `mkdirp`, `progress`, `numeral`, `extend`, `duration`, `node-gyp` (CLI tools, unused)

**Added:**
- `vite ^5.0` (dev)
- `typescript ^5.3` (dev)

### EventEmitter → EventTarget

In `src/lib/player.ts`, the Node.js `EventEmitter` polyfill (`import { EventEmitter } from "events"`) was replaced with the browser-native `EventTarget`:

- `class Player extends EventEmitter` → `class Player extends EventTarget`
- `this.emit(...)` → `this.#emit(...)` (private method dispatching `CustomEvent`)
- Added `on(event, callback)` wrapper that unwraps `e.detail`, so consumer code like `player.on("currentTime", (value) => ...)` continues to work identically.

### TypeScript status

- **`src/lib/opl3.ts`** and all format parsers (`dro`, `imf`, `laa`, `rad`, `raw`, `mus`) have `// @ts-nocheck` — they are dense DSP code using dynamic property assignment. Full typing is a separate effort.
- **`player.ts`**, **`worklet-player.ts`**, **`worklet-processor.ts`** have full type annotations and pass `tsc --noEmit` cleanly.
- **`tsconfig.json`** uses `ES2020` target, `bundler` module resolution, `noImplicitAny: false` to accommodate the untyped files.

### Scripts

```json
{
    "build:worklet": "vite build --mode worklet",
    "build": "npm run build:worklet && vite build",
    "typecheck": "tsc --noEmit"
}
```

## Unchanged

- `example/simple.html` — left as-is (uses old API, served directly from disk)
- `example/data/` — left as-is
- `lib/` — original JS files preserved (can be removed after validation)
- All test data files (`.rad`, `.raw`, `.dro`, `.imf`, `.laa`)
