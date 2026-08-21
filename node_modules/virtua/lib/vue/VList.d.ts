/** @jsxImportSource vue */
import { type VNode, type PublicProps } from "vue";
import { VirtualizerProps, type VirtualizerHandle } from "./Virtualizer.js";
/**
 * Methods of {@link VList}.
 */
export interface VListHandle extends VirtualizerHandle {
}
/**
 * Props of {@link VList}.
 */
export interface VListProps<T = unknown> extends PublicProps, Pick<VirtualizerProps<T>, "data" | "bufferSize" | "itemSize" | "shift" | "horizontal" | "cache" | "ssrCount" | "itemProps" | "onScroll" | "onScrollEnd" | "keepMounted"> {
}
interface VListInstance<T = unknown> extends VListHandle {
    $props: VListProps<T>;
    $slots: {
        default: (arg: {
            item: T;
            index: number;
        }) => VNode[];
    };
}
/**
 * Virtualized list component. See {@link VListProps} and {@link VListHandle}.
 */
export declare const VList: {
    new <T = unknown>(props: VListProps<T>): VListInstance<T>;
};
export {};
