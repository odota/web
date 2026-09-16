// disable automatic export
export {};
export * from "./borders/index.js";
export { default as borders } from "./borders/index.js";
export { default as breakpoints, handleBreakpoints, mergeBreakpointsInOrder } from "./breakpoints/index.js";
export { default as cssContainerQueries, type CssContainerQueries } from "./cssContainerQueries/index.js";
export { default as compose } from "./compose/index.js";
export * from "./display/index.js";
export { default as display } from "./display/index.js";
export * from "./flexbox/index.js";
export { default as flexbox } from "./flexbox/index.js";
export * from "./cssGrid/index.js";
export { default as grid } from "./cssGrid/index.js";
export * from "./palette/index.js";
export { default as palette } from "./palette/index.js";
export * from "./positions/index.js";
export { default as positions } from "./positions/index.js";
export * from "./shadows/index.js";
export { default as shadows } from "./shadows/index.js";
export * from "./sizing/index.js";
export { default as sizing } from "./sizing/index.js";
export * from "./typography/index.js";
export { default as typography } from "./typography/index.js";
export { default as unstable_getThemeValue } from "./getThemeValue/index.js";

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 */
export type ResponsiveStyleValue<T> = T | Array<T | null> | {
  [key: string]: T | null;
};
export { DefaultTheme } from '@mui/private-theming';
export { css, keyframes, StyledEngineProvider, Interpolation, CSSInterpolation, CSSObject } from '@mui/styled-engine';
export { default as GlobalStyles } from "./GlobalStyles/index.js";
export type { GlobalStylesProps } from "./GlobalStyles/index.js";
export * from "./style/index.js";
export { default as style } from "./style/index.js";
export * from "./spacing/index.js";
export { default as spacing } from "./spacing/index.js";
export { default as unstable_styleFunctionSx, unstable_createStyleFunctionSx, extendSxProp as unstable_extendSxProp, unstable_defaultSxConfig } from "./styleFunctionSx/index.js";
export * from "./styleFunctionSx/index.js";

// TODO: Remove this function in v6.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function experimental_sx(): any;
export { default as Box } from "./Box/index.js";
export * from "./Box/index.js";
export { default as createBox } from "./createBox/index.js";
export * from "./createBox/index.js";
export { default as createStyled } from "./createStyled/index.js";
export * from "./createStyled/index.js";
export { default as styled } from "./styled/index.js";
export * from "./styled/index.js";
export { default as createTheme } from "./createTheme/index.js";
export * from "./createTheme/index.js";
export { default as createBreakpoints } from "./createBreakpoints/createBreakpoints.js";
export * from "./createBreakpoints/createBreakpoints.js";
export { default as createSpacing } from "./createTheme/createSpacing.js";
export { SpacingOptions, Spacing } from "./createTheme/createSpacing.js";
export { default as shape } from "./createTheme/shape.js";
export * from "./createTheme/shape.js";
export { default as useThemeProps, getThemeProps } from "./useThemeProps/index.js";
export { default as useTheme } from "./useTheme/index.js";
export * from "./useTheme/index.js";
export { default as useThemeWithoutDefault } from "./useThemeWithoutDefault/index.js";
export * from "./useThemeWithoutDefault/index.js";
export { default as useMediaQuery } from "./useMediaQuery/index.js";
export * from "./useMediaQuery/index.js";
export * from "./colorManipulator/index.js";
export { default as ThemeProvider } from "./ThemeProvider/index.js";
export * from "./ThemeProvider/index.js";
export { default as unstable_memoTheme } from "./memoTheme.js";
export { default as unstable_createCssVarsProvider, CreateCssVarsProviderResult } from "./cssVars/index.js";
export { default as unstable_createGetCssVar } from "./cssVars/createGetCssVar.js";
export { default as unstable_cssVarsParser } from "./cssVars/cssVarsParser.js";
export { default as unstable_prepareCssVars } from "./cssVars/prepareCssVars.js";
export { default as unstable_createCssVarsTheme } from "./cssVars/createCssVarsTheme.js";
export * from "./cssVars/index.js";
export { default as responsivePropType } from "./responsivePropType/index.js";
export { default as createContainer } from "./Container/createContainer.js";
export * from "./Container/createContainer.js";
export { default as Container } from "./Container/index.js";
export * from "./Container/index.js";
export { default as Grid } from "./Grid/index.js";
export * from "./Grid/index.js";
export { default as Stack } from "./Stack/index.js";
export * from "./Stack/index.js";
export * from "./version/index.js";