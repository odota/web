import { formatValues } from "../../utility";
import React from "react";
import styles from "./AbilityBehaviour.module.css";

const AbilityBehaviour = ({
  ability,
}: {
  ability: {
    behavior?: any;
    dmg_type?: string;
    bkbpierce?: boolean;
    dispellable?: boolean;
  };
}) => (
  <div className={styles.behavior}>
    {ability.behavior ? (
      <div>
        <span>TARGET: </span>
        <span>{formatValues(ability.behavior)}</span>
      </div>
    ) : (
      ""
    )}
    {ability.dmg_type ? (
      <div>
        <span>DAMAGE TYPE: </span>
        {/* @ts-expect-error */}
        <span type={ability.dmg_type}>{`${ability.dmg_type}`}</span>
      </div>
    ) : (
      ""
    )}
    {ability.bkbpierce ? (
      <div>
        <span>PIERCES DEBUFF IMMUNITY: </span>
        {/* @ts-expect-error */}
        <span type={ability.bkbpierce}>{`${ability.bkbpierce}`}</span>
      </div>
    ) : (
      ""
    )}
    {ability.dispellable ? (
      <div>
        <span>DISPELLABLE: </span>
        {/* @ts-expect-error */}
        <span type={ability.dispellable}>{`${ability.dispellable}`}</span>
      </div>
    ) : (
      ""
    )}
  </div>
);

export default AbilityBehaviour;
