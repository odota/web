import { C as ProxifiedObject, D as CodeFormatOptions, E as ProxyType, O as detectCodeFormat, S as ProxifiedNewExpression, T as ProxyBase, _ as ProxifiedImportItem, a as Token, b as ProxifiedMemberExpression, c as Proxified, d as ProxifiedAwaitExpression, f as ProxifiedBinaryExpression, g as ProxifiedIdentifier, h as ProxifiedFunctionExpression, i as ParsedFileNode, k as Options, l as ProxifiedArray, m as ProxifiedFunctionCall, n as GenerateOptions, o as BinaryOperator, p as ProxifiedBlockStatement, r as Loc, s as ImportItemInput, t as ASTNode, u as ProxifiedArrowFunctionExpression, v as ProxifiedImportsMap, w as ProxifiedValue, x as ProxifiedModule, y as ProxifiedLogicalExpression } from "./types-DI0qfFWu.js";
//#region src/builders.d.ts
export declare const builders: {
  /**
   * Create a function call node.
   */
  functionCall(callee: string, ...args: any[]): Proxified;
  /**
   * Create a new expression node.
   */
  newExpression(callee: string, ...args: any[]): Proxified;
  /**
   * Create a binary expression node.
   */
  binaryExpression(left: any, operator: "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "&" | "|" | "^" | "in" | "instanceof" | "**", right: any): Proxified;
  /**
   * Create an await expression node.
   */
  awaitExpression(argument: any): Proxified;
  /**
   * Create a proxified version of a literal value.
   */
  literal(value: any): Proxified;
  /**
   * Parse a raw expression and return a proxified version of it.
   *
   * ```ts
   * const obj = builders.raw("{ foo: 1 }");
   * console.log(obj.foo); // 1
   * ```
   */
  raw(code: string): Proxified;
};
//#endregion
//#region src/code.d.ts
export declare function parseModule<Exports extends object = any>(code: string, options?: Options): ProxifiedModule<Exports>;
export declare function parseExpression<T>(code: string, options?: Options): Proxified<T>;
export declare function generateCode(node: {
  $ast: ASTNode;
} | ASTNode | ProxifiedModule<any>, options?: GenerateOptions): {
  code: string;
  map?: any;
};
//#endregion
//#region src/error.d.ts
export interface MagicastErrorOptions {
  ast?: ASTNode;
  code?: string;
}
export declare class MagicastError extends Error {
  rawMessage: string;
  options?: MagicastErrorOptions;
  constructor(message: string, options?: MagicastErrorOptions);
}
//#endregion
export { type ASTNode, BinaryOperator, CodeFormatOptions, GenerateOptions, ImportItemInput, Loc, ParsedFileNode, Proxified, ProxifiedArray, ProxifiedArrowFunctionExpression, ProxifiedAwaitExpression, ProxifiedBinaryExpression, ProxifiedBlockStatement, ProxifiedFunctionCall, ProxifiedFunctionExpression, ProxifiedIdentifier, ProxifiedImportItem, ProxifiedImportsMap, ProxifiedLogicalExpression, ProxifiedMemberExpression, ProxifiedModule, ProxifiedNewExpression, ProxifiedObject, ProxifiedValue, ProxyBase, ProxyType, Token, detectCodeFormat };