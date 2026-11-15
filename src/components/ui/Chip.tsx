import React from "react";
import styles from "./Chip.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type ChipProps = {
  label?: React.ReactNode;
  onDelete?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  size?: "small" | "medium";
  variant?: "filled" | "outlined";
  color?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export const Chip: React.FC<ChipProps> = ({
  label,
  onDelete,
  onClick,
  size = "medium",
  variant = "filled",
  icon,
  className,
  style,
  sx,
  ...rest
}) => (
  <div
    onClick={onClick}
    className={`${styles.chip}${size === "small" ? ` ${styles.small}` : ""}${variant === "outlined" ? ` ${styles.outlined}` : ""}${onClick ? ` ${styles.clickable}` : ""}${className ? ` ${className}` : ""}`}
    style={{ ...sxToStyle(sx), ...style }}
    {...(rest as any)}
  >
    {icon}
    <span className={styles.label}>{label}</span>
    {onDelete && (
      <button
        type="button"
        aria-label="Remove"
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e);
        }}
      >
        ×
      </button>
    )}
  </div>
);
