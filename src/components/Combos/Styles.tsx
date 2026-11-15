import React from "react";
import styles from "./Styles.module.css";

export const StyledCombos: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`${styles.styledCombos} ${className || ""}`} {...props} />;

export const StyledInputFilter: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledInputFilter} ${className || ""}`}
    {...props}
  />
);

export const StyledHeroSelector: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    isFiltered?: boolean;
    selected?: boolean;
  }
> = ({ isFiltered, selected, className, ...props }) => (
  <div
    className={`${styles.styledHeroSelector} ${isFiltered || selected ? styles.dimmed : ""} ${className || ""}`}
    {...props}
  />
);

export const StyledSelectedHeroes: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledSelectedHeroes} ${className || ""}`}
    {...props}
  />
);
