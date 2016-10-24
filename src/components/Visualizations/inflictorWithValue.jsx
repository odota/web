import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'node-uuid';
import abilityKeys from 'dotaconstants/json/ability_keys.json';
import items from 'dotaconstants/json/items.json';
import { API_HOST } from 'config';
import styles from './inflictorWithValue.css';

const inflictorWithValue = (inflictor, value) => {
  if (inflictor !== undefined) {
    // TODO use abilities if we need the full info immediately
    const ability = abilityKeys[inflictor];
    const item = items[inflictor];
    let image;
    let tooltip;
    const ttId = uuid.v4();

    if (ability) {
      image = `${API_HOST}/apps/dota2/images/abilities/${inflictor}_lg.png`;
    } else if (item) {
      image = `${API_HOST}/apps/dota2/images/items/${inflictor}_lg.png`;
      tooltip = (
        <div>
          <div className={styles.heading}>
            {item.dname}
            <span className={styles.gold}>
              <img src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`} role="presentation" />
              {item.cost}
            </span>
            {item.lore &&
            <span className={styles.lore}>{item.lore}</span>}
            {item.attrib && <hr />}
          </div>
          <div dangerouslySetInnerHTML={{ __html: item.attrib }} className={styles.noBr} />
          {(item.cd || item.mc) && !item.lore && <hr />}
          {(item.cd || item.mc) &&
          <div className={styles.cost}>
            {item.mc > 0 &&
            <span>
              <img src={`${API_HOST}/apps/dota2/images/tooltips/mana.png`} role="presentation" />
              {item.mc}
            </span>}
            {item.cd > 0 &&
            <span>
              <img src={`${API_HOST}/apps/dota2/images/tooltips/cooldown.png`} role="presentation" />
              {item.cd}
            </span>}
          </div>}
        </div>
      );
    } else {
      image = `${API_HOST}/public/images/default_attack.png`;
    }
    return (
      <div className={styles.inflictorWithValue} data-tip data-for={ttId}>
        <img src={image} role="presentation" />
        <div className={styles.overlay}>{value}</div>
        <div className={styles.tooltip}>
          <ReactTooltip id={ttId} effect="float">
            {tooltip}
          </ReactTooltip>
        </div>
      </div>
    );
  }
  return null;
};

export default inflictorWithValue;
