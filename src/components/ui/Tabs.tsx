import React from "react";
import styles from "./Tabs.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type TabProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onClick"> & {
  label?: React.ReactNode;
  value?: any;
  icon?: React.ReactNode;
  component?: React.ElementType;
  href?: string;
  to?: string;
  selected?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<any>) => void;
  sx?: SxProps;
};

export const Tab: React.FC<TabProps> = ({
  label,
  value: _value,
  icon,
  component,
  selected,
  fullWidth,
  disabled,
  className,
  style,
  sx,
  children,
  ...props
}) => {
  const Component: React.ElementType =
    component || (props.href ? "a" : "button");
  const extraProps = Component === "button" ? { type: "button" } : {};
  return (
    <Component
      role="tab"
      aria-selected={Boolean(selected)}
      disabled={disabled}
      className={`${styles.tab}${selected ? ` ${styles.tabSelected}` : ""}${fullWidth ? ` ${styles.tabFullWidth}` : ""}${disabled ? ` ${styles.tabDisabled}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
      {...extraProps}
      {...props}
    >
      {icon}
      {label ?? children}
    </Component>
  );
};

export type TabsProps = {
  value?: any;
  onChange?: (event: React.SyntheticEvent, newValue: any) => void;
  variant?: "standard" | "scrollable" | "fullWidth";
  scrollButtons?: boolean | "auto";
  allowScrollButtonsMobile?: boolean;
  indicatorColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  [key: string]: any;
};

export const Tabs: React.FC<TabsProps> = ({
  value,
  onChange,
  variant = "standard",
  children,
  className,
  style,
  sx,
  scrollButtons: _sb,
  allowScrollButtonsMobile: _asbm,
  indicatorColor: _ic,
  textColor: _tc,
  ...rest
}) => {
  const fullWidth = variant === "fullWidth";
  return (
    <div
      className={`${styles.tabsRoot}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
      {...rest}
    >
      <div
        role="tablist"
        className={`${styles.tabList}${fullWidth ? ` ${styles.tabListFullWidth}` : ""}`}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement<TabProps>(child)) return child;
          const tabValue =
            child.props.value !== undefined ? child.props.value : index;
          const selected = value === tabValue;
          return React.cloneElement(child, {
            selected,
            fullWidth,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              child.props.onClick?.(e);
              if (!e.defaultPrevented) {
                onChange?.(e, tabValue);
              }
            },
          });
        })}
      </div>
    </div>
  );
};
