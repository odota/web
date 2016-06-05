const overviewColumns = [
  {
    displayName: 'Hero',
    field: 'hero_id',
    width: 2,
  },
  {
    displayName: 'Player',
    field: 'personaname',
    width: 2,
  },
  {
    displayName: 'Kills',
    field: 'kills',
    width: 2,
  },
  {
    displayName: 'Deaths',
    field: 'deaths',
    width: 2,
  },
  {
    displayName: 'Assists',
    field: 'assists',
    width: 2,
  }];
var abUpgradeColumns = [
  {
    displayName: 'Hero',
    field: 'hero_id',
    width: 2,
  }];
for (var i = 0; i < 25; i++)
{
  abUpgradeColumns.push(
  {
    displayName: i + 1,
    field: 'ability_upgrades',
    displayFn: (
    {
      row, column, field
    }) => <img src={field.display && field.display[i] ? field.display[i].img : ""} style={{ height: '24px' }} role="presentation" />
  });
}
export
{
  overviewColumns, abUpgradeColumns
};
