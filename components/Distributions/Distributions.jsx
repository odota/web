import React from 'react';
// import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import c3 from 'c3';
import { connect } from 'react-redux';
import { getDistributions } from '../../actions';
import { REDUCER_KEY } from '../../reducers';

const Distributions = ({ data }) => (
  <Tabs>
    {Object.keys(data).map((key) => (
      <Tab key={key} label={key}>
        {(key === 'mmr') ?
          <div id="mmr" /> :
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(data[key], null, 2)}
          </pre>}
      </Tab>))
    }
  </Tabs>
);

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchDistributions();
  }
  componentDidUpdate() {
    const data = this.props.data;
    const mmr = data && data.mmr && data.mmr.rows;
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
    }
  }
  render() {
    return <Distributions {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { error, loading, data } = state[REDUCER_KEY].distributions;
  return {
    error,
    loading,
    data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDistributions: () => dispatch(getDistributions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
