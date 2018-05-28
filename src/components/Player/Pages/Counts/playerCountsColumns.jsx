import { transformations } from '../../../../utility';

export default strings => ([{
  displayName: strings.th_category,
  field: 'category',
  sortFn: true,
  displayFn: transformations.category,
}, {
  displayName: strings.th_matches,
  field: 'matches',
  sortFn: true,
  displayFn: transformations.matches,
  relativeBars: true,
}, {
  displayName: strings.th_win,
  field: 'winPercent',
  sortFn: row => row.winPercent / 100, // percentBars expects decimal value
  percentBars: true,
}]);
