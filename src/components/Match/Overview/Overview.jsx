import React from 'react';
import strings from 'lang';
import styled from 'styled-components';
import MatchGraph from 'components/Visualizations/Graph/MatchGraph';
import TeamTable from '../TeamTable';
import AbilityBuildTable from '../AbilityBuildTable';
import AbilityDraftTable from '../AbilityDraftTable';
import { overviewColumns, abilityColumns, abilityDraftColumns } from '../matchColumns';
import BuildingMap from '../BuildingMap';

const Styled = styled.div`
  width: 100%;
  display: flex;
  vertical-align: top;
  .graph {
    margin-left: 30px;
    width: calc(100% - 300px);
  }
  .map {
    margin: 0 auto;
  }
  @media (max-width: 850px) {
    display: block;
    .graph {
      margin-left: 0;

      width: 100%;
    }
    .map {
      width: 300px;
    }
  }
`;

export default {
  name: strings.tab_overview,
  key: 'overview',
  content: match => (
    <div>
      {
        <TeamTable
          players={match.players}
          columns={overviewColumns(match)}
          heading={strings.heading_overview}
          picksBans={match.picks_bans}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          summable
          hoverRowColumn
        />
      }
      {
        match.game_mode === 18 &&
        <AbilityDraftTable
          players={match.players}
          columns={abilityDraftColumns()}
          heading={strings.heading_ability_draft}
          picksBans={match.picks_bans}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          summable
        />
      }
      {
        <AbilityBuildTable
          players={match.players}
          columns={abilityColumns()}
          heading={strings.heading_ability_build}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
        />
      }
      {
        <Styled>
          <div className="map">
            <BuildingMap match={match} />
          </div>
          {match.version && (
            <div className="graph">
              <MatchGraph match={match} type="difference" />
            </div>
          )}
        </Styled>
      }
    </div>
  ),
};
