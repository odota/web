import { ContentWriter } from "../../file-writer.mjs";
import { ReportNode } from "../../summarizer-factory.mjs";
import Context from "../../context.mjs";
import ReportBase, { ReportBaseOptions } from "../../report-base.mjs";
import "../../index.mjs";
//#region src/reports/text/index.d.ts
/** options accepted by {@link TextReport} */
export interface TextOptions extends ReportBaseOptions {
  /** the file to write the report to, defaults to the console */
  file?: string | null;
  /** maximum column width of the table, defaults to the terminal width */
  maxCols?: number;
  /** skip rows with no coverage */
  skipEmpty?: boolean;
  /** skip rows with full coverage */
  skipFull?: boolean;
}
declare class TextReport extends ReportBase {
  file: string | null;
  maxCols: number;
  cw: ContentWriter | null;
  skipEmpty: boolean | undefined;
  skipFull: boolean | undefined;
  nameWidth: number;
  missingWidth: number;
  hideTable: boolean;
  constructor(opts?: TextOptions);
  onStart(root: ReportNode, context: Context): void;
  onSummary(node: ReportNode, context: Context): void;
  onDetail(node: ReportNode, context: Context): void;
  onEnd(): void;
}
//#endregion
export { TextReport as default };