/**
 * @mui/types v7.4.9
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// disable automatic export
export {};

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */

/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */

/**
 * Remove properties `K` from `T`.
 * Distributive for union types.
 *
 * @internal
 */

/**
 * Generate a set of string literal types with the given default record `T` and
 * override record `U`.
 *
 * If the property value was `true`, the property key will be added to the
 * string union.
 *
 * @internal
 */

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */

// https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same

/**
 * Issues a type error if `Expected` is not identical to `Actual`.
 *
 * `Expected` should be declared when invoking `expectType`.
 * `Actual` should almost always we be a `typeof value` statement.
 *
 * @example `expectType<number | string, typeof value>(value)`
 * TypeScript issues a type error since `value is not assignable to never`.
 * This means `typeof value` is not identical to `number | string`
 * @param actual
 */

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */

/**
 * Props of the component if `component={Component}` is used.
 */
// prettier-ignore

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore

/**
 * Props defined on the component.
 */
// prettier-ignore

/**
 * Simplifies the display of a type (without modifying it).
 * Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */

/**
 * Changes the properties K from T to required
 */