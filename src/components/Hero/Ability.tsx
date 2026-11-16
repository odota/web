import React from "react";
import { nanoid } from "nanoid";
import ReactTooltip from "react-tooltip";

import AbilityTooltip from "../AbilityTooltip/AbilityTooltip";
import config from "../../config";
import styles from "./Ability.module.css";

const Ability = (props: { mc: string[]; img: string }) => {
  const ttId = nanoid();
  //@ts-expect-error
  const showMana = props.mc && parseInt(props.mc, 0) > 0;
  let manaString: boolean | string = false;

  if (showMana) {
    manaString = typeof props.mc === "object" ? props.mc[0] : props.mc;
  }

  return (
    <div className={styles.wrapper} data-tip data-for={ttId}>
      <img className={styles.abilityIcon} src={config.VITE_IMAGE_CDN + props.img} />
      {showMana && (
        <div className={styles.abilityManaConsumption}>{manaString}</div>
      )}
      <ReactTooltip id={ttId} effect="solid" place="bottom">
        <AbilityTooltip ability={props} />
      </ReactTooltip>
    </div>
  );
};

export default Ability;
