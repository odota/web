import { transformations, displayHeroId } from '../../../../utility';
import matchesColumns from '../../../Match/matchColumns';

export default (strings, isShowItems) => ([{
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  displayFn: displayHeroId,
}, {
  displayName: strings.th_result,
  tooltip: strings.tooltip_result,
  field: 'radiant_win',
  sortFn: true,
  displayFn: transformations.radiant_win_and_game_mode,
}, {
  displayName: strings.filter_game_mode,
  tooltip: strings.tooltip_game_mode,
  field: 'game_mode',
  sortFn: true,
  displayFn: transformations.mode,
}, {
  displayName: strings.th_duration,
  tooltip: strings.tooltip_duration,
  field: 'duration',
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: strings.th_kills,
  tooltip: strings.tooltip_kills,
  field: 'kills',
  sortFn: true,
  displayFn: transformations.kda,
}, {
  displayName: strings.th_deaths,
  tooltip: strings.tooltip_deaths,
  field: 'deaths',
  sortFn: true,
}, {
  displayName: strings.th_assists,
  tooltip: strings.tooltip_assists,
  field: 'assists',
  sortFn: true,
}, ...isShowItems ? [{
  displayName: strings.th_items,
  tooltip: strings.tooltip_items,
  field: 'items',
  displayFn: matchesColumns(strings).itemsTd,
}] : [],
]);
