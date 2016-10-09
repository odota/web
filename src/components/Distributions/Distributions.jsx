import React from 'react';
// import CircularProgress from 'material-ui/CircularProgress';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import c3 from 'c3';
import {
  connect,
} from 'react-redux';
import {
  getDistributions,
} from 'actions';
import strings from 'lang';
import Table from 'components/Table';
import Heading from 'components/Heading';

const countryMmrColumns = [{
  displayName: 'Country',
  field: 'common',
}, {
  displayName: 'Count',
  field: 'count',
}, {
  displayName: 'Average',
  field: 'avg',
}];

const Distributions = ({
  data,
}) => (
  <Tabs>
    {Object.keys(data).map(key => (
      <Tab key={key} label={strings[`distributions_${key}`]}>
        <Heading title={strings[`distributions_${key}`]} />
        {(key === 'mmr') ?
          <div id="mmr" /> :
            <Table data={data[key].rows} columns={countryMmrColumns} />}
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
      const counts = mmr.map(d => (d.count));
      const count = counts.reduce((c, n) => (c + n), 0);
      const names = mmr.map(d => (d.bin_name));
      const pcts = mmr.map(d => ((d.cumulative_sum / count) * 100));
      const options = {
        bindto: '#mmr',
        size: {
          height: 500,
        },
        data: {
          x: strings.abbr_mmr,
          columns: [
            [strings.abbr_mmr].concat(names), [strings.th_players].concat(counts), [strings.th_percentile].concat(pcts),
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
            [strings.th_players, strings.th_percentile],
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
  const {
    error,
    loading,
    data,
  } = state.app.distributions;
  return {
    error,
    loading,
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchDistributions: () => dispatch(getDistributions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
