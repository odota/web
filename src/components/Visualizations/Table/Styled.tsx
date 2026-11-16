import React from "react";
import styles from "./Styled.module.css";

export const StyledContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const KDAContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.styledContainer} ${styles.kdaContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const TitleContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.titleContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const PercentContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.percentContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const SparklineContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.sparklineContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const KDAPercentContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.percentContainer} ${styles.kdaPercentContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);
