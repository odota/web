import React from 'react';
import PropTypes from 'prop-types';
import playerColors from 'dotaconstants/build/player_colors.json';
import heroes from 'dotaconstants/build/heroes.json';
import strings from 'lang';
import styles from './PlayerThumb.css';

const PlayerThumb = ({ player_slot, hero_id, name, personaname, hideText }) => (
  <aside style={{ color: playerColors[player_slot] }} className={styles.container}>
    <img
      className={styles.heroThumb}
      src={heroes[hero_id]
        ? `${API_HOST}${heroes[hero_id].icon}`
        : '/assets/images/blank-1x1.gif'
      }
      role="presentation"
    />
    {!hideText && (name || personaname || strings.general_anonymous)}
  </aside>
);

const { string, oneOfType, number, bool } = PropTypes;

PlayerThumb.propTypes = {
  player_slot: oneOfType([string, number]),
  hero_id: oneOfType([string, number]),
  name: string,
  personaname: string,
  hideText: bool,
};

export default PlayerThumb;
