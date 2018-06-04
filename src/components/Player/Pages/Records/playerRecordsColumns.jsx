import { transformations, displayHeroId } from '../../../../utility';

export default strings => [{
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  sortFn: true,
  displayFn: displayHeroId,
}, {
  displayName: strings.th_result,
  tooltip: strings.tooltip_result,
  field: 'radiant_win',
  displayFn: transformations.radiant_win_and_game_mode,
}, {
  displayName: strings.th_duration,
  tooltip: strings.tooltip_duration,
  field: 'duration',
  sortFn: true,
  displayFn: transformations.duration,
}];
