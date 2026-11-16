import React from "react";
import { player_colors as playerColors } from "dotaconstants";
import { heroes } from "dotaconstants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./PlayerThumb.module.css";

const PlayerThumb = (props: {
  player_slot?: number;
  hero_id?: string;
  name?: string;
  personaname?: string;
  hideText?: boolean;
}) => {
  const strings = useStrings();
  const { name, personaname, hideText } = props;
  const playerSlot = props.player_slot;
  const heroId = props.hero_id;
  return (
    <aside
      className={styles.playerThumb}
      style={{
        color: playerColors[playerSlot as unknown as keyof typeof playerColors],
      }}
    >
      <img
        className={styles.img}
        src={
          heroes[heroId as keyof Heroes]
            ? `${config.VITE_IMAGE_CDN}${heroes[heroId as keyof Heroes].icon}`
            : "/assets/images/blank-1x1.gif"
        }
        alt=""
      />
      {!hideText && (name || personaname || strings.general_anonymous)}
    </aside>
  );
};

export default PlayerThumb;
