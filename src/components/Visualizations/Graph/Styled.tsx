import React from "react";
import styles from "./Styled.module.css";

export const LaningXpDifference: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { $difference: number }
> = ({ $difference, className, ...props }) => (
  <span
    className={`${styles.laningXpDifference}${$difference > 0 ? ` ${styles.laningXpDifferencePositive}` : $difference < 0 ? ` ${styles.laningXpDifferenceNegative}` : ""}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const HeroLevelBadge: React.FC<
  React.HTMLAttributes<HTMLSpanElement>
> = ({ className, ...props }) => (
  <span
    className={`${styles.heroLevelBadge}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const PhaseHero: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={`${styles.phaseHero}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const LaningCaptionGrid: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.laningCaptionGrid}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const LaningCaptionCard: React.FC<
  React.HTMLAttributes<HTMLElement> & { $isRadiant: boolean }
> = ({ $isRadiant, className, ...props }) => (
  <section
    className={`${styles.laningCaptionCard}${$isRadiant ? ` ${styles.laningCaptionCardRadiant}` : ""}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const PerspectiveHeader: React.FC<
  React.HTMLAttributes<HTMLElement>
> = ({ className, ...props }) => (
  <header
    className={`${styles.perspectiveHeader}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledTooltip: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.styledTooltip}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledTooltipTeam: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { color?: string }
> = ({ color, className, style, ...props }) => (
  <span
    className={`${styles.styledTooltipTeam}${className ? ` ${className}` : ""}`}
    style={{ color, ...style }}
    {...props}
  />
);

export const StyledRadiant: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={`${styles.styledRadiant}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledDire: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={`${styles.styledDire}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledCustomizedTooltip: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledCustomizedTooltip}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledHolder: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.styledHolder}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const GoldSpan: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={`${styles.goldSpan}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const XpSpan: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={`${styles.xpSpan}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledTooltipNetworthLineEntry: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledTooltipNetworthLineEntry}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledTooltipTime: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledTooltipTime}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const TooltipLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.tooltipLabel}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const TooltipLineEntry: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { color: string }
> = ({ color, className, style, ...props }) => (
  <div
    className={`${styles.tooltipLineEntry}${className ? ` ${className}` : ""}`}
    style={{ borderLeft: `8px solid ${color}`, ...style }}
    {...props}
  />
);

export const TooltipLineEntryHeroName: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { color: string }
> = ({ color, className, style, ...props }) => (
  <span
    className={`${styles.tooltipLineEntryHeroName}${className ? ` ${className}` : ""}`}
    style={{ color, ...style }}
    {...props}
  />
);

export const TooltipLineEntryValue: React.FC<
  React.HTMLAttributes<HTMLSpanElement>
> = ({ className, ...props }) => (
  <span
    className={`${styles.tooltipLineEntryValue}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const BinName: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.binName}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const NumPlayers: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.numPlayers}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const Percentile: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.percentile}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const HistogramTooltipDiv: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    color?: string;
    fontSize?: "small" | "medium";
  }
> = ({ color, fontSize, className, style, ...props }) => (
  <div
    className={`${fontSize === "medium" ? styles.histogramTooltipMedium : styles.histogramTooltipSmall}${className ? ` ${className}` : ""}`}
    style={{ color, ...style }}
    {...props}
  />
);
