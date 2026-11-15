import React from "react";
import styles from "./ToggleButton.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type ToggleButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> & {
  value: any;
  selected?: boolean;
  size?: "small" | "medium" | "large";
  sx?: SxProps;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  value: _value,
  selected,
  size,
  className,
  style,
  sx,
  children,
  ...props
}) => (
  <button
    type="button"
    aria-pressed={Boolean(selected)}
    className={`${styles.button}${selected ? ` ${styles.selected}` : ""}${size === "small" ? ` ${styles.sizeSmall}` : ""}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {children}
  </button>
);

export type ToggleButtonGroupProps = {
  value?: any;
  exclusive?: boolean;
  size?: "small" | "medium" | "large";
  onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  "aria-label"?: string;
};

export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  value,
  exclusive = false,
  size,
  onChange,
  children,
  className,
  style,
  sx,
  ...rest
}) => (
  <div
    role="group"
    className={`${styles.group}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...rest}
  >
    {React.Children.map(children, (child) => {
      if (!React.isValidElement<ToggleButtonProps>(child)) return child;
      const btnVal = child.props.value;
      const isSelected = exclusive
        ? value === btnVal
        : Array.isArray(value) && value.includes(btnVal);
      return React.cloneElement(child, {
        selected: child.props.selected ?? isSelected,
        size: child.props.size ?? size,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(e);
          if (e.defaultPrevented || !onChange) return;
          if (exclusive) {
            onChange(e, value === btnVal ? null : btnVal);
          } else {
            const arr = Array.isArray(value) ? [...value] : [];
            const idx = arr.indexOf(btnVal);
            if (idx >= 0) arr.splice(idx, 1);
            else arr.push(btnVal);
            onChange(e, arr);
          }
        },
      });
    })}
  </div>
);
