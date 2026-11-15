import React from "react";
import styles from "./Button.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  component?: React.ElementType;
  href?: string;
  to?: string | Record<string, any>;
  target?: string;
  rel?: string;
  download?: string;
  loading?: boolean;
  sx?: SxProps;
  disableElevation?: boolean;
  disableRipple?: boolean;
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      variant = "text",
      color = "primary",
      size = "medium",
      startIcon,
      endIcon,
      fullWidth,
      component,
      sx,
      className,
      style,
      children,
      loading,
      disabled,
      disableElevation: _de,
      disableRipple: _dr,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Component: React.ElementType =
      component || (props.href ? "a" : "button");

    const variantClass =
      variant === "contained"
        ? color === "secondary"
          ? `${styles.contained} ${styles.containedSecondary}`
          : color === "primary"
            ? `${styles.contained} ${styles.containedPrimary}`
            : styles.contained
        : variant === "outlined"
          ? styles.outlined
          : styles.text;

    const sizeClass =
      size === "small"
        ? styles.sizeSmall
        : size === "large"
          ? styles.sizeLarge
          : "";

    const extraProps =
      Component === "button" ? { type } : {};

    return (
      <Component
        ref={ref}
        disabled={disabled || loading}
        className={`${styles.button} ${variantClass}${sizeClass ? ` ${sizeClass}` : ""}${fullWidth ? ` ${styles.fullWidth}` : ""}${className ? ` ${className}` : ""}`}
        style={{ ...sxToStyle(sx), ...style }}
        {...extraProps}
        {...props}
      >
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </Component>
    );
  },
);
Button.displayName = "Button";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "medium" | "large";
  color?: string;
  edge?: "start" | "end" | false;
  component?: React.ElementType;
  href?: string;
  sx?: SxProps;
};

export const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(
  (
    {
      size = "medium",
      color,
      edge: _edge,
      component,
      sx,
      className,
      style,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Component: React.ElementType =
      component || (props.href ? "a" : "button");
    const sizeClass =
      size === "small"
        ? styles.iconButtonSmall
        : size === "large"
          ? styles.iconButtonLarge
          : "";
    const extraProps = Component === "button" ? { type } : {};
    return (
      <Component
        ref={ref}
        className={`${styles.iconButton}${sizeClass ? ` ${sizeClass}` : ""}${className ? ` ${className}` : ""}`}
        style={{
          color: color && color !== "inherit" ? color : undefined,
          ...sxToStyle(sx),
          ...style,
        }}
        {...extraProps}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
IconButton.displayName = "IconButton";
