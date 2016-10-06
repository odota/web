import { transformations } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  width: 2,
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_percentile,
  field: 'card',
  width: 2,
  sortFn: row => row.rank / row.card,
  displayFn: transformations.rank_percentile,
}, {
  displayName: strings.th_rank,
  field: 'rank',
  width: 1.5,
  sortFn: row => row.card - row.rank,
  displayFn: transformations.rank,
}];
