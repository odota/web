import { type CSSProperties } from "vue";
export type ItemProps<T = unknown> = (payload: {
    item: T;
    index: number;
}) => {
    [key: string]: any;
    style?: CSSProperties;
    class?: string;
} | undefined;
