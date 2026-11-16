import React from "react";
import Attribute from "./Attribute";
import { compileLevelOneStats } from "../../utility";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./AttributesBlock.module.css";

// Damage multiplier https://dota2.gamepedia.com/Armor#Damage_multiplier
const calcArmorPercent = (hero: number) =>
  Math.round(((0.06 * hero) / (1 + 0.06 * hero)) * 100);

const HeroAttributes = ({ hero }: { hero: Hero }) => {
  const h = compileLevelOneStats(hero);
  const strings = useStrings();

  return (
    <div className={styles.attributesWrapper}>
      <div className={styles.attributeBlock}>
        <Attribute>
          <span className={styles.label}>{strings.heading_attack}:</span>{" "}
          {`${h.base_attack_min} - ${h.base_attack_max}`}
        </Attribute>
        <Attribute>
          <span className={styles.label}>{strings.heading_attack_range}:</span>{" "}
          {h.attack_range}
        </Attribute>
        <Attribute>
          <span className={styles.label}>{strings.heading_attack_speed}:</span>{" "}
          {h.attack_rate}
        </Attribute>
        {h.projectile_speed !== 0 && (
          <Attribute>
            <span className={styles.label}>
              {strings.heading_projectile_speed}:
            </span>{" "}
            {h.projectile_speed}
          </Attribute>
        )}
      </div>
      <div className={styles.attributeBlock}>
        <Attribute>
          <span className={styles.label}>{strings.heading_base_health}:</span>{" "}
          {h.base_health}
        </Attribute>
        <Attribute>
          <span className={styles.label}>
            {strings.heading_base_health_regen}:
          </span>{" "}
          {h.base_health_regen}
        </Attribute>
        <Attribute>
          <span className={styles.label}>{strings.heading_base_mana}:</span>{" "}
          {h.base_mana}
        </Attribute>
        <Attribute>
          <span className={styles.label}>
            {strings.heading_base_mana_regen}:
          </span>{" "}
          {h.base_mana_regen}
        </Attribute>
      </div>
      <div className={styles.attributeBlock}>
        <Attribute>
          <span className={styles.label}>{strings.heading_base_armor}:</span>{" "}
          {`${h.base_armor} (${calcArmorPercent(h.base_armor)}%)`}
        </Attribute>
        <Attribute>
          <span className={styles.label}>{strings.heading_base_mr}:</span>{" "}
          {`${h.base_mr}%`}
        </Attribute>
        <Attribute>
          <span className={styles.label}>{strings.heading_move_speed}:</span>{" "}
          {h.move_speed}
        </Attribute>
        <Attribute>
          <span className={styles.label}>{strings.heading_turn_rate}:</span>{" "}
          {h.turn_rate}
        </Attribute>
      </div>
      <div className={styles.attributeBlock}>
        <Attribute>
          <span className={styles.label}>{strings.heading_legs}:</span>{" "}
          {h.legs}
        </Attribute>
        <Attribute>
          <span className={styles.label}>{strings.heading_cm_enabled}:</span>{" "}
          {h.cm_enabled ? strings.yes : strings.no}
        </Attribute>
      </div>
    </div>
  );
};

export default HeroAttributes;
