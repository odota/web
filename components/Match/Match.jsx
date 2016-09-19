import React from 'react';
import constants from 'dotaconstants';
import { connect } from 'react-redux';
// import { Card } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Table as MaterialTable, TableRow, TableRowColumn, TableBody } from 'material-ui/Table';
import { createTable } from '../Table';
import Table from '../Table/Table';
import { getMatch, setMatchSort } from '../../actions';
import MatchHeader from './MatchHeader';
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
} from './matchColumns.jsx';
import { sortMatch, transformMatch } from '../../selectors';
import BuildingMap from '../BuildingMap/BuildingMap';
import { REDUCER_KEY } from '../../reducers';
import { API_HOST } from '../../config';

const match = (state) => state[REDUCER_KEY].match.match;
const MatchTable = createTable(
  match,
  (state, sortState) => (sortState ? sortMatch(state) : transformMatch(state)),
  setMatchSort
);
const CastTable = ({ match, dataField, columns }) => (
  <Tabs>
    {match.players.map((p) =>
      (
      <Tab key={p.player_slot} icon={<img src={`${API_HOST}${constants.heroes[p.hero_id].img}`} width={30} role="presentation" />}>
        <Table
          data={p[dataField] || []}
          columns={columns}
        />
      </Tab>
      ))
    }
  </Tabs>);

const CrossTable = ({ match, field1, field2 }) => (
<MaterialTable selectable={false}>
<TableBody displayRowCheckbox={false}>
<TableRow>
<TableRowColumn>Hero</TableRowColumn>
{match.players.slice(0, match.players.length/2).map(p=>(<TableRowColumn key={p.hero_id}>{p.hero_id}</TableRowColumn>))}
</TableRow>
{match.players.slice(match.players.length/2, match.players.length).map(p=>(<TableRow key={p.hero_id}>
<TableRowColumn>{p.hero_id}</TableRowColumn>
{match.players.slice(0, match.players.length/2).map(p2=>{
const hero2 = constants.heroes[p2.hero_id] || {};
return <TableRowColumn key={p2.hero_id}>{`${p[field1][hero2.name] || 0}/${p[field2][hero2.name] || 0}`}</TableRowColumn>;
})}
</TableRow>))}
</TableBody>
</MaterialTable>);

const mapStateToProps = (state, { params }) => ({
  matchId: params.match_id,
  match: state[REDUCER_KEY].match.match,
  loading: state[REDUCER_KEY].match.loading,
  user: state[REDUCER_KEY].gotMetadata.user,
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
        <MatchHeader match={this.props.match} user={this.props.user} />
        <MatchTable columns={overviewColumns} />
        <MatchTable columns={abUpgradeColumns} />
        <BuildingMap match={this.props.match} loading={this.props.loading} />
        <MatchTable columns={benchmarksColumns(this.props.match)} />
        <CrossTable match={this.props.match} field1="killed" field2="killed_by" />
        <CrossTable match={this.props.match} field1="damage" field2="damage_taken" />
        <MatchTable columns={overallColumns} />
        <MatchTable columns={laningColumns} />
        <MatchTable columns={purchaseColumns} />
        <MatchTable columns={purchaseTimesColumns(this.props.match)} />
        <CastTable match={this.props.match} dataField="ability_uses_arr" columns={abilityUseColumns} />
        <CastTable match={this.props.match} dataField="item_uses_arr" columns={itemUseColumns} />
        <Table data={(this.props.match.chat || []).map(c => Object.assign({}, c, this.props.match.players[c.slot]))} columns={chatColumns} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
