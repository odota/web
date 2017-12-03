// import React from 'react';
import {
  transformations,
  abbreviateNumber,
} from 'utility';
import strings from 'lang';
import heroes from 'dotaconstants/build/heroes.json';
// import TablePercent from 'components/Visualizations/Table/Percent';

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
  sortFn: row => (heroes[row.hero_id] && heroes[row.hero_id].localized_name),
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
    displayName: strings.rank_tier_7,
    field: 'pickRate7',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate7, row.matchCount7),
  }, {
    displayName: strings.rank_tier_7,
    field: 'winRate7',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate7, row['7_pick']),
  }, {
    displayName: strings.rank_tier_6,
    field: 'pickRate6',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate6, row.matchCount6),
  }, {
    displayName: strings.rank_tier_6,
    field: 'winRate6',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate6, row['6_pick']),
  }, {
    displayName: strings.rank_tier_5,
    field: 'pickRate5',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate5, row.matchCount5),
  }, {
    displayName: strings.rank_tier_5,
    field: 'winRate5',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate5, row['5_pick']),
  }, {
    displayName: strings.rank_tier_4,
    field: 'pickRate4',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate4, row.matchCount4),
  }, {
    displayName: strings.rank_tier_4,
    field: 'winRate4',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate4, row['4_pick']),
  }, {
    displayName: strings.rank_tier_3,
    field: 'pickRate3',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate3, row.matchCount3),
  }, {
    displayName: strings.rank_tier_3,
    field: 'winRate3',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate3, row['3_pick']),
  }, {
    displayName: strings.rank_tier_2,
    field: 'pickRate2',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate2, row.matchCount2),
  }, {
    displayName: strings.rank_tier_2,
    field: 'winRate2',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate2, row['2_pick']),
  }, {
    displayName: strings.rank_tier_1,
    field: 'pickRate1',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.pickRate1, row.matchCount1),
  }, {
    displayName: strings.rank_tier_1,
    field: 'winRate1',
    sortFn: true,
    percentBarsWithValue: row => decimalToCount(row.winRate1, row['1_pick']),
  }].map((col, i) => ({
    ...col,
    displayName: i === 0 ? col.displayName : `${col.displayName.substring(0, 2)} ${col.field.startsWith('pick') ? strings.abbr_pick : strings.abbr_win}%`,
    tooltip: col.displayName,
  })),
};
