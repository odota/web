//#region src/SourceMap.d.ts
interface SourceMapOptions {
  /**
   * Whether the mapping should be high-resolution:
   * - `false` (default) - lo-res mappings. Only one mapping per line, plus any locations added
   *   with `s.addSourcemapLocation()`. Quicker to generate and less bulky, but devtools may only
   *   be able to identify the correct line, not the exact column.
   * - `true` - hi-res mappings. Every single character gets a mapping, so devtools can always
   *   pinpoint the exact location of function calls and so on.
   * - `"boundary"` - semi-hi-res mappings, segmented per word boundary instead of per character.
   *   Suitable for string semantics that are separated by words.
   * - `"experimental-range"` - hi-res mappings that use range mappings
   *   (https://github.com/tc39/ecma426/blob/main/proposals/range-mappings.md), a source map
   *   extension that can map all positions in a range with fewer mappings than mapping every
   *   character individually. This requires support for range mappings in the source map
   *   consumer, and the feature is experimental.
   *
   * If sourcemap locations have been specified with s.addSourceMapLocation(), they will be used here.
   */
  hires?: boolean | "boundary" | "experimental-range";
  /**
   * The filename where you plan to write the sourcemap.
   */
  file?: string;
  /**
   * The filename of the file containing the original source.
   */
  source?: string;
  /**
   * Whether to include the original content in the map's sourcesContent array.
   */
  includeContent?: boolean;
}
type SourceMapSegment = [number] | [number, number, number, number] | [number, number, number, number, number];
type SourceMapRangeMappings = number[][];
interface DecodedSourceMap {
  file?: string;
  sources: string[];
  sourcesContent?: Array<string | null>;
  names: string[];
  mappings: SourceMapSegment[][];
  x_google_ignoreList?: number[];
  debugId?: string;
  rangeMappings?: SourceMapRangeMappings;
}
export declare class SourceMap {
  version: number;
  file: string | undefined;
  sources: string[];
  sourcesContent: Array<string | null> | undefined;
  names: string[];
  mappings: string;
  x_google_ignoreList: number[] | undefined;
  debugId: string | undefined;
  rangeMappings: string | undefined;
  constructor(properties: DecodedSourceMap | (Omit<DecodedSourceMap, "mappings"> & {
    mappings: string;
  }));
  /**
   * Returns the equivalent of `JSON.stringify(map)`
   */
  toString(): string;
  /**
   * Returns a DataURI containing the sourcemap. Useful for doing this sort of thing:
   * `generateMap(options?: SourceMapOptions): SourceMap;`
   */
  toUrl(): string;
}
//#endregion
//#region src/MagicString.d.ts
type ExclusionRange = [number, number];
interface MagicStringOptions {
  filename?: string;
  ignoreList?: boolean;
  indentExclusionRanges?: ExclusionRange | ExclusionRange[];
  offset?: number;
}
interface IndentOptions {
  exclude?: ExclusionRange | ExclusionRange[];
  indentStart?: boolean;
}
interface OverwriteOptions {
  storeName?: boolean;
  contentOnly?: boolean;
}
interface UpdateOptions {
  storeName?: boolean;
  overwrite?: boolean;
}
type ReplacementFunction = (substring: string, ...args: any[]) => string;
export declare class MagicString {
  readonly original: string;
  offset: number;
  /**
   * Wraps `string` for editing; every index passed to the editing methods refers to this original string.
   */
  constructor(string: string, options?: MagicStringOptions);
  /**
   * Adds the specified character index (with respect to the original string) to sourcemap mappings, if `hires` is false.
   */
  addSourcemapLocation(char: number): void;
  /**
   * Appends the specified content to the end of the string.
   */
  append(content: string): this;
  /**
   * Appends the specified content at the index in the original string.
   * If a range *ending* with index is subsequently moved, the insert will be moved with it.
   * See also `s.prependLeft(...)`.
   */
  appendLeft(index: number, content: string): this;
  /**
   * Appends the specified content at the index in the original string.
   * If a range *starting* with index is subsequently moved, the insert will be moved with it.
   * See also `s.prependRight(...)`.
   */
  appendRight(index: number, content: string): this;
  /**
   * Returns an independent copy: the chunk list, string-level intro/outro,
   * sourcemap locations, stored names, indent exclusion ranges, `offset`,
   * `filename` and `ignoreList` are all copied; later edits to either string
   * do not affect the other.
   */
  clone(): this;
  /**
   * Generates a sourcemap object with raw mappings in array form, rather than encoded as a string.
   * Useful if you need to manipulate the sourcemap further, but most of the time you will use `generateMap` instead.
   */
  generateDecodedMap(options?: SourceMapOptions): DecodedSourceMap;
  /**
   * Generates a version 3 sourcemap.
   */
  generateMap(options?: SourceMapOptions): SourceMap;
  /**
   * Returns the indentation string guessed from the original content, falling back to a single tab character.
   * This is the value `s.indent()` uses when no prefix is supplied.
   */
  getIndentString(): string;
  /**
   * Prefixes each line of the string with prefix.
   * If prefix is not supplied, the indentation will be guessed from the original content, falling back to a single tab character.
   */
  indent(options?: IndentOptions): this;
  /**
   * Prefixes each line of the string with prefix.
   * If prefix is not supplied, the indentation will be guessed from the original content, falling back to a single tab character.
   *
   * The options argument can have an exclude property, which is an array of [start, end] character ranges.
   * These ranges will be excluded from the indentation - useful for (e.g.) multiline strings.
   */
  indent(indentStr?: string, options?: IndentOptions): this;
  /**
   * Moves the characters from `start` and `end` to `index`.
   *
   * `affinity` controls where the range is anchored at `index`. With the
   * default `'right'`, it is inserted before the content that starts at `index`;
   * with `'left'`, it is inserted after the content that ends at `index`. The
   * two differ only when other content has already been moved to that boundary,
   * mirroring the `appendLeft`/`appendRight` distinction.
   */
  move(start: number, end: number, index: number, affinity?: "left" | "right"): this;
  /**
   * Replaces the characters from `start` to `end` with `content`, along with the appended/prepended content in
   * that range. The same restrictions as `s.remove()` apply.
   *
   * The fourth argument is optional. It can have a storeName property - if true, the original name will be stored
   * for later inclusion in a sourcemap's names array - and a contentOnly property which determines whether only
   * the content is overwritten, or anything that was appended/prepended to the range as well.
   *
   * It may be preferred to use `s.update(...)` instead if you wish to avoid overwriting the appended/prepended content.
   */
  overwrite(start: number, end: number, content: string, options?: boolean | OverwriteOptions): this;
  /**
   * Replaces the characters from `start` to `end` with `content`. The same restrictions as `s.remove()` apply.
   *
   * The fourth argument is optional. It can have a storeName property - if true, the original name will be stored
   * for later inclusion in a sourcemap's names array - and an overwrite property which determines whether only
   * the content is overwritten, or anything that was appended/prepended to the range as well.
   */
  update(start: number, end: number, content: string, options?: boolean | UpdateOptions): this;
  /**
   * Prepends the string with the specified content.
   */
  prepend(content: string): this;
  /**
   * Same as `s.appendLeft(...)`, except that the inserted content will go *before* any previous appends or prepends at index
   */
  prependLeft(index: number, content: string): this;
  /**
   * Same as `s.appendRight(...)`, except that the inserted content will go *before* any previous appends or prepends at `index`
   */
  prependRight(index: number, content: string): this;
  /**
   * Removes the characters from `start` to `end` (of the original string, **not** the generated string).
   * Content appended or prepended at positions strictly inside the range is removed with it, while
   * content attached at `start` or `end` is preserved — use `s.overwrite(start, end, '')` to remove
   * the range including its edge inserts.
   * Repeated removals and removals with partially overlapping ranges are allowed.
   */
  remove(start: number, end: number): this;
  /**
   * Reset the modified characters from `start` to `end` (of the original string, **not** the generated string).
   */
  reset(start: number, end: number): this;
  /**
   * Returns the last character of the generated string, or `''` if it is empty.
   */
  lastChar(): string;
  /**
   * Returns everything after the last newline in the generated string, or the whole string if there is no newline.
   */
  lastLine(): string;
  /**
   * Returns the content of the generated string that corresponds to the slice
   * between `start` and `end` of the original string, walking the generated
   * string from the chunk holding `start` to the chunk holding `end`. Throws
   * if either index falls inside replaced content. After `move()`, a range
   * whose end now comes before its start in the output yields `''`.
   */
  slice(start?: number, end?: number): string;
  /**
   * Returns a clone of `s`, with all content before the `start` and `end` characters of the original string removed.
   */
  snip(start: number, end: number): this;
  /**
   * Returns the generated string.
   */
  toString(): string;
  /**
   * Returns true if the resulting source is empty (disregarding white space).
   */
  isEmpty(): boolean;
  /**
   * Returns the length of the generated string, counting only content attached to the original characters.
   * Content outside the string body (`s.prepend()`/`s.append()`, and inserts before the first or after the last
   * character) is not counted, so this can differ from `s.toString().length`.
   */
  length(): number;
  /**
   * Removes empty lines from the start and end.
   */
  trimLines(): this;
  /**
   * Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start and end.
   */
  trim(charType?: string): this;
  /**
   * Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the end.
   */
  trimEnd(charType?: string): this;
  /**
   * Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start.
   */
  trimStart(charType?: string): this;
  /**
   * Indicates if the string has been changed.
   */
  hasChanged(): boolean;
  /**
   * String replacement with RegExp or string.
   */
  replace(searchValue: string | RegExp, replacement: string | ReplacementFunction): this;
  /**
   * Same as `s.replace`, but replace all matched strings instead of just one.
   */
  replaceAll(searchValue: string | RegExp, replacement: string | ReplacementFunction): this;
}
//#endregion
//#region src/Bundle.d.ts
interface BundleOptions {
  intro?: string;
  separator?: string;
}
interface BundleSourceDescription {
  filename?: string;
  content: MagicString;
  ignoreList?: boolean;
  indentExclusionRanges?: ExclusionRange | ExclusionRange[];
  separator?: string;
}
interface BundledSourceFileRecord {
  filename: string;
  content: string;
}
interface BundleSourceMapOptions extends Omit<SourceMapOptions, "includeContent"> {
  /**
   * Whether to include the original content of each source in the map's `sourcesContent` array.
   * Can also be a function that receives the source's `filename` and `content` and returns
   * whether to include it, allowing per-source control (for example, omitting content for
   * sources that are otherwise loadable at runtime, such as public http(s) urls).
   */
  includeContent?: boolean | ((source: BundledSourceFileRecord) => boolean);
}
interface DecodedSourceMapOrMissingContent extends Omit<DecodedSourceMap, "sourcesContent"> {
  sourcesContent: Array<string | null>;
}
export declare class Bundle {
  indentExclusionRanges: ExclusionRange | ExclusionRange[] | undefined;
  constructor(options?: BundleOptions);
  /**
   * Adds the specified source to the bundle, which can either be a `MagicString` object directly,
   * or an options object that holds a magic string `content` property and optionally provides
   * a `filename` for the source within the bundle, as well as an optional `ignoreList` hint
   * (which defaults to `false`). The `filename` is used when constructing the source map for the
   * bundle, to identify this `source` in the source map's `sources` field. The `ignoreList` hint
   * is used to populate the `x_google_ignoreList` extension field in the source map, which is a
   * mechanism for tools to signal to debuggers that certain sources should be ignored by default
   * (depending on user preferences).
   */
  addSource(source: MagicString | BundleSourceDescription): this;
  /**
   * Appends `str` as a new source without a filename. Only `options.separator` is read, and it defaults to `''`
   * rather than to the bundle separator.
   */
  append(str: string, options?: BundleOptions): this;
  /**
   * Returns an independent copy of the bundle: every source's `MagicString` is cloned, so later edits to either
   * bundle do not affect the other.
   */
  clone(): this;
  /**
   * Flattens the bundle into a single `MagicString`, so the concatenated result can be
   * processed further with the full `MagicString` API. The returned string's `original`
   * is the concatenation of every source's `original`, and all existing edits, inserts,
   * intros, outros and separators are preserved as inserted content, so its `toString()`
   * equals the bundle's `toString()` and its sourcemap maps back to that combined original.
   *
   * Because a `MagicString` maps to a single source, per-source `filename`s are not carried
   * over; generate the bundle's map before flattening if you need the multi-source mapping.
   */
  toMagicString(): MagicString;
  /**
   * Generates a sourcemap object with raw mappings in array form, rather than encoded as a string.
   * Takes the same options as `generateMap`.
   */
  generateDecodedMap(options?: BundleSourceMapOptions): DecodedSourceMapOrMissingContent;
  /**
   * Generates a version 3 sourcemap covering every source that has a `filename`.
   * Options are as per `MagicString#generateMap`, except that `includeContent` can also be a per-source function.
   */
  generateMap(options?: BundleSourceMapOptions): Omit<SourceMap, "sourcesContent"> & {
    sourcesContent: Array<string | null>;
  };
  /**
   * Returns the most common indent string among the sources, falling back to a tab.
   */
  getIndentString(): string;
  /**
   * Prefixes each line of every source and of the intro with `indentStr`, guessed with `getIndentString()`
   * when not supplied. Each source's `indentExclusionRanges` are left unindented.
   */
  indent(indentStr?: string): this;
  /**
   * Prepends `str` to the bundle's intro.
   */
  prepend(str: string): this;
  /**
   * Returns the intro followed by every source's generated string, joined by their separators.
   */
  toString(): string;
  /**
   * Returns true if the bundle's output is empty (disregarding white space).
   */
  isEmpty(): boolean;
  /**
   * Returns the length of the bundle's output; unlike `MagicString#length`, this equals `bundle.toString().length`.
   */
  length(): number;
  /**
   * Removes empty lines from the start and end.
   */
  trimLines(): this;
  /**
   * Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start and end.
   */
  trim(charType?: string): this;
  /**
   * Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the start.
   */
  trimStart(charType?: string): this;
  /**
   * Trims content matching `charType` (defaults to `\s`, i.e. whitespace) from the end.
   */
  trimEnd(charType?: string): this;
}
//#endregion
//#region src/MagicStringError.d.ts
/**
 * The single error type thrown by MagicString.
 *
 * Every message is prefixed with `[MagicString]` so its source is obvious at a
 * glance, and is kept short and consistent in tone.
 */
export declare class MagicStringError extends Error {
  override name: string;
  constructor(message: string, options?: ErrorOptions);
}
//#endregion
export { type BundleOptions, type BundleSourceDescription, type BundleSourceMapOptions, type BundledSourceFileRecord, type DecodedSourceMap, type DecodedSourceMapOrMissingContent, type ExclusionRange, type IndentOptions, MagicString as default, type MagicStringOptions, type OverwriteOptions, type ReplacementFunction, type SourceMapOptions, type SourceMapRangeMappings, type SourceMapSegment, type UpdateOptions };