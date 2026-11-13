//#region src/coverage-summary.d.ts
/**
 * Totals for a single coverage metric (statements, lines, functions, branches).
 * `pct` is a percentage number (0-100), or the string `"Unknown"` for a blank
 * summary that has not yet been merged with any data.
 */
interface Totals {
  total: number;
  covered: number;
  skipped: number;
  pct: number | "Unknown";
}
/**
 * Raw, JSON-serializable data underlying a `CoverageSummary`.
 */
interface CoverageSummaryData {
  lines: Totals;
  statements: Totals;
  functions: Totals;
  branches: Totals;
  branchesTrue?: Totals;
}
/**
 * CoverageSummary provides a summary of code coverage . It exposes 4 properties,
 * `lines`, `statements`, `branches`, and `functions`. Each of these properties
 * is an object that has 4 keys `total`, `covered`, `skipped` and `pct`.
 * `pct` is a percentage number (0-100).
 */
declare class CoverageSummary {
  data: CoverageSummaryData;
  readonly lines: Totals;
  readonly statements: Totals;
  readonly functions: Totals;
  readonly branches: Totals;
  readonly branchesTrue: Totals | undefined;
  /**
   * @constructor
   * @param obj an optional data object or
   * another coverage summary to initialize this object with.
   */
  constructor(obj?: CoverageSummary | CoverageSummaryData);
  /**
   * merges a second summary coverage object into this one
   * @param obj - another coverage summary object
   */
  merge(obj: CoverageSummary): this;
  /**
   * returns a POJO that is JSON serializable. May be used to get the raw
   * summary object.
   */
  toJSON(): CoverageSummaryData;
  /**
   * return true if summary has no lines of code
   */
  isEmpty(): boolean;
}
//#endregion
//#region src/file-coverage.d.ts
/** a single location in a source file: 1-based line, 0-based column */
interface Location {
  line: number;
  column: number;
}
/** a source range delimited by a start and end location */
interface Range {
  start: Location;
  end: Location;
}
/** metadata for a single function in the instrumented source */
interface FunctionMapping {
  name: string;
  decl: Range;
  loc: Range;
  line: number;
}
/** metadata for a single branch in the instrumented source */
interface BranchMapping {
  loc: Range;
  type: string;
  locations: Range[];
  line: number;
}
/**
 * Raw, JSON-serializable coverage data for a single file, as produced by the
 * istanbul instrumenter or coverage tooling.
 */
interface FileCoverageData {
  path: string;
  statementMap: Record<string, Range>;
  fnMap: Record<string, FunctionMapping>;
  branchMap: Record<string, BranchMapping>;
  s: Record<string, number>;
  f: Record<string, number>;
  b: Record<string, number[]>;
  /** hit counts for logical branch truthiness; only present when reportLogic is enabled */
  bT?: Record<string, number[]>;
  /** marks coverage produced by the `--all` option (empty placeholder coverage) */
  all?: boolean;
}
/** per-line branch coverage as returned by `FileCoverage#getBranchCoverageByLine` */
interface Coverage {
  covered: number;
  total: number;
  coverage: number;
}
/**
 * provides a read-only view of coverage for a single file.
 * The deep structure of this object is documented elsewhere. It has the following
 * properties:
 *
 * * `path` - the file path for which coverage is being tracked
 * * `statementMap` - map of statement locations keyed by statement index
 * * `fnMap` - map of function metadata keyed by function index
 * * `branchMap` - map of branch metadata keyed by branch index
 * * `s` - hit counts for statements
 * * `f` - hit count for functions
 * * `b` - hit count for branches
 */
declare class FileCoverage {
  data: FileCoverageData;
  readonly path: string;
  readonly statementMap: Record<string, Range>;
  readonly fnMap: Record<string, FunctionMapping>;
  readonly branchMap: Record<string, BranchMapping>;
  readonly s: Record<string, number>;
  readonly f: Record<string, number>;
  readonly b: Record<string, number[]>;
  readonly bT: Record<string, number[]> | undefined;
  readonly all: boolean | undefined;
  /**
   * @constructor
   * @param pathOrObj is a string that initializes
   * and empty coverage object with the specified file path or a data object that
   * has all the required properties for a file coverage object.
   */
  constructor(pathOrObj?: string | FileCoverage | FileCoverageData, reportLogic?: boolean);
  /**
   * returns computed line coverage from statement coverage.
   * This is a map of hits keyed by line number in the source.
   */
  getLineCoverage(): Record<string, number>;
  /**
   * returns an array of uncovered line numbers.
   * @returns an array of line numbers for which no hits have been
   *  collected.
   */
  getUncoveredLines(): string[];
  /**
   * returns a map of branch coverage by source line number.
   * @returns an object keyed by line number. Each object
   * has a `covered`, `total` and `coverage` (percentage) property.
   */
  getBranchCoverageByLine(): Record<string, Coverage>;
  /**
   * return a JSON-serializable POJO for this file coverage object
   */
  toJSON(): FileCoverageData;
  /**
   * merges a second coverage object into this one, updating hit counts
   * @param other - the coverage object to be merged into this one.
   *  Note that the other object should have the same structure as this one (same file).
   */
  merge(other: FileCoverage): void;
  computeSimpleTotals(property: "getLineCoverage" | "s" | "f"): Totals;
  computeBranchTotals(property: "b" | "bT"): Totals;
  /**
   * resets hit counts for all statements, functions and branches
   * in this coverage object resulting in zero coverage.
   */
  resetHits(): void;
  /**
   * returns a CoverageSummary for this file coverage object
   * @returns {CoverageSummary}
   */
  toSummary(): CoverageSummary;
}
//#endregion
//#region src/coverage-map.d.ts
/**
 * Raw, JSON-serializable data underlying a `CoverageMap`: `FileCoverage`
 * objects or their raw data keyed by file path. This can be the raw global
 * coverage object.
 */
interface CoverageMapData {
  [path: string]: FileCoverage | FileCoverageData;
}
/** CoverageMap is a map of `FileCoverage` objects keyed by file paths. */
declare class CoverageMap {
  data: Record<string, FileCoverage>;
  /**
   * @constructor
   * @param obj A coverage map from which to initialize this
   * map's contents. This can be the raw global coverage object.
   */
  constructor(obj?: CoverageMap | CoverageMapData);
  /**
   * merges a second coverage map into this one
   * @param obj - a CoverageMap or its raw data. Coverage is merged
   *  correctly for the same files and additional file coverage keys are created
   *  as needed.
   */
  merge(obj: CoverageMap | CoverageMapData): void;
  /**
   * filter the coveragemap based on the callback provided
   * @param callback - Returns true if the path
   *  should be included in the coveragemap. False if it should be
   *  removed.
   */
  filter(callback: (path: string) => boolean): void;
  /**
   * returns a JSON-serializable POJO for this coverage map
   */
  toJSON(): CoverageMapData;
  /**
   * returns an array for file paths for which this map has coverage
   * @returns array of files
   */
  files(): string[];
  /**
   * returns the file coverage for the specified file.
   * @param file
   */
  fileCoverageFor(file: string): FileCoverage;
  /**
   * adds a file coverage object to this map. If the path for the object,
   * already exists in the map, it is merged with the existing coverage
   * otherwise a new key is added to the map.
   * @param fc the file coverage to add
   */
  addFileCoverage(fc: string | FileCoverage | FileCoverageData): void;
  /**
   * returns the coverage summary for all the file coverage objects in this map.
   * @returns {CoverageSummary}
   */
  getCoverageSummary(): CoverageSummary;
}
//#endregion
//#region src/index.d.ts
/**
 * creates a coverage summary object
 * @param obj an argument with the same semantics
 *  as the one passed to the `CoverageSummary` constructor
 */
export declare function createCoverageSummary(obj?: CoverageSummary | CoverageSummaryData): CoverageSummary;
/**
 * creates a CoverageMap object
 * @param obj optional - an argument with the same semantics
 *  as the one passed to the CoverageMap constructor.
 */
export declare function createCoverageMap(obj?: CoverageMap | CoverageMapData): CoverageMap;
/**
 * creates a FileCoverage object
 * @param obj optional - an argument with the same semantics
 *  as the one passed to the FileCoverage constructor.
 */
export declare function createFileCoverage(obj: string | FileCoverage | FileCoverageData): FileCoverage;
/** classes exported for reuse */
export declare const classes: {
  /**
   * the file coverage constructor
   */
  FileCoverage: typeof FileCoverage;
};
//#endregion
export type { BranchMapping, Coverage, CoverageMap, CoverageMapData, CoverageSummary, CoverageSummaryData, FileCoverage, FileCoverageData, FunctionMapping, Location, Range, Totals };