import { a as Debugger, i as DebugOptions, n as enabled, o as Formatters, r as namespaces, s as InspectOptions, t as disable } from "./core.js";
import { enable } from "./plain.js";
//#region src/browser.d.ts
export declare function createDebug(namespace: string, options?: DebugOptions): Debugger;
//#endregion
export { type DebugOptions, type Debugger, type Formatters, type InspectOptions, disable, enable, enabled, namespaces };