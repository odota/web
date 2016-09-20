import React from 'react';
import constants from 'dotaconstants';
import { connect } from 'react-redux';
// import { Card } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
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
} from './matchColumns.jsx';
import { sortMatch, transformMatch } from '../../selectors';
import BuildingMap from '../BuildingMap/BuildingMap';
import { REDUCER_KEY } from '../../reducers';
import { API_HOST } from '../../config';
import { renderMatch } from './renderMatch';

const match = (state) => state[REDUCER_KEY].match.match;
const MatchTable = createTable(
  match,
  (state, sortState) => (sortState ? sortMatch(state) : transformMatch(state)),
  setMatchSort
);

const mapStateToProps = (state, { params }) => ({
  matchId: params.match_id,
  match: renderMatch(state[REDUCER_KEY].match.match),
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
        <MatchTable columns={overallColumns} />
        <MatchTable columns={laningColumns} />
        <MatchTable columns={purchaseColumns} />
        <Tabs>
          {this.props.match.players.map(p =>
            (
            <Tab icon={<img src={`${API_HOST}${constants.heroes[p.hero_id].img}`} width={30} role="presentation" />}>
              <Table
                data={Object.keys(p.ability_uses || {}).map(k => ({
                  name: k,
                  casts: (p.ability_uses || {})[k],
                  hero_hits: (p.hero_hits || {})[k],
                  damage_inflictor: (p.damage_inflictor || {})[k],
                }))}
                columns={[{ displayName: 'Ability', field: 'name' },
              { displayName: 'Casts', field: 'casts', sortFn: true },
              { displayName: 'Hits', field: 'hero_hits', sortFn: true },
              { displayName: 'Damage', field: 'damage_inflictor', sortFn: true }]}
              />
            </Tab>
            ))
          }
        </Tabs>
        <Table data={this.props.match.chat.map(c => Object.assign({}, c, this.props.match.players[c.slot]))} columns={chatColumns} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
