/** @jsxImportSource vue */
import { type VNode, type ComponentOptionsMixin, type SlotsType, type PropType, type NativeElements } from "vue";
import { type ScrollToIndexOpts, type CacheSnapshot } from "../core/index.js";
export interface WindowVirtualizerHandle {
    /**
     * Get current {@link CacheSnapshot}.
     */
    readonly cache: CacheSnapshot;
    /**
     * Get current scrollTop, or scrollLeft if horizontal: true.
     */
    readonly scrollOffset: number;
    /**
     * Get current offsetHeight, or offsetWidth if horizontal: true.
     */
    readonly viewportSize: number;
    /**
     * Find nearest item index from offset.
     * @param offset offset in pixels from the start of the scroll container
     */
    findItemIndex(offset: number): number;
    /**
     * Get item offset from start.
     * @param index index of item
     */
    getItemOffset(index: number): number;
    /**
     * Get item size.
     * @param index index of item
     */
    getItemSize(index: number): number;
    /**
     * Scroll to the item specified by index.
     * @param index index of item
     * @param opts options
     */
    scrollToIndex(index: number, opts?: ScrollToIndexOpts): void;
}
export declare const WindowVirtualizer: import("vue").DefineComponent<{
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
     * Component or element type for container element.
     * @defaultValue "div"
     */
    as: {
        type: PropType<keyof NativeElements>;
        default: string;
    };
    /**
     * Component or element type for item element.
     * @defaultValue "div"
     */
    item: {
        type: PropType<keyof NativeElements>;
        default: string;
    };
    /**
     * You can restore cache by passing a {@link CacheSnapshot} on mount. This is useful when you want to restore scroll position after navigation. The snapshot can be obtained from {@link WindowVirtualizerHandle.cache}.
     *
     * **The length of items should be the same as when you take the snapshot, otherwise restoration may not work as expected.**
     */
    cache: PropType<CacheSnapshot>;
}, void, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    /**
     * Callback invoked whenever scroll offset changes.
     */
    scroll: () => void;
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
     * Component or element type for container element.
     * @defaultValue "div"
     */
    as: {
        type: PropType<keyof NativeElements>;
        default: string;
    };
    /**
     * Component or element type for item element.
     * @defaultValue "div"
     */
    item: {
        type: PropType<keyof NativeElements>;
        default: string;
    };
    /**
     * You can restore cache by passing a {@link CacheSnapshot} on mount. This is useful when you want to restore scroll position after navigation. The snapshot can be obtained from {@link WindowVirtualizerHandle.cache}.
     *
     * **The length of items should be the same as when you take the snapshot, otherwise restoration may not work as expected.**
     */
    cache: PropType<CacheSnapshot>;
}>> & {
    onScroll?: (() => any) | undefined;
    onScrollEnd?: (() => any) | undefined;
}, {
    shift: boolean;
    horizontal: boolean;
    as: keyof import("vue").IntrinsicElementAttributes;
    item: keyof import("vue").IntrinsicElementAttributes;
}, SlotsType<{
    default: (arg: {
        item: any;
        index: number;
    }) => VNode[];
}>>;
