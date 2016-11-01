/* global window ace API_HOST */
import React from 'react';
import fetch from 'isomorphic-fetch';
import Spinner from 'components/Spinner';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
// import { Tabs, Tab } from 'material-ui/Tabs';
/*
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
*/
/*
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
*/
import Table from 'components/Table';
import Heading from 'components/Heading';
// import queries from './queries';
// import {blue300} from 'material-ui/styles/colors';

/*
const ace = require('brace');
require('brace/mode/sql');
require('brace/theme/monokai');
*/

function jsonResponse(response) {
  return response.json();
}
// TODO autocompletion?
// TODO keyboard hotkey to execute (F5?)
// TODO graphical query builder
// TODO JSON download/curl?
// hero_id,
// picks/bans,
// tower damage,
// hero damage,
// hero_healing,
// kills, deaths, assists,
// gpm, xpm, lh, dn,
// stat_t[minute], kills->>unit, purchase->>item, casts->>ability, uses->>item
// where (none, patch, league, hero, player)
// group by (none, hero, player, league, team, month), aggregation (none, count, avg, sum)
// order by (stat descending)
// limit (default 1000)
// basic player_match data: league.name as leaguename, h.localized_name, np.name, stat
// basic agg data: count(*), agg(stat)
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
    this.handleResponse = this.handleResponse.bind(this);
    /*
    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleExampleChange = this.handleExampleChange.bind(this);
    */
  }
  componentDidMount() {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/sql');
    editor.setShowPrintMargin(false);
    editor.setOptions({
      minLines: 10,
      maxLines: Infinity,
    });
    this.editor = editor;
    const sql = this.props && this.props.location && this.props.location.query && this.props.location.query.sql;
    if (sql) {
      editor.setValue(decodeURIComponent(sql));
      this.handleQuery();
    } else {
      editor.setValue('select count(*) from matches;');
    }
  }
  handleQuery() {
    this.setState(Object.assign({}, this.state, { loading: true }));
    const queryString = `?sql=${encodeURIComponent(this.editor.getSelectedText() || this.editor.getValue())}`;
    window.history.pushState('', '', queryString);
    fetch(`${API_HOST}/api/explorer${queryString}`).then(jsonResponse).then(this.handleResponse);
  }
  handleResponse(json) {
    this.setState(Object.assign({}, this.state, {
      loading: false,
      open: false,
      result: json,
    }));
  }
  /*
  handleRequestOpen() {
    this.setState({
      open: true,
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  handleExampleChange(event, value) {
    this.editor.setValue(queries[value].sql);
    this.handleRequestClose();
  }
  */
  render() {
    return (<div>
      <Heading title="Data Explorer" subtitle="Explore data from Dota 2 matches" />
      <ul>
        <li><a href="https://github.com/odota/core/blob/master/sql/create_tables.sql">Table Schema</a></li>
        <li>matches and player_matches tables only contain competitive matches in Professional and Premium tiers</li>
        <li>Queries are read-only and time out after 30 seconds</li>
        <li>Select part of the input to send only the selected text</li>
      </ul>
      {
      /*
      <div>
        <RaisedButton
          onClick={this.handleRequestOpen}
          label={'Examples'}
        />
        <Popover
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <Menu onChange={this.handleExampleChange}>
            {Object.keys(queries).filter(k => Boolean(queries[k].name)).map((k) => {
              const e = queries[k];
              return <MenuItem value={k} primaryText={e.name} />;
            })
            }
          </Menu>
        </Popover>
      </div>
      */
      }
      <Heading title="SQL Query" />
      <div id={'editor'} style={{ width: '100%', height: 200 }} />
      <RaisedButton
        style={{ margin: '5px' }}
        label={'Query'}
        onClick={this.handleQuery}
      />
      <Heading title="Results" />
      <pre style={{ color: 'red' }}>{this.state.result.err}</pre>
      {!this.state.loading ?
        <Table
          data={this.state.result.rows || []}
          columns={(this.state.result.fields || []).map(column => ({
            displayName: column.name,
            field: column.name,
            displayFn: (row, col, field) => {
              if (column.name === 'match_id') {
                return <Link to={`/matches/${field}`}>{field}</Link>;
              }
              return JSON.stringify(field);
            },
          }))}
        />
        : <Spinner />
      }
    </div>);
  }
}

export default Explorer;
