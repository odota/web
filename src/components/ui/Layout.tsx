import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import { sxToStyle, type SxProps } from "./sx";

export const useMediaQuery = (query: string): boolean => {
  const cleanQuery = query.replace(/^@media\s*/, "");
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(cleanQuery).matches : false,
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mql = window.matchMedia(cleanQuery);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [cleanQuery]);

  return matches;
};

export type BoxProps = React.HTMLAttributes<HTMLElement> & {
  component?: React.ElementType;
  sx?: SxProps;
  ml?: string | number;
  mr?: string | number;
  mt?: string | number;
  mb?: string | number;
};

export const Box: React.FC<BoxProps> = ({
  component: Component = "div",
  sx,
  ml,
  mr,
  mt,
  mb,
  style,
  children,
  ...props
}) => (
  <Component
    style={{
      ...(ml !== undefined ? { marginLeft: ml } : {}),
      ...(mr !== undefined ? { marginRight: mr } : {}),
      ...(mt !== undefined ? { marginTop: mt } : {}),
      ...(mb !== undefined ? { marginBottom: mb } : {}),
      ...sxToStyle(sx),
      ...style,
    }}
    {...props}
  >
    {children}
  </Component>
);

export const Toolbar: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    sx?: SxProps;
    disableGutters?: boolean;
    variant?: string;
  }
> = ({ className, style, sx, disableGutters: _dg, variant: _v, children, ...props }) => (
  <div
    className={`${styles.toolbar}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {children}
  </div>
);

export type BreadcrumbsProps = React.HTMLAttributes<HTMLElement> & {
  separator?: React.ReactNode;
  sx?: SxProps;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  separator = "/",
  className,
  style,
  sx,
  children,
  ...props
}) => {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <nav
      className={className}
      style={{ ...sxToStyle(sx), ...style }}
      {...props}
    >
      <ol className={styles.breadcrumbsList}>
        {items.map((child, idx) => (
          <React.Fragment key={idx}>
            <li>{child}</li>
            {idx < items.length - 1 && (
              <li aria-hidden="true" className={styles.breadcrumbSep}>
                {separator}
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  sx?: SxProps;
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  className,
  style,
  sx,
  children,
  ...props
}) => (
  <div
    className={`${styles.avatar}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {src ? <img src={src} alt={alt || ""} className={styles.avatarImg} /> : children}
  </div>
);

export type CardHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  sx?: SxProps;
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  avatar,
  title,
  subheader,
  action,
  className,
  style,
  sx,
  ...props
}) => (
  <div
    className={`${styles.cardHeader}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {avatar && <div className={styles.cardHeaderAvatar}>{avatar}</div>}
    <div className={styles.cardHeaderContent}>
      {title && <span className={styles.cardHeaderTitle}>{title}</span>}
      {subheader && (
        <span className={styles.cardHeaderSubheader}>{subheader}</span>
      )}
    </div>
    {action && <div className={styles.cardHeaderAction}>{action}</div>}
  </div>
);

export const List: React.FC<
  React.HTMLAttributes<HTMLElement> & {
    dense?: boolean;
    disablePadding?: boolean;
    component?: React.ElementType;
    sx?: SxProps;
  }
> = ({
  className,
  style,
  sx,
  dense: _dense,
  disablePadding: _dp,
  component: Component = "ul",
  children,
  ...props
}) => (
  <Component
    className={`${styles.list}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {children}
  </Component>
);

export const ListItem: React.FC<
  React.LiHTMLAttributes<HTMLLIElement> & {
    disablePadding?: boolean;
    button?: boolean;
    component?: React.ElementType;
    href?: string;
    sx?: SxProps;
  }
> = ({
  disablePadding,
  button: _button,
  component,
  className,
  style,
  sx,
  children,
  ...props
}) => {
  const Component: React.ElementType = component || "li";
  return (
    <Component
      className={`${styles.listItem}${disablePadding ? ` ${styles.listItemNoPadding}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};

export const ListItemButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    component?: React.ElementType;
    href?: string;
    to?: string;
    selected?: boolean;
    sx?: SxProps;
  }
> = ({
  component,
  selected: _selected,
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
      className={`${styles.listItemButton}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
      {...extraProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export const ListItemIcon: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { sx?: SxProps }
> = ({ className, style, sx, children, ...props }) => (
  <div
    className={`${styles.listItemIcon}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {children}
  </div>
);

export const ListItemText: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
    sx?: SxProps;
  }
> = ({ primary, secondary, className, style, sx, children, ...props }) => (
  <div
    className={`${styles.listItemText}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {primary !== undefined && (
      <span className={styles.listItemTextPrimary}>{primary}</span>
    )}
    {secondary !== undefined && (
      <span className={styles.listItemTextSecondary}>{secondary}</span>
    )}
    {children}
  </div>
);

export const SvgIcon: React.FC<
  React.SVGProps<SVGSVGElement> & {
    fontSize?: string;
    titleAccess?: string;
    sx?: SxProps;
  }
> = ({ fontSize: _fs, titleAccess, sx, style, children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    style={{ ...sxToStyle(sx), ...style }}
    {...props}
  >
    {titleAccess && <title>{titleAccess}</title>}
    {children}
  </svg>
);
