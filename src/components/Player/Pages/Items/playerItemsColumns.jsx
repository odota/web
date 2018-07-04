const playerItemsColumns = strings => ([{
  displayName: 'Name',
  tooltip: strings.items_name,
  field: 'name',
  width: 1,
}]);

export default playerItemsColumns;

// "items_built"
// "items_matches": "Number of matches where this item was built",
// "items_uses": "Number of times this item was used",
// "items_uses_per_match": "Mean number of times this item was used in matches where it was built",
// "items_timing": "Mean time this item was built at",
// "items_build_pct": "Percentage of matches this item was built in",
// "items_win_pct": "Percentage of matches won where this item was built",
