import ReportBase from "../../report-base.mjs";
import HtmlReport from "../html/index.mjs";
import LcovOnlyReport, { LcovOnlyOptions } from "../lcovonly/index.mjs";
//#region src/reports/lcov/index.d.ts
/** options accepted by {@link LcovReport}, passed through to the lcovonly report */
export interface LcovOptions extends LcovOnlyOptions {}
declare class LcovReport extends ReportBase {
  lcov: LcovOnlyReport;
  html: HtmlReport;
  constructor(opts?: LcovOptions);
}
//#endregion
export { LcovReport as default };