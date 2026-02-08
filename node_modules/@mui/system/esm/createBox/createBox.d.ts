import { OverridableComponent } from '@mui/types';
import { BoxTypeMap } from "../Box/index.js";
import { Theme as SystemTheme } from "../createTheme/index.js";
export default function createBox<T extends object = SystemTheme, AdditionalProps extends Record<string, unknown> = {}>(options?: {
  themeId?: string;
  defaultTheme: T;
  defaultClassName?: string;
  generateClassName?: (componentName: string) => string;
}): OverridableComponent<BoxTypeMap<AdditionalProps, 'div', T>>;