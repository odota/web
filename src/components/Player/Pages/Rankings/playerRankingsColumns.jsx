import { transformations, getPercentWin } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  width: 2,
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_percentile,
  field: 'rank',
  width: 2,
  sortFn: (row) => row.rank / row.card,
  displayFn: (row, column, field) => `${getPercentWin(field, row.card).toFixed(2)}%`,
}, {
  displayName: strings.th_rank,
  field: 'rank',
  width: 1.5,
  sortFn: transformations.rank,
  displayFn: transformations.rank,
}];
