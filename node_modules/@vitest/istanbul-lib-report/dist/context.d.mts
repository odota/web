import FileWriter, { ContentWriter } from "./file-writer.mjs";
import { PartialVisitor, Visitor } from "./tree.mjs";
import { ReportNode, ReportTree, Summarizers } from "./summarizer-factory.mjs";
import { Watermarks } from "./watermarks.mjs";
import XMLWriter from "./xml-writer.mjs";
import { CoverageMap } from "@vitest/istanbul-lib-coverage";
//#region src/context.d.ts
/** a function that returns source code given a file path */
export type SourceFinder = (filePath: string) => string;
/** options accepted by {@link Context} / `createContext` */
export interface ContextOptions {
  /** the coverage map to report on */
  coverageMap: CoverageMap;
  /** the reporting directory, defaults to `coverage` */
  dir?: string;
  /** watermarks for statements, lines, branches and functions */
  watermarks?: Partial<Watermarks>;
  /** the default summarizer strategy, defaults to `pkg` */
  defaultSummarizer?: Summarizers;
  /**
   * a function that returns source code given a file path. Defaults to
   * filesystem lookups based on path.
   */
  sourceFinder?: SourceFinder;
}
/**
 * A reporting context that is passed to report implementations
 * @param {Object} [opts=null] opts options
 * @param {String} [opts.dir='coverage'] opts.dir the reporting directory
 * @param {Object} [opts.watermarks=null] opts.watermarks watermarks for
 *  statements, lines, branches and functions
 * @param {Function} [opts.sourceFinder=fsLookup] opts.sourceFinder a
 *  function that returns source code given a file path. Defaults to
 *  filesystem lookups based on path.
 * @constructor
 */
declare class Context {
  dir: string;
  watermarks: Watermarks;
  sourceFinder: SourceFinder;
  data: {
    writer?: FileWriter;
  };
  private _summarizerFactory;
  readonly writer: FileWriter;
  constructor(opts: ContextOptions);
  /**
   * returns a FileWriter implementation for reporting use. Also available
   * as the `writer` property on the context.
   * @returns {Writer}
   */
  getWriter(): FileWriter;
  /**
   * returns the source code for the specified file path or throws if
   * the source could not be found.
   * @param {String} filePath the file path as found in a file coverage object
   * @returns {String} the source code
   */
  getSource(filePath: string): string;
  /**
   * returns the coverage class given a coverage
   * types and a percentage value.
   * @param {String} type - the coverage type, one of `statements`, `functions`,
   *  `branches`, or `lines`
   * @param {Number} value - the percentage value
   * @returns {String} one of `high`, `medium` or `low`
   */
  classForPercent(type: string, value: number): string;
  /**
   * returns an XML writer for the supplied content writer
   * @param {ContentWriter} contentWriter the content writer to which the returned XML writer
   *  writes data
   * @returns {XMLWriter}
   */
  getXMLWriter(contentWriter: ContentWriter): XMLWriter;
  /**
   * returns a full visitor given a partial one.
   * @param {Object} partialVisitor a partial visitor only having the functions of
   *  interest to the caller. These functions are called with a scope that is the
   *  supplied object.
   * @returns {Visitor}
   */
  getVisitor(partialVisitor: PartialVisitor<ReportNode>): Visitor<ReportNode>;
  getTree(name?: Summarizers): ReportTree;
}
//#endregion
export { Context as default };