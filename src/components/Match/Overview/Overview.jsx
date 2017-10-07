import React from 'react';
import strings from 'lang';
import styled from 'styled-components';
import MatchGraph from 'components/Visualizations/Graph/MatchGraph';
import TeamTable from '../TeamTable';
import AbilityBuildTable from '../AbilityBuildTable';
import { overviewColumns, abilityColumns } from '../matchColumns';
import BuildingMap from '../BuildingMap';

const Styled = styled.div`
  width: 100%;

  & > div {
    display: inline-block;
    vertical-align: top;
  }

  & .graph {
    margin-left: 30px;
    width: calc(100% - 312px - 50px);

    & svg[style='overflow: hidden;'] {
      margin-top: 14px;
    }
  }

  & .map {
    margin: 0 auto;
  }

  @media only screen and (max-width: 370px) {
    & .map {
      width: 262px !important;
    }
  }

  @media only screen and (max-width: 1023px) {
    & > div {
      display: block;
    }

    & .graph {
      margin-left: 0;
      width: 100%;
    }

    & .map {
      width: 312px;
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
        />
      }
      {
        <AbilityBuildTable
          players={match.players}
          columns={abilityColumns()}
          heading={'Ability Build'}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
        />
      }
      {
        <Styled>
          <div className="map">
            <BuildingMap match={match} />
          </div>
          {match.version && <div>
            <MatchGraph match={match} width={900} type="difference" />
          </div>}
        </Styled>
      }
    </div>
  ),
};
