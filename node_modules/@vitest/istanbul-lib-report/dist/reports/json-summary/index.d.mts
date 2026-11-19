import { ContentWriter } from "../../file-writer.mjs";
import { ReportNode } from "../../summarizer-factory.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import "../../index.mjs";
import { CoverageSummary } from "@vitest/istanbul-lib-coverage";
//#region src/reports/json-summary/index.d.ts
/** options accepted by {@link JsonSummaryReport} */
export interface JsonSummaryOptions {
  /** the file to write the report to, defaults to `coverage-summary.json` */
  file?: string;
}
declare class JsonSummaryReport extends ReportBase {
  file: string;
  contentWriter: ContentWriter | null;
  first: boolean;
  constructor(opts: JsonSummaryOptions);
  onStart(root: ReportNode, context: Context): void;
  writeSummary(filePath: string, sc: CoverageSummary | null): void;
  onSummary(node: ReportNode): void;
  onDetail(node: ReportNode): void;
  onEnd(): void;
}
//#endregion
export { JsonSummaryReport as default };