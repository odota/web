import {
  transformations,
  abbreviateNumber,
} from 'utility';
import strings from 'lang';

const decimalToCount = (decimal, total) => (
  total &&
  decimal > 0 &&
  abbreviateNumber(Math.floor(decimal * total))
);

const heroColumn = {
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
};

export default {
  pro: [heroColumn, {
    displayName: strings.hero_pick_ban_rate,
    field: 'pickBanRatePro',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickBanRatePro, row.matchCountPro),
  }, {
    displayName: strings.hero_pick_rate,
    field: 'pickRatePro',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRatePro, row.matchCountPro),
  }, {
    displayName: strings.hero_ban_rate,
    field: 'banRatePro',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.banRatePro, row.matchCountPro),
  }, {
    displayName: strings.hero_win_rate,
    field: 'winRatePro',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRatePro, row.pro_pick),
  }],
  public: [heroColumn, {
    displayName: strings.hero_5000_pick_rate,
    field: 'pickRate5000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate5000, row.matchCount5000),
  }, {
    displayName: strings.hero_5000_win_rate,
    field: 'winRate5000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate5000, row['5000_pick']),
  }, {
    displayName: strings.hero_4000_pick_rate,
    field: 'pickRate4000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate4000, row.matchCount4000),
  }, {
    displayName: strings.hero_4000_win_rate,
    field: 'winRate4000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate4000, row['4000_pick']),
  }, {
    displayName: strings.hero_3000_pick_rate,
    field: 'pickRate3000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate3000, row.matchCount3000),
  }, {
    displayName: strings.hero_3000_win_rate,
    field: 'winRate3000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate3000, row['3000_pick']),
  }, {
    displayName: strings.hero_2000_pick_rate,
    field: 'pickRate2000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate2000, row.matchCount2000),
  }, {
    displayName: strings.hero_2000_win_rate,
    field: 'winRate2000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate2000, row['2000_pick']),
  }, {
    displayName: strings.hero_1000_pick_rate,
    field: 'pickRate1000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate1000, row.matchCount1000),
  }, {
    displayName: strings.hero_1000_win_rate,
    field: 'winRate1000',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate1000, row['1000_pick']),
  }],
};
