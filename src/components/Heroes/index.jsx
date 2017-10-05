/* global API_HOST */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import strings from 'lang';
import { getHeroStats } from 'actions';
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

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchHeroStats();
  }
  render() {
    const route = this.props.match.params.heroId || 'pro';

    if (Number.isInteger(Number(route))) {
      return <Hero props={this.props} />;
    }

    const json = this.props.data;
    // Assemble the result data array
    const matchCountPro = json.map(heroStat => heroStat.pro_pick || 0).reduce(sum, 0) / 10;
    const matchCount5000 = json.map(heroStat => heroStat['5000_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount4000 = json.map(heroStat => heroStat['4000_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount3000 = json.map(heroStat => heroStat['3000_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount2000 = json.map(heroStat => heroStat['2000_pick'] || 0).reduce(sum, 0) / 10;
    const matchCount1000 = json.map(heroStat => heroStat['1000_pick'] || 0).reduce(sum, 0) / 10;
    const matchCountPublic = matchCount5000 + matchCount4000 + matchCount3000 + matchCount2000 + matchCount1000;

    const processedData = json.map((heroStat) => {
      const pickRatePro = (heroStat.pro_pick || 0) / matchCountPro;
      const banRatePro = (heroStat.pro_ban || 0) / matchCountPro;
      return {
        ...heroStat,
        hero_id: heroStat.id,
        heroName: (heroes[heroStat.id] && heroes[heroStat.id].localized_name) || '',
        matchCountPro,
        matchCount5000,
        matchCount4000,
        matchCount3000,
        matchCount2000,
        matchCount1000,
        pickBanRatePro: pickRatePro + banRatePro,
        pickRatePro,
        banRatePro,
        winRatePro: (heroStat.pro_win || 0) / heroStat.pro_pick,
        pickRate5000: (heroStat['5000_pick'] || 0) / matchCount5000,
        pickRate4000: (heroStat['4000_pick'] || 0) / matchCount4000,
        pickRate3000: (heroStat['3000_pick'] || 0) / matchCount3000,
        pickRate2000: (heroStat['2000_pick'] || 0) / matchCount2000,
        pickRate1000: (heroStat['1000_pick'] || 0) / matchCount1000,
        winRate5000: (heroStat['5000_win'] || 0) / heroStat['5000_pick'],
        winRate4000: (heroStat['4000_win'] || 0) / heroStat['4000_pick'],
        winRate3000: (heroStat['3000_win'] || 0) / heroStat['3000_pick'],
        winRate2000: (heroStat['2000_win'] || 0) / heroStat['2000_pick'],
        winRate1000: (heroStat['1000_win'] || 0) / heroStat['1000_pick'],
      };
    });
    processedData.sort((a, b) => a.heroName.localeCompare(b.heroName));
    const heroTabs = [{
      name: strings.hero_pro_tab,
      key: 'pro',
      content: (data, _columns) => (<div>
        <Heading
          title={strings.hero_pro_heading}
          subtitle={`${abbreviateNumber(matchCountPro)} ${strings.hero_this_month}`}
          icon=""
          twoLine
        />
        <Table data={data} columns={_columns} />
      </div>),
      route: '/heroes/pro',
    }, {
      name: strings.hero_public_tab,
      key: 'public',
      content: (data, _columns) => (<div>
        <Heading
          title={strings.hero_public_heading}
          subtitle={`${abbreviateNumber(matchCountPublic)} ${strings.hero_this_month}`}
          icon=""
          twoLine
        />
        <Table data={data} columns={_columns} />
      </div>),
      route: '/heroes/public',
    }];

    const tab = heroTabs.find(_tab => _tab.key === route);
    const loading = this.props.loading;

    return (<div>
      <Helmet title={strings.header_heroes} />
      {!loading && <div>
        <TabBar
          info={route}
          tabs={heroTabs}
        />
        {tab && tab.content(processedData, columns[route])}
      </div>}
    </div>);
  }
}

RequestLayer.propTypes = {
  dispatchHeroStats: PropTypes.func,
  data: PropTypes.shape({}),
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

const mapDispatchToProps = dispatch => ({
  dispatchHeroStats: () => dispatch(getHeroStats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
