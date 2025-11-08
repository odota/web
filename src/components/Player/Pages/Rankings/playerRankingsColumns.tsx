import { displayHeroId } from '../../../../utility';

function roundUp(x: number) {
  const y = 10 ** (x.toString().length - 1);
  let newX = x / y;
  newX = Math.ceil(newX);
  newX *= y;
  return newX;
}

export default (strings: Strings) => [
  {
    displayName: strings.th_hero_id,
    tooltip: strings.tooltip_hero_id,
    field: 'hero_id',
    displayFn: displayHeroId,
  },
  {
    displayName: strings.th_score,
    tooltip: strings.tooltip_hero_rankings_score,
    field: 'score',
    sortFn: true,
    relativeBars: true,
    displayFn: (row: any, col: any, field: number) => Math.floor(field),
  },
  {
    displayName: strings.th_percentile,
    field: 'percent_rank',
    sortFn: true,
    percentBars: true,
  },
  // {
  //   displayName: strings.th_rank,
  //   field: 'card',
  //   sortFn: (row: any) =>
  //     Math.max(100, roundUp(Math.floor(row.card * (1 - row.percent_rank)))),
  //   displayFn: (row: any) =>
  //     `~${Math.max(100, roundUp(Math.floor(row.card * (1 - row.percent_rank))))}`,
  // },
];
