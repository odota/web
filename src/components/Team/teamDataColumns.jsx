import React from 'react';
import heroes from 'dotaconstants/build/heroes.json';
import { transformations, displayHeroId, subTextStyle, getTeamLogoUrl } from '../../utility';
import { TableLink } from '../Table';
import constants from '../constants';
import { TableRow, TableImage } from './TeamStyled';
import proPlayerImages from './proPlayerImages';
import { FromNowTooltip } from '../Visualizations';

const getPlayerImageUrl = (accountId) => {
  if (proPlayerImages[accountId]) {
    return `/assets/images/dota2/players/${accountId}.png`;
  }
  return '/assets/images/dota2/players/portrait.png';
};

export const matchColumns = strings => [{
  displayName: strings.th_match_id,
  field: 'match_id',
  sortFn: true,
  displayFn: (row, col, field) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <div style={{ ...subTextStyle }}>
        <div style={{ float: 'left' }}>
          <FromNowTooltip timestamp={row.start_time + row.duration} />
        </div>
        <span style={{ marginLeft: 1, marginRight: 1 }}>/</span>
        {row.league_name}
      </div>
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
  displayFn: (row) => {
    const won = row.radiant_win === row.radiant;
    const string = won ? strings.td_win : strings.td_loss;
    const textColor = won ? constants.colorGreen : constants.colorRed;
    return (
      <span style={{ color: textColor }}>{string}</span>
    );
  },
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

export const memberColumns = strings => [{
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

export const heroColumns = strings => [{
  displayName: strings.th_hero_id,
  field: 'hero_id',
  displayFn: displayHeroId,
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
