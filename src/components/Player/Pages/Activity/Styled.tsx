import React from "react";
import styles from "./Styled.module.css";

export const Styled: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`${styles.styled} ${className || ""}`} {...props} />;

export const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`${styles.content} ${className || ""}`} {...props} />;

export const Week: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`${styles.week} ${className || ""}`} {...props} />;

export const WeekDayLabels: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`${styles.weekDayLabels} ${className || ""}`} {...props} />
);

export const WeeksContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`${styles.weeksContainer} ${className || ""}`} {...props} />
);

export const DayContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`${styles.dayContainer} ${className || ""}`} {...props} />
);
