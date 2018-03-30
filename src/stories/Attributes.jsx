import React from 'react';
import { storiesOf } from '@storybook/react';
import AttributesBlock from '../Hero/AttributesBlock';

const hero = {
  primary_attr: 'agi',
  base_health: 200,
  base_health_regen: 0,
  base_mana: 75,
  base_mana_regen: 0.01,
  base_armor: -1,
  base_mr: 25,
  base_attack_min: 27,
  base_attack_max: 31,
  base_str: 22,
  base_agi: 22,
  base_int: 15,
  str_gain: 1.5,
  agi_gain: 2.8,
  int_gain: 1.8,
  attack_range: 150,
  projectile_speed: 0,
  attack_rate: 1.45,
  move_speed: 315,
  turn_rate: 0.5,
  cm_enabled: true,
  legs: 2,
};

storiesOf('Hero', module).add('AttributesBlock', () => (
  <div style={{ color: 'white' }}>
    <AttributesBlock hero={hero} />
  </div>
));
