export default strings => ([{
  displayName: strings.th_category,
  field: 'category',
  sortFn: true,
}, {
  displayName: strings.th_matches,
  field: 'matches',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_win,
  field: 'winPercent',
  sortFn: row => row.winPercent / 100, // percentBars expects decimal value
  percentBars: true,
}]);
