import Path from "./path.mjs";
import { BaseNode, BaseTree } from "./tree.mjs";
import { CoverageMap, CoverageSummary, FileCoverage } from "@vitest/istanbul-lib-coverage";
//#region src/summarizer-factory.d.ts
/** names of the summarizer strategies supported by {@link SummarizerFactory} */
export type Summarizers = "flat" | "nested" | "pkg" | "defaultSummarizer";
declare class ReportNode extends BaseNode {
  path: Path;
  parent: ReportNode | null;
  fileCoverage: FileCoverage | undefined;
  children: ReportNode[];
  c_files?: CoverageSummary | null;
  c_full?: CoverageSummary | null;
  constructor(path: Path, fileCoverage?: FileCoverage);
  static createRoot(children: ReportNode[]): ReportNode;
  addChild(child: ReportNode): void;
  asRelative(p: string): string;
  getQualifiedName(): string;
  getRelativeName(): string;
  getParent(): ReportNode | null;
  getChildren(): ReportNode[];
  isSummary(): boolean;
  getFileCoverage(): FileCoverage;
  getCoverageSummary(filesOnly?: boolean): CoverageSummary | null;
}
declare class ReportTree extends BaseTree<ReportNode> {
  constructor(root: ReportNode, childPrefix?: string);
}
//#endregion
export { ReportNode, ReportTree };