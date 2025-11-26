import React from 'react';
import { displayHeroId } from '../../../../utility';
import TableLink from '../../../Table/TableLink';

export const playerHeroesOverviewColumns = (
  playerId: string,
  strings: Strings,
) => [
  {
    displayName: strings.th_hero_id,
    tooltip: strings.tooltip_hero_id,
    field: 'hero_id',
    displayFn: displayHeroId,
    sortFn: (row: any) => row.last_played,
  },
  {
    displayName: strings.th_games,
    tooltip: strings.tooltip_played_as,
    field: 'games',
    displayFn: (row: any) => (
      <TableLink to={`/players/${playerId}/matches?hero_id=${row.hero_id}`}>
        {row.games}
      </TableLink>
    ),
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_win,
    tooltip: strings.tooltip_win_pct_as,
    field: 'win',
    sortFn: (row: any) => row.win / row.games,
    percentBars: true,
  },
];

const restColumns = (playerId: string, strings: Strings) => [
  {
    displayName: strings.th_with_games,
    tooltip: strings.tooltip_played_with,
    field: 'with_games',
    displayFn: (row: any) => (
      <TableLink
        to={`/players/${playerId}/matches?with_hero_id=${row.hero_id}`}
      >
        {row.with_games}
      </TableLink>
    ),
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_with_win,
    tooltip: strings.tooltip_win_pct_with,
    field: 'with_win',
    sortFn: (row: any) => row.with_win / row.with_games,
    percentBars: true,
  },
  {
    displayName: strings.th_against_games,
    tooltip: strings.tooltip_played_against,
    field: 'against_games',
    displayFn: (row: any) => (
      <TableLink
        to={`/players/${playerId}/matches?against_hero_id=${row.hero_id}`}
      >
        {row.against_games}
      </TableLink>
    ),
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_against_win,
    tooltip: strings.tooltip_win_pct_against,
    field: 'against_win',
    sortFn: (row: any) => row.against_win / row.against_games,
    percentBars: true,
  },
];

export const playerHeroesColumns = (playerId: string, strings: Strings) => [
  ...playerHeroesOverviewColumns(playerId, strings),
  ...restColumns(playerId, strings),
];
