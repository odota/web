import { BreakpointsOptions, ShapeOptions, SpacingOptions } from '@mui/system';
import { MixinsOptions } from "./createMixins.js";
import { Palette, PaletteOptions } from "./createPalette.js";
import { TypographyVariantsOptions } from "./createTypography.js";
import { Shadows } from "./shadows.js";
import { TransitionsOptions } from "./createTransitions.js";
import { ZIndexOptions } from "./zIndex.js";
import { ComponentsOverrides } from "./overrides.js";
import { ComponentsVariants } from "./variants.js";
import { ComponentsProps } from "./props.js";
import { Theme } from "./createTheme.js";
export type Direction = 'ltr' | 'rtl';
export interface DeprecatedThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  overrides?: ComponentsOverrides;
  palette?: PaletteOptions;
  props?: ComponentsProps;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions);
  variants?: ComponentsVariants;
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

/**
 * Generate a theme base on the V4 theme options received.
 * @deprecated Follow the upgrade guide on https://mui.com/r/migration-v4#theme
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready-to-use theme object.
 */
export default function adaptV4Theme(options?: DeprecatedThemeOptions): Theme;