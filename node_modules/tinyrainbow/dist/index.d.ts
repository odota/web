interface Formatter {
    (input?: unknown): string;
    open: string;
    close: string;
}
interface Colors {
    readonly isColorSupported: boolean;
    readonly reset: Formatter;
    readonly bold: Formatter;
    readonly dim: Formatter;
    readonly italic: Formatter;
    readonly underline: Formatter;
    readonly inverse: Formatter;
    readonly hidden: Formatter;
    readonly strikethrough: Formatter;
    readonly black: Formatter;
    readonly red: Formatter;
    readonly green: Formatter;
    readonly yellow: Formatter;
    readonly blue: Formatter;
    readonly magenta: Formatter;
    readonly cyan: Formatter;
    readonly white: Formatter;
    readonly gray: Formatter;
    readonly bgBlack: Formatter;
    readonly bgRed: Formatter;
    readonly bgGreen: Formatter;
    readonly bgYellow: Formatter;
    readonly bgBlue: Formatter;
    readonly bgMagenta: Formatter;
    readonly bgCyan: Formatter;
    readonly bgWhite: Formatter;
    readonly blackBright: Formatter;
    readonly redBright: Formatter;
    readonly greenBright: Formatter;
    readonly yellowBright: Formatter;
    readonly blueBright: Formatter;
    readonly magentaBright: Formatter;
    readonly cyanBright: Formatter;
    readonly whiteBright: Formatter;
    readonly bgBlackBright: Formatter;
    readonly bgRedBright: Formatter;
    readonly bgGreenBright: Formatter;
    readonly bgYellowBright: Formatter;
    readonly bgBlueBright: Formatter;
    readonly bgMagentaBright: Formatter;
    readonly bgCyanBright: Formatter;
    readonly bgWhiteBright: Formatter;
    readonly rgb: (r: number, g: number, b: number) => Formatter;
    readonly bgRgb: (r: number, g: number, b: number) => Formatter;
    readonly hex: (hex: string) => Formatter;
    readonly bgHex: (hex: string) => Formatter;
}
declare function getDefaultColors(): Colors;
declare function isSupported(): boolean;
declare function createColors({ force }?: {
    force?: boolean;
}): Colors;
declare const colors: Colors;
declare function disableDefaultColors(): void;
declare function enabledDefaultColors(): void;

export { type Colors, type Formatter, createColors, colors as default, disableDefaultColors, enabledDefaultColors, getDefaultColors, isSupported };
