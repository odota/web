import React from "react";
import { nanoid } from "nanoid";

import TalentsTooltip from "../TalentsTooltip/TalentsTooltip";
import styles from "./Talents.module.css";

const Talents = ({ talents }: { talents: any[] }) => {
  const ttId = nanoid();

  return (
    <div className={styles.wrapper} data-tip data-for={ttId}>
      <img
        className={styles.icon}
        src="/assets/images/dota2/talent_tree.svg"
        alt="Talents"
      />
      <TalentsTooltip talents={talents} ttId={ttId} />
    </div>
  );
};

export default Talents;
