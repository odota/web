/* global API_HOST */
import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid';
import items from 'dotaconstants/build/items.json';
import abilities from 'dotaconstants/build/abilities.json';
import neutralAbilities from 'dotaconstants/build/neutral_abilities.json';
import strings from 'lang';
import styles from './inflictorWithValue.css';

const tooltipContainer = thing => (
  <div>
    <div className={styles.heading}>
      {thing.dname}
      {thing.cost &&
      <span className={styles.gold}>
        <img src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`} role="presentation" />
        {thing.cost}
      </span>}
      {thing.lore &&
      <span className={styles.lore}>{thing.lore}</span>}
      {thing.desc &&
      <span className={styles.lore}>{thing.desc}</span>}
    </div>
    <hr />
    {(thing.attrib || []).map(attrib => <div key={attrib.key}>{`${attrib.header} ${attrib.value} ${attrib.footer || ''}`}</div>)}
    {(thing.cd || thing.mc || thing.cmb) &&
    <div className={styles.cost}>
      {thing.mc > 0 &&
      <span>
        <img src={`${API_HOST}/apps/dota2/images/tooltips/mana.png`} role="presentation" />
        {thing.mc}
      </span>}
      {thing.cd > 0 &&
      <span>
        <img src={`${API_HOST}/apps/dota2/images/tooltips/cooldown.png`} role="presentation" />
        {thing.cd}
      </span>}
    </div>}
  </div>
);

export default (inflictor, value, type, ptooltip) => {
  if (inflictor !== undefined) {
    const ability = abilities[inflictor];
    const neutralAbility = neutralAbilities[inflictor];
    const item = items[inflictor];
    let image;
    let tooltip = strings.tooltip_autoattack_other;
    const ttId = uuid.v4();

    if (ability) {
      if (inflictor.includes('attribute_bonus')) {
        image = '/assets/images/stats.png';
      } else if (inflictor.includes('special_bonus')) {
        image = '/assets/images/dota2/talent_tree.svg';
      } else if (neutralAbility) {
        image = neutralAbility.img;
      } else {
        image = `${API_HOST}/apps/dota2/images/abilities/${inflictor}_lg.png`;
      }
      tooltip = tooltipContainer(ability);
    } else if (item) {
      image = `${API_HOST}/apps/dota2/images/items/${inflictor}_lg.png`;
      tooltip = tooltipContainer(item);
    } else {
      image = '/assets/images/default_attack.png';
    }
    if (ptooltip) {
      tooltip = ptooltip;
    }

    return (
      <div className={styles.inflictorWithValue} data-tip={tooltip && true} data-for={ttId}>
        {!type && <img src={image} role="presentation" />}
        {type === 'buff' &&
          <div
            className={styles.buff}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        }
        {!type && <div className={styles.overlay}>{value}</div>}
        {type === 'buff' &&
          <div className={styles.buffOverlay}>
            {value > 0 && value}
          </div>
        }
        {tooltip &&
        <div className={styles.tooltip}>
          <ReactTooltip id={ttId} effect="solid" place="left">
            {tooltip}
          </ReactTooltip>
        </div>}
      </div>
    );
  }
  return null;
};
