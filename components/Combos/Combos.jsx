/* eslint-disable */
import React from 'react';
import fetch from 'isomorphic-fetch';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Tabs, Tab } from 'material-ui/Tabs';
import constants from 'dotaconstants';
import Spinner from '../Spinner';
import { API_HOST } from '../../config';
// import {blue300} from 'material-ui/styles/colors';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

function getFetchOptions(heroId, type) {
  return {
  method: 'post',
  headers:
  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sql: `
    select
    h2.localized_name hero2, 
    count(*), 
    sum(case when ((pm.player_slot < 128) = m.radiant_win) then 1 else 0 end)::float / count(*) as win
    from player_matches pm 
    join player_matches pm2
    ON pm.match_id = pm2.match_id 
    AND (pm.player_slot < 128) ${type === 'against' ? '!=' : '='} (pm2.player_slot < 128)
    JOIN matches m
    ON pm.match_id = m.match_id
    JOIN heroes h
    ON pm.hero_id = h.id
    JOIN heroes h2
    ON pm2.hero_id = h2.id
    WHERE pm.hero_id = ${heroId}
    AND pm.hero_id != pm2.hero_id
    GROUP BY hero2
    ORDER BY count DESC`,
  }),
}
}
    
class Combos extends React.Component
{
  constructor() {
    super();
    this.state = {
      hero_id: 1,
      with_loading: false,
      against_loading: false,
      with_result: {},
      against_result: {},
    };
    this.handleHeroChange = this.handleHeroChange.bind(this);
  }
  componentDidMount() {
  }
  handleHeroChange(e, i, heroId) {
    this.setState(Object.assign({}, this.state, { with_loading: true, against_loading: true, hero_id: heroId }));
    fetch(`${API_HOST}/api/explorer`, getFetchOptions(heroId, 'with')).then(resp => resp.json()).then((json) => this.setState(Object.assign({}, this.state, {
      with_loading: false,
      with_result: json,
    })));
    fetch(`${API_HOST}/api/explorer`, getFetchOptions(heroId, 'against')).then(resp => resp.json()).then((json) => this.setState(Object.assign({}, this.state, {
      against_loading: false,
      against_result: json,
    })));
  }
  render() {
    return (<div>
      <h3>Hero Combos</h3>
      <DropDownMenu value={this.state.hero_id} onChange={this.handleHeroChange}>
        {Object.keys(constants.heroes)
        .sort((a,b) => constants.heroes[a].localized_name.localeCompare(constants.heroes[b].localized_name))
        .map(h => (
          <MenuItem value={constants.heroes[h].id} primaryText={constants.heroes[h].localized_name} />
        ))}
      </DropDownMenu>
      <Tabs>
              <Tab label={'With'}>

      {!this.state.with_loading ?
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              {this.state.with_result.result ?
              this.state.with_result.result.fields.map(f => <TableHeaderColumn>{f.name}</TableHeaderColumn>) : []}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.with_result.result ?
            this.state.with_result.result.rows.map(r => (
            <TableRow>
              {Object.keys(r).map(k => <TableRowColumn>{r[k]}</TableRowColumn>)}
            </TableRow>)) : <div />
            }
          </TableBody>
        </Table> : <Spinner />
      }
      </Tab>
      <Tab label={'Against'}>
      {!this.state.against_loading ?
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              {this.state.against_result.result ?
              this.state.against_result.result.fields.map(f => <TableHeaderColumn>{f.name}</TableHeaderColumn>) : []}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.against_result.result ?
            this.state.against_result.result.rows.map(r => (
            <TableRow>
              {Object.keys(r).map(k => <TableRowColumn>{r[k]}</TableRowColumn>)}
            </TableRow>)) : <div />
            }
          </TableBody>
        </Table> : <Spinner />
      }
      </Tab>
      </Tabs>
    </div>);
  }
}

export default Combos;
