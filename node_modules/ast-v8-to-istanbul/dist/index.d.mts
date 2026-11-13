import { EncodedSourceMap } from "@jridgewell/trace-mapping";
import { Profiler } from "node:inspector";
//#region node_modules/.pnpm/@types+estree@1.0.9/node_modules/@types/estree/index.d.ts
// This definition file follows a somewhat unusual format. ESTree allows
// runtime type checks based on the `type` parameter. In order to explain this
// to typescript we want to use discriminated union types:
// https://github.com/Microsoft/TypeScript/pull/9163
//
// For ESTree this is a bit tricky because the high level interfaces like
// Node or Function are pulling double duty. We want to pass common fields down
// to the interfaces that extend them (like Identifier or
// ArrowFunctionExpression), but you can't extend a type union or enforce
// common fields on them. So we've split the high level interfaces into two
// types, a base type which passes down inherited fields, and a type union of
// all types which extend the base type. Only the type union is exported, and
// the union is how other types refer to the collection of inheriting types.
//
// This makes the definitions file here somewhat more difficult to maintain,
// but it has the notable advantage of making ESTree much easier to use as
// an end user.
interface BaseNodeWithoutComments {
  // Every leaf interface that extends BaseNode must specify a type property.
  // The type property should be a string literal. For example, Identifier
  // has: `type: "Identifier"`
  type: string;
  loc?: SourceLocation | null | undefined;
  range?: [number, number] | undefined;
}
interface BaseNode extends BaseNodeWithoutComments {
  leadingComments?: Comment[] | undefined;
  trailingComments?: Comment[] | undefined;
}
interface NodeMap {
  AssignmentProperty: AssignmentProperty;
  CatchClause: CatchClause;
  Class: Class;
  ClassBody: ClassBody;
  Expression: Expression;
  Function: Function;
  Identifier: Identifier;
  Literal: Literal;
  MethodDefinition: MethodDefinition;
  ModuleDeclaration: ModuleDeclaration;
  ModuleSpecifier: ModuleSpecifier;
  Pattern: Pattern;
  PrivateIdentifier: PrivateIdentifier;
  Program: Program;
  Property: Property;
  PropertyDefinition: PropertyDefinition;
  SpreadElement: SpreadElement;
  Statement: Statement;
  Super: Super;
  SwitchCase: SwitchCase;
  TemplateElement: TemplateElement;
  VariableDeclarator: VariableDeclarator;
}
type Node = NodeMap[keyof NodeMap];
interface Comment extends BaseNodeWithoutComments {
  type: "Line" | "Block";
  value: string;
}
interface SourceLocation {
  source?: string | null | undefined;
  start: Position;
  end: Position;
}
interface Position {
  /** >= 1 */
  line: number;
  /** >= 0 */
  column: number;
}
interface Program extends BaseNode {
  type: "Program";
  sourceType: "script" | "module";
  body: Array<Directive | Statement | ModuleDeclaration>;
  comments?: Comment[] | undefined;
}
interface Directive extends BaseNode {
  type: "ExpressionStatement";
  expression: Literal;
  directive: string;
}
interface BaseFunction extends BaseNode {
  params: Pattern[];
  generator?: boolean | undefined;
  async?: boolean | undefined;
  // The body is either BlockStatement or Expression because arrow functions
  // can have a body that's either. FunctionDeclarations and
  // FunctionExpressions have only BlockStatement bodies.
  body: BlockStatement | Expression;
}
type Function = FunctionDeclaration | FunctionExpression | ArrowFunctionExpression;
type Statement = ExpressionStatement | BlockStatement | StaticBlock | EmptyStatement | DebuggerStatement | WithStatement | ReturnStatement | LabeledStatement | BreakStatement | ContinueStatement | IfStatement | SwitchStatement | ThrowStatement | TryStatement | WhileStatement | DoWhileStatement | ForStatement | ForInStatement | ForOfStatement | Declaration;
interface BaseStatement extends BaseNode {}
interface EmptyStatement extends BaseStatement {
  type: "EmptyStatement";
}
interface BlockStatement extends BaseStatement {
  type: "BlockStatement";
  body: Statement[];
  innerComments?: Comment[] | undefined;
}
interface StaticBlock extends Omit<BlockStatement, "type"> {
  type: "StaticBlock";
}
interface ExpressionStatement extends BaseStatement {
  type: "ExpressionStatement";
  expression: Expression;
}
interface IfStatement extends BaseStatement {
  type: "IfStatement";
  test: Expression;
  consequent: Statement;
  alternate?: Statement | null | undefined;
}
interface LabeledStatement extends BaseStatement {
  type: "LabeledStatement";
  label: Identifier;
  body: Statement;
}
interface BreakStatement extends BaseStatement {
  type: "BreakStatement";
  label?: Identifier | null | undefined;
}
interface ContinueStatement extends BaseStatement {
  type: "ContinueStatement";
  label?: Identifier | null | undefined;
}
interface WithStatement extends BaseStatement {
  type: "WithStatement";
  object: Expression;
  body: Statement;
}
interface SwitchStatement extends BaseStatement {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: SwitchCase[];
}
interface ReturnStatement extends BaseStatement {
  type: "ReturnStatement";
  argument?: Expression | null | undefined;
}
interface ThrowStatement extends BaseStatement {
  type: "ThrowStatement";
  argument: Expression;
}
interface TryStatement extends BaseStatement {
  type: "TryStatement";
  block: BlockStatement;
  handler?: CatchClause | null | undefined;
  finalizer?: BlockStatement | null | undefined;
}
interface WhileStatement extends BaseStatement {
  type: "WhileStatement";
  test: Expression;
  body: Statement;
}
interface DoWhileStatement extends BaseStatement {
  type: "DoWhileStatement";
  body: Statement;
  test: Expression;
}
interface ForStatement extends BaseStatement {
  type: "ForStatement";
  init?: VariableDeclaration | Expression | null | undefined;
  test?: Expression | null | undefined;
  update?: Expression | null | undefined;
  body: Statement;
}
interface BaseForXStatement extends BaseStatement {
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
}
interface ForInStatement extends BaseForXStatement {
  type: "ForInStatement";
}
interface DebuggerStatement extends BaseStatement {
  type: "DebuggerStatement";
}
type Declaration = FunctionDeclaration | VariableDeclaration | ClassDeclaration;
interface BaseDeclaration extends BaseStatement {}
interface MaybeNamedFunctionDeclaration extends BaseFunction, BaseDeclaration {
  type: "FunctionDeclaration";
  /** It is null when a function declaration is a part of the `export default function` statement */
  id: Identifier | null;
  body: BlockStatement;
}
interface FunctionDeclaration extends MaybeNamedFunctionDeclaration {
  id: Identifier;
}
interface VariableDeclaration extends BaseDeclaration {
  type: "VariableDeclaration";
  declarations: VariableDeclarator[];
  kind: "var" | "let" | "const" | "using" | "await using";
}
interface VariableDeclarator extends BaseNode {
  type: "VariableDeclarator";
  id: Pattern;
  init?: Expression | null | undefined;
}
interface ExpressionMap {
  ArrayExpression: ArrayExpression;
  ArrowFunctionExpression: ArrowFunctionExpression;
  AssignmentExpression: AssignmentExpression;
  AwaitExpression: AwaitExpression;
  BinaryExpression: BinaryExpression;
  CallExpression: CallExpression;
  ChainExpression: ChainExpression;
  ClassExpression: ClassExpression;
  ConditionalExpression: ConditionalExpression;
  FunctionExpression: FunctionExpression;
  Identifier: Identifier;
  ImportExpression: ImportExpression;
  Literal: Literal;
  LogicalExpression: LogicalExpression;
  MemberExpression: MemberExpression;
  MetaProperty: MetaProperty;
  NewExpression: NewExpression;
  ObjectExpression: ObjectExpression;
  SequenceExpression: SequenceExpression;
  TaggedTemplateExpression: TaggedTemplateExpression;
  TemplateLiteral: TemplateLiteral;
  ThisExpression: ThisExpression;
  UnaryExpression: UnaryExpression;
  UpdateExpression: UpdateExpression;
  YieldExpression: YieldExpression;
}
type Expression = ExpressionMap[keyof ExpressionMap];
interface BaseExpression extends BaseNode {}
type ChainElement = SimpleCallExpression | MemberExpression;
interface ChainExpression extends BaseExpression {
  type: "ChainExpression";
  expression: ChainElement;
}
interface ThisExpression extends BaseExpression {
  type: "ThisExpression";
}
interface ArrayExpression extends BaseExpression {
  type: "ArrayExpression";
  elements: Array<Expression | SpreadElement | null>;
}
interface ObjectExpression extends BaseExpression {
  type: "ObjectExpression";
  properties: Array<Property | SpreadElement>;
}
interface PrivateIdentifier extends BaseNode {
  type: "PrivateIdentifier";
  name: string;
}
interface Property extends BaseNode {
  type: "Property";
  key: Expression;
  value: Expression | Pattern; // Could be an AssignmentProperty
  kind: "init" | "get" | "set";
  method: boolean;
  shorthand: boolean;
  computed: boolean;
}
interface PropertyDefinition extends BaseNode {
  type: "PropertyDefinition";
  key: Expression | PrivateIdentifier;
  value?: Expression | null | undefined;
  computed: boolean;
  static: boolean;
}
interface FunctionExpression extends BaseFunction, BaseExpression {
  id?: Identifier | null | undefined;
  type: "FunctionExpression";
  body: BlockStatement;
}
interface SequenceExpression extends BaseExpression {
  type: "SequenceExpression";
  expressions: Expression[];
}
interface UnaryExpression extends BaseExpression {
  type: "UnaryExpression";
  operator: UnaryOperator;
  prefix: true;
  argument: Expression;
}
interface BinaryExpression extends BaseExpression {
  type: "BinaryExpression";
  operator: BinaryOperator;
  left: Expression | PrivateIdentifier;
  right: Expression;
}
interface AssignmentExpression extends BaseExpression {
  type: "AssignmentExpression";
  operator: AssignmentOperator;
  left: Pattern | MemberExpression;
  right: Expression;
}
interface UpdateExpression extends BaseExpression {
  type: "UpdateExpression";
  operator: UpdateOperator;
  argument: Expression;
  prefix: boolean;
}
interface LogicalExpression extends BaseExpression {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}
interface ConditionalExpression extends BaseExpression {
  type: "ConditionalExpression";
  test: Expression;
  alternate: Expression;
  consequent: Expression;
}
interface BaseCallExpression extends BaseExpression {
  callee: Expression | Super;
  arguments: Array<Expression | SpreadElement>;
}
type CallExpression = SimpleCallExpression | NewExpression;
interface SimpleCallExpression extends BaseCallExpression {
  type: "CallExpression";
  optional: boolean;
}
interface NewExpression extends BaseCallExpression {
  type: "NewExpression";
}
interface MemberExpression extends BaseExpression, BasePattern {
  type: "MemberExpression";
  object: Expression | Super;
  property: Expression | PrivateIdentifier;
  computed: boolean;
  optional: boolean;
}
type Pattern = Identifier | ObjectPattern | ArrayPattern | RestElement | AssignmentPattern | MemberExpression;
interface BasePattern extends BaseNode {}
interface SwitchCase extends BaseNode {
  type: "SwitchCase";
  test?: Expression | null | undefined;
  consequent: Statement[];
}
interface CatchClause extends BaseNode {
  type: "CatchClause";
  param: Pattern | null;
  body: BlockStatement;
}
interface Identifier extends BaseNode, BaseExpression, BasePattern {
  type: "Identifier";
  name: string;
}
type Literal = SimpleLiteral | RegExpLiteral | BigIntLiteral;
interface SimpleLiteral extends BaseNode, BaseExpression {
  type: "Literal";
  value: string | boolean | number | null;
  raw?: string | undefined;
}
interface RegExpLiteral extends BaseNode, BaseExpression {
  type: "Literal";
  value?: RegExp | null | undefined;
  regex: {
    pattern: string;
    flags: string;
  };
  raw?: string | undefined;
}
interface BigIntLiteral extends BaseNode, BaseExpression {
  type: "Literal";
  value?: bigint | null | undefined;
  bigint: string;
  raw?: string | undefined;
}
type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";
type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "**" | "|" | "^" | "&" | "in" | "instanceof";
type LogicalOperator = "||" | "&&" | "??";
type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "**=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" | "||=" | "&&=" | "??=";
type UpdateOperator = "++" | "--";
interface ForOfStatement extends BaseForXStatement {
  type: "ForOfStatement";
  await: boolean;
}
interface Super extends BaseNode {
  type: "Super";
}
interface SpreadElement extends BaseNode {
  type: "SpreadElement";
  argument: Expression;
}
interface ArrowFunctionExpression extends BaseExpression, BaseFunction {
  type: "ArrowFunctionExpression";
  expression: boolean;
  body: BlockStatement | Expression;
}
interface YieldExpression extends BaseExpression {
  type: "YieldExpression";
  argument?: Expression | null | undefined;
  delegate: boolean;
}
interface TemplateLiteral extends BaseExpression {
  type: "TemplateLiteral";
  quasis: TemplateElement[];
  expressions: Expression[];
}
interface TaggedTemplateExpression extends BaseExpression {
  type: "TaggedTemplateExpression";
  tag: Expression;
  quasi: TemplateLiteral;
}
interface TemplateElement extends BaseNode {
  type: "TemplateElement";
  tail: boolean;
  value: {
    /** It is null when the template literal is tagged and the text has an invalid escape (e.g. - tag`\unicode and \u{55}`) */
    cooked?: string | null | undefined;
    raw: string;
  };
}
interface AssignmentProperty extends Property {
  value: Pattern;
  kind: "init";
  method: boolean; // false
}
interface ObjectPattern extends BasePattern {
  type: "ObjectPattern";
  properties: Array<AssignmentProperty | RestElement>;
}
interface ArrayPattern extends BasePattern {
  type: "ArrayPattern";
  elements: Array<Pattern | null>;
}
interface RestElement extends BasePattern {
  type: "RestElement";
  argument: Pattern;
}
interface AssignmentPattern extends BasePattern {
  type: "AssignmentPattern";
  left: Pattern;
  right: Expression;
}
type Class = ClassDeclaration | ClassExpression;
interface BaseClass extends BaseNode {
  superClass?: Expression | null | undefined;
  body: ClassBody;
}
interface ClassBody extends BaseNode {
  type: "ClassBody";
  body: Array<MethodDefinition | PropertyDefinition | StaticBlock>;
}
interface MethodDefinition extends BaseNode {
  type: "MethodDefinition";
  key: Expression | PrivateIdentifier;
  value: FunctionExpression;
  kind: "constructor" | "method" | "get" | "set";
  computed: boolean;
  static: boolean;
}
interface MaybeNamedClassDeclaration extends BaseClass, BaseDeclaration {
  type: "ClassDeclaration";
  /** It is null when a class declaration is a part of the `export default class` statement */
  id: Identifier | null;
}
interface ClassDeclaration extends MaybeNamedClassDeclaration {
  id: Identifier;
}
interface ClassExpression extends BaseClass, BaseExpression {
  type: "ClassExpression";
  id?: Identifier | null | undefined;
}
interface MetaProperty extends BaseExpression {
  type: "MetaProperty";
  meta: Identifier;
  property: Identifier;
}
type ModuleDeclaration = ImportDeclaration | ExportNamedDeclaration | ExportDefaultDeclaration | ExportAllDeclaration;
interface BaseModuleDeclaration extends BaseNode {}
type ModuleSpecifier = ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier | ExportSpecifier;
interface BaseModuleSpecifier extends BaseNode {
  local: Identifier;
}
interface ImportDeclaration extends BaseModuleDeclaration {
  type: "ImportDeclaration";
  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
  attributes: ImportAttribute[];
  source: Literal;
}
interface ImportSpecifier extends BaseModuleSpecifier {
  type: "ImportSpecifier";
  imported: Identifier | Literal;
}
interface ImportAttribute extends BaseNode {
  type: "ImportAttribute";
  key: Identifier | Literal;
  value: Literal;
}
interface ImportExpression extends BaseExpression {
  type: "ImportExpression";
  source: Expression;
  options?: Expression | null | undefined;
}
interface ImportDefaultSpecifier extends BaseModuleSpecifier {
  type: "ImportDefaultSpecifier";
}
interface ImportNamespaceSpecifier extends BaseModuleSpecifier {
  type: "ImportNamespaceSpecifier";
}
interface ExportNamedDeclaration extends BaseModuleDeclaration {
  type: "ExportNamedDeclaration";
  declaration?: Declaration | null | undefined;
  specifiers: ExportSpecifier[];
  attributes: ImportAttribute[];
  source?: Literal | null | undefined;
}
interface ExportSpecifier extends Omit<BaseModuleSpecifier, "local"> {
  type: "ExportSpecifier";
  local: Identifier | Literal;
  exported: Identifier | Literal;
}
interface ExportDefaultDeclaration extends BaseModuleDeclaration {
  type: "ExportDefaultDeclaration";
  declaration: MaybeNamedFunctionDeclaration | MaybeNamedClassDeclaration | Expression;
}
interface ExportAllDeclaration extends BaseModuleDeclaration {
  type: "ExportAllDeclaration";
  exported: Identifier | Literal | null;
  attributes: ImportAttribute[];
  source: Literal;
}
interface AwaitExpression extends BaseExpression {
  type: "AwaitExpression";
  argument: Expression;
}
//#endregion
//#region node_modules/.pnpm/@vitest+istanbul-lib-coverage@1.0.1/node_modules/@vitest/istanbul-lib-coverage/dist/index.d.mts
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
//#endregion
//#region src/types.d.ts
interface Options<T = Node, Program = T & {
  type: "Program";
}> {
  /** Code of the executed runtime file, not the original source file */
  code: string;
  /** Length of the execution wrapper, e.g. wrapper used in node:vm */
  wrapperLength?: number;
  /** Source map for the current file */
  sourceMap?: Omit<EncodedSourceMap, "version"> & {
    version: number;
  };
  /** ScriptCoverage for the current file */
  coverage: Pick<Profiler.ScriptCoverage, "functions" | "url">;
  /** AST for the transpiled file that matches the coverage results */
  ast: Program | Promise<Program>;
  /** Class method names to ignore for coverage, identical to https://github.com/istanbuljs/nyc?tab=readme-ov-file#ignoring-methods */
  ignoreClassMethods?: string[];
  /** Filter to ignore code based on AST nodes */
  ignoreNode?: (node: T, type: "function" | "statement" | "branch") => boolean | "ignore-this-and-nested-nodes" | void;
  /**
   * Filter to ignore code based on source code
   * - Note that this is slower than `ignoreNode` as exclusion happens after remapping
   */
  ignoreSourceCode?: (code: string, type: "function" | "statement" | "branch", location: Record<"start" | "end", {
    line: number;
    column: number;
  }>) => boolean | void;
}
//#endregion
//#region src/index.d.ts
/**
 * Maps V8 `ScriptCoverage` to Istanbul's `CoverageMap`.
 * Results are identical with `istanbul-lib-instrument`.
 */
export default function convert<T = Node, Program = T & {
  type: "Program";
}>(options: Options<T, Program>): Promise<CoverageMapData>;
//#endregion
export { type Options, convert };