import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
    if (mode === 'worklet') {
        return {
            build: {
                lib: {
                    entry: resolve(__dirname, 'src/lib/worklet-processor.ts'),
                    formats: ['iife'],
                    name: 'OPL3_AudioWorklet',
                    fileName: () => 'opl3-worklet.js',
                },
                outDir: resolve(__dirname, 'dist'),
                emptyOutDir: false,
                minify: true,
            },
        };
    }

    return {
        build: {
            lib: {
                entry: resolve(__dirname, 'src/lib/index.ts'),
                formats: ['umd'],
                name: 'OPL3',
                fileName: () => 'opl3.js',
            },
            outDir: resolve(__dirname, 'dist'),
            emptyOutDir: false,
            minify: true,

        },
    };
});
