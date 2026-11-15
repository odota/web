import React from "react";

import constants from "../constants";
import styles from "./AttributeMain.module.css";

const AttributeMain = ({
  style,
  attribute,
  isPrimary,
  base,
  gain,
}: {
  style?: any;
  attribute: string;
  isPrimary: boolean;
  base: number;
  gain: number;
}) => {
  const attributeDotStyle = {
    background: constants.primaryTextColor,
  };

  const attributeValueStyle = {
    color: constants.primaryTextColor,
  };

  switch (attribute) {
    default:
      attributeDotStyle.background = constants.colorAttributeStr;
      if (isPrimary) {
        attributeValueStyle.color = constants.colorAttributeStr;
      }
      break;

    case "agi":
      attributeDotStyle.background = constants.colorAttributeAgi;
      if (isPrimary) {
        attributeValueStyle.color = constants.colorAttributeAgi;
      }
      break;

    case "int":
      attributeDotStyle.background = constants.colorAttributeInt;
      if (isPrimary) {
        attributeValueStyle.color = constants.colorAttributeInt;
      }
      break;
  }

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.attributeDot} style={attributeDotStyle} />
      <div className={styles.attributeValue} style={attributeValueStyle}>
        {base} + {gain}
      </div>
    </div>
  );
};

export default AttributeMain;
