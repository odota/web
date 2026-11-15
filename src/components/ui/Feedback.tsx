import React from "react";
import styles from "./Feedback.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type CircularProgressProps = {
  size?: number | string;
  thickness?: number;
  value?: number;
  variant?: "determinate" | "indeterminate";
  color?: string;
  enableTrackSlot?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 40,
  thickness = 3.6,
  value = 0,
  variant = "indeterminate",
  color,
  enableTrackSlot: _ets,
  className,
  style,
  sx,
}) => {
  const radius = (44 - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const isDeterminate = variant === "determinate";
  const dashOffset = isDeterminate
    ? ((100 - value) / 100) * circumference
    : circumference * 0.65;

  return (
    <span
      role="progressbar"
      aria-valuenow={isDeterminate ? value : undefined}
      className={`${styles.circular}${!isDeterminate ? ` ${styles.circularIndeterminate}` : ""}${className ? ` ${className}` : ""}`}
      style={{
        width: size,
        height: size,
        color: color && color !== "inherit" ? color : undefined,
        ...sxToStyle(sx),
        ...style,
      }}
    >
      <svg className={styles.circularSvg} viewBox="22 22 44 44">
        <circle
          className={styles.circularCircle}
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </span>
  );
};

export type LinearProgressProps = {
  variant?: "determinate" | "indeterminate";
  value?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export const LinearProgress: React.FC<LinearProgressProps> = ({
  variant = "indeterminate",
  value = 0,
  color,
  className,
  style,
  sx,
}) => (
  <span
    role="progressbar"
    aria-valuenow={variant === "determinate" ? value : undefined}
    className={`${styles.linearRoot}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
  >
    <span
      className={`${styles.linearBar}${variant === "indeterminate" ? ` ${styles.linearIndeterminate}` : ""}`}
      style={{
        width: variant === "determinate" ? `${Math.min(100, Math.max(0, value))}%` : undefined,
        backgroundColor: color && color !== "primary" && color !== "inherit" ? color : undefined,
      }}
    />
  </span>
);

export type SkeletonProps = {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: number | string;
  height?: number | string;
  animation?: "pulse" | "wave" | false;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  className,
  style,
  sx,
}) => (
  <span
    className={`${styles.skeleton}${variant === "circular" ? ` ${styles.skeletonCircular}` : ""}${className ? ` ${className}` : ""}`}
    style={{
      width: width ?? "100%",
      height: height ?? (variant === "text" ? "1em" : 40),
      ...sxToStyle(sx),
      ...style,
    }}
  />
);

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  severity?: "info" | "warning" | "error" | "success";
  variant?: string;
  sx?: SxProps;
};

export const Alert: React.FC<AlertProps> = ({
  severity = "info",
  className,
  style,
  sx,
  children,
  ...props
}) => {
  const sevClass =
    severity === "error"
      ? styles.alertError
      : severity === "warning"
        ? styles.alertWarning
        : severity === "success"
          ? styles.alertSuccess
          : "";
  return (
    <div
      role="alert"
      className={`${styles.alert}${sevClass ? ` ${sevClass}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export type CollapseProps = {
  in: boolean;
  timeout?: number | "auto" | { enter?: number; exit?: number };
  unmountOnExit?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const Collapse: React.FC<CollapseProps> = ({
  in: isOpen,
  unmountOnExit = false,
  children,
  className,
  style,
}) => {
  if (!isOpen && unmountOnExit) return null;
  return (
    <div
      className={className}
      style={{ display: isOpen ? "block" : "none", ...style }}
    >
      {children}
    </div>
  );
};
