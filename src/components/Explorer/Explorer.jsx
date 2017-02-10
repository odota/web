/* global window ace API_HOST */
import React from 'react';
import fetch from 'isomorphic-fetch';
import Spinner from 'components/Spinner';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import strings from 'lang';
import { getScript } from 'utility';
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
// TODO row count
// TODO query history
// TODO presaved queries
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


class Explorer extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingEditor: true,
      querying: false,
      result: {},
    };
    this.instantiateEditor = this.instantiateEditor.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    /*
    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleExampleChange = this.handleExampleChange.bind(this);
    */
  }
  componentDidMount() {
    getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js', this.instantiateEditor);
  }
  instantiateEditor() {
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
    this.setState(Object.assign({}, this.state, { loadingEditor: false }));
  }
  handleQuery() {
    if (this.state.loadingEditor === true) {
      return;
    }
    this.setState(Object.assign({}, this.state, { querying: true }));
    const queryString = `?sql=${encodeURIComponent(this.editor.getSelectedText() || this.editor.getValue())}`;
    window.history.pushState('', '', queryString);
    fetch(`${API_HOST}/api/explorer${queryString}`).then(jsonResponse).then(this.handleResponse);
  }
  handleResponse(json) {
    this.setState(Object.assign({}, this.state, {
      querying: false,
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
      <Helmet title={strings.title_explorer} />
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
      {this.state.loadingEditor && <Spinner />}
      <div
        id={'editor'}
        style={{
          width: '100%',
          height: 200,
          display: this.state.loadingEditor ? 'none' : 'block',
        }}
      />
      <RaisedButton
        style={{ margin: '5px' }}
        label={'Query'}
        onClick={this.handleQuery}
        disabled={this.state.loadingEditor}
      />
      <Heading title="Results" />
      <pre style={{ color: 'red' }}>{this.state.result.err}</pre>
      {!this.state.querying ?
        <Table
          data={this.state.result.rows || []}
          columns={(this.state.result.fields || []).map(column => ({
            displayName: column.name,
            field: column.name,
            displayFn: (row, col, field) => {
              if (column.name === 'match_id') {
                return <Link to={`/matches/${field}`}>{field}</Link>;
              }
              return typeof field === 'string' ? field : JSON.stringify(field);
            },
          }))}
        />
        : <Spinner />
      }
    </div>);
  }
}

export default Explorer;
