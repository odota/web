import { transformations } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_percentile,
  field: 'percent_rank',
  sortFn: true,
  percentBars: true,
  // displayFn: transformations.rank_percentile,
}, {
  displayName: strings.th_rank,
  field: 'numeric_rank',
  sortFn: true,
  displayFn: transformations.rank,
}];
