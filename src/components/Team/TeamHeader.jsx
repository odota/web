import React from 'react';
import strings from 'lang';
import { getTeamLogoUrl } from 'utility';
import { HeaderContainer, Logo, Column, TeamName, Row, TeamStatsCard } from './TeamStyled';

export default generalData => (
  <HeaderContainer loading={generalData.loading} error={generalData.error}>
    <Logo
      src={'https://steamcdn-a.akamaihd.net/apps/dota2/images/team_logos/2163.png'}
      alt=""
    />
    <Column>
      <TeamName>{generalData.data.name}</TeamName>
      <Row>
        <TeamStatsCard
          title={strings.th_wins}
          subtitle={<div className="textSuccess">{generalData.data.wins}</div>}
        />
        <TeamStatsCard
          title={strings.th_losses}
          subtitle={<div className="textDanger">{generalData.data.losses}</div>}
        />
        <TeamStatsCard
          title={strings.th_rating}
          subtitle={Math.floor(generalData.data.rating)}
        />
      </Row>
    </Column>
  </HeaderContainer>
);
