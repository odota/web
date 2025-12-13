import { inflictorWithValue } from "../Visualizations";
import { displayHeroId, formatSeconds, abbreviateNumber } from "../../utility";

const computeWinRate = (row: any) => row.wins / row.games;

export const getTimeRange = (field: number, metadata: number[]) => {
  let lower;
  if (metadata.indexOf(field) !== 0) {
    lower = metadata[metadata.indexOf(field) - 1];
  } else {
    lower = 0;
  }
  return `${formatSeconds(lower)} - ${formatSeconds(field)}`;
};

const getColumns = (f: string, metadata: any, strings: Strings) => {
  const columns: Record<string, any[]> = {
    itemTimings: [
      {
        displayName: strings.filter_hero_id,
        field: "hero_id",
        sortFn: true,
        displayFn: displayHeroId,
      },
      {
        displayName: strings.scenarios_time,
        field: "time",
        sortFn: (row: any) => row.time,
        displayFn: (row: any, col: any, field: number) =>
          getTimeRange(field, metadata.timings),
      },
      {
        displayName: strings.scenarios_item,
        field: "item",
        sortFn: true,
        displayFn: (row: any, col: any, field: string) =>
          inflictorWithValue(field),
      },
      {
        displayName: strings.heading_win_rate,
        field: "games",
        sortFn: computeWinRate,
        percentBarsWithValue: (row: any) => abbreviateNumber(Number(row.games)),
        tooltip: strings.tooltip_winrate_samplesize,
      },
    ],

    laneRoles: [
      {
        displayName: strings.filter_hero_id,
        field: "hero_id",
        sortFn: true,
        displayFn: displayHeroId,
      },
      {
        displayName: strings.heading_lane_role,
        field: "lane_role",
        sortFn: true,
        displayFn: (row: any, col: any, field: number) =>
          strings[`lane_role_${field}` as keyof Strings] || field,
      },
      {
        displayName: strings.scenarios_game_duration,
        field: "time",
        sortFn: true,
        displayFn: (row: any, col: any, field: number) =>
          getTimeRange(field, metadata.gameDurationBucket),
      },
      {
        displayName: strings.heading_win_rate,
        field: "games",
        sortFn: computeWinRate,
        percentBarsWithValue: (row: any) => abbreviateNumber(Number(row.games)),
        tooltip: strings.tooltip_winrate_samplesize,
      },
    ],

    misc: [
      {
        displayName: strings.scenarios_scenario,
        field: "scenario",
        sortFn: true,
        displayFn: (row: any, col: any, field: number) =>
          strings[`scenarios_${field}` as keyof Strings] || field,
      },
      {
        displayName: strings.heading_win_rate,
        field: "games",
        sortFn: computeWinRate,
        percentBarsWithValue: (row: any) => abbreviateNumber(Number(row.games)),
        tooltip: strings.tooltip_winrate_samplesize,
      },
    ],
  };

  return columns[f];
};

export default getColumns;
