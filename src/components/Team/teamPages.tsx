import React from 'react';
import Container from '../Container/Container';
import Table from '../Table/Table';
import Overview from './Overview';
import { matchColumns, memberColumns, heroColumns } from './teamDataColumns';

const teamPages = (strings: Strings) => [
  Overview(strings),
  {
    name: strings.tab_matches,
    key: 'matches',
    content: (generalData: any, matchData: any) => (
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
  },
  {
    name: strings.tab_heroes,
    key: 'heroes',
    content: (generalData: any, matchData: any, heroData: any) => (
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
  },
  {
    name: strings.tab_players,
    key: 'players',
    content: (
      generalData: any,
      matchData: any,
      heroData: any,
      playerData: any,
    ) => (
      <div>
        <Container
          title={strings.heading_current_players}
          loading={playerData.loading}
          error={playerData.error}
        >
          <Table
            columns={memberColumns(strings)}
            data={playerData.data.filter(
              (player: any) => player.is_current_team_member,
            )}
          />
        </Container>
        <Container
          title={strings.heading_former_players}
          loading={playerData.loading}
          error={playerData.error}
        >
          <Table
            columns={memberColumns(strings)}
            data={playerData.data.filter(
              (player: any) => !player.is_current_team_member,
            )}
            paginated
            key="players"
          />
        </Container>
      </div>
    ),
  },
];

export default (teamId: string | undefined, strings: Strings) =>
  teamPages(strings).map((page) => ({
    ...page,
    route: `/teams/${teamId}/${page.key}`,
  }));
