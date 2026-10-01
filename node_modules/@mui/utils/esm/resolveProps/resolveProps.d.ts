/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param defaultProps
 * @param props
 * @param mergeClassNameAndStyle If `true`, merges `className` and `style` props instead of overriding them.
 *   When `false` (default), props override defaultProps. When `true`, `className` values are concatenated
 *   and `style` objects are merged with props taking precedence.
 * @returns resolved props
 */
export default function resolveProps<T extends {
  components?: Record<string, unknown>;
  componentsProps?: Record<string, unknown>;
  slots?: Record<string, unknown>;
  slotProps?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
} & Record<string, unknown>>(defaultProps: T, props: T, mergeClassNameAndStyle?: boolean): T;