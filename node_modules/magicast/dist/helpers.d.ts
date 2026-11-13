import { C as ProxifiedObject, c as Proxified, m as ProxifiedFunctionCall, x as ProxifiedModule } from "./types-DI0qfFWu.js";
import { VariableDeclarator } from "@babel/types";
//#region src/helpers/config.d.ts
export declare function getDefaultExportOptions(magicast: ProxifiedModule<any>): ProxifiedObject<any>;
/**
 * Returns the vite config object from a variable declaration thats
 * exported as the default export.
 *
 * Example:
 *
 * ```js
 * const config = {};
 * export default config;
 * ```
 *
 * @param magicast the module
 *
 * @returns an object containing the proxified config object and the
 *          declaration "parent" to attach the modified config to later.
 *          If no config declaration is found, undefined is returned.
 */
export declare function getConfigFromVariableDeclaration(magicast: ProxifiedModule<any>): {
  declaration: VariableDeclarator;
  config: ProxifiedObject<any> | undefined;
};
//#endregion
//#region src/helpers/deep-merge.d.ts
export declare function deepMergeObject(magicast: Proxified<any>, object: any): void;
//#endregion
//#region src/helpers/nuxt.d.ts
export declare function addNuxtModule(magicast: ProxifiedModule<any>, name: string, optionsKey?: string, options?: any): void;
//#endregion
//#region src/helpers/vite.d.ts
export interface AddVitePluginOptions {
  /**
   * The import path of the plugin
   */
  from: string;
  /**
   * The import name of the plugin
   * @default "default"
   */
  imported?: string;
  /**
   * The name of local variable
   */
  constructor: string;
  /**
   * The options of the plugin
   */
  options?: Record<string, any>;
  /**
   * The index in the plugins array where the plugin should be inserted at.
   * By default, the plugin is appended to the array.
   */
  index?: number;
}
export interface UpdateVitePluginConfigOptions {
  /**
   * The import path of the plugin
   */
  from: string;
  /**
   * The import name of the plugin
   * @default "default"
   */
  imported?: string;
}
export declare function addVitePlugin(magicast: ProxifiedModule<any>, plugin: AddVitePluginOptions): boolean;
export declare function findVitePluginCall(magicast: ProxifiedModule<any>, plugin: UpdateVitePluginConfigOptions | string): ProxifiedFunctionCall | undefined;
export declare function updateVitePluginConfig(magicast: ProxifiedModule<any>, plugin: UpdateVitePluginConfigOptions | string, handler: Record<string, any> | ((args: any[]) => any[])): boolean;
//#endregion