import React from "react";
import styles from "./Styled.module.css";

export const HeadContainerDiv: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.headContainerDiv} ${className || ""}`}
    {...props}
  />
);

export const HeadlineDiv: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`${styles.headlineDiv} ${className || ""}`} {...props} />
);

export const DescriptionDiv: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`${styles.descriptionDiv} ${className || ""}`} {...props} />
);

export const ButtonContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div className={`${styles.buttonContainer} ${className || ""}`} {...props} />
);

export const BottomTextDiv: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`${styles.bottomTextDiv} ${className || ""}`} {...props} />
);
