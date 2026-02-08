import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from "../styles/index.js";
import { InternalStandardProps as StandardProps } from "../internal/index.js";
import { ListItemIconClasses } from "./listItemIconClasses.js";
export interface ListItemIconProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemIconClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 *
 * Demos:
 *
 * - [Lists](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemIcon API](https://mui.com/material-ui/api/list-item-icon/)
 */
export default function ListItemIcon(props: ListItemIconProps): React.JSX.Element;