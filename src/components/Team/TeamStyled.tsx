import React from "react";
import { CardHeader, type CardHeaderProps } from "../ui";
import Container from "../Container/Container";
import styles from "./TeamStyled.module.css";

export const TeamStatsCard: React.FC<CardHeaderProps> = ({
  className,
  ...props
}) => (
  <CardHeader
    className={`${styles.teamStatsCard}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const Logo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  className,
  ...props
}) => (
  <img
    className={`${styles.logo}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const TableImage: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement>
> = ({ className, ...props }) => (
  <img
    className={`${styles.tableImage}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const TeamName: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={`${styles.teamName}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const HeaderContainer: React.FC<
  React.ComponentProps<typeof Container>
> = ({ className, ...props }) => (
  <Container
    className={`${styles.headerContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const Column: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.column}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const Row: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.row}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.tableRow}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const MatchesContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.matchesContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const MemberAndHeroContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.memberAndHeroContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);
