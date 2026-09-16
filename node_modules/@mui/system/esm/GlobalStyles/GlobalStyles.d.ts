import { Interpolation } from '@mui/styled-engine';
import { Theme as SystemTheme } from "../createTheme/index.js";
export interface GlobalStylesProps<Theme = SystemTheme> {
  styles: Interpolation<Theme>;
  defaultTheme?: object;
  themeId?: string;
}
declare function GlobalStyles<Theme = SystemTheme>({
  styles,
  themeId,
  defaultTheme
}: GlobalStylesProps<Theme>): import("react/jsx-runtime").JSX.Element;
declare namespace GlobalStyles {
  var propTypes: any;
}
export default GlobalStyles;