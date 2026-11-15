import React from "react";
import styles from "./StyledMatch.module.css";

export const StyledPlayerColor: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { color: string }
> = ({ color, className, style, ...props }) => (
  <span
    className={`${styles.styledPlayerColor}${className ? ` ${className}` : ""}`}
    style={{ backgroundColor: color, ...style }}
    {...props}
  />
);

const createStyledDiv =
  (cls: string): React.FC<React.HTMLAttributes<HTMLDivElement>> =>
  ({ className, ...props }) => (
    <div className={`${cls}${className ? ` ${className}` : ""}`} {...props} />
  );

const createStyledSpan =
  (cls: string): React.FC<React.HTMLAttributes<HTMLSpanElement>> =>
  ({ className, ...props }) => (
    <span className={`${cls}${className ? ` ${className}` : ""}`} {...props} />
  );

export const StyledAbilityUpgrades = createStyledDiv(
  styles.styledAbilityUpgrades,
);

export const StyledAghanimsBuffs = createStyledDiv(styles.styledAghanimsBuffs);

export const StyledLevel = createStyledDiv(styles.styledLevel);

export const StyledCosmetic = createStyledDiv(styles.styledCosmetic);

export const StyledUnusedItem = createStyledDiv(styles.styledUnusedItem);

export const StyledGoldIcon = createStyledSpan(styles.styledGoldIcon);

export const StyledRunes = createStyledDiv(styles.styledRunes);

export const StyledDivClearBoth = createStyledDiv(styles.styledDivClearBoth);

export const StyledBackpack = createStyledDiv(styles.styledBackpack);

export const StyledFlexContainer = createStyledDiv(styles.styledFlexContainer);

export const StyledFlexElement = createStyledDiv(styles.styledFlexElement);

export const StyledFlexElementFullWidth = createStyledDiv(
  styles.styledFlexElementFullWidth,
);

export const StyledTeamIconContainer = createStyledSpan(
  styles.styledTeamIconContainer,
);

export const StyledPlayersDeath = createStyledDiv(styles.styledPlayersDeath);

export const StyledDeathsSummary = createStyledDiv(styles.styledDeathsSummary);

export const StyledEmote: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & { emote?: string }
> = ({ emote, alt, src, className, ...props }) => (
  <img
    alt={alt ?? emote}
    src={src ?? `/assets/images/dota2/emoticons/${emote}.gif`}
    className={`${styles.styledEmote}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledStorySpan: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { isRadiant?: boolean }
> = ({ isRadiant, className, ...props }) => (
  <span
    className={`${styles.styledStorySpan}${isRadiant ? ` ${styles.radiant}` : ""}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledStoryWrapper = createStyledDiv(styles.styledStoryWrapper);

export const StyledStoryNetWorthBar = createStyledDiv(
  styles.styledStoryNetWorthBar,
);

export const StyledStoryNetWorthText: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    color?: string;
    left?: number;
    width?: number;
  }
> = ({ color, left, width, className, style, ...props }) => (
  <div
    className={`${styles.styledStoryNetWorthText}${className ? ` ${className}` : ""}`}
    style={{
      ...(color ? { backgroundColor: color } : {}),
      ...(left ? { left: `${left}%` } : {}),
      ...(width !== undefined ? { width: `${width}%` } : {}),
      ...style,
    }}
    {...props}
  />
);

export const StyledStoryGoldAmount = createStyledSpan(
  styles.styledStoryGoldAmount,
);

export const StyledLogFilterForm = createStyledDiv(styles.styledLogFilterForm);

export const StyledDmgTargetInflictor = createStyledDiv(
  styles.styledDmgTargetInflictor,
);

export const StyledDmgTargetRow = createStyledDiv(styles.styledDmgTargetRow);

/** Displays a compact “Won the lane” badge for players whose side won the recorded lane. */
export const StyledLineWinnerSpan = createStyledSpan(
  styles.styledLineWinnerSpan,
);
