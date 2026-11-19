import * as React from 'react';
import { DefaultTheme } from '@mui/system';
import { StorageManager } from '@mui/system/cssVars';
import { CssThemeVariables } from "./createThemeNoVars.js";
type ThemeProviderCssVariablesProps = CssThemeVariables extends {
  enabled: true;
} ? {
  /**
   * The node for attaching the `theme.colorSchemeSelector`.
   * @default document
   */
  colorSchemeNode?: Element | null;
  /**
   * If `true`, the provider creates its own context and generate stylesheet as if it is a root `ThemeProvider`.
   */
  disableNestedContext?: boolean;
  /**
   * If `true`, the style sheet for CSS theme variables won't be generated.
   *
   * This is useful for controlling nested ThemeProvider behavior.
   * @default false
   */
  disableStyleSheetGeneration?: boolean;
  /**
   * If `true`, theme values are recalculated when the mode changes.
   * The `theme.colorSchemes.{mode}.*` nodes will be shallow merged to the top-level of the theme.
   * @default false
   */
  forceThemeRerender?: boolean;
} : {};
export interface ThemeProviderProps<Theme = DefaultTheme> extends ThemeProviderCssVariablesProps {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  /**
   * The document used to perform `disableTransitionOnChange` feature
   * @default document
   */
  documentNode?: Document | null;
  /**
   * The default mode when the local storage has no mode yet,
   * requires the theme to have `colorSchemes` with light and dark.
   * @default 'system'
   */
  defaultMode?: 'light' | 'dark' | 'system';
  /**
   * The window that attaches the 'storage' event listener
   * @default window
   */
  storageWindow?: Window | null;
  /**
   * The storage manager to be used for storing the mode and color scheme
   * @default using `window.localStorage`
   */
  storageManager?: StorageManager | null;
  /**
   * localStorage key used to store application `mode`
   * @default 'mui-mode'
   */
  modeStorageKey?: string;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey?: string;
  noSsr?: boolean;
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean;
}
export default function ThemeProvider<Theme = DefaultTheme>({
  theme,
  ...props
}: ThemeProviderProps<Theme>): import("react/jsx-runtime").JSX.Element;
export {};