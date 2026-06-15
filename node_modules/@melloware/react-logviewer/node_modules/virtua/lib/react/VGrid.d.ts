import React, { type JSX, type CSSProperties, type ReactNode, type Ref } from "react";
import { type ViewportComponentAttributes } from "./types.js";
/**
 * Props of customized cell component for {@link VGrid}.
 */
export interface CustomCellComponentProps {
    style: CSSProperties;
    children: ReactNode;
}
export type CustomCellComponent = React.ForwardRefExoticComponent<React.PropsWithoutRef<CustomCellComponentProps> & React.RefAttributes<any>>;
export type VGridItemResize = readonly [index: number, size: number];
/**
 * Methods of {@link VGrid}.
 */
export interface VGridHandle {
    /**
     * Get current scrollTop.
     */
    readonly scrollTop: number;
    /**
     * Get current scrollLeft.
     */
    readonly scrollLeft: number;
    /**
     * Get current scrollHeight.
     */
    readonly scrollHeight: number;
    /**
     * Get current scrollWidth.
     */
    readonly scrollWidth: number;
    /**
     * Get current offsetHeight.
     */
    readonly viewportHeight: number;
    /**
     * Get current offsetWidth.
     */
    readonly viewportWidth: number;
    /**
     * Find nearest row index from offset.
     * @param offset offset in pixels from the start of the scroll container
     */
    findRowIndex: (offset: number) => number;
    /**
     * Find nearest col index from offset.
     * @param offset offset in pixels from the start of the scroll container
     */
    findColIndex: (offset: number) => number;
    /**
     * Get row offset from start.
     * @param index index of row
     */
    getRowOffset(index: number): number;
    /**
     * Get col offset from start.
     * @param index index of col
     */
    getColOffset(index: number): number;
    /**
     * Get row size.
     * @param index index of row
     */
    getRowSize(index: number): number;
    /**
     * Get col size.
     * @param index index of col
     */
    getColSize(index: number): number;
    /**
     * Resize individual columns.
     * @param cols array of `[index, size]` to update column sizes
     */
    resizeCols(cols: VGridItemResize[]): void;
    /**
     * Resize individual rows.
     * @param rows array of `[index, size]` to update row sizes
     */
    resizeRows(rows: VGridItemResize[]): void;
    /**
     * Scroll to the item specified by index.
     * @param indexX horizontal index of item
     * @param indexY vertical index of item
     */
    scrollToIndex(indexX?: number, indexY?: number): void;
    /**
     * Scroll to the given offset.
     * @param offsetX offset from left
     * @param offsetY offset from top
     */
    scrollTo(offsetX?: number, offsetY?: number): void;
    /**
     * Scroll by the given offset.
     * @param offsetX horizontal offset from current position
     * @param offsetY vertical offset from current position
     */
    scrollBy(offsetX?: number, offsetY?: number): void;
}
/**
 * Props of {@link VGrid}.
 */
export interface VGridProps extends ViewportComponentAttributes {
    /**
     * A function to create elements rendered by this component.
     */
    children: (arg: {
        /**
         * row index of cell
         */
        rowIndex: number;
        /**
         * column index of cell
         */
        colIndex: number;
    }) => ReactNode;
    /**
     * Total row length of grid.
     */
    row: number;
    /**
     * Total column length of grid.
     */
    col: number;
    /**
     * Cell height hint for unmeasured items. It's recommended to specify this prop if item sizes are fixed and known, or much larger than the defaultValue. It will help to reduce scroll jump when items are measured.
     * @defaultValue 40
     */
    cellHeight?: number;
    /**
     * Cell width hint for unmeasured items. It's recommended to specify this prop if item sizes are fixed and known, or much larger than the defaultValue. It will help to reduce scroll jump when items are measured.
     * @defaultValue 100
     */
    cellWidth?: number;
    /**
     * Extra item space in pixels to render before/after the viewport. The minimum value is 0. Lower value will give better performance but you can increase to avoid showing blank items in fast scrolling.
     * @defaultValue 200
     */
    bufferSize?: number;
    /**
     * A prop for SSR. If set, the specified amount of rows will be mounted in the initial rendering regardless of the container size until hydrated.
     */
    ssrRowCount?: number;
    /**
     * A prop for SSR. If set, the specified amount of cols will be mounted in the initial rendering regardless of the container size until hydrated.
     */
    ssrColCount?: number;
    /**
     * Component or element type for cell element. This component will get {@link CustomCellComponentProps} as props.
     * @defaultValue "div"
     */
    item?: keyof JSX.IntrinsicElements | CustomCellComponent;
    /** Reference to the rendered DOM element (the one that scrolls). */
    domRef?: Ref<HTMLDivElement>;
    /** Reference to the inner rendered DOM element (the one that contains all the cells). */
    innerDomRef?: Ref<HTMLDivElement>;
    /**
     * Callback invoked whenever scroll offset changes.
     */
    onScroll?: (offset: number) => void;
    /**
     * Callback invoked when scrolling stops.
     */
    onScrollEnd?: () => void;
}
/**
 * Virtualized grid component. See {@link VGridProps} and {@link VGridHandle}.
 */
export declare const VGrid: React.ForwardRefExoticComponent<VGridProps & React.RefAttributes<VGridHandle>>;
