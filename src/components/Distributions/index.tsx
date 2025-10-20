/* eslint-disable import/no-dynamic-require,global-require */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {
  sum,
  abbreviateNumber,
  getOrdinal,
  rankTierToString,
} from '../../utility';
import { getDistributions } from '../../actions';
import Table from '../Table';
// import Warning from '../Alerts/Warning';
import TabBar from '../TabBar';
import Heading from '../Heading';
import { DistributionGraph } from '../Visualizations';
import constants from '../constants';
import DistributionsSkeleton from '../Skeletons/DistributionsSkeleton';

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

class RequestLayer extends React.Component<{ loading: boolean, match: { params: { info: string } }, dispatchDistributions: Function, data: any, strings: Strings }> {
  componentDidMount() {
    this.props.dispatchDistributions();
  }
  render() {
    const { strings, loading } = this.props;
    const countryMmrColumns = [
      {
        displayName: strings.th_rank,
        field: '',
        displayFn: (row: any, col: any, field: string, i: number) => getOrdinal(i + 1),
      },
      {
        displayName: strings.th_country,
        field: 'common',
        sortFn: true,
        displayFn: (row: any) => {
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
              <img src={image} alt={`Flag for ${name}`} />
              <span>{name}</span>
            </CountryDiv>
          );
        },
      },
      {
        displayName: strings.th_players,
        field: 'count',
        sortFn: true,
      },
      {
        displayName: strings.th_mmr,
        field: 'avg',
        sortFn: true,
      },
    ];

    const getPage = (data: any, key: string) => {
      let rows = data && data[key] && data[key].rows;
      if (key === 'ranks') {
        // Translate the rank integers into names
        rows = rows.map((r: any) => ({
          ...r,
          bin_name: rankTierToString(r.bin_name),
        }));
      }
      return (
        <div>
          <Heading
            className="top-heading with-tabbar"
            title={strings[`distributions_heading_${key}` as keyof typeof strings]}
            subtitle={`
            ${data[key] && data[key].rows && abbreviateNumber(data[key].rows.map((row: any) => row.count).reduce(sum, 0))} ${strings.th_players}
          `}
            icon=" "
            twoLine
          />
          {key === 'mmr' || key === 'ranks' ? (
            <DistributionGraph
              data={rows}
              xTickInterval={key === 'ranks' ? 4 : null}
            />
          ) : (
            <Table
              data={data && data[key] && data[key].rows}
              columns={countryMmrColumns}
            />
          )}
        </div>
      );
    };

    const distributionsPages = [
      {
        name: strings.distributions_tab_ranks,
        key: 'ranks',
        content: getPage,
        route: '/distributions/ranks',
      },
    ];
    const info = this.props.match.params.info || 'ranks';
    const page = distributionsPages.find(
      (_page) => (_page.key || _page.name.toLowerCase()) === info,
    );
    return loading ? (
      <DistributionsSkeleton />
    ) : (
      <div>
        <Helmet title={page ? page.name : strings.distributions_tab_ranks} />
        <TabBar tabs={distributionsPages} />
        {page && page.content(this.props.data, info)}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.distributions.data,
  loading: state.app.distributions.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchDistributions: () => dispatch(getDistributions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
