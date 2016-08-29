/* eslint-disable */
import React from 'react';
const ace = require('brace');
require('brace/mode/sql');
require('brace/theme/monokai');
//<script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js"></script>
import fetch from 'isomorphic-fetch';
import { API_HOST } from '../../config';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Spinner from '../Spinner';
import queries from './queries';
// import {blue300} from 'material-ui/styles/colors';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

function jsonResponse(response) {
  return response.json();
}
/*
// TODO query builder
// stat (hero_id, picks/bans, tower damage, hero damage, hero_healing, kills, deaths, assists, gpm, xpm, lh, dn, stat_t[minute], kills->>unit, purchase->>item, casts->>ability, uses->>item)
// where (none, patch, league, hero, player)
// group by (none, hero, player, league, team, month), aggregation (none, count, avg, sum)
// order by (stat descending)
// limit (default 1000)
// basic player_match data: league.name as leaguename, h.localized_name, np.name, stat
// basic agg data: count(*), agg(stat)
*/
/*
`
SELECT ${} 
FROM player_matches pm
LEFT JOIN notable_players np
ON pm.account_id = np.account_id
JOIN matches m
ON pm.match_id = m.match_id 
JOIN heroes h
ON pm.hero_id = h.id
JOIN leagues le
ON m.leagueid = le.leagueid
WHERE ${} 
GROUP BY ${} 
ORDER BY ${} 
LIMIT ${}
`
*/

class Explorer extends React.Component
{
  constructor() {
    super();
    this.state = {
      loading: false,
      result: {},
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleExampleChange = this.handleExampleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  componentDidMount() {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/sql');
    editor.setShowPrintMargin(false);
    this.editor = editor;
    const id = this.props.location.query.id;
    if (id) {
      this.setState(Object.assign({}, this.state, {
      loading: true,
      }));
      fetch(`${API_HOST}/api/explorer?id=${id}`).then(jsonResponse).then(this.handleResponse);
    }
  }
  handleQuery() {
    this.setState(Object.assign({}, this.state, { loading: true }));
    fetch(`${API_HOST}/api/explorer`, {
      method: 'post',
      headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: this.editor.getValue(),
      }),
    }).then(jsonResponse).then(this.handleResponse);
  }
  handleExampleChange(event, value) {
    this.editor.setValue(queries[value].sql);
    this.handleRequestClose();
  }
  handleResponse(json) {
    window.history.pushState('', '', `?id=${json.id}`);
    this.editor.setValue(json.sql);
    this.setState(Object.assign({}, this.state, {
      loading: false,
      open: false,
      result: json,
    }));
  }
  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  render() {
    return (<div>
      <h3>Data Explorer
        <small> - Explore data from Dota 2 matches </small>
        <a href='https://github.com/yasp-dota/yasp/blob/master/sql/create_tables.sql'>(Table Schema)</a>
      </h3>
      <div>
        <ul>
         <li>matches and player_matches tables only contain competitive matches in Professional and Premium tiers</li>
        </ul>
        <div>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            label={'Examples'}
          />
          <Popover
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            <Menu onChange={this.handleExampleChange}>
              {Object.keys(queries).map(k => {
                const e = queries[k];
                return <MenuItem value={k} primaryText={e.name} />;
              })
              }
            </Menu>
          </Popover>
        </div>
        <div>
          <div id={'editor'} style={{ width: '100%', height: 200 }}></div>
          <RaisedButton
            style={{ margin: '5px' }}
            label={'Query'}
            onClick={this.handleQuery}
          />
        </div>
      </div>
      <Tabs>
        <Tab label={'Table'}>
          {!this.state.loading ?
            <Table selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                <TableRow>
                  {this.state.result.result && !this.state.loading ?
                  this.state.result.result.fields.map(f => <TableHeaderColumn>{f.name}</TableHeaderColumn>) : []}
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.result.result && !this.state.loading ? this.state.result.result.rows.map(r => (<TableRow>
                  {Object.keys(r).map(k => <TableRowColumn>{r[k]}</TableRowColumn>)}
                </TableRow>)) : []}
              </TableBody>
            </Table> : <Spinner />
          }
        </Tab>
        <Tab label={'Raw'}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </Tab>
      </Tabs>
    </div>);
  }
}

export default Explorer;
