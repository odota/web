/**
 * @jsxImportSource solid-js
 */
import { type JSX } from "solid-js";
import { type ViewportComponentAttributes } from "./types.js";
import { type VirtualizerHandle, type VirtualizerProps } from "./Virtualizer.js";
/**
 * Methods of {@link VList}.
 */
export interface VListHandle extends VirtualizerHandle {
}
/**
 * Props of {@link VList}.
 */
export interface VListProps<T> extends Pick<VirtualizerProps<T>, "ref" | "data" | "children" | "bufferSize" | "itemSize" | "shift" | "horizontal" | "cache" | "item" | "onScroll" | "onScrollEnd" | "keepMounted">, ViewportComponentAttributes {
}
/**
 * Virtualized list component. See {@link VListProps} and {@link VListHandle}.
 */
export declare const VList: <T>(props: VListProps<T>) => JSX.Element;
