import { ContentWriter } from "../../file-writer.mjs";
import { ReportNode } from "../../summarizer-factory.mjs";
import XMLWriter from "../../xml-writer.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import "../../index.mjs";
import { CoverageSummary } from "@vitest/istanbul-lib-coverage";
//#region src/reports/clover/index.d.ts
/** options accepted by {@link CloverReport} */
export interface CloverOptions {
  /** the file to write the report to, defaults to `clover.xml` */
  file?: string;
}
/** counts collected while walking the tree for the root `metrics` element */
interface TreeStats {
  packages: number;
  files: number;
  classes: number;
}
declare class CloverReport extends ReportBase {
  cw: ContentWriter | null;
  xml: XMLWriter | null;
  file: string;
  constructor(opts: CloverOptions);
  onStart(root: ReportNode, context: Context): void;
  onEnd(): void;
  getTreeStats(node: ReportNode, context: Context): TreeStats;
  writeRootStats(node: ReportNode, context: Context): void;
  writeMetrics(metrics: CoverageSummary): void;
  onSummary(node: ReportNode): void;
  onSummaryEnd(node: ReportNode): void;
  onDetail(node: ReportNode): void;
}
//#endregion
export { CloverReport as default };