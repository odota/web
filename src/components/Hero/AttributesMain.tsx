import React from "react";
import AttributeMain from "./AttributeMain";
import styles from "./AttributesMain.module.css";

const HeroAttributes = ({ hero }: { hero: Hero }) => (
  <div className={styles.attributesWrapper}>
    <div className={styles.mainAttributesBlock}>
      <AttributeMain
        attribute="str"
        isPrimary={hero.primary_attr === "str"}
        base={hero.base_str}
        gain={hero.str_gain}
      />
      <AttributeMain
        attribute="agi"
        isPrimary={hero.primary_attr === "agi"}
        base={hero.base_agi}
        gain={hero.agi_gain}
      />
      <AttributeMain
        attribute="int"
        isPrimary={hero.primary_attr === "int"}
        base={hero.base_int}
        gain={hero.int_gain}
      />
    </div>
  </div>
);

export default HeroAttributes;
