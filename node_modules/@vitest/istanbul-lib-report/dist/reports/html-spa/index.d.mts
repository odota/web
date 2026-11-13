import FileWriter from "../../file-writer.mjs";
import { ReportNode } from "../../summarizer-factory.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import HtmlReport, { HtmlOptions, LinkMapper } from "../html/index.mjs";
import "../../index.mjs";
import { Totals } from "@vitest/istanbul-lib-coverage";
//#region src/reports/html-spa/index.d.ts
/** options accepted by {@link HtmlSpaReport} */
export interface HtmlSpaOptions extends Omit<HtmlOptions, "theme"> {
  /** the metrics to show in the report UI, defaults to lines, branches and functions */
  metricsToShow?: ("lines" | "branches" | "functions" | "statements")[];
}
/** a single metric as embedded into the SPA's `window.data` */
interface SpaMetric {
  total: number;
  covered: number;
  skipped: number;
  missed: number;
  pct: number | "Unknown";
  classForPercent: string;
}
/** the recursive node structure embedded into the SPA's `window.data` */
interface SpaDataStructure {
  file: string;
  isEmpty: boolean;
  metrics: Record<"statements" | "branches" | "functions" | "lines", SpaMetric>;
  children: false | SpaDataStructure[];
}
declare class HtmlSpaReport extends ReportBase {
  verbose: boolean;
  linkMapper: LinkMapper;
  subdir: string;
  date: string;
  skipEmpty: boolean | undefined;
  htmlReport: HtmlReport;
  metricsToShow: ("lines" | "branches" | "functions" | "statements")[];
  constructor(opts?: HtmlSpaOptions);
  getWriter(context: Context): FileWriter;
  onStart(root: ReportNode, context: Context): void;
  onDetail(node: ReportNode, context: Context): void;
  getMetric(metric: Totals, type: string, context: Context): SpaMetric;
  toDataStructure(node: ReportNode, context: Context): SpaDataStructure;
  onEnd(rootNode: ReportNode, context: Context): void;
}
//#endregion
export { HtmlSpaReport as default };