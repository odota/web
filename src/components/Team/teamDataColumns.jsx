import React from 'react';
import heroes from 'dotaconstants/build/heroes.json';
import strings from 'lang';
import { transformations, subTextStyle, getTeamLogoUrl } from 'utility';
import { TableLink } from 'components/Table';
import constants from '../constants';
import { TableRow, TableImage } from './TeamStyled';
import proPlayerImages from './proPlayerImages';

const displayResult = (row) => {
  const won = row.radiant_win === row.radiant;
  const string = won ? strings.td_win : strings.td_loss;
  const textColor = won ? constants.colorGreen : constants.colorRed;
  return (
    <span style={{ color: textColor }}>{string}</span>
  );
};

const getPlayerImageUrl = (accountId) => {
  if (proPlayerImages[accountId]) {
    return `/assets/images/dota2/players/${accountId}.png`;
  }
  return '/assets/images/dota2/players/portrait.png';
};

export const matchColumns = [{
  displayName: strings.th_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: (row, col, field) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <span style={{ ...subTextStyle, display: 'block', marginTop: 1 }}>
        {row.league_name}
      </span>
    </div>
  ),
}, {
  displayName: strings.th_duration,
  tooltip: strings.tooltip_duration,
  field: 'duration',
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: strings.th_result,
  displayFn: displayResult,
}, {
  displayName: strings.th_opposing_team,
  field: 'opposing_team_name',
  sortFn: true,
  displayFn: (row, col, field) => (
    <TableRow>
      <TableImage src={getTeamLogoUrl(row.opposing_team_logo)} alt="" />
      <TableLink to={`/teams/${row.opposing_team_id}`}>{field || strings.general_unknown}</TableLink>
    </TableRow>
  ),
},
];

export const memberColumns = [{
  displayName: strings.th_name,
  field: 'name',
  sortFn: true,
  displayFn: (row, col, field) => (
    <TableRow>
      <TableImage src={getPlayerImageUrl(row.account_id)} />
      <TableLink to={`/players/${row.account_id}`}>{field || strings.general_unknown}</TableLink>
    </TableRow>
  ),
}, {
  displayName: strings.th_games_played,
  field: 'games_played',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_winrate,
  field: 'wins',
  sortFn: row => row.wins / row.games_played,
  percentBars: true,
},
];

export const heroColumns = [{
  displayName: strings.th_hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
  sortFn: row => (heroes[row.hero_id] && heroes[row.hero_id].localized_name),
}, {
  displayName: strings.th_games_played,
  field: 'games_played',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_winrate,
  field: 'wins',
  sortFn: row => (row.wins / row.games_played),
  percentBars: true,
},
];
