import { ReportNode } from "../../summarizer-factory.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import "../../index.mjs";
//#region src/reports/text-summary/index.d.ts
/** options accepted by {@link TextSummaryReport} */
export interface TextSummaryOptions {
  /** the file to write the report to, defaults to the console */
  file?: string | null;
}
declare class TextSummaryReport extends ReportBase {
  file: string | null;
  constructor(opts?: TextSummaryOptions);
  onStart(node: ReportNode, context: Context): void;
}
//#endregion
export { TextSummaryReport as default };