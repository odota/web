import { ContentWriter } from "../../file-writer.mjs";
import { ReportNode } from "../../summarizer-factory.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import "../../index.mjs";
//#region src/reports/json/index.d.ts
/** options accepted by {@link JsonReport} */
export interface JsonOptions {
  /** the file to write the report to, defaults to `coverage-final.json` */
  file?: string;
}
declare class JsonReport extends ReportBase {
  file: string;
  first: boolean;
  contentWriter: ContentWriter;
  constructor(opts: JsonOptions);
  onStart(root: ReportNode, context: Context): void;
  onDetail(node: ReportNode): void;
  onEnd(): void;
}
//#endregion
export { JsonReport as default };