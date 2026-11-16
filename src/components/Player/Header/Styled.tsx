import React from "react";
import { CardHeader } from "@mui/material";
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
