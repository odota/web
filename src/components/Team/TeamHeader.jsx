import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { formatTemplateToString, getTeamLogoUrl } from '../../utility';
import { HeaderContainer, Logo, Column, TeamName, Row, TeamStatsCard } from './TeamStyled';

export default (generalData, strings) => (
  <HeaderContainer loading={generalData.loading} error={generalData.error}>
    <Logo
      src={getTeamLogoUrl(generalData.data.logo_url)}
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
      <Row>
        {process.env.REACT_APP_ENABLE_RIVALRY && <FlatButton
          label={formatTemplateToString(strings.app_rivalry_team, generalData.data.name)}
          icon={<img src="/assets/images/rivalry-icon.png" alt="" height="24px" />}
          href="https://rivalry.com/opendota"
          target="_blank"
          rel="noopener noreferrer"
        />}
      </Row>
    </Column>
  </HeaderContainer>
);
