import React from 'react';
import strings from 'lang';
import Container from '../components/Container';
import Table from '../components/Table';
import { matchColumns, memberColumns, heroColumns } from './teamDataColumns';
import { Row, MatchesContainer, MemberAndHeroContainer } from './TeamStyled';

const MAX_MATCHES_ROWS = 20;
const MAX_HEROES_ROWS = 10;

export default {
  name: strings.tab_overview,
  key: 'overview',
  content: (generalData, matchData, heroData, playerData) => (
    <Row>
      <MatchesContainer>
        <Container
          title={strings.heading_matches}
          loading={matchData.Loading}
          error={matchData.error}
        >
          <Table
            columns={matchColumns}
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
            columns={memberColumns}
            data={playerData.data.filter(player => player.is_current_team_member)}
          />
        </Container>
        <Container
          title={strings.heading_heroes}
          loading={heroData.loading}
          error={heroData.error}
        >
          <Table
            columns={heroColumns}
            data={heroData.data}
            maxRows={MAX_HEROES_ROWS}
          />
        </Container>
      </MemberAndHeroContainer>
    </Row>
  ),
};
