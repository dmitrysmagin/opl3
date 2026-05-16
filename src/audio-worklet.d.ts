// Types for AudioWorklet APIs not included in standard DOM lib
declare var AudioWorkletProcessor: {
    prototype: AudioWorkletProcessor;
    new (options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
};

interface AudioWorkletProcessor {
    readonly port: MessagePort;
    process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: Record<string, Float32Array>,
    ): boolean;
}

declare function registerProcessor(
    name: string,
    processorCtor: typeof AudioWorkletProcessor,
): void;

declare var currentFrame: number;
declare var currentTime: number;
