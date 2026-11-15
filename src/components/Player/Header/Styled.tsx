import React from "react";
import { CardHeader } from "../../ui";
import styles from "./Styled.module.css";

export const PlayerStatsCard: React.FC<
  React.ComponentProps<typeof CardHeader>
> = ({ className, ...props }) => (
  <CardHeader
    className={`${styles.playerStatsCard} ${className || ""}`}
    {...props}
  />
);

export default PlayerStatsCard;
