import React from 'react';
const ace = require('brace');
require('brace/mode/sql');
require('brace/theme/monokai');
import fetch from 'isomorphic-fetch';
import { HOST_URL } from '../../yasp.config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import { Tabs, Tab } from 'material-ui/Tabs';
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

function handleResponse(json) {
  this.editor.setValue(json.sql);
  window.history.pushState('', '', `?id=${json.id}`);
  this.setState(Object.assign({}, this.state, {
    result: json,
  }));
}

function handleExamples(json) {
  this.setState(Object.assign({}, this.state, {
    examples: json,
  }));
}

class Explorer extends React.Component
{
  constructor() {
    super();
    this.state = {
      examples: [],
      result:
      {
        result:
        {
          rows: [],
          fields: [],
        },
      },
    };
  }
  componentDidMount() {
    this.editor = ace.edit('editor');
    this.handleClick = this.handleClick.bind(this);
    const editor = this.editor;
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/sql');
    editor.setShowPrintMargin(false);
    const id = this.props.location.query.id;
    if (id) {
      fetch(`${HOST_URL}/api/explorer?id=${id}`).then(jsonResponse).then(handleResponse.bind(this));
    }
    fetch(`${HOST_URL}/api/explorer/examples`).then(jsonResponse).then(handleExamples.bind(this));
  }
  handleClick() {
    fetch(`${HOST_URL}/api/explorer`, {
      method: 'post',
      headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        sql: this.editor.getValue(),
      }),
    }).then(jsonResponse).then(handleResponse.bind(this));
  }
  render() {
    return (<div>
      <h3>Data Explorer
        <small> - Explore data from professional Dota 2 matches</small>
      </h3>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '50%',
            height: '400px',
            overflow: 'auto',
          }}
        >
          <h4>Examples</h4>
          <List id={'example'}>
            {this.state.examples.map(e => (
              <a href={`/explorer?id=${e.id}`}>
                <ListItem primaryText={e.name} />
              </a>
            ))}
          </List>
        </div>
        <div style={{ width: '50%' }}>
          <TextField
            id={'name'}
            hintText={'Name this query'}
            value={this.state.result.name}
          />
          <h4>SQL</h4>
          <div id={'editor'} style={{ width: '100%', height: '200px' }}></div>
          <RaisedButton
            label={'Query'}
            onClick={this.handleClick}
          />
        </div>
      </div>
      <Tabs>
        <Tab label={'Table'}>
          <Table id={'table'}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
              <TableRow>
                {this.state.result.result ? this.state.result.result.fields.map(f => (
                  <TableHeaderColumn>{f.name}</TableHeaderColumn>
                )) : []}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.result.result ? this.state.result.result.rows.map(r => (
                <TableRow>
                  {Object.keys(r).map(k => <TableRowColumn>{r[k]}</TableRowColumn>)}
                </TableRow>
              )) : []}
            </TableBody>
          </Table>
        </Tab>
        <Tab label={'Raw'}>
          <pre id={'result'}>
            {JSON.stringify(this.state.result, null, 2)}
          </pre>
        </Tab>
      </Tabs>
    </div>);
  }
}

export default Explorer;
