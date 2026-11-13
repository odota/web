import LcovOnlyReport from "../lcovonly/index.mjs";
//#region src/reports/text-lcov/index.d.ts
/** options accepted by {@link TextLcov}, `file` is always the console */
export interface TextLcovOptions {
  /** the project root used to relativize file paths, defaults to `process.cwd()` */
  projectRoot?: string;
}
declare class TextLcov extends LcovOnlyReport {
  constructor(opts?: TextLcovOptions);
}
//#endregion
export { TextLcov as default };