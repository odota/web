import { transformations } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_match_id,
  tooltip: strings.tooltip_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: transformations.match_id_and_game_mode,
}, {
  displayName: strings.th_result,
  tooltip: strings.tooltip_result,
  field: 'radiant_win',
  displayFn: transformations.radiant_win,
}, {
  displayName: strings.th_skill,
  tooltip: strings.tooltip_skill,
  field: 'skill',
  sortFn: true,
  displayFn: transformations.skill,
}, {
  displayName: strings.th_duration,
  tooltip: strings.tooltip_duration,
  field: 'duration',
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: strings.abbr_kills,
  tooltip: strings.tooltip_kills,
  field: 'kills',
  sortFn: true,
  displayFn: transformations.kda,
}, {
  displayName: strings.abbr_deaths,
  tooltip: strings.tooltip_deaths,
  field: 'deaths',
  sortFn: true,
}, {
  displayName: strings.abbr_assists,
  tooltip: strings.tooltip_assists,
  field: 'assists',
  sortFn: true,
},
];
