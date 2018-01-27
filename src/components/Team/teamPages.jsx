import React from 'react';
import strings from 'lang';
import Container from 'components/Container';
import Table from 'components/Table';
import Overview from './Overview';
import { matchColumns, memberColumns, heroColumns } from './teamDataColumns';

const teamPages = [Overview, {
  name: strings.tab_matches,
  key: 'matches',
  content: (generalData, matchData) => (
    <Container
      title={strings.heading_matches}
      loading={matchData.loading}
      error={matchData.error}
    >
      <Table
        columns={matchColumns}
        data={matchData.data}
        paginated
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
        columns={heroColumns}
        data={heroData.data}
        paginated
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
          columns={memberColumns}
          data={playerData.data.filter(player => player.is_current_team_member)}
        />
      </Container>
      <Container
        title={strings.heading_former_players}
        loading={playerData.loading}
        error={playerData.error}
      >
        <Table
          columns={memberColumns}
          data={playerData.data.filter(player => !player.is_current_team_member)}
          paginated
        />
      </Container>
    </div>
  ),
}];

export default teamId => teamPages.map(page => ({
  ...page,
  route: `/teams/${teamId}/${page.key}`,
}));
