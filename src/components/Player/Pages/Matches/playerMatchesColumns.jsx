// import { Link } from 'react-router';
import { transformations } from 'utility';

export default [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2.8,
  displayFn: transformations.hero_id,
}, {
  displayName: 'Id',
  field: 'match_id',
  width: 1.8,
  sortFn: true,
  displayFn: transformations.match_id_and_game_mode,
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
  width: 1.2,
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: 'K',
  field: 'kills',
  sortFn: true,
  width: 0.8,
  displayFn: transformations.kda,
}, {
  displayName: 'D',
  field: 'deaths',
  sortFn: true,
  width: 0.8,
}, {
  displayName: 'A',
  field: 'assists',
  sortFn: true,
  width: 0.8,
},
];
