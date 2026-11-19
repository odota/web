//#region src/watermarks.d.ts
/**
 * A 2 element array that has the low and high watermark as percentages.
 */
export type Watermark = [number, number];
/**
 * Watermarks for the four coverage metrics. Each value is a 2 element array
 * that has the low and high watermark as percentages.
 */
export interface Watermarks {
  statements: Watermark;
  functions: Watermark;
  branches: Watermark;
  lines: Watermark;
}
//#endregion