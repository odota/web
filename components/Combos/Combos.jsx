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
    ${[1,2,3,4,5].map(i => `${i <= this.state.oppo_size ? `opm${i}.hero_id` : `''`} opp${i},`).join('')}
    count(*), 
    sum(case when ((pm1.player_slot < 128) = m.radiant_win) then 1 else 0 end)::float / count(*) as win
    from player_matches pm1
    ${[2,3,4,5].map(i => i <= this.state.team_size ? `
    JOIN player_matches pm${i} 
    ON pm1.match_id = pm${i}.match_id 
    AND (pm1.player_slot < 128) = (pm${i}.player_slot < 128)
    AND pm1.hero_id != pm${i}.hero_id
    ${i >= 3 ? `AND pm${i}.hero_id > pm${i-1}.hero_id` : ''}
    ` : '').join('')}
    ${[1,2,3,4,5].map(i => i <= this.state.oppo_size ? `
    JOIN player_matches opm${i} 
    ON pm1.match_id = opm${i}.match_id 
    AND (pm1.player_slot < 128) != (opm${i}.player_slot < 128)
    ${i >= 2 ? `AND opm${i}.hero_id > opm${i-1}.hero_id` : ''}
    ` : '').join('')}
    JOIN matches m
    ON pm1.match_id = m.match_id
    WHERE pm1.hero_id = ${this.state.hero_id}
    GROUP BY
    ${[1,2,3,4,5].map(i => `team${i}`)
    .concat([1,2,3,4,5].map(i => `opp${i}`))
    .join()}
    HAVING count(*) > 5
    ORDER BY win DESC
    LIMIT 1000
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
                  {
                    Object.keys(r).map((k, i) => (
                      k.indexOf('team') === 0 || k.indexOf('opp') === 0) && constants.heroes[r[k]] ? 
                        <TableRowColumn>
                          <img src={`${API_HOST}${constants.heroes[r[k]].img}`} style={{width: '50px'}} title={r[k]} />
                          <div>{constants.heroes[r[k]].localized_name}</div>
                        </TableRowColumn>
                      : <TableRowColumn>
                          {k === 'win' ?
                            r[k].toFixed(4)*100 + "%"
                            : r[k]
                          }
                        </TableRowColumn>
                    )
                  }
                </TableRow>
                )
              )
              : <div />
            }
          </TableBody>
        </Table> : <Spinner />
      }
    </div>);
  }
}

export default Combos;
