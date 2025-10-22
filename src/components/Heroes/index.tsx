import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { heroes } from 'dotaconstants';
import { getHeroStats, getProPlayers } from '../../actions';
import Heading from '../Heading';
import Table from '../Table';
import TabBar from '../TabBar';
import Hero from '../Hero';
import { sum, abbreviateNumber } from '../../utility';
import { HeroesTab, rankColumns } from './rankColumns';

type HeroesProps = {
  dispatchHeroStats: Function,
  onGetProPlayers: Function,
  data: any | any[],
  loading: boolean,
  match: {
    params: {
      info: string,
      heroId: number,
    }
  },
  strings: Strings,
};

class RequestLayer extends React.Component<HeroesProps> {
  componentDidMount() {
    this.props.dispatchHeroStats();
    this.props.onGetProPlayers();
  }

  getMatchCountByRank = (json: any, rank: string) =>
    json.map((heroStat: any) => heroStat[rank] || 0).reduce(sum, 0) / 10;

  createTab = (key: 'pro' | 'public' | 'turbo', matchCount: number) => {
    const { strings } = this.props;

    const names = {
      public: strings.hero_public_tab,
      turbo: strings.hero_turbo_tab,
      pro: strings.hero_pro_tab,
    };

    const titles = {
      public: strings.hero_public_heading,
      turbo: strings.hero_turbo_heading,
      pro: strings.hero_pro_heading,
    };

    const name = names[key ?? 'pro'];
    const title = titles[key ?? 'pro'];

    return {
      name,
      key,
      content: (data: any, _columns: any[], loading: boolean) => (
        <div>
          <Heading
            className="top-heading with-tabbar"
            title={title}
            subtitle={`${abbreviateNumber(matchCount)} ${strings.hero_last_7days}`}
            icon=""
            twoLine
          />
          <Table data={data} columns={_columns} loading={loading} />
        </div>
      ),
      route: `/heroes/${key}`,
    };
  };

  render() {
    const route = this.props.match.params.heroId || 'pro';

    if (Number.isInteger(Number(route))) {
      return <Hero {...this.props} />;
    }

    const json = this.props.data;

    // Assemble the result data array
    const matchCountPro =
      json.map((heroStat: any) => heroStat.pro_pick || 0).reduce(sum, 0) / 10;
    const matchCount8 = this.getMatchCountByRank(json, '8_pick');
    const matchCount7 = this.getMatchCountByRank(json, '7_pick');
    const matchCount6 = this.getMatchCountByRank(json, '6_pick');
    const matchCount5 = this.getMatchCountByRank(json, '5_pick');
    const matchCount4 = this.getMatchCountByRank(json, '4_pick');
    const matchCount3 = this.getMatchCountByRank(json, '3_pick');
    const matchCount2 = this.getMatchCountByRank(json, '2_pick');
    const matchCount1 = this.getMatchCountByRank(json, '1_pick');
    const matchCountPublic =
      matchCount8 +
      matchCount7 +
      matchCount6 +
      matchCount5 +
      matchCount4 +
      matchCount3 +
      matchCount2 +
      matchCount1;
    const matchCountTurbo =
      json.map((heroStat: any) => heroStat.turbo_picks || 0).reduce(sum, 0) / 10;

    const processedData = json.map((heroStat: any) => {
      const pickRatePro = (heroStat.pro_pick || 0) / matchCountPro;
      const banRatePro = (heroStat.pro_ban || 0) / matchCountPro;

      const matchCountPub = matchCountPublic;
      const pickCountPub =
        heroStat['8_pick'] +
        heroStat['7_pick'] +
        heroStat['6_pick'] +
        heroStat['5_pick'] +
        heroStat['4_pick'] +
        heroStat['3_pick'] +
        heroStat['2_pick'] +
        heroStat['1_pick'];
      const winCountPub =
        heroStat['8_win'] +
        heroStat['7_win'] +
        heroStat['6_win'] +
        heroStat['5_win'] +
        heroStat['4_win'] +
        heroStat['3_win'] +
        heroStat['2_win'] +
        heroStat['1_win'];
      const matchCountHigh = matchCount8 + matchCount7 + matchCount6;
      const matchCountMid = matchCount5 + matchCount4;
      const matchCountLow = matchCount3 + matchCount2 + matchCount1;
      const pickCountHigh =
        heroStat['8_pick'] + heroStat['7_pick'] + heroStat['6_pick'];
      const pickCountMid = heroStat['5_pick'] + heroStat['4_pick'];
      const pickCountLow =
        heroStat['3_pick'] + heroStat['2_pick'] + heroStat['1_pick'];
      const winCountHigh =
        heroStat['8_win'] + heroStat['7_win'] + heroStat['6_win'];
      const winCountMid = heroStat['5_win'] + heroStat['4_win'];
      const winCountLow =
        heroStat['3_win'] + heroStat['2_win'] + heroStat['1_win'];

      return {
        ...heroStat,
        hero_id: heroStat.id,
        heroName:
          (heroes[heroStat.id as keyof typeof heroes] && heroes[heroStat.id as keyof typeof heroes].localized_name) || '',
        matchCountPro,
        pickBanRatePro: pickRatePro + banRatePro,
        pickRatePro,
        banRatePro,
        winRatePro: (heroStat.pro_win || 0) / heroStat.pro_pick,

        pickCountPub,
        winCountPub,
        matchCountPub,
        pickRatePub: pickCountPub / matchCountPub,
        winRatePub: winCountPub / pickCountPub,
        pickCountHigh,
        winCountHigh,
        matchCountHigh,
        pickRateHigh: pickCountHigh / matchCountHigh,
        winRateHigh: winCountHigh / pickCountHigh,
        pickCountMid,
        winCountMid,
        matchCountMid,
        pickRateMid: pickCountMid / matchCountMid,
        winRateMid: winCountMid / pickCountMid,
        pickCountLow,
        winCountLow,
        matchCountLow,
        pickRateLow: pickCountLow / matchCountLow,
        winRateLow: winCountLow / pickCountLow,

        matchCountTurbo,
        pickRateTurbo: (heroStat.turbo_picks || 0) / matchCountTurbo,
        winRateTurbo: (heroStat.turbo_wins || 0) / heroStat.turbo_picks,
      };
    });
    processedData.sort(
      (a: any, b: any) => a.heroName && a.heroName.localeCompare(b.heroName),
    );

    const heroTabs = [
      this.createTab('pro', matchCountPro),
      this.createTab('public', matchCountPublic),
      this.createTab('turbo', matchCountTurbo),
    ];

    const selectedTab = heroTabs.find((_tab) => _tab.key === route);
    const { loading, strings } = this.props;

    return (
      <div>
        <Helmet title={strings.header_heroes} />
        <div>
          <TabBar info={route} tabs={heroTabs} />
          {selectedTab &&
            selectedTab.content(
              processedData,
              rankColumns({ tabType: route as HeroesTab, strings }),
              loading,
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.heroStats.data,
  loading: state.app.heroStats.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = {
  dispatchHeroStats: getHeroStats,
  onGetProPlayers: getProPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
