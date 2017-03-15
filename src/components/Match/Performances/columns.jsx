import React from 'react';
import strings from 'lang';
import heroNames from 'dotaconstants/build/hero_names.json';
import Heatmap from 'components/Heatmap';
import {
  unpackPositionData,
  formatSeconds,
  abbreviateNumber,
} from 'utility';
import { inflictorWithValue } from 'components/Visualizations';
import { heroTdColumn } from '../matchColumns';

export default [
  heroTdColumn, {
    displayName: strings.th_lane,
    tooltip: strings.tooltip_lane,
    field: 'lane_role',
    sortFn: true,
    displayFn: (row, col, field) => strings[`lane_role_${field}`],
  }, {
    displayName: strings.th_map,
    tooltip: strings.tooltip_map,
    field: 'lane_pos',
    displayFn: (row, col, field) => (field ?
      <Heatmap width={80} points={unpackPositionData(field)} /> :
      <div />),
  }, {
    displayName: strings.th_lane_efficiency,
    tooltip: strings.tooltip_lane_efficiency,
    field: 'lane_efficiency',
    sortFn: true,
    displayFn: (row, col, field) => (field ? `${(field * 100).toFixed(2)}%` : '-'),
    relativeBars: true,
  }, {
    displayName: strings.th_lhten,
    tooltip: strings.tooltip_lhten,
    field: 'lh_t',
    sortFn: row => row.lh_t && row.lh_t[10],
    displayFn: (row, col, field) => (field || '-'),
    relativeBars: true,
  }, {
    displayName: strings.th_dnten,
    tooltip: strings.tooltip_dnten,
    field: 'dn_t',
    sortFn: row => row.dn_t && row.dn_t[10],
    displayFn: (row, col, field) => (field || '-'),
    relativeBars: true,
  }, {
    displayName: strings.th_multikill,
    tooltip: strings.tooltip_multikill,
    field: 'multi_kills_max',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_killstreak,
    tooltip: strings.tooltip_killstreak,
    field: 'kill_streaks_max',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_stuns,
    tooltip: strings.tooltip_stuns,
    field: 'stuns',
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.toFixed(2) : '-'),
    relativeBars: true,
  }, {
    displayName: strings.th_stacked,
    tooltip: strings.tooltip_camps_stacked,
    field: 'camps_stacked',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_dead,
    tooltip: strings.tooltip_dead,
    field: 'life_state_dead',
    sortFn: true,
    displayFn: (row, col, field) => formatSeconds(field) || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_buybacks,
    tooltip: strings.tooltip_buybacks,
    field: 'buybacks',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_pings,
    tooltip: strings.tooltip_pings,
    field: 'pings',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_biggest_hit,
    tooltip: strings.tooltip_biggest_hit,
    field: 'max_hero_hit',
    sortFn: true,
    displayFn: (row, column, field) => {
      if (field) {
        const hero = heroNames[field.key] || {};
        return (<div>
          {inflictorWithValue(field.inflictor, abbreviateNumber(field.value))}
          <img src={`${API_HOST}${hero.img}`} style={{ height: 29 }} role="presentation" />
        </div>);
      }
      return <div />;
    },
  },
];
