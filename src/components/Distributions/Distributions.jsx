/* eslint-disable import/no-dynamic-require,global-require */
import React from 'react';
import c3 from 'c3';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getDistributions } from 'actions';
import strings from 'lang';
import Table from 'components/Table';
import Heading from 'components/Heading';
import {
  sum,
  abbreviateNumber,
  getOrdinal,
} from 'utility';
import Warning from 'components/Alerts';
import TabBar from 'components/TabBar';
import Spinner from 'components/Spinner';
import styles from './Distributions.css';

const countryMmrColumns = [{
  displayName: strings.th_rank,
  field: '',
  displayFn: (row, col, field, i) => getOrdinal(i + 1),
}, {
  displayName: strings.th_country,
  field: 'common',
  sortFn: true,
  displayFn: (row) => {
    const code = row.loccountrycode.toLowerCase();
    let image = `/assets/images/flags/${code}.svg`;
    let name = row.common;

    // Fill missed flags and country names
    if (code === 'yu') {
      name = 'Yugoslavia';
    } else if (code === 'fx') {
      name = 'Metropolitan France';
    } else if (code === 'tp') {
      name = 'East Timor';
    } else if (code === 'zr') {
      name = 'Zaire';
    } else {
      try {
        image = `/${require(`flag-icon-css/flags/4x3/${code}.svg`)}`;
      } catch (e) {
        console.error(e);
      }
      if (code === 'bq') {
        name = 'Caribbean Netherlands';
      } else if (code === 'sh') {
        name = 'Saint Helena, Ascension and Tristan da Cunha';
      }
    }

    return (
      <div className={styles.country}>
        <img
          src={image}
          role="presentation"
        />
        <span>
          {name}
        </span>
      </div>
    );
  },
}, {
  displayName: strings.th_players,
  field: 'count',
  sortFn: true,
}, {
  displayName: strings.th_mmr,
  field: 'avg',
  sortFn: true,
}];

const getPage = (data, key) => (
  <div>
    <Heading
      title={strings[`distributions_heading_${key}`]}
      subtitle={`
        ${data[key] && data[key].rows && abbreviateNumber(data[key].rows.map(row => row.count).reduce(sum, 0))} ${strings.th_players}
      `}
      icon=" "
      className={styles.Heading}
    />
    {(key === 'mmr') ?
      <div id="mmr" />
    : <Table data={data[key] && data[key].rows} columns={countryMmrColumns} />}
  </div>
);

const distributionsPages = [
  { name: strings.distributions_tab_mmr, key: 'mmr', content: getPage, route: '/distributions/mmr' },
  {
    name: strings.distributions_tab_country_mmr,
    key: 'countryMmr',
    content: data => getPage(data, 'country_mmr'),
    route: '/distributions/countryMmr',
  },
];

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
    const loading = this.props.loading;
    const info = this.props.match.params.info || 'mmr';
    const page = distributionsPages.find(page => (page.key || page.name.toLowerCase()) === info);
    return loading
      ? <Spinner />
      : (<div>
        <Helmet title={page ? page.name : strings.distributions_tab_mmr} />
        <Warning className={styles.Warning}>
          {strings.distributions_warning_1}
          <br />
          {strings.distributions_warning_2}
        </Warning>
        <TabBar info={info} tabs={distributionsPages} />
        {page && page.content(this.props.data, info)}
      </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.distributions.data,
  loading: state.app.distributions.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchDistributions: () => dispatch(getDistributions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
