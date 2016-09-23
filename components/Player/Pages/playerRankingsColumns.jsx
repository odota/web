import { transformations, getPercentWin } from '../../../utility';

export default [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
  displayFn: transformations.hero_id,
}, {
  displayName: 'Percentile',
  field: 'rank',
  width: 2,
  sortFn: (row) => row.rank / row.card,
  displayFn: (row, column, field) => `${getPercentWin(field, row.card).toFixed(2)}%`,
}, {
  displayName: 'Rank',
  field: 'rank',
  width: 1.5,
  sortFn: transformations.rank,
  displayFn: transformations.rank,
}];
