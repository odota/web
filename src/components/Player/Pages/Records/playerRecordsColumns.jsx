import { transformations } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_title,
  field: 'name',
  displayFn: (row, col, field) => strings[`heading_${field}`],
}, {
  displayName: strings.th_record,
  field: 'value',
  sortFn: true,
}, {
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  sortFn: true,
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_match_id,
  tooltip: strings.tooltip_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: transformations.match_id_and_game_mode,
}];
