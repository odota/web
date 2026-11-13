import { ContentWriter } from "./file-writer.mjs";
//#region src/xml-writer.d.ts
/** attributes for an XML tag, keyed by attribute name */
export type XmlAttributes = Record<string, string | number>;
/**
 * a utility class to produce well-formed, indented XML
 * @param {ContentWriter} contentWriter the content writer that this utility wraps
 * @constructor
 */
declare class XMLWriter {
  cw: ContentWriter;
  stack: string[];
  constructor(contentWriter: ContentWriter);
  indent(str: string): string;
  /**
   * writes the opening XML tag with the supplied attributes
   * @param {String} name tag name
   * @param {Object} [attrs=null] attrs attributes for the tag
   */
  openTag(name: string, attrs?: XmlAttributes): void;
  /**
   * closes an open XML tag.
   * @param {String} name - tag name to close. This must match the writer's
   *  notion of the tag that is currently open.
   */
  closeTag(name: string): void;
  /**
   * writes a tag and its value opening and closing it at the same time
   * @param {String} name tag name
   * @param {Object} [attrs=null] attrs tag attributes
   * @param {String} [content=null] content optional tag content
   */
  inlineTag(name: string, attrs?: XmlAttributes, content?: string): void;
  /**
   * closes all open tags and ends the document
   */
  closeAll(): void;
}
//#endregion
export { XMLWriter as default };