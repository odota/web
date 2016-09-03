import React from 'react';
import { connect } from 'react-redux';

import { getMatch, setMatchSort } from '../../actions';
import { REDUCER_KEY } from '../../reducers';
import { sortMatch, transformMatch } from '../../selectors';

import { createTable } from '../Table';
import BuildingMap from '../BuildingMap/BuildingMap';
import MatchHeader from './MatchHeader';
import {
  overviewColumns,
  abUpgradeColumns,
  benchmarksColumns,
} from './matchColumns.jsx';

const match = (state) => state[REDUCER_KEY].gotMatch.match;
const MatchTable = createTable(
  match,
  (state, sortState) => (sortState ? sortMatch(state) : transformMatch(state)),
  setMatchSort
);

const mapStateToProps = (state, { params }) => ({
  matchId: params.match_id,
  match: state[REDUCER_KEY].gotMatch.match,
  loading: state[REDUCER_KEY].gotMatch.loading,
});

const mapDispatchToProps = (dispatch) => ({
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
        <MatchHeader match={this.props.match} />
        <MatchTable columns={overviewColumns} />
        <MatchTable columns={abUpgradeColumns} />
        <BuildingMap match={this.props.match} loading={this.props.loading} />
        <MatchTable columns={benchmarksColumns(this.props.match)} />
      </div>
    );
  }
  // TODO party indicator
  // Overall (stacks/stuns/dead/biggest hit)
  // Laning (lane, eff/lh/dn, lane map)
  // skills (casts/hits/damage)
  // items (casts/hits/damage)
  // purchase counts
  // purchase times
  // Hero kill times
  // Ward maps
  // Unit kills
  // Last Hits
  // Graphs
  // Stuns/Dead/biggest hit
  // Teamfights
  // Chat
  // Analysis
  // Combat
  // Gold/XP sources
  // Streaks
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
