import React from 'react';
import { createTable } from '../Table';
import { getMatch, setMatchSort } from '../../actions';
import { connect } from 'react-redux';
import { overviewColumns, abUpgradeColumns } from '../Table/columnDefinitions/matchColumns.jsx';
import { sortMatch, transformMatch, transformAbilityUpgrades } from '../../selectors';
import BuildingMap from '../BuildingMap/BuildingMap';
import { REDUCER_KEY } from '../../reducers';

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
        <MatchTable columns={overviewColumns} />
        <AbilityUpgradesTable columns={abUpgradeColumns} />
        <BuildingMap match={this.props.match} loading={this.props.loading} />
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
