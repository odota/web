import React from 'react';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import c3 from 'c3';
import { connect } from 'react-redux';
import { getDistributions } from 'actions';
import strings from 'lang';
import Table from 'components/Table';
import Heading from 'components/Heading';
import {
  sum,
  abbreviateNumber,
} from 'utility';
import Warning from 'components/Alerts';
import styles from './Distributions.css';
// import Spinner from 'components/Spinner';

const countryMmrColumns = [{
  displayName: '#',
  field: '',
  displayFn: (row, col, field, i) => i + 1,
}, {
  displayName: strings.th_country,
  field: 'common',
  sortFn: true,
}, {
  displayName: strings.th_players,
  field: 'count',
  sortFn: true,
}, {
  displayName: strings.th_mmr,
  field: 'avg',
  sortFn: true,
}];

const Distributions = ({
  data,
  // error,
  // loading,
}) => (
  <div>
    <Warning className={styles.Warning}>
      {strings.distributions_warning_1}
      <br />
      {strings.distributions_warning_2}
    </Warning>
    <Tabs
      inkBarStyle={{ backgroundColor: styles.blue }}
      className={styles.tabs}
    >
      {Object.keys(data).map(key => (
        <Tab
          key={key}
          label={strings[`distributions_tab_${key}`]}
          className={styles.tab}
        >
          <Heading
            title={strings[`distributions_heading_${key}`]}
            subtitle={`
              ${data[key].rows && abbreviateNumber(data[key].rows.map(row => row.count).reduce(sum))} ${strings.th_players}
            `}
            icon=" "
            className={styles.Heading}
          />
          {(key === 'mmr') ?
            <div id="mmr" />
            : <Table data={data[key].rows} columns={countryMmrColumns} />}
        </Tab>))
      }
    </Tabs>
  </div>
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
          x: strings.th_mmr,
          columns: [
            [strings.th_mmr].concat(names), [strings.th_players].concat(counts), [strings.th_percentile].concat(pcts),
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
            label: strings.th_mmr,
          },
          y: {
            label: strings.th_players,
          },
          y2: {
            show: true,
            label: strings.th_percentile,
          },
        },
        tooltip: {
          format: {
            value: function tooltip(value, ratio, id) {
              // also has ind param
              if (id === strings.th_percentile) {
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

const mapStateToProps = state => state.app.distributions;

const mapDispatchToProps = dispatch => ({
  dispatchDistributions: () => dispatch(getDistributions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
