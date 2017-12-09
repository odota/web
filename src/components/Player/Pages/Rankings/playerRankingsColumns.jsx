import { transformations } from 'utility';
import strings from 'lang';

function roundUp(x) {
  const y = 10 ** (x.toString().length - 1);
  let newX = x / y;
  newX = Math.ceil(newX);
  newX *= y;
  return newX;
}

export default [{
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_score,
  field: 'score',
  sortFn: true,
  relativeBars: true,
  displayFn: (row, col, field) => Math.floor(field),
}, {
  displayName: strings.th_percentile,
  field: 'percent_rank',
  sortFn: true,
  percentBars: true,
  // displayFn: transformations.rank_percentile,
}, {
  displayName: strings.th_rank,
  field: 'card',
  sortFn: true,
  displayFn: row => `~${Math.max(100, roundUp(Math.floor(row.card * (1 - row.percent_rank))))}`,
}];
