import { ContentWriter } from "../../file-writer.mjs";
import { ReportNode } from "../../summarizer-factory.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import "../../index.mjs";
//#region src/reports/lcovonly/index.d.ts
/** options accepted by {@link LcovOnlyReport} */
export interface LcovOnlyOptions {
  /** the file to write the report to, defaults to `lcov.info` */
  file?: string;
  /** the project root used to relativize file paths, defaults to `process.cwd()` */
  projectRoot?: string;
}
declare class LcovOnlyReport extends ReportBase {
  file: string;
  projectRoot: string;
  contentWriter: ContentWriter | null;
  constructor(opts?: LcovOnlyOptions);
  onStart(root: ReportNode, context: Context): void;
  onDetail(node: ReportNode): void;
  onEnd(): void;
}
//#endregion
export { LcovOnlyReport as default };