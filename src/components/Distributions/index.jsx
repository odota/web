/* eslint-disable import/no-dynamic-require,global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import {
  sum,
  abbreviateNumber,
  getOrdinal,
  rankTierToString,
} from '../../utility';
import { getDistributions } from '../../actions';
import Table from '../Table';
// import Warning from '../Alerts';
import TabBar from '../TabBar';
import Heading from '../Heading';
import { DistributionGraph } from '../Visualizations';
import constants from '../constants';

const CountryDiv = styled.div`
  & img {
    vertical-align: sub;
    margin-right: 7px;
    height: 24px;
    width: 32px;
    box-shadow: 0 0 5px ${constants.defaultPrimaryColor};
  }

  & span {
    vertical-align: super;
    height: 24px;
  }
`;

const DistributionSkeleton = props => (
  <ContentLoader
    height={200}
    width={500}
    primaryColor="#371b68"
    secondaryColor="#371b68"
    animate={false}
    {...props}
  >
    <rect x="150" y="50" rx="5" ry="5" width="5" height="100" />
    <rect x="160" y="45" rx="5" ry="5" width="5" height="105" />
    <rect x="170" y="41" rx="5" ry="5" width="5" height="109" />
    <rect x="180" y="37" rx="5" ry="5" width="5" height="113" />
    <rect x="190" y="33" rx="5" ry="5" width="5" height="117" />
    <rect x="200" y="29" rx="5" ry="5" width="5" height="121" />
    <rect x="210" y="25" rx="5" ry="5" width="5" height="125" />
    <rect x="220" y="21" rx="5" ry="5" width="5" height="129" />
    <rect x="230" y="18" rx="5" ry="5" width="5" height="132" />
    <rect x="240" y="15" rx="5" ry="5" width="5" height="135" />
    <rect x="250" y="14" rx="5" ry="5" width="5" height="136" />
    <rect x="260" y="14" rx="5" ry="5" width="5" height="136" />
    <rect x="270" y="15" rx="5" ry="5" width="5" height="135" />
    <rect x="280" y="18" rx="5" ry="5" width="5" height="132" />
    <rect x="290" y="21" rx="5" ry="5" width="5" height="129" />
    <rect x="300" y="25" rx="5" ry="5" width="5" height="125" />
    <rect x="310" y="29" rx="5" ry="5" width="5" height="121" />
    <rect x="320" y="33" rx="5" ry="5" width="5" height="117" />
    <rect x="330" y="37" rx="5" ry="5" width="5" height="113" />
    <rect x="340" y="41" rx="5" ry="5" width="5" height="109" />
    <rect x="350" y="45" rx="5" ry="5" width="5" height="105" />
  </ContentLoader>
);

class RequestLayer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        info: PropTypes.string,
      }),
    }),
    dispatchDistributions: PropTypes.func,
    data: PropTypes.shape({}),
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    this.props.dispatchDistributions();
  }
  render() {
    const { strings, loading } = this.props;
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
        const image = `/assets/images/flags/${code}.svg`;
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
        } else if (code === 'bq') {
          name = 'Caribbean Netherlands';
        } else if (code === 'sh') {
          name = 'Saint Helena, Ascension and Tristan da Cunha';
        }

        return (
          <CountryDiv>
            <img
              src={image}
              alt=""
            />
            <span>
              {name}
            </span>
          </CountryDiv>
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

    const getPage = (data, key) => {
      let rows = data && data[key] && data[key].rows;
      if (key === 'ranks') {
        // Translate the rank integers into names
        rows = rows.map(r => ({ ...r, bin_name: rankTierToString(r.bin_name) }));
      }
      return (
        <div>
          <Heading
            title={strings[`distributions_heading_${key}`]}
            subtitle={`
            ${data[key] && data[key].rows && abbreviateNumber(data[key].rows.map(row => row.count).reduce(sum, 0))} ${strings.th_players}
          `}
            icon=" "
            twoLine
          />
          {(key === 'mmr' || key === 'ranks') ?
            <DistributionGraph data={rows} xTickInterval={key === 'ranks' ? 5 : null} />
          : <Table data={data && data[key] && data[key].rows} columns={countryMmrColumns} />}
        </div>);
    };

    const distributionsPages = [
      {
        name: strings.distributions_tab_ranks, key: 'ranks', content: getPage, route: '/distributions/ranks',
      },
      {
        name: strings.distributions_tab_mmr, key: 'mmr', content: getPage, route: '/distributions/mmr',
      },
      {
        name: strings.distributions_tab_country_mmr,
        key: 'country_mmr',
        content: data => getPage(data, 'country_mmr'),
        route: '/distributions/country_mmr',
      },
    ];
    const info = this.props.match.params.info || 'ranks';
    const page = distributionsPages.find(_page => (_page.key || _page.name.toLowerCase()) === info);
    return loading
      ? <DistributionSkeleton />
      : (
        <div>
          <Helmet title={page ? page.name : strings.distributions_tab_ranks} />
          <TabBar info={info} tabs={distributionsPages} />
          {page && page.content(this.props.data, info)}
        </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.distributions.data,
  loading: state.app.distributions.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  dispatchDistributions: () => dispatch(getDistributions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
