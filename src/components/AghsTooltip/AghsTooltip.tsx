import React from "react";
import ReactTooltip from "react-tooltip";
import AghanimsTooltipHeader from "./AghsTooltipHeader";
import AghsTooltipBody from "./AghsTooltipBody";
import config from "../../config";
import styles from "./AghsTooltip.module.css";

const AghanimsToolTip = ({
  upgrades,
  skills,
}: {
  upgrades: any;
  skills: any[];
  type: string;
}) => {
  let newScepterAbility = null;
  let newShardAbility = null;

  const getAghsSkillObject = (skillName: string) => {
    if (!skillName || skillName === "") return null;
    const ability = skills.find((skill) => skill.data.dname === skillName);
    return ability.data;
  };

  if (skills && upgrades) {
    const newShardSkillName = upgrades.shard_skill_name;
    const newShardSkillObject = getAghsSkillObject(newShardSkillName);
    newShardAbility = (
      <div className={styles.wrapper}>
        <AghanimsTooltipHeader
          image="/assets/images/dota2/shard_0.png"
          type="shard"
        >
          <span>Aghanim&lsquo;s Shard</span>
        </AghanimsTooltipHeader>
        <AghsTooltipBody
          icon={`${config.VITE_IMAGE_CDN}${newShardSkillObject ? newShardSkillObject.img : ""}`}
          skillName={upgrades.shard_skill_name}
          hasUpgrade={upgrades.has_shard}
          isNewSkill={upgrades.shard_new_skill}
          aghsDescription={upgrades.shard_desc}
          skillObject={newShardSkillObject}
        />
      </div>
    );

    const newScepterSkillName = upgrades.scepter_skill_name;
    const newScepterSkillObject = getAghsSkillObject(newScepterSkillName);
    newScepterAbility = (
      <div className={styles.wrapper}>
        <AghanimsTooltipHeader
          image="/assets/images/dota2/scepter_0.png"
          type="scepter"
        >
          <span>Aghanim&lsquo;s Scepter</span>
        </AghanimsTooltipHeader>
        <AghsTooltipBody
          icon={`${config.VITE_IMAGE_CDN}${newScepterSkillObject ? newScepterSkillObject.img : ""}`}
          skillName={upgrades.scepter_skill_name}
          hasUpgrade={upgrades.has_scepter}
          isNewSkill={upgrades.scepter_new_skill}
          aghsDescription={upgrades.scepter_desc}
          skillObject={newScepterSkillObject}
        />
      </div>
    );
  }

  return (
    <div className={styles.combinedWrapper}>
      {newScepterAbility}
      {newShardAbility}
    </div>
  );
};

export const StyledAghanimsBuffs: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledAghanimsBuffs} ${className || ""}`}
    {...props}
  />
);

const AghsTooltipWrapper = ({
  upgrades,
  skills,
}: {
  upgrades: any;
  skills: any[];
  heroName: string;
}) => (
  <div className={styles.ttWrapper}>
    <StyledAghanimsBuffs>
      <ReactTooltip id="aghanim" effect="solid" place="bottom">
        <AghanimsToolTip type="scepter" upgrades={upgrades} skills={skills} />
      </ReactTooltip>
    </StyledAghanimsBuffs>
  </div>
);

export default AghsTooltipWrapper;
