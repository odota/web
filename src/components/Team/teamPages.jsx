import React from 'react';
import Container from '../Container';
import Table from '../Table';
import Overview from './Overview';
import { matchColumns, memberColumns, heroColumns } from './teamDataColumns';

const teamPages = strings => [Overview(strings), {
  name: strings.tab_matches,
  key: 'matches',
  content: (generalData, matchData) => (
    <Container
      title={strings.heading_matches}
      loading={matchData.loading}
      error={matchData.error}
    >
      <Table
        columns={matchColumns(strings)}
        data={matchData.data}
        paginated
        key="matches"
      />
    </Container>
  ),
}, {
  name: strings.tab_heroes,
  key: 'heroes',
  content: (generalData, matchData, heroData) => (
    <Container
      title={strings.heading_heroes}
      loading={heroData.loading}
      error={heroData.error}
    >
      <Table
        columns={heroColumns(strings)}
        data={heroData.data}
        paginated
        key="heroes"
      />
    </Container>
  ),
}, {
  name: strings.tab_players,
  key: 'players',
  content: (generalData, matchData, heroData, playerData) => (
    <div>
      <Container
        title={strings.heading_current_players}
        loading={playerData.loading}
        error={playerData.error}
      >
        <Table
          columns={memberColumns(strings)}
          data={playerData.data.filter(player => player.is_current_team_member)}
        />
      </Container>
      <Container
        title={strings.heading_former_players}
        loading={playerData.loading}
        error={playerData.error}
      >
        <Table
          columns={memberColumns(strings)}
          data={playerData.data.filter(player => !player.is_current_team_member)}
          paginated
          key="players"
        />
      </Container>
    </div>
  ),
}];

export default (teamId, strings) => teamPages(strings).map(page => ({
  ...page,
  route: `/teams/${teamId}/${page.key}`,
}));
