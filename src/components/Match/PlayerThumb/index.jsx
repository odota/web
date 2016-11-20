import React from 'react';
import playerColors from 'dotaconstants/json/player_colors.json';
import heroes from 'dotaconstants/json/heroes.json';
import { getShortHeroName } from 'utility';
import strings from 'lang';
import styles from './PlayerThumb.css';

const PlayerThumb = ({ player_slot, hero_id, name, personaname }) => (
  <aside style={{ color: playerColors[player_slot] }} className={styles.container}>
    <img
      className={styles.heroThumb}
      src={heroes[hero_id]
        ? `${API_HOST}/apps/dota2/images/heroes/${getShortHeroName(heroes[hero_id].name)}_icon.png`
        : '/assets/images/blank-1x1.gif'
      }
      role="presentation"
    />
    {name || personaname || strings.general_anonymous}
  </aside>
);

export default PlayerThumb;
