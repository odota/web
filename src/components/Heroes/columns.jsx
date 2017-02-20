import React from 'react';
import {
  transformations,
  abbreviateNumber,
} from 'utility';
import strings from 'lang';
import { TablePercent } from 'components/Visualizations';

const percentileDisplay = (decimal, total) => <TablePercent
  val={decimal >= 0 ? Number((decimal * 100).toFixed(2)) : 0}
  total={total && decimal > 0 && abbreviateNumber(Math.floor(total * decimal))}
/>;

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
  }],
  public: [heroColumn, {
    displayName: strings.hero_5000_pick_rate,
    field: 'pickRate5000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row.matchCount5000),
  }, {
    displayName: strings.hero_5000_win_rate,
    field: 'winRate5000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row['5000_pick']),
  }, {
    displayName: strings.hero_4000_pick_rate,
    field: 'pickRate4000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row.matchCount4000),
  }, {
    displayName: strings.hero_4000_win_rate,
    field: 'winRate4000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row['4000_pick']),
  }, {
    displayName: strings.hero_3000_pick_rate,
    field: 'pickRate3000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row.matchCount3000),
  }, {
    displayName: strings.hero_3000_win_rate,
    field: 'winRate3000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row['3000_pick']),
  }, {
    displayName: strings.hero_2000_pick_rate,
    field: 'pickRate2000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row.matchCount2000),
  }, {
    displayName: strings.hero_2000_win_rate,
    field: 'winRate2000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row['2000_pick']),
  }, {
    displayName: strings.hero_1000_pick_rate,
    field: 'pickRate1000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row.matchCount1000),
  }, {
    displayName: strings.hero_1000_win_rate,
    field: 'winRate1000',
    sortFn: true,
    displayFn: (row, col, field) => percentileDisplay(field, row['1000_pick']),
  }],
};
