export interface TablePaginationActionsClasses {
  /** Styles applied to the root element. */
  root: string;
}
export type TablePaginationActionsClassKey = keyof TablePaginationActionsClasses;
export declare function getTablePaginationActionsUtilityClass(slot: string): string;
declare const tablePaginationActionsClasses: TablePaginationActionsClasses;
export default tablePaginationActionsClasses;