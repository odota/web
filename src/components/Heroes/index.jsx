import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import strings from 'lang';
import { getHeroStats, getProPlayers } from 'actions';
import Heading from 'components/Heading';
import Table from 'components/Table';
import TabBar from 'components/TabBar';
import Hero from 'components/Hero';
import heroes from 'dotaconstants/build/heroes.json';
import {
  sum,
  abbreviateNumber,
} from 'utility';
import columns from './columns';
import FixedTable from '../Table/FixedTable/FixedTable';

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchHeroStats();
    this.props.onGetProPlayers();
  }
  render() {
    const route = this.props.match.params.heroId || 'pro';

    if (Number.isInteger(Number(route))) {
      return <Hero {...this.props} />;
    }

    const json = this.props.data;
    // Assemble the result data array
    const matchCountPro = json.map(heroStat => heroStat.pro_pick || 0).reduce(sum, 0) / 10;
    const matchCount7 = json.map(heroStat => heroStat['7_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount6 = json.map(heroStat => heroStat['6_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount5 = json.map(heroStat => heroStat['5_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount4 = json.map(heroStat => heroStat['4_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount3 = json.map(heroStat => heroStat['3_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount2 = json.map(heroStat => heroStat['2_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount1 = json.map(heroStat => heroStat['1_pick'] || 0).reduce(sum, 0) / 10;
    const matchCountPublic = matchCount7 + matchCount6 + matchCount5 + matchCount4 + matchCount3 + matchCount2 + matchCount1;

    const processedData = json.map((heroStat) => {
      const pickRatePro = (heroStat.pro_pick || 0) / matchCountPro;
      const banRatePro = (heroStat.pro_ban || 0) / matchCountPro;
      return {
        ...heroStat,
        hero_id: heroStat.id,
        heroName: (heroes[heroStat.id] && heroes[heroStat.id].localized_name) || '',
        matchCountPro,
        matchCount7,
        matchCount6,
        matchCount5,
        matchCount4,
        matchCount3,
        matchCount2,
        matchCount1,
        pickBanRatePro: pickRatePro + banRatePro,
        pickRatePro,
        banRatePro,
        winRatePro: (heroStat.pro_win || 0) / heroStat.pro_pick,
        pickRate7: (heroStat['7_pick'] || 0) / matchCount7,
        pickRate6: (heroStat['6_pick'] || 0) / matchCount6,
        pickRate5: (heroStat['5_pick'] || 0) / matchCount5,
        pickRate4: (heroStat['4_pick'] || 0) / matchCount4,
        pickRate3: (heroStat['3_pick'] || 0) / matchCount3,
        pickRate2: (heroStat['2_pick'] || 0) / matchCount2,
        pickRate1: (heroStat['1_pick'] || 0) / matchCount1,
        winRate7: (heroStat['7_win'] || 0) / heroStat['7_pick'],
        winRate6: (heroStat['6_win'] || 0) / heroStat['6_pick'],
        winRate5: (heroStat['5_win'] || 0) / heroStat['5_pick'],
        winRate4: (heroStat['4_win'] || 0) / heroStat['4_pick'],
        winRate3: (heroStat['3_win'] || 0) / heroStat['3_pick'],
        winRate2: (heroStat['2_win'] || 0) / heroStat['2_pick'],
        winRate1: (heroStat['1_win'] || 0) / heroStat['1_pick'],
      };
    });
    processedData.sort((a, b) => a.heroName.localeCompare(b.heroName));
    const heroTabs = [{
      name: strings.hero_pro_tab,
      key: 'pro',
      content: (data, _columns, loading) => (
        <div>
          <Heading
            title={strings.hero_pro_heading}
            subtitle={`${abbreviateNumber(matchCountPro)} ${strings.hero_this_month}`}
            icon=""
            twoLine
          />
          <Table data={data} columns={_columns} loading={loading} />
        </div>),
      route: '/heroes/pro',
    }, {
      name: strings.hero_public_tab,
      key: 'public',
      content: (data, _columns, loading) => (
        <div>
          <Heading
            title={strings.hero_public_heading}
            subtitle={`${abbreviateNumber(matchCountPublic)} ${strings.hero_this_month}`}
            icon=""
            twoLine
          />
          <FixedTable data={data} columns={_columns} fixedColumn={_columns[0]} loading={loading} />
        </div>),
      route: '/heroes/public',
    }];

    const tab = heroTabs.find(_tab => _tab.key === route);
    const { loading } = this.props;

    return (
      <div>
        <Helmet title={strings.header_heroes} />
        <div>
          <TabBar
            info={route}
            tabs={heroTabs}
          />
          {tab && tab.content(processedData, columns[route], loading)}
        </div>
      </div>);
  }
}

RequestLayer.propTypes = {
  dispatchHeroStats: PropTypes.func,
  onGetProPlayers: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      info: PropTypes.string,
      heroId: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  data: state.app.heroStats.data,
  loading: state.app.heroStats.loading,
});

const mapDispatchToProps = {
  dispatchHeroStats: getHeroStats,
  onGetProPlayers: getProPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
