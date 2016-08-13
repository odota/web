import React from 'react';
import fetch from 'isomorphic-fetch';
import { API_HOST } from '../../yasp.config';
// import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import c3 from 'c3';
import { connect } from 'react-redux';

const Distributions = ({ mmr, loading }) => {
  dispatch(getDistributionsStart());
  if (mmr) {
    const counts = mmr.map((d) => (d.count));
    const count = counts.reduce((c, n) => (c + n), 0);
    const names = mmr.map((d) => (d.bin_name));
    const pcts = mmr.map((d) => (d.cumulative_sum / count * 100));
    const options = {
      bindto: '#mmr',
      size: { height: 500 },
      data: {
        x: 'MMR',
        columns: [
          ['MMR'].concat(names),
          ['Players'].concat(counts),
          ['Percentile'].concat(pcts),
        ],
        type: 'bar',
        types: {
          Percentile: 'spline',
        },
        axes: {
          Players: 'y',
          Percentile: 'y2',
        },
        groups: [
          ['Players', 'Percentile'],
        ],
      },
      bar: {
        width: {
          ratio: 0.8,
        },
      },
      axis: {
        x: {
          label: 'MMR',
        },
        y: {
          label: '# Players',
        },
        y2: {
          show: true,
          label: 'Percentile',
        },
      },
      tooltip: {
        format: {
          value: function tooltip(value, ratio, id) {
            // also has ind param
            if (id === 'Percentile') {
              return value.toFixed(2);
            }
            return value;
          },
        },
      },
    };
    c3.generate(options);
    return (
      <Tabs>
        {Object.keys(this.state.data).map((key) => (
          <Tab label={key}>
            {(key === 'mmr') ?
              <div id="mmr" /> :
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(this.state.data[key], null, 2)}
              </pre>}
          </Tab>))
        }
      </Tabs>
    );
  }
}

export default Distributions;
