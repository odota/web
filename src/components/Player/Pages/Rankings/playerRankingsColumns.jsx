import { transformations } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_percentile,
  field: 'card',
  sortFn: row => row.rank / row.card,
  percentBars: row => row.rank / row.card,
  // displayFn: transformations.rank_percentile,
}, {
  displayName: strings.th_rank,
  field: 'rank',
  sortFn: row => row.card - row.rank,
  displayFn: transformations.rank,
}];
