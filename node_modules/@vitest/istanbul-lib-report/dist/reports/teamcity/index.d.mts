import { ReportNode } from "../../summarizer-factory.mjs";
import Context from "../../context.mjs";
import ReportBase from "../../report-base.mjs";
import "../../index.mjs";
//#region src/reports/teamcity/index.d.ts
/** options accepted by {@link TeamcityReport} */
export interface TeamcityOptions {
  /** the file to write the report to, defaults to the console */
  file?: string | null;
  /** the teamcity block name to wrap the output in, defaults to `Code Coverage Summary` */
  blockName?: string;
}
declare class TeamcityReport extends ReportBase {
  file: string | null;
  blockName: string;
  constructor(opts?: TeamcityOptions);
  onStart(node: ReportNode, context: Context): void;
}
//#endregion
export { TeamcityReport as default };