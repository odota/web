import React from 'react';
import constants from 'dotaconstants';
import { connect } from 'react-redux';
// import { Card } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import { createTable, Table } from '../Table';
import { getMatch, setMatchSort } from '../../actions';
import {
  overviewColumns,
  abUpgradeColumns,
  benchmarksColumns,
  overallColumns,
  laningColumns,
  chatColumns,
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

const mapStateToProps = (state, { params }) => ({
  matchId: params.match_id,
  // TODO transform the match with renderMatch function
  match: state[REDUCER_KEY].match.match,
  loading: state[REDUCER_KEY].match.loading,
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
        <div>
          <div>{`Match ${this.props.match.match_id}`}</div>
          <div>{this.props.match.radiant_win ? 'Radiant Victory' : 'Dire Victory'}</div>
          <RaisedButton href={`/request#${this.props.match.match_id}`} label={'Parse Replay'} />
          <RaisedButton href={this.props.match.replay_url} label={'Download Replay'} />
          <RaisedButton label={'Jist.tv'} />
          <RaisedButton label={'DotaCoach'} />
          <table>
            <thead>
              <tr>
                <th>Mode</th>
                <th>Region</th>
                <th>Duration</th>
                <th>Ended</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.match.game_mode}</td>
                <td>{this.props.match.region}</td>
                <td>{this.props.match.duration}</td>
                <td>{this.props.match.start_time + this.props.match.duration}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <MatchTable columns={overviewColumns} />
        <MatchTable columns={abUpgradeColumns} />
        <BuildingMap match={this.props.match} loading={this.props.loading} />
        <MatchTable columns={benchmarksColumns(this.props.match)} />
        <MatchTable columns={overallColumns} />
        <MatchTable columns={laningColumns} />
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
        <Table data={this.props.match.chat} columns={chatColumns} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
