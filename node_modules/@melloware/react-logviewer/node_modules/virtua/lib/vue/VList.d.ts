/** @jsxImportSource vue */
import { type ComponentOptionsMixin, type SlotsType, type VNode, type PropType } from "vue";
import { type VirtualizerHandle } from "./Virtualizer.js";
import { type ItemProps } from "./utils.js";
import { type CacheSnapshot } from "../core/index.js";
interface VListHandle extends VirtualizerHandle {
}
export declare const VList: import("vue").DefineComponent<{
    /**
     * The data items rendered by this component.
     */
    data: {
        type: ArrayConstructor;
        required: true;
    };
    /**
     * Extra item space in pixels to render before/after the viewport. The minimum value is 0. Lower value will give better performance but you can increase to avoid showing blank items in fast scrolling.
     * @defaultValue 200
     */
    bufferSize: NumberConstructor;
    /**
     * Item size hint for unmeasured items in pixels. It will help to reduce scroll jump when items are measured if used properly.
     *
     * - If not set, initial item sizes will be automatically estimated from measured sizes. This is recommended for most cases.
     * - If set, you can opt out estimation and use the value as initial item size.
     */
    itemSize: NumberConstructor;
    /**
     * While true is set, scroll position will be maintained from the end not usual start when items are added to/removed from start. It's recommended to set false if you add to/remove from mid/end of the list because it can cause unexpected behavior. This prop is useful for reverse infinite scrolling.
     */
    shift: BooleanConstructor;
    /**
     * If true, rendered as a horizontally scrollable list. Otherwise rendered as a vertically scrollable list.
     */
    horizontal: BooleanConstructor;
    /**
     * A prop for SSR. If set, the specified amount of items will be mounted in the initial rendering regardless of the container size until hydrated. The minimum value is 0.
     */
    ssrCount: NumberConstructor;
    /**
     * A function that provides properties/attributes for item element
     *
     * **This prop will be merged into `item` prop in the future**
     */
    itemProps: PropType<ItemProps>;
    /**
     * List of indexes that should be always mounted, even when off screen.
     */
    keepMounted: PropType<readonly number[]>;
    /**
     * You can restore cache by passing a {@link CacheSnapshot} on mount. This is useful when you want to restore scroll position after navigation. The snapshot can be obtained from {@link VirtualizerHandle.cache}.
     *
     * **The length of items should be the same as when you take the snapshot, otherwise restoration may not work as expected.**
     */
    cache: PropType<CacheSnapshot>;
}, VListHandle, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    /**
     * Callback invoked whenever scroll offset changes.
     * @param offset Current scrollTop, or scrollLeft if horizontal: true.
     */
    scroll: (offset: number) => void;
    /**
     * Callback invoked when scrolling stops.
     */
    scrollEnd: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * The data items rendered by this component.
     */
    data: {
        type: ArrayConstructor;
        required: true;
    };
    /**
     * Extra item space in pixels to render before/after the viewport. The minimum value is 0. Lower value will give better performance but you can increase to avoid showing blank items in fast scrolling.
     * @defaultValue 200
     */
    bufferSize: NumberConstructor;
    /**
     * Item size hint for unmeasured items in pixels. It will help to reduce scroll jump when items are measured if used properly.
     *
     * - If not set, initial item sizes will be automatically estimated from measured sizes. This is recommended for most cases.
     * - If set, you can opt out estimation and use the value as initial item size.
     */
    itemSize: NumberConstructor;
    /**
     * While true is set, scroll position will be maintained from the end not usual start when items are added to/removed from start. It's recommended to set false if you add to/remove from mid/end of the list because it can cause unexpected behavior. This prop is useful for reverse infinite scrolling.
     */
    shift: BooleanConstructor;
    /**
     * If true, rendered as a horizontally scrollable list. Otherwise rendered as a vertically scrollable list.
     */
    horizontal: BooleanConstructor;
    /**
     * A prop for SSR. If set, the specified amount of items will be mounted in the initial rendering regardless of the container size until hydrated. The minimum value is 0.
     */
    ssrCount: NumberConstructor;
    /**
     * A function that provides properties/attributes for item element
     *
     * **This prop will be merged into `item` prop in the future**
     */
    itemProps: PropType<ItemProps>;
    /**
     * List of indexes that should be always mounted, even when off screen.
     */
    keepMounted: PropType<readonly number[]>;
    /**
     * You can restore cache by passing a {@link CacheSnapshot} on mount. This is useful when you want to restore scroll position after navigation. The snapshot can be obtained from {@link VirtualizerHandle.cache}.
     *
     * **The length of items should be the same as when you take the snapshot, otherwise restoration may not work as expected.**
     */
    cache: PropType<CacheSnapshot>;
}>> & {
    onScroll?: ((offset: number) => any) | undefined;
    onScrollEnd?: (() => any) | undefined;
}, {
    shift: boolean;
    horizontal: boolean;
}, SlotsType<{
    default: (arg: {
        item: any;
        index: number;
    }) => VNode[];
}>>;
export {};
