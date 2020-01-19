import { inflictorWithValue } from '../Visualizations';
import { displayHeroId, formatSeconds, abbreviateNumber } from '../../utility';

const computeWinRate = row => (row.wins / row.games);

export const getTimeRange = (field, metadata) => {
  let lower;
  if (metadata.indexOf(field) !== 0) {
    lower = metadata[metadata.indexOf(field) - 1];
  } else {
    lower = 0;
  }
  return `${formatSeconds(lower)} - ${formatSeconds(field)}`;
};

const getColumns = (f, metadata, strings) => {
  const columns = {
    itemTimings: [{
      displayName: strings.filter_hero_id,
      field: 'hero_id',
      sortFn: true,
      displayFn: displayHeroId,
    }, {
      displayName: strings.scenarios_time,
      field: 'time',
      sortFn: row => row.time,
      displayFn: (row, col, field) => getTimeRange(field, metadata.timings),
    }, {
      displayName: strings.scenarios_item,
      field: 'item',
      sortFn: true,
      displayFn: (row, col, field) => inflictorWithValue(field),
    }, {
      displayName: strings.heading_win_rate,
      field: 'games',
      sortFn: computeWinRate,
      percentBarsWithValue: row => abbreviateNumber(Number(row.games)),
      tooltip: strings.tooltip_winrate_samplesize,
    }],

    laneRoles: [{
      displayName: strings.filter_hero_id,
      field: 'hero_id',
      sortFn: true,
      displayFn: displayHeroId,
    }, {
      displayName: strings.heading_lane_role,
      field: 'lane_role',
      sortFn: true,
      displayFn: (row, col, field) => strings[`lane_role_${field}`] || field,
    }, {
      displayName: strings.scenarios_game_duration,
      field: 'time',
      sortFn: true,
      displayFn: (row, col, field) => getTimeRange(field, metadata.gameDurationBucket),
    }, {
      displayName: strings.heading_win_rate,
      field: 'games',
      sortFn: computeWinRate,
      percentBarsWithValue: row => abbreviateNumber(Number(row.games)),
      tooltip: strings.tooltip_winrate_samplesize,
    }],

    misc: [{
      displayName: strings.scenarios_scenario,
      field: 'scenario',
      sortFn: true,
      displayFn: (row, col, field) => strings[`scenarios_${field}`] || field,
    }, {
      displayName: strings.heading_win_rate,
      field: 'games',
      sortFn: computeWinRate,
      percentBarsWithValue: row => abbreviateNumber(Number(row.games)),
      tooltip: strings.tooltip_winrate_samplesize,
    }],
  };

  return columns[f];
};

export default getColumns;
