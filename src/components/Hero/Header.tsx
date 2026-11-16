import React from "react";
import AttributesMain from "./AttributesMain";
import Abilities from "./Abilities";
import config from "../../config";
import styles from "./Header.module.css";

const getHeroImgSrc = (src: string) => config.VITE_IMAGE_CDN + src;

const Header = ({ hero }: { hero: Hero }) => (
  <div className={styles.heroDescription}>
    <div className={styles.heroProfile}>
      <img
        className={styles.heroProfileBackground}
        alt={hero.localized_name}
        src={getHeroImgSrc(hero.img)}
      />
      <div className={styles.heroProfileContent}>
        <img
          className={styles.heroAvatar}
          alt={hero.localized_name}
          src={getHeroImgSrc(hero.img)}
        />
        <div className={styles.heroDetails}>
          <div className={styles.heroName}>{hero.localized_name}</div>
          <div className={styles.heroRoleInformations}>
            {hero.attack_type} -{" "}
            <span className={styles.heroRoles}>{hero.roles.join(", ")}</span>
          </div>
        </div>
        <div className={styles.heroStatsWrapper}>
          <AttributesMain hero={hero} />
          <Abilities hero={hero} />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
