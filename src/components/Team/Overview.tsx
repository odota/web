import React from 'react';
import Container from '../Container/Container';
import Table from '../Table/Table';
import { matchColumns, memberColumns, heroColumns } from './teamDataColumns';
import { Row, MatchesContainer, MemberAndHeroContainer } from './TeamStyled';

const MAX_MATCHES_ROWS = 20;
const MAX_HEROES_ROWS = 10;

export default (strings: Strings) => ({
  name: strings.tab_overview,
  key: 'overview',
  content: (
    generalData: any,
    matchData: any,
    heroData: any,
    playerData: any,
  ) => (
    <Row>
      <MatchesContainer>
        <Container
          title={strings.heading_matches}
          loading={matchData.Loading}
          error={matchData.error}
        >
          <Table
            columns={matchColumns(strings)}
            data={matchData.data}
            maxRows={MAX_MATCHES_ROWS}
          />
        </Container>
      </MatchesContainer>
      <MemberAndHeroContainer>
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
          title={strings.heading_heroes}
          loading={heroData.loading}
          error={heroData.error}
        >
          <Table
            columns={heroColumns(strings)}
            data={heroData.data}
            maxRows={MAX_HEROES_ROWS}
          />
        </Container>
      </MemberAndHeroContainer>
    </Row>
  ),
});
