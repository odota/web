import React from 'react';
// import { Link } from 'react-router';
import { transformations } from '../../../utility';

export default [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 3.1,
  displayFn: transformations.hero_id,
}, {
  displayName: 'Id',
  field: 'game_mode',
  width: 1.8,
  sortFn: true,
  displayFn: transformations.match_idANDgame_mode,
}, {
  displayName: 'Res',
  field: 'radiant_win',
  width: 1.5,
  displayFn: transformations.radiant_win,
}, {
  displayName: 'Skill',
  field: 'skill',
  width: 1.5,
  sortFn: true,
  displayFn: transformations.skill,
}, {
  displayName: 'Len',
  field: 'duration',
  width: 1.5,
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: 'KDA',
  field: 'kills',
  sortFn: true,
  width: 1.7,
  displayFn: transformations.kda,
},
];
