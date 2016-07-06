import React from 'react';
import styles from './Explorer.css';
const ace = require('brace');
require('brace/mode/sql');
require('brace/theme/monokai');
import fetch from 'isomorphic-fetch';
import
{
    HOST_URL
}
from '../../yasp.config';
import RaisedButton from 'material-ui/RaisedButton';
class Explorer extends React.Component
{
    componentDidMount()
    {
        this.editor = ace.edit("editor");
        var editor = this.editor;
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/sql");
        editor.setShowPrintMargin(false);
        var id = this.props.location.query.id;
        if (id)
        {
            fetch(`${HOST_URL}/api/explorer?id=${id}`).then(function(response)
            {
                return response.json();
            }).then(this.handleResponse.bind(this));
        }
    }
    handleClick()
    {
        fetch(`${HOST_URL}/api/explorer`,
        {
            method: 'post',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                name: document.getElementById('name').value,
                sql: this.editor.getValue()
            }),
        }).then(function(response)
        {
            return response.json();
        }).then(this.handleResponse.bind(this));
    }
    handleResponse(json)
    {
        this.editor.setValue(json.sql);
        document.getElementById('name').value = json.name;
        document.getElementById('result').innerHTML = JSON.stringify(json, null, 2);
        window.history.pushState('', '', '?id=' + json.id);
    }
    render()
    {
        return (<div>
          <h3>Data Explorer 
          <small>Explore data from professional Dota 2 matches</small>
          </h3>
          <div>
              <div>
                  <input id="name" type="text" placeholder="Name this query" class="form-control" />
              </div>
              <h4>SQL</h4>
              <div id="editor" style={{width: "100%", height: "200px"}}></div>
              <RaisedButton
                label="Query"
                onClick={this.handleClick.bind(this)}
              />
              <h4>Result</h4>
              <pre id="result"></pre>
          </div>
      </div>);
    }
}
export default Explorer;