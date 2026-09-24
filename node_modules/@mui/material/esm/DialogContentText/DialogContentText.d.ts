import * as React from 'react';
import { SxProps } from '@mui/system';
import { TypographyTypeMap } from "../Typography/index.js";
import { OverrideProps, OverridableComponent } from "../OverridableComponent/index.js";
import { Theme } from "../styles/index.js";
import { DialogContentTextClasses } from "./dialogContentTextClasses.js";
export interface DialogContentTextOwnProps extends Omit<TypographyTypeMap['props'], 'classes'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentTextClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}
export interface DialogContentTextTypeMap<AdditionalProps = {}, RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent']> {
  props: AdditionalProps & DialogContentTextOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Dialog](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContentText API](https://mui.com/material-ui/api/dialog-content-text/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 */
declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap>;
export type DialogContentTextProps<RootComponent extends React.ElementType = DialogContentTextTypeMap['defaultComponent'], AdditionalProps = {}> = OverrideProps<DialogContentTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};
export default DialogContentText;