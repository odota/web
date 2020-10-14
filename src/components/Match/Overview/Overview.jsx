import React from 'react';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MatchGraph from '../../Visualizations/Graph/MatchGraph';
import TeamTable from '../TeamTable';
import AbilityDraftTable from '../AbilityDraftTable';
import mcs from '../matchColumns';
import BuildingMap from '../BuildingMap';
import Collapsible from './../../Collapsible/index';
import AbilityBuildTable from '../AbilityBuildTable';
import DeferredContainer from './../../DeferredContainer/index';

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
const toggleStyle = {
  width: '30px',
  float: 'right',
  right: '80px',
  top: '-12px',
  border: '1px solid rgba(179, 179, 179, 0.1)',
  padding: '6px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '5px',
};
class Overview extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({})
  };

  constructor(props) {
    super(props);
    this.state = {
      showStarterItems: false,
    };
    this.change = () => {
      const { showStarterItems } = this.state;
      this.setState({ showStarterItems: !showStarterItems });
    };
  }
  render() {
    const { match, strings, gosuUrl} = this.props;
    const { overviewColumns, abilityColumns, abilityDraftColumns } = mcs(
      strings
    );
    return (
      <div>
        {match.players[0].starting_items &&
        <Toggle
          onToggle={this.change}
          label="Starting Items"
          labelStyle={{
            color: '#b3b3b3',
            lineHeight: '13px',
            fontSize: '14px',
          }}
          style={toggleStyle}
          thumbStyle={{
            backgroundColor: 'rgb(179, 179, 179)',
            marginTop: '2px',
            marginRight: '3px',
          }}
          trackStyle={{
            position: 'absolute',
            marginTop: '2px',
            marginRight: '3px',
          }}
        />
        }
        <TeamTable
          players={match.players}
          columns={overviewColumns(match,this.state.showStarterItems)}
          heading={strings.heading_overview}
          buttonLabel={
            process.env.REACT_APP_ENABLE_GOSUAI ? strings.gosu_default : null
          }
          buttonTo={`${gosuUrl}Overview`}
          // buttonIcon={gosuIcon}
          picksBans={match.picks_bans}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          summable
          hoverRowColumn
          customWidth={960}
          radiantWin={match.radiant_win}
        />
        {match.game_mode === 18 && (
          <AbilityDraftTable
            players={match.players}
            columns={abilityDraftColumns()}
            heading={strings.heading_ability_draft}
            picksBans={match.picks_bans}
            radiantTeam={match.radiant_team}
            direTeam={match.dire_team}
            summable
          />
        )}
        <DeferredContainer>
          <Collapsible name="abilityBuilds" initialMaxHeight={800}>
            <AbilityBuildTable
              players={match.players}
              columns={abilityColumns()}
              heading={strings.heading_ability_build}
              radiantTeam={match.radiant_team}
              direTeam={match.dire_team}
            />
          </Collapsible>
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
        </DeferredContainer>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Overview);
