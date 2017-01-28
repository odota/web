/* global API_HOST */
import React from 'react';
import Helmet from 'react-helmet';
import {
  connect,
}
from 'react-redux';
import strings from 'lang';
import {
  getHeroStats,
}
from 'actions';
import {
  transformations,
  percentile,
}
from 'utility';
import Heading from 'components/Heading';
import Container from 'components/Container';
import Table from 'components/Table';
import styles from 'components/Match/Match.css';

const percentileDisplay = (decimal, total) => {
  const bucket = percentile(decimal);
  const percent = Number(decimal * 100).toFixed(2);
  return (<div>
    <span style={{ color: styles[bucket.color] }}>{`${percent}%`}</span>
    {total && <small style={{ margin: '3px' }}>{Math.floor(total * decimal)}</small>}
  </div>);
};

const heroesColumns = [{
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
}, {
  displayName: strings.hero_pick_ban_rate,
  field: 'pickBanRatePro',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.matchCountPro),
}, {
  displayName: strings.hero_pick_rate,
  field: 'pickRatePro',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.matchCountPro),
}, {
  displayName: strings.hero_ban_rate,
  field: 'banRatePro',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.matchCountPro),
}, {
  displayName: strings.hero_win_rate,
  field: 'winRatePro',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.pro_pick),
}, {
  displayName: strings.hero_5000_pick_rate,
  field: 'pickRate5000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_5000_win_rate,
  field: 'winRate5000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_4000_pick_rate,
  field: 'pickRate4000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_4000_win_rate,
  field: 'winRate4000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_3000_pick_rate,
  field: 'pickRate3000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_3000_win_rate,
  field: 'winRate3000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_2000_pick_rate,
  field: 'pickRate2000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_2000_win_rate,
  field: 'winRate2000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_1000_pick_rate,
  field: 'pickRate1000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_1000_win_rate,
  field: 'winRate1000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_0000_pick_rate,
  field: 'pickRate0000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}, {
  displayName: strings.hero_0000_win_rate,
  field: 'winRate0000',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field),
}];

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchHeroStats();
  }
  render() {
    const json = this.props.data;
    // Assemble the result data array
    const matchCountPro = json.map(heroStat => heroStat.pro_pick || 0).reduce((a, b) => a + b, 0) / 10;
    const matchCount5000 = json.map(heroStat => heroStat['5000_pick'] || 0).reduce((a, b) => a + b, 0) / 10;
    const matchCount4000 = json.map(heroStat => heroStat['4000_pick'] || 0).reduce((a, b) => a + b, 0) / 10;
    const matchCount3000 = json.map(heroStat => heroStat['3000_pick'] || 0).reduce((a, b) => a + b, 0) / 10;
    const matchCount2000 = json.map(heroStat => heroStat['2000_pick'] || 0).reduce((a, b) => a + b, 0) / 10;
    const matchCount1000 = json.map(heroStat => heroStat['1000_pick'] || 0).reduce((a, b) => a + b, 0) / 10;
    const matchCount0000 = json.map(heroStat => heroStat['0_pick'] || 0).reduce((a, b) => a + b, 0) / 10;

    const processedData = json.map((heroStat) => {
      const pickRatePro = (heroStat.pro_pick || 0) / matchCountPro;
      const banRatePro = (heroStat.pro_ban || 0) / matchCountPro;
      return {
        ...heroStat,
        hero_id: heroStat.id,
        matchCountPro,
        matchCount5000,
        matchCount4000,
        matchCount3000,
        matchCount2000,
        matchCount1000,
        matchCount0000,
        pickBanRatePro: pickRatePro + banRatePro,
        pickRatePro,
        banRatePro,
        winRatePro: (heroStat.pro_win || 0) / heroStat.pro_pick,
        pickRate5000: (heroStat['5000_pick'] || 0) / matchCount5000,
        pickRate4000: (heroStat['4000_pick'] || 0) / matchCount4000,
        pickRate3000: (heroStat['3000_pick'] || 0) / matchCount3000,
        pickRate2000: (heroStat['2000_pick'] || 0) / matchCount2000,
        pickRate1000: (heroStat['1000_pick'] || 0) / matchCount1000,
        pickRate0000: (heroStat['0_pick'] || 0) / matchCount0000,
        winRate5000: (heroStat['5000_win'] || 0) / heroStat['5000_pick'],
        winRate4000: (heroStat['4000_win'] || 0) / heroStat['4000_pick'],
        winRate3000: (heroStat['3000_win'] || 0) / heroStat['3000_pick'],
        winRate2000: (heroStat['2000_win'] || 0) / heroStat['2000_pick'],
        winRate1000: (heroStat['1000_win'] || 0) / heroStat['1000_pick'],
        winRate0000: (heroStat['0_win'] || 0) / heroStat['0_pick'],
      };
    });
    processedData.sort((a, b) => b.pickBanRatePro - a.pickBanRatePro);
    // TODO add filter by month
    return (<div>
      <Helmet title={strings.header_heroes} />
      <Heading title={strings.header_heroes} subtitle={strings.hero_this_month} />
      <Container>
        <Table data={processedData} columns={heroesColumns} />
      </Container>
    </div>);
  }
}

const mapStateToProps = state => ({
  data: state.app.heroStats.list,
  loading: state.app.heroStats.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchHeroStats: () => dispatch(getHeroStats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
