import path from "node:path";
//#region src/path.d.ts
type PathParser = (path: string) => path.ParsedPath;
declare class Path {
  v: string[];
  readonly length: number;
  push: (...items: string[]) => number;
  pop: () => string | undefined;
  shift: () => string | undefined;
  unshift: (...items: string[]) => number;
  splice: (start: number, deleteCount?: number, ...items: string[]) => string[];
  constructor(strOrArray: string | string[]);
  toString(): string;
  hasParent(): boolean;
  parent(): Path;
  elements(): string[];
  name(): string;
  contains(other: Path): boolean;
  ancestorOf(other: Path): boolean;
  descendantOf(other: Path): boolean;
  commonPrefixPath(other: Path): Path;
  static compare(a: Path, b: Path): number;
  static tester: {
    setParserAndSep(p: PathParser, sep: string): void;
    reset(): void;
  };
}
//#endregion
export { Path as default };