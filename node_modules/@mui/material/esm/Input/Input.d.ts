import { SxProps } from '@mui/system';
import { Theme } from "../styles/index.js";
import { InternalStandardProps as StandardProps } from "../internal/index.js";
import { InputBaseProps } from "../InputBase/index.js";
import { InputClasses } from "./inputClasses.js";
export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputClasses>;
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [Input API](https://mui.com/material-ui/api/input/)
 * - inherits [InputBase API](https://mui.com/material-ui/api/input-base/)
 */
declare const Input: ((props: InputProps) => React.JSX.Element) & {
  muiName: string;
};
export default Input;