import React from "react";
import styles from "./TextField.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: React.ReactNode;
  variant?: "standard" | "outlined" | "filled";
  size?: "small" | "medium";
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  helperText?: React.ReactNode;
  InputProps?: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    ref?: React.Ref<any>;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  };
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    [key: string]: any;
  };
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  InputLabelProps?: Record<string, any>;
  select?: boolean;
  SelectProps?: { native?: boolean; [key: string]: any };
  slotProps?: Record<string, any>;
  sx?: SxProps;
};

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      label,
      variant = "standard",
      size = "medium",
      fullWidth,
      multiline,
      rows,
      error,
      helperText,
      InputProps,
      inputProps,
      inputRef,
      InputLabelProps: _ilp,
      select,
      SelectProps: _sp,
      slotProps: _slp,
      sx,
      className,
      style,
      disabled,
      id,
      children,
      ...rest
    },
    ref,
  ) => {
    const {
      startAdornment,
      endAdornment,
      ref: _inputContainerRef,
      className: inputContainerClassName,
      style: inputContainerStyle,
      ...otherInputContainerProps
    } = InputProps || {};

    return (
      <div
        ref={ref}
        className={`${styles.wrapper}${fullWidth ? ` ${styles.fullWidth}` : ""}${size === "small" ? ` ${styles.sizeSmall}` : ""}${className ? ` ${className}` : ""}`}
        style={{ ...sxToStyle(sx), ...style }}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={`${styles.inputContainer}${variant === "outlined" ? ` ${styles.outlined}` : ""}${error ? ` ${styles.errorBorder}` : ""}${disabled ? ` ${styles.disabled}` : ""}${inputContainerClassName ? ` ${inputContainerClassName}` : ""}`}
          style={inputContainerStyle}
          {...otherInputContainerProps}
        >
          {startAdornment && (
            <span className={styles.adornment}>{startAdornment}</span>
          )}
          {select ? (
            <select
              id={id}
              disabled={disabled}
              className={styles.input}
              {...(rest as any)}
            >
              {children}
            </select>
          ) : multiline ? (
            <textarea
              ref={inputRef as React.Ref<HTMLTextAreaElement>}
              id={id}
              rows={rows}
              disabled={disabled}
              className={styles.input}
              {...(rest as any)}
              {...(inputProps as any)}
            />
          ) : (
            <input
              ref={inputRef as React.Ref<HTMLInputElement>}
              id={id}
              disabled={disabled}
              className={styles.input}
              {...rest}
              {...inputProps}
            />
          )}
          {endAdornment && (
            <span className={styles.adornment}>{endAdornment}</span>
          )}
        </div>
        {helperText && (
          <div
            className={`${styles.helperText}${error ? ` ${styles.errorText}` : ""}`}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";
