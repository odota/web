import FileWriter, { ConsoleWriter, ContentWriter, FileContentWriter } from "./file-writer.mjs";
import { BaseNode, BaseTree, CompositeVisitor, PartialVisitor, Visitor } from "./tree.mjs";
import { ReportNode, ReportTree, Summarizers } from "./summarizer-factory.mjs";
import { Watermark, Watermarks } from "./watermarks.mjs";
import XMLWriter, { XmlAttributes } from "./xml-writer.mjs";
import Context, { ContextOptions, SourceFinder } from "./context.mjs";
import ReportBase, { ReportBaseOptions } from "./report-base.mjs";
import CloverReport, { CloverOptions } from "./reports/clover/index.mjs";
import CoberturaReport, { CoberturaOptions } from "./reports/cobertura/index.mjs";
import HtmlReport, { HtmlOptions, HtmlTheme, LinkMapper } from "./reports/html/index.mjs";
import HtmlSpaReport, { HtmlSpaOptions } from "./reports/html-spa/index.mjs";
import JsonSummaryReport, { JsonSummaryOptions } from "./reports/json-summary/index.mjs";
import JsonReport, { JsonOptions } from "./reports/json/index.mjs";
import LcovOnlyReport, { LcovOnlyOptions } from "./reports/lcovonly/index.mjs";
import LcovReport, { LcovOptions } from "./reports/lcov/index.mjs";
import NoneReport from "./reports/none/index.mjs";
import TeamcityReport, { TeamcityOptions } from "./reports/teamcity/index.mjs";
import TextLcov, { TextLcovOptions } from "./reports/text-lcov/index.mjs";
import TextSummaryReport, { TextSummaryOptions } from "./reports/text-summary/index.mjs";
import TextReport, { TextOptions } from "./reports/text/index.mjs";
//#region src/index.d.ts
/**
 * returns a reporting context for the supplied options
 * @param {Object} [opts=null] opts
 * @returns {Context}
 */
export declare function createContext(opts: ContextOptions): Context;
/**
 * returns the default watermarks that would be used when not
 * overridden
 * @returns {Object} an object with `statements`, `functions`, `branches`,
 *  and `line` keys. Each value is a 2 element array that has the low and
 *  high watermark as percentages.
 */
export declare function getDefaultWatermarks(): Watermarks;
declare const reports: {
  clover: typeof CloverReport;
  cobertura: typeof CoberturaReport;
  html: typeof HtmlReport;
  "html-spa": typeof HtmlSpaReport;
  json: typeof JsonReport;
  "json-summary": typeof JsonSummaryReport;
  lcov: typeof LcovReport;
  lcovonly: typeof LcovOnlyReport;
  none: typeof NoneReport;
  teamcity: typeof TeamcityReport;
  text: typeof TextReport;
  "text-lcov": typeof TextLcov;
  "text-summary": typeof TextSummaryReport;
};
/** options accepted by each built-in report, keyed by report name */
export interface ReportOptions {
  clover: CloverOptions;
  cobertura: CoberturaOptions;
  html: HtmlOptions;
  "html-spa": HtmlSpaOptions;
  json: JsonOptions;
  "json-summary": JsonSummaryOptions;
  lcov: LcovOptions;
  lcovonly: LcovOnlyOptions;
  none: never;
  teamcity: TeamcityOptions;
  text: TextOptions;
  "text-lcov": TextLcovOptions;
  "text-summary": TextSummaryOptions;
}
/** names of the built-in reports */
export type ReportType = keyof ReportOptions;
/**
 * creates an instance of a built-in report.
 * @param name the report name, e.g. `html`, `json`, `text`
 * @param cfg options for the report
 */
export declare function create<T extends ReportType>(name: T, cfg?: Partial<ReportOptions[T]>): InstanceType<(typeof reports)[T]>;
/**
 * creates an instance of a built-in or custom report.
 *
 * Custom reports are loaded with `import()`, so `name` may be a package name,
 * an absolute path or a `file://` URL of an ES module or CommonJS module whose
 * default export (or `module.exports`) is the report class.
 * @param name the report name, package name or path
 * @param cfg options for the report
 */
export declare function createAsync<T extends ReportType>(name: T, cfg?: Partial<ReportOptions[T]>): Promise<InstanceType<(typeof reports)[T]>>;
export declare function createAsync(name: string, cfg?: object): Promise<ReportBase>;
//#endregion
export { type BaseNode, type BaseTree, type CloverOptions, type CoberturaOptions, type CompositeVisitor, type ConsoleWriter, type ContentWriter, type Context, type ContextOptions, type FileContentWriter, FileWriter, type HtmlOptions, type HtmlSpaOptions, type HtmlTheme, type JsonOptions, type JsonSummaryOptions, type LcovOnlyOptions, type LcovOptions, type LinkMapper, type PartialVisitor, ReportBase, type ReportBaseOptions, type ReportNode, type ReportTree, type SourceFinder, type Summarizers, type TeamcityOptions, type TextLcovOptions, type TextOptions, type TextSummaryOptions, type Visitor, type Watermark, type Watermarks, type XMLWriter, type XmlAttributes };