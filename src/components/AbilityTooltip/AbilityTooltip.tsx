import React from "react";
import { styleValues, formatValues } from "../../utility";
import AbilityBehaviour from "./AbilityBehaviour";
import config from "../../config";
import styles from "./AbilityTooltip.module.css";

const AbilityTooltip = ({
  ability,
  inflictor,
}: {
  ability: {
    img?: string;
    dname?: string;
    behavior?: string;
    dmg_type?: string;
    bkbpierce?: boolean;
    desc?: string;
    attrib?: any[];
    dmg?: any;
    mc?: string[];
    cd?: number[];
  };
  inflictor?: string;
}) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <div
        className={styles.headerBgImg}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${config.VITE_IMAGE_CDN}${ability.img}')`,
        }}
      />
      <div className={styles.headerContent}>
        {inflictor && inflictor.startsWith("special_") ? (
          <img
            id="ability-img"
            src="/assets/images/dota2/talent_tree.svg"
            alt="Talent Tree"
          />
        ) : (
          <img
            id="ability-img"
            src={`${config.VITE_IMAGE_CDN}${ability.img}`}
            alt="Talent Tree"
          />
        )}
        <div className={styles.name}>{ability.dname}</div>
      </div>
    </div>
    {(ability.behavior || ability.dmg_type || ability.bkbpierce) && (
      <div>
        <AbilityBehaviour ability={ability} />
        <div className={styles.break} />
      </div>
    )}
    {ability.desc && (
      <div className={styles.description} ref={(el: any) => styleValues(el)}>
        {ability.desc}
      </div>
    )}
    {ability.attrib && ability.attrib.length > 0 && (
      <div>
        <div className={styles.break} />
        <div className={styles.attributes}>
          <div>
            {(ability.attrib || []).map((attrib: any) => (
              <div className={styles.attribute} key={attrib.key}>
                <span id="header">{attrib.header} </span>
                <span id="value">{formatValues(attrib.value)}</span>
                <span id="footer"> {attrib.footer || ""}</span>
              </div>
            ))}
            {ability.dmg ? (
              <div className={styles.attribute}>
                DAMAGE: <span id="value">{formatValues(ability.dmg)}</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    )}
    {(ability.mc || ability.cd) && (
      <div className={styles.resources}>
        {ability.mc && (
          <span>
            <img
              className={styles.resourceIcon}
              src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/mana.png`}
              alt="Mana"
            />
            <span className={styles.values}>{formatValues(ability.mc)}</span>
          </span>
        )}
        {ability.cd && (
          <span>
            <img
              className={styles.resourceIcon}
              src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/cooldown.png`}
              alt="Cooldown"
            />
            <span className={styles.values}>{formatValues(ability.cd)}</span>
          </span>
        )}
      </div>
    )}
  </div>
);

export default AbilityTooltip;
