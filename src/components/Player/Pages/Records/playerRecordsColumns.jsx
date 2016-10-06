import { transformations, prettyPrint } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'start_time',
  width: 2.8,
  sortFn: true,
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_match_id,
  tooltip: strings.tooltip_match_id,
  field: 'match_id',
  width: 1.8,
  sortFn: true,
  displayFn: transformations.match_id_and_game_mode,
}, {
  displayName: strings.th_title,
  field: 'name',
  width: 1,
  displayFn: prettyPrint,
}, {
  displayName: strings.th_record,
  field: 'value',
  width: 1,
  sortFn: true,
}];
