import React from 'react';
import fetch from 'isomorphic-fetch';
import { API_HOST } from '../../yasp.config';
import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import c3 from 'c3';

function jsonResponse(response) {
  return response.json();
}

class Distributions extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoading: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.gotData = this.gotData.bind(this);
  }
  gotData(json) {
    this.setState(Object.assign({}, this.state, {data: json}));
    var mmr = this.state.data.mmr && this.state.data.mmr.rows;
    if (mmr) {
      var counts = mmr.map(function(d){return d.count;});
      var count = counts.reduce(function(c,n){return c+n;},0);
      var names = mmr.map(function(d){return d.bin_name});
      var pcts = mmr.map(function(d){return d.cumulative_sum/count*100;});
      var options = {
          bindto: "#mmr",
          size: {height: 500},
          data: {
              x: 'MMR',
              columns: [
              ['MMR'].concat(names),
              ['Players'].concat(counts),
              ['Percentile'].concat(pcts)
              ],
              type: "bar",
              types: {
              "Percentile": "spline"
              },
              axes: {
              "Players":"y",
              "Percentile":"y2"
              },
              groups: [
              ['Players','Percentile']
              ]
          },
          bar: {
              width: {
                  ratio: 0.8
              }
          },
          axis: {
              x: {
                  label: "MMR"
              },
              y: {
                  label: "# Players"
              },
              y2: {
                  show:true,
                  label: "Percentile"
              }
          },
          tooltip: {
              format: {
                  value: function(value, ratio, id, ind) {
                      if (id==="Percentile"){
                          return value.toFixed(2);
                      }
                      return value;
                  }
              }
          }
      };
      c3.generate(options);
    }
  }
  componentDidMount() {
    fetch(`${API_HOST}/api/distributions`).then(jsonResponse).then(this.gotData);
  }
  render() {
    return (
     <Tabs>
       {Object.keys(this.state.data).map((key)=>{
          return (
            <Tab label={key}>
              {(key === 'mmr') ? <div id="mmr" /> : 
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(this.state.data[key], null, 2)}
              </pre>}
            </Tab>);
       })}
      </Tabs>
    );
  }
}

export default Distributions;