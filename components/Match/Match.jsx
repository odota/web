import React from 'react';
import { createTable } from '../Table';
import { getMatch, setMatchSort } from '../../actions';
import { connect } from 'react-redux';
import {
  overviewColumns,
  abUpgradeColumns,
  benchmarksColumns,
} from '../Table/columnDefinitions/matchColumns.jsx';
import { sortMatch, transformMatch, transformAbilityUpgrades } from '../../selectors';
import BuildingMap from '../BuildingMap/BuildingMap';
import { REDUCER_KEY } from '../../reducers';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const players = (state) => state[REDUCER_KEY].gotMatch.match.players;
const MatchTable = createTable(
  players,
  (state, sortState) => (sortState ? sortMatch(state) : transformMatch(state)),
  setMatchSort
);
const AbilityUpgradesTable = createTable(
  players,
  state => transformAbilityUpgrades(state),
  setMatchSort
);

const mapStateToProps = (state, { params }) => ({
  matchId: params.match_id,
  match: state[REDUCER_KEY].gotMatch.match,
  loading: state[REDUCER_KEY].gotMatch.loading,
});

const mapDispatchToProps = (dispatch) => ({
  sort: (column) => dispatch(getMatch(column)),
  getMatch: (matchId) => dispatch(getMatch(matchId)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.routeParams.match_id);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match_id !== nextProps.match_id) {
      this.props.getMatch(nextProps.match_id);
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>{`Match ${this.props.match.match_id}`}</div>
          <div>{this.props.match.radiant_win ? 'Radiant Victory' : 'Dire Victory'}</div>
          <RaisedButton href={`/request#${this.props.match.match_id}`} label={'Parse Replay'} />
          <RaisedButton href={this.props.match.replay_url} label={'Download Replay'} />
          <RaisedButton label={'Jist.tv'} />
          <RaisedButton label={'DotaCoach'} />
          <table>
            <tr>
              <th>Mode</th>
              <th>Region</th>
              <th>Duration</th>
              <th>Ended</th>
            </tr>
            <tr>
              <td>{this.props.match.game_mode}</td>
              <td>{this.props.match.region}</td>
              <td>{this.props.match.duration}</td>
              <td>{this.props.match.start_time + this.props.match.duration}</td>
            </tr>
          </table>
        </div>
        <Card>
          <MatchTable columns={overviewColumns} />
        </Card>
        <Card>
          <AbilityUpgradesTable columns={abUpgradeColumns} />
        </Card>
        <Card>
          <BuildingMap match={this.props.match} loading={this.props.loading} />
        </Card>
        <MatchTable columns={benchmarksColumns(this.props.match)} />
      </div>
    );
  }
  // MatchHeader
  // Benchmarks
  // purchase counts
  // purchase times
  // Hero kill times
  // Abilities
  // Items
  // Ward maps
  // Unit kills
  // Last Hits
  // Graphs
  // Laning
  // Stuns/Dead/biggest hit
  // Teamfights
  // Chat
  // Analysis
  // Combat
  // Gold/XP sources
  // Streaks
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
