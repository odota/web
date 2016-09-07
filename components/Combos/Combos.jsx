/* eslint-disable */
import React from 'react';
import fetch from 'isomorphic-fetch';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
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
    
class Combos extends React.Component
{
  constructor() {
    super();
    this.state = {
      hero_id: 1,
      team_size: 2,
      oppo_size: 0,
      loading: false,
      result: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  }
  handleSubmit() {
    this.setState(Object.assign({}, this.state, { loading: true }))
    fetch(`${API_HOST}/api/explorer`, {
  method: 'post',
  headers:
  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sql: `
    select
    ${[1,2,3,4,5].map(i => `${i <= this.state.team_size ? `pm${i}.hero_id` : `''`} team${i},`).join('')}
    ${[1,2,3,4,5].map(i => `${i <= this.state.oppo_size ? `pm${i+5}.hero_id` : `''`} opp${i},`).join('')}
    count(*), 
    sum(case when ((pm1.player_slot < 128) = m.radiant_win) then 1 else 0 end)::float / count(*) as win
    from player_matches pm1
    join player_matches pm2
    ON pm1.match_id = pm2.match_id 
    AND (pm1.player_slot < 128) = (pm2.player_slot < 128)
    AND pm2.hero_id != pm1.hero_id
    join player_matches pm3
    ON pm1.match_id = pm3.match_id 
    AND (pm1.player_slot < 128) = (pm3.player_slot < 128)
    AND pm3.hero_id > pm2.hero_id
    AND pm3.hero_id != pm1.hero_id
    join player_matches pm4
    ON pm1.match_id = pm4.match_id
    AND (pm1.player_slot < 128) = (pm4.player_slot < 128)
    AND pm4.hero_id > pm3.hero_id
    AND pm4.hero_id != pm1.hero_id
    join player_matches pm5
    ON pm1.match_id = pm5.match_id 
    AND (pm1.player_slot < 128) = (pm5.player_slot < 128)
    AND pm5.hero_id > pm4.hero_id
    AND pm5.hero_id != pm1.hero_id
    join player_matches pm6
    ON pm1.match_id = pm6.match_id 
    AND (pm1.player_slot < 128) != (pm6.player_slot < 128)
    join player_matches pm7
    ON pm1.match_id = pm7.match_id 
    AND (pm1.player_slot < 128) != (pm7.player_slot < 128)
    AND pm7.hero_id > pm6.hero_id
    join player_matches pm8
    ON pm1.match_id = pm8.match_id 
    AND (pm1.player_slot < 128) != (pm8.player_slot < 128)
    AND pm8.hero_id > pm7.hero_id
    join player_matches pm9
    ON pm1.match_id = pm9.match_id 
    AND (pm1.player_slot < 128) != (pm9.player_slot < 128)
    AND pm9.hero_id > pm8.hero_id
    join player_matches pm10
    ON pm1.match_id = pm10.match_id 
    AND (pm1.player_slot < 128) != (pm10.player_slot < 128)
    AND pm10.hero_id > pm9.hero_id
    JOIN matches m
    ON pm1.match_id = m.match_id
    WHERE pm1.hero_id = ${this.state.hero_id}
    GROUP BY 
    team1, 
    team2, 
    team3, 
    team4, 
    team5, 
    opp1,
    opp2,
    opp3,
    opp4,
    opp5
    HAVING count(*) > 5
    ORDER BY win DESC
    LIMIT 100
    `,
  }),
}).then(resp => resp.json()).then((json) => this.setState(Object.assign({}, this.state, {
      loading: false,
      result: json,
    })));
  }
  render() {
    return (<div>
      <h3>Hero Combos</h3>
      <SelectField value={this.state.hero_id} floatingLabelFixed={true} onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { hero_id: value }))} floatingLabelText="Hero">
        {Object.keys(constants.heroes)
        .sort((a,b) => constants.heroes[a].localized_name.localeCompare(constants.heroes[b].localized_name))
        .map(h => (
          <MenuItem value={constants.heroes[h].id} primaryText={constants.heroes[h].localized_name} />
        ))}
      </SelectField>
      <SelectField value={this.state.team_size} floatingLabelFixed={true} onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { team_size: value }))} floatingLabelText="Team Stack Size">
        {[1,2,3,4,5].map(i => (
          <MenuItem value={i} primaryText={i.toString()} />
        ))}
      </SelectField>
      <SelectField value={this.state.oppo_size} floatingLabelFixed={true} onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { oppo_size: value }))} floatingLabelText="Opponent Stack Size">
        {[0,1,2,3,4,5].map(i => (
          <MenuItem value={i} primaryText={i.toString()} />
        ))}
      </SelectField>
      <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} />
      {!this.state.loading ?
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              {this.state.result.result ?
              this.state.result.result.fields.map(f => <TableHeaderColumn>{f.name}</TableHeaderColumn>) : []}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.result.result ?
            this.state.result.result.rows.map(r => (
            <TableRow>
              {Object.keys(r).map((k, i) => <TableRowColumn>{i < 10 && constants.heroes[r[k]] ?
              <img src={`${API_HOST}${constants.heroes[r[k]].img}`} style={{width: '50px'}} /> : r[k]}</TableRowColumn>)}
            </TableRow>)) : <div />
            }
          </TableBody>
        </Table> : <Spinner />
      }
    </div>);
  }
}

export default Combos;
