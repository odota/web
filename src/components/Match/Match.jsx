import React from 'react';
import {
  connect,
} from 'react-redux';
import strings from 'lang';
// import { Card } from 'material-ui/Card';
import Spinner from 'components/Spinner';
import TabBar from 'components/TabBar';
import {
  getMatch,
  setMatchSort,
} from 'actions';
import {
  getMatchData,
  sortMatchPlayers,
  getMatchPlayers,
  getMatchLoading,
} from 'reducers/match';
import {
  getMetadataUser,
} from 'reducers/metadata';
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
  cosmeticsColumns,
  goldReasonsColumns,
  xpReasonsColumns,
  objectiveDamageColumns,
  logColumns,
  generateLog,
} from './matchColumns.jsx';
import BuildingMap from '../BuildingMap/BuildingMap';
// import { TabBar } from '../TabBar';

const MatchPlayersTable = createTable(
  getMatchData,
  (state, sortState) => (sortState ? sortMatchPlayers(state) : getMatchPlayers(state)),
  setMatchSort
);

const matchPages = [{
  name: strings.tab_overview,
  content: match => (<div>
    <MatchPlayersTable columns={overviewColumns} />
    <MatchPlayersTable columns={abUpgradeColumns} />
    <BuildingMap match={match} />
  </div>),
}, {
  name: strings.tab_benchmarks,
  content: match => (<div>
    <MatchPlayersTable columns={benchmarksColumns(match)} />
  </div>),
}, {
  name: strings.tab_combat,
  content: match => (<div>
    <CrossTable match={match} field1="killed" field2="killed_by" />
    <CrossTable match={match} field1="damage" field2="damage_taken" />
  </div>),
}, {
  name: strings.tab_performances,
  content: () => (<div>
    <MatchPlayersTable columns={overallColumns} />
    <MatchPlayersTable columns={laningColumns} />
  </div>),
}, {
  name: strings.tab_farm,
  content: match => (<div>
    <MatchPlayersTable columns={unitKillsColumns} />
    <MatchPlayersTable columns={lastHitsTimesColumns(match)} />
    <MatchPlayersTable columns={goldReasonsColumns} />
    <MatchPlayersTable columns={xpReasonsColumns} />
  </div>),
}, {
  name: strings.tab_purchases,
  content: match => (<div>
    <MatchPlayersTable columns={purchaseColumns} />
    <MatchPlayersTable columns={purchaseTimesColumns(match)} />
  </div>),
}, {
  name: strings.tab_graphs,
  content: match => (<div>
    <MatchGraph match={match} type="difference" />
    <MatchGraph match={match} type="gold" />
    <MatchGraph match={match} type="xp" />
    <MatchGraph match={match} type="lh" />
  </div>),
}, {
  name: strings.tab_casts,
  content: match => (<div>
    <CastTable match={match} dataField="ability_uses_arr" columns={abilityUseColumns} />
    <CastTable match={match} dataField="item_uses_arr" columns={itemUseColumns} />
  </div>),
}, {
  name: strings.tab_objectives,
  content: () => (<div>
    <MatchPlayersTable columns={objectiveDamageColumns} />
    <MatchPlayersTable columns={runesColumns} />
  </div>),
}, {
  name: strings.tab_vision,
  content: () => (<div />),
}, {
  name: strings.tab_actions,
  content: () => (<div>
    <MatchPlayersTable columns={actionsColumns} />
  </div>),
}, {
  name: strings.tab_teamfights,
  content: () => (<div>
    <div id="teamfights" />
  </div>),
}, {
  name: strings.tab_analysis,
  content: () => (<div />),
}, {
  name: strings.tab_cosmetics,
  content: () => (<div>
    <MatchPlayersTable columns={cosmeticsColumns} />
  </div>),
}, {
  name: strings.tab_log,
  content: match => (<div>
    <Table data={generateLog(match)} columns={logColumns} />
  </div>),
}, {
  name: strings.tab_chat,
  content: match => (<div>
    <Table data={(match.chat || []).map(c => Object.assign({}, c, match.players[c.slot]))} columns={chatColumns} />
  </div>),
}];

const matchPagesMapped = (matchId) => matchPages.map(page => ({
  ...page,
  route: `/matches/${matchId}/${page.name.toLowerCase()}`,
}));

const mapStateToProps = (state, {
  params,
}) => ({
  matchId: params.match_id,
  match: getMatchData(state),
  loading: getMatchLoading(state),
  user: getMetadataUser(state),
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
    const matchId = this.props.matchId;
    const info = this.props.routeParams.info || 'overview';
    return (
      <div>
        <MatchHeader match={match} user={this.props.user} />
        <div style={{ marginTop: 25 }}>
          <TabBar
            info={info}
            tabs={matchPagesMapped(matchId)}
          />
        </div>
        {match ? matchPagesMapped(matchId).filter(page => page.name.toLowerCase() === info).map(page => page.content(match)) : <Spinner />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
