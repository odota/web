import React from 'react';
import {
  connect,
} from 'react-redux';
import strings from 'lang';
// import { Card } from 'material-ui/Card';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import {
  getMatch,
  setMatchSort,
} from 'actions';
import {
  getMatchData,
  sortMatchPlayers,
  getMatchPlayers
} from 'reducers/match';
import {
  createTable,
} from '../Table';
import Table from '../Table/Table';
import MatchHeader from './MatchHeader';
import CastTable from './CastTable';
import CrossTable from './CrossTable';
import MatchGraph from './MatchGraph';
import {
  overviewColumns,
  abUpgradeColumns,
  benchmarksColumns,
  overallColumns,
  laningColumns,
  chatColumns,
  purchaseColumns,
  abilityUseColumns,
  itemUseColumns,
  purchaseTimesColumns,
  lastHitsTimesColumns,
  unitKillsColumns,
  actionsColumns,
  runesColumns,
} from './matchColumns.jsx';
import BuildingMap from '../BuildingMap/BuildingMap';
// import { TabBar } from '../TabBar';

const MatchPlayersTable = createTable(
  getMatchData,
  (state, sortState) => (sortState ? sortMatchPlayers(state) : getMatchPlayers(state)),
  setMatchSort
);

const mapStateToProps = (state, {
  params,
}) => ({
  matchId: params.match_id,
  match: state.app.match.match,
  loading: state.app.match.loading,
  user: state.app.metadata.user,
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
    const match = this.props.match;
    return (
      <div>
        <MatchHeader match={match} user={this.props.user} />
        <Tabs>
          <Tab label={strings.tab_overview}>
            <MatchPlayersTable columns={overviewColumns} />
            <MatchPlayersTable columns={abUpgradeColumns} />
            <BuildingMap match={match} loading={this.props.loading} />
          </Tab>
          <Tab label={strings.tab_benchmarks}>
            <MatchPlayersTable columns={benchmarksColumns(match)} />
          </Tab>
          <Tab label="Crosstables">
            <CrossTable match={match} field1="killed" field2="killed_by" />
            <CrossTable match={match} field1="damage" field2="damage_taken" />
          </Tab>
          <Tab label="Overall">
            <MatchPlayersTable columns={overallColumns} />
          </Tab>
          <Tab label="Laning">
            <MatchPlayersTable columns={laningColumns} />
          </Tab>
          <Tab label="Farm">
            <MatchPlayersTable columns={unitKillsColumns} />
            <MatchPlayersTable columns={lastHitsTimesColumns(match)} />
          </Tab>
          <Tab label={strings.tab_purchases}>
            <MatchPlayersTable columns={purchaseColumns} />
            <MatchPlayersTable columns={purchaseTimesColumns(match)} />
          </Tab>
          <Tab label="Graphs">
            <MatchGraph match={match} type="difference" />
            <MatchGraph match={match} type="gold" />
            <MatchGraph match={match} type="xp" />
            <MatchGraph match={match} type="lh" />
          </Tab>
          <Tab label="Abilities">
            <CastTable match={match} dataField="ability_uses_arr" columns={abilityUseColumns} />
          </Tab>
          <Tab label="Items">
            <CastTable match={match} dataField="item_uses_arr" columns={itemUseColumns} />
          </Tab>
          <Tab label={strings.tab_objectives}>
            <MatchPlayersTable columns={runesColumns} />
          </Tab>
          <Tab label={strings.tab_actions}>
            <MatchPlayersTable columns={actionsColumns} />
          </Tab>
          <Tab label={strings.tab_analysis} />
          <Tab label="Cosmetics" />
          <Tab label={strings.tab_chat}>
            <Table data={(match.chat || []).map(c => Object.assign({}, c, match.players[c.slot]))} columns={chatColumns} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
