import { ContentWriter } from "../../file-writer.mjs";
import { ReportNode } from "../../summarizer-factory.mjs";
import XMLWriter from "../../xml-writer.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import "../../index.mjs";
//#region src/reports/cobertura/index.d.ts
/** options accepted by {@link CoberturaReport} */
export interface CoberturaOptions {
  /** the file to write the report to, defaults to `cobertura-coverage.xml` */
  file?: string;
  /** timestamp to embed in the report, defaults to `Date.now()` */
  timestamp?: string;
  /** the project root used to relativize file paths, defaults to `process.cwd()` */
  projectRoot?: string;
}
declare class CoberturaReport extends ReportBase {
  cw: ContentWriter | null;
  xml: XMLWriter | null;
  timestamp: string;
  projectRoot: string;
  file: string;
  constructor(opts?: CoberturaOptions);
  onStart(root: ReportNode, context: Context): void;
  onEnd(): void;
  writeRootStats(node: ReportNode): void;
  onSummary(node: ReportNode): void;
  onSummaryEnd(node: ReportNode): void;
  onDetail(node: ReportNode): void;
}
//#endregion
export { CoberturaReport as default };