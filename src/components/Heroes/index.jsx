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
import Container from 'components/Container';
import Table from 'components/Table';
import styles from 'components/Match/Match.css';

const percentileDisplay = (decimal, total) => {
  const bucket = percentile(decimal);
  const percent = Number(decimal * 100).toFixed(2);
  return (<div>
    <span style={{ color: styles[bucket.color] }}>{`${percent}%`}</span>
    <small style={{ margin: '3px' }}>{Math.floor(total * decimal)}</small>
  </div>);
};

const heroesColumns = [{
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
}, {
  displayName: strings.hero_pick_ban_rate,
  field: 'pickBanRate',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.proMatchCount),
}, {
  displayName: strings.hero_pick_rate,
  field: 'pickRate',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.proMatchCount),
}, {
  displayName: strings.hero_ban_rate,
  field: 'banRate',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.proMatchCount),
}, {
  displayName: strings.hero_win_rate,
  field: 'winRate',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.pro_pick),
}, {
  displayName: strings.hero_public_pick_rate,
  field: 'publicPickRate',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(field, row.pubMatchCount),
}, {
  displayName: strings.hero_public_win_rate,
  field: 'publicWinRate',
  sortFn: true,
  displayFn: (row, col, field) => percentileDisplay(row, col, field, row.public_pick),
}];

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.dispatchHeroStats();
  }
  render() {
    const json = this.props.data;
    // Assemble the result data array
    // hero_id
    // P+B%
    // P% - pro_pick / (sum of all pro counts / 10)
    // B% - pro_ban / (sum of all pro counts / 10)
    // W% - pro_win / pro_count
    // PubP% - public_pick / (sum of all public counts / 10)
    // PubW% - public_win / public_count
    const proMatchCount = json.map(heroStat => heroStat.pro_pick || 0).reduce((a, b) => a + b, 0) / 10;
    const pubMatchCount = json.map(heroStat => heroStat.public_pick || 0).reduce((a, b) => a + b, 0) / 10;
    const processedData = json.map((heroStat) => {
      const pickRate = (heroStat.pro_pick || 0) / proMatchCount;
      const banRate = (heroStat.pro_ban || 0) / proMatchCount;
      const winRate = (heroStat.pro_win || 0) / heroStat.pro_pick;
      const publicPickRate = (heroStat.public_pick || 0) / pubMatchCount;
      const publicWinRate = (heroStat.public_win || 0) / heroStat.public_pick;
      return {
        ...heroStat,
        pickBanRate: pickRate + banRate,
        pickRate,
        banRate,
        winRate,
        publicPickRate,
        publicWinRate,
        proMatchCount,
        pubMatchCount,
      };
    });
    processedData.sort((a, b) => b.pickBanRate - a.pickBanRate);
    // TODO add last N days filter (currently locked to 30 days)
    // TODO add mmr filter (brackets of 1k)
    return (<div>
      <Helmet title={strings.header_heroes} />
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
  dispatchHeroStats: () => dispatch(getHeroStats({ min_time: (Math.floor(new Date() / 1000)) - (60 * 60 * 24 * 30) })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
