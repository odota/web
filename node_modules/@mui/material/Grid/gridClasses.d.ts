export interface GridClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `container={true}`. */
  container: string;
}
export type GridClassKey = keyof GridClasses;
export declare function getGridUtilityClass(slot: string): string;
declare const gridClasses: GridClasses;
export default gridClasses;