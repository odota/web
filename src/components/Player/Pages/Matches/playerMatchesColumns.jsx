import { transformations } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  width: 2.8,
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_id,
  tooltip: strings.match_id,
  field: 'match_id',
  width: 1.8,
  sortFn: true,
  displayFn: transformations.match_id_and_game_mode,
}, {
  displayName: strings.th_result,
  tooltip: strings.result,
  field: 'radiant_win',
  width: 1.5,
  displayFn: transformations.radiant_win,
}, {
  displayName: strings.th_skill,
  tooltip: strings.skill,
  field: 'skill',
  width: 1.5,
  sortFn: true,
  displayFn: transformations.skill,
}, {
  displayName: strings.th_duration,
  tooltip: strings.duration,
  field: 'duration',
  width: 1.2,
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: strings.th_kills,
  tooltip: strings.kills,
  field: 'kills',
  sortFn: true,
  width: 0.8,
  displayFn: transformations.kda,
}, {
  displayName: strings.th_deaths,
  tooltip: strings.deaths,
  field: 'deaths',
  sortFn: true,
  width: 0.8,
}, {
  displayName: strings.th_assists,
  tooltip: strings.assists,
  field: 'assists',
  sortFn: true,
  width: 0.8,
},
];
