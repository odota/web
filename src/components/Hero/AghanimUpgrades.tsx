import React from "react";
import AghsTooltip from "../AghsTooltip/AghsTooltip";
import { aghs_desc as aghsDesc } from "dotaconstants";
import styles from "./AghanimUpgrades.module.css";

export const StyledAghanimsBuffs: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div className={`${styles.styledAghanimsBuffs} ${className || ""}`} {...props} />
);

export const Icon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  className,
  ...props
}) => <img className={`${styles.icon} ${className || ""}`} {...props} />;

const getAghsUpgrades = (heroName: string) => {
  const hero = aghsDesc.filter((a) => a.hero_name === heroName)[0];
  return hero || {};
};

const AghanimUpgrades = ({
  heroName,
  skills,
}: {
  heroName: string;
  skills: any[];
}) => (
  <div className={styles.wrapper}>
    <AghsTooltip
      heroName={heroName}
      upgrades={getAghsUpgrades(heroName)}
      skills={skills}
    />
    <StyledAghanimsBuffs data-for="aghanim" data-tip="aghanim">
      <Icon src="/assets/images/dota2/scepter_0.png" alt="Aghanim's scepter" />
      <Icon src="/assets/images/dota2/shard_0.png" alt="Aghanim's shard" />
    </StyledAghanimsBuffs>
  </div>
);

export default AghanimUpgrades;
