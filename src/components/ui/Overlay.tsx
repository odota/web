import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type PopoverProps = {
  open: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: (event?: any, reason?: string) => void;
  anchorOrigin?: { vertical: "top" | "bottom" | "center"; horizontal: "left" | "right" | "center" };
  transformOrigin?: { vertical: "top" | "bottom" | "center"; horizontal: "left" | "right" | "center" };
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  PaperProps?: { className?: string; style?: React.CSSProperties; sx?: SxProps };
  slotProps?: {
    paper?: { className?: string; style?: React.CSSProperties; sx?: SxProps };
    [key: string]: any;
  };
  sx?: SxProps;
};

export const Popover: React.FC<PopoverProps> = ({
  open,
  anchorEl,
  onClose,
  anchorOrigin,
  children,
  className,
  style,
  PaperProps,
  slotProps,
  sx,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.(e, "escapeKeyDown");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const rect = anchorEl?.getBoundingClientRect();
  const top = rect
    ? anchorOrigin?.vertical === "top"
      ? rect.top
      : rect.bottom + 4
    : 64;
  const left = rect ? rect.left : 16;

  return createPortal(
    <>
      <div
        className={styles.backdrop}
        onClick={(e) => onClose?.(e, "backdropClick")}
      />
      <div
        className={`${styles.popoverPaper}${PaperProps?.className ? ` ${PaperProps.className}` : ""}${slotProps?.paper?.className ? ` ${slotProps.paper.className}` : ""}${className ? ` ${className}` : ""}`}
        style={{
          top,
          left,
          ...sxToStyle(sx),
          ...sxToStyle(PaperProps?.sx),
          ...sxToStyle(slotProps?.paper?.sx),
          ...PaperProps?.style,
          ...slotProps?.paper?.style,
          ...style,
        }}
      >
        {children}
      </div>
    </>,
    document.body,
  );
};

export type MenuProps = PopoverProps & {
  id?: string;
  MenuListProps?: Record<string, any>;
};

export const Menu: React.FC<MenuProps> = ({
  children,
  MenuListProps: _mlp,
  ...props
}) => (
  <Popover {...props}>
    <ul role="menu" className={styles.menuList}>
      {children}
    </ul>
  </Popover>
);

export type MenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  component?: React.ElementType;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  selected?: boolean;
  sx?: SxProps;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  component,
  selected,
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
    <li role="none">
      <Component
        role="menuitem"
        className={`${styles.menuItem}${selected ? ` ${styles.menuItemSelected}` : ""}${className ? ` ${className}` : ""}`}
        style={{ ...sxToStyle(sx), ...style }}
        {...extraProps}
        {...props}
      >
        {children}
      </Component>
    </li>
  );
};

export type DrawerProps = {
  open: boolean;
  anchor?: "left" | "right" | "top" | "bottom";
  onClose?: (event?: any, reason?: string) => void;
  onOpen?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  PaperProps?: { className?: string; style?: React.CSSProperties; sx?: SxProps };
  sx?: SxProps;
  [key: string]: any;
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  anchor = "left",
  onClose,
  children,
  className,
  style,
  PaperProps,
  sx,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.(e, "escapeKeyDown");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const anchorClass =
    anchor === "right" ? styles.drawerRight : styles.drawerLeft;

  return createPortal(
    <>
      <div
        className={styles.drawerBackdrop}
        onClick={(e) => onClose?.(e, "backdropClick")}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`${styles.drawerPaper} ${anchorClass}${PaperProps?.className ? ` ${PaperProps.className}` : ""}${className ? ` ${className}` : ""}`}
        style={{
          ...sxToStyle(sx),
          ...sxToStyle(PaperProps?.sx),
          ...PaperProps?.style,
          ...style,
        }}
      >
        {children}
      </div>
    </>,
    document.body,
  );
};

export const SwipeableDrawer: React.FC<DrawerProps> = (props) => (
  <Drawer {...props} />
);
