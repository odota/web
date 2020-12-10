import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import heroes from 'dotaconstants/build/heroes.json';
import { getHeroStats, getProPlayers } from '../../actions';
import Heading from '../Heading';
import Table from '../Table';
import TabBar from '../TabBar';
import Hero from '../Hero';
import {
  sum,
  abbreviateNumber,
} from '../../utility';
import { rankColumns } from './rankColumns.ts';

class RequestLayer extends React.Component {
  static propTypes = {
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
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    this.props.dispatchHeroStats();
    this.props.onGetProPlayers();
  }

  getMatchCountByRank = (json, rank) => json.map(heroStat => heroStat[rank] || 0).reduce(sum, 0) / 10

  createTab = (key, matchCount) => {
    const { strings } = this.props;

    const names = {
      public: strings.hero_public_tab,
      turbo: strings.hero_turbo_tab,
    }

    const titles = {
      public: strings.hero_public_heading,
      turbo: strings.hero_turbo_heading,
    }

    const name = names[key] ?? strings.hero_pro_tab;
    const title = titles[key] ?? strings.hero_pro_heading;

    return {
      name,
      key,
      content: (data, _columns, loading) => (
        <div>
          <Heading
            title={title}
            subtitle={`${abbreviateNumber(matchCount)} ${key === 'turbo' ? strings.hero_this_month : strings.hero_last_30days}`}
            icon=""
            twoLine
          />
          <Table data={data} columns={_columns} loading={loading} />
        </div>),
      route: `/heroes/${key}`,
    };
  }

  render() {
    const route = this.props.match.params.heroId || 'pro';

    if (Number.isInteger(Number(route))) {
      return <Hero {...this.props} />;
    }

    const json = this.props.data;

    // Assemble the result data array
    const matchCountPro = json.map(heroStat => heroStat.pro_pick || 0).reduce(sum, 0) / 10;
    const matchCount8 = this.getMatchCountByRank(json, '8_pick');
    const matchCount7 = this.getMatchCountByRank(json, '7_pick');
    const matchCount6 = this.getMatchCountByRank(json, '6_pick');
    const matchCount5 = this.getMatchCountByRank(json, '5_pick');
    const matchCount4 = this.getMatchCountByRank(json, '4_pick');
    const matchCount3 = this.getMatchCountByRank(json, '3_pick');
    const matchCount2 = this.getMatchCountByRank(json, '2_pick');
    const matchCount1 = this.getMatchCountByRank(json, '1_pick');
    const matchCountPublic = matchCount8 + matchCount7 + matchCount6 + matchCount5 + matchCount4 + matchCount3 + matchCount2 + matchCount1;
    const matchCountTurbo = json.map(heroStat => heroStat.turbo_picks || 0).reduce(sum, 0) / 10;

    const processedData = json.map((heroStat) => {
      const pickRatePro = (heroStat.pro_pick || 0) / matchCountPro;
      const banRatePro = (heroStat.pro_ban || 0) / matchCountPro;
      return {
        ...heroStat,
        hero_id: heroStat.id,
        heroName: (heroes[heroStat.id] && heroes[heroStat.id].localized_name) || '',
        matchCountPro,
        matchCount8,
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

        pickRate8: (heroStat['8_pick'] || 0) / matchCount8,
        pickRate7: (heroStat['7_pick'] || 0) / matchCount7,
        pickRate6: (heroStat['6_pick'] || 0) / matchCount6,
        pickRate5: (heroStat['5_pick'] || 0) / matchCount5,
        pickRate4: (heroStat['4_pick'] || 0) / matchCount4,
        pickRate3: (heroStat['3_pick'] || 0) / matchCount3,
        pickRate2: (heroStat['2_pick'] || 0) / matchCount2,
        pickRate1: (heroStat['1_pick'] || 0) / matchCount1,

        winRate8: (heroStat['8_win'] || 0) / heroStat['8_pick'],
        winRate7: (heroStat['7_win'] || 0) / heroStat['7_pick'],
        winRate6: (heroStat['6_win'] || 0) / heroStat['6_pick'],
        winRate5: (heroStat['5_win'] || 0) / heroStat['5_pick'],
        winRate4: (heroStat['4_win'] || 0) / heroStat['4_pick'],
        winRate3: (heroStat['3_win'] || 0) / heroStat['3_pick'],
        winRate2: (heroStat['2_win'] || 0) / heroStat['2_pick'],
        winRate1: (heroStat['1_win'] || 0) / heroStat['1_pick'],

        matchCountTurbo,
        pickRateTurbo: (heroStat.turbo_picks || 0) / matchCountTurbo,
        winRateTurbo: (heroStat.turbo_wins || 0) / heroStat.turbo_picks,
      };
    });
    processedData.sort((a, b) => a.heroName && a.heroName.localeCompare(b.heroName));

    const heroTabs = [
      this.createTab('pro', matchCountPro),
      this.createTab('public', matchCountPublic),
      this.createTab('turbo', matchCountTurbo)
    ];

    const selectedTab = heroTabs.find(_tab => _tab.key === route);
    const { loading, strings } = this.props;

    return (
      <div>
        <Helmet title={strings.header_heroes} />
        <div>
          <TabBar
            info={route}
            tabs={heroTabs}
          />
          {selectedTab && selectedTab.content(processedData, rankColumns({ tabType: route, strings }), loading)}
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.heroStats.data,
  loading: state.app.heroStats.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = {
  dispatchHeroStats: getHeroStats,
  onGetProPlayers: getProPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
