import { CSSObject } from '@mui/styled-engine';
import { Breakpoints } from "../createBreakpoints/createBreakpoints.js";
import type { Breakpoint } from "../createTheme/index.js";
import { ResponsiveStyleValue } from "../styleFunctionSx/index.js";
import { StyleFunction } from "../style/index.js";
export interface ResolveBreakpointValuesOptions<T> {
  values: ResponsiveStyleValue<T>;
  breakpoints?: Breakpoints['values'];
  base?: Record<string, boolean>;
}
export function resolveBreakpointValues<T>(options: ResolveBreakpointValuesOptions<T>): Record<string, T>;
export function mergeBreakpointsInOrder(breakpoints: Breakpoints, styles: CSSObject[]): CSSObject;
export function handleBreakpoints<Props>(props: Props, propValue: any, styleFromPropValue: (value: any, breakpoint?: Breakpoint) => any): any;
type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * @returns An enhanced stylefunction that considers breakpoints
 */
export default function breakpoints<Props, Breakpoints extends string = DefaultBreakPoints>(styleFunction: StyleFunction<Props>): StyleFunction<Partial<Record<Breakpoints, Props>> & Props>;