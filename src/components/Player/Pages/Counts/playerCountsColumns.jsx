import { transformations } from 'utility';
import strings from 'lang';

export default [{
  displayName: strings.th_category,
  field: 'category',
  sortFn: true,
  displayFn: transformations.category,
}, {
  displayName: strings.th_matches,
  field: 'matches',
  sortFn: 1,
  displayFn: transformations.matches,
}, {
  displayName: strings.th_win,
  field: 'winPercent',
  sortFn: 1,
  displayFn: (...args) => `${args[4]}%`,
  relativeBars: { getDivisor: () => 100 },
}];
