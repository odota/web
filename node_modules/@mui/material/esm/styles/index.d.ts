import { DistributiveOmit } from '@mui/types';
export { default as THEME_ID } from "./identifier.js";
export { default as createTheme, default as unstable_createMuiStrictModeTheme, ThemeOptions, Theme, CssThemeVariables } from "./createTheme.js";
export { default as adaptV4Theme, DeprecatedThemeOptions } from "./adaptV4Theme.js";
export { Shadows } from "./shadows.js";
export { ZIndex } from "./zIndex.js";
export { CommonColors, Palette, PaletteColor, PaletteColorOptions, PaletteOptions, SimplePaletteColorOptions, TypeText, TypeAction, TypeBackground, PaletteMode, Color } from "./createPalette.js";
export { default as createColorScheme } from "./createColorScheme.js";
export { default as createStyles } from "./createStyles.js";
export { TypographyVariants, TypographyVariantsOptions, TypographyStyle, TypographyVariant } from "./createTypography.js";
export { default as responsiveFontSizes } from "./responsiveFontSizes.js";
export { Duration, Easing, Transitions, TransitionsOptions, duration, easing } from "./createTransitions.js";
export { Mixins, CSSProperties, MixinsOptions } from "./createMixins.js";
export { Direction, Breakpoint, BreakpointOverrides, Breakpoints, BreakpointsOptions, CreateMUIStyled, Interpolation, CSSInterpolation, CSSObject, css, keyframes,
// color manipulators
hexToRgb, rgbToHex, hslToRgb, decomposeColor, recomposeColor, getContrastRatio, getLuminance, emphasize, alpha, darken, lighten, ColorFormat, ColorObject, StyledEngineProvider, SxProps } from '@mui/system';
export { unstable_createBreakpoints } from '@mui/system/createBreakpoints';
// TODO: Remove this function in v6.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function experimental_sx(): any;
export { default as useTheme } from "./useTheme.js";
export { default as useThemeProps } from "./useThemeProps.js";
export * from "./useThemeProps.js";
export { default as styled } from "./styled.js";
export { default as ThemeProvider, ThemeProviderProps } from "./ThemeProvider.js";
export { ComponentsProps, ComponentsPropsList } from "./props.js";
export { ComponentsVariants } from "./variants.js";
export { ComponentsOverrides, ComponentNameToClassKey } from "./overrides.js";
export { Components } from "./components.js";
export { getUnit as unstable_getUnit, toUnitless as unstable_toUnitless } from "./cssUtils.js";
export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;
export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 * @deprecated will be removed in v5 for internal usage only
 */
export type StandardProps<ComponentProps, ClassKey extends string, Removals extends keyof ComponentProps = never> = DistributiveOmit<ComponentProps, 'classes' | Removals> & StyledComponentProps<ClassKey> & {
  className?: string;
  ref?: ComponentProps extends {
    ref?: infer RefType;
  } ? RefType : React.Ref<unknown>;
  style?: React.CSSProperties;
};
export namespace PropTypes {
  // keeping the type structure for backwards compat
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
}
export { default as makeStyles } from "./makeStyles.js";
export { default as withStyles } from "./withStyles.js";
export { default as withTheme } from "./withTheme.js";
export * from "./ThemeProviderWithVars.js";
export type { StorageManager } from '@mui/system/cssVars';
export { default as extendTheme } from "./createThemeWithVars.js";
export type { ColorSchemeOverrides, SupportedColorScheme, ColorSystem, CssVarsPalette, Opacity, Overlays, PaletteAlert, PaletteActionChannel, PaletteAppBar, PaletteAvatar, PaletteChip, PaletteColorChannel, PaletteCommonChannel, PaletteFilledInput, PaletteLinearProgress, PaletteSkeleton, PaletteSlider, PaletteSnackbarContent, PaletteSpeedDialAction, PaletteStepConnector, PaletteStepContent, PaletteSwitch, PaletteTableCell, PaletteTextChannel, PaletteTooltip, CssVarsThemeOptions, CssVarsTheme, ThemeVars, ThemeCssVar, ThemeCssVarOverrides, ColorSystemOptions, Shape, ShapeOptions } from "./createThemeWithVars.js";
export { default as getOverlayAlpha } from "./getOverlayAlpha.js";
export { default as shouldSkipGeneratingVar } from "./shouldSkipGeneratingVar.js";

// Private methods for creating parts of the theme
export { default as private_createTypography } from "./createTypography.js";
export { default as private_excludeVariablesFromRoot } from "./excludeVariablesFromRoot.js";