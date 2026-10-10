import { heroes } from "dotaconstants";
import constants from "../constants";
import { abbreviateNumber, displayHeroId } from "../../utility";
import React from "react";

type Props = {
  tabType: HeroesTab;
  strings: Strings;
};

export enum HeroesTab {
  PRO = "pro",
  PUBLIC = "public",
  TURBO = "turbo",
}

type ProColumn = {
  displayName: string;
  field: string;
  sortFn: boolean;
  percentBarsWithValue: (row: Row) => string;
};

type PublicColumn = {
  displayName: string;
  field: string;
  sortFn: boolean | Function;
  percentBarsWithValue?: (row: Row) => string | number;
  displayIcon?: string;
  colColor?: string;
  displayFn?: Function;
};

type HeroColumn = {
  displayName: string;
  tooltip: string;
  field: string;
  displayFn: () => React.ReactNode;
  sortFn: (row: Row) => string;
};

type PreparedColumn = (ProColumn | PublicColumn | HeroColumn) & ColumnAddition;

type ColumnAddition = {
  paddingLeft: number;
  paddingRight: number;
  tooltip: string;
};

type Row = Record<string, any>;

type Column = ProColumn | PublicColumn | HeroColumn;

export const rankColumns = (props: Props) => {
  const columns = {
    [HeroesTab.PRO]: generateProTabColumns(props.strings),
    [HeroesTab.PUBLIC]: generatePublicTabColumns(props.strings),
    [HeroesTab.TURBO]: generateTurboTabColumns(props.strings),
  };
  return columns[props.tabType];
};

// Helper function to calculate percentage change safely
const calculateTrendChange = (winsTrend: number[], picksTrend: number[]) => {
  if (!winsTrend || !picksTrend || !Array.isArray(winsTrend) || !Array.isArray(picksTrend)) return 0;
  
  // Slice off the incomplete 7th day if present
  const wins = winsTrend.length === 7 ? winsTrend.slice(0, 6) : winsTrend;
  const picks = picksTrend.length === 7 ? picksTrend.slice(0, 6) : picksTrend;

  if (wins.length < 2 || wins.length !== picks.length) return 0;

  // Calculate daily win rate (wins / picks) to neutralize volume/weekend skews
  const dailyRates = wins.map((w, i) => {
    const p = picks[i] || 0;
    return p > 0 ? w / p : 0;
  });

  const midPoint = Math.floor(dailyRates.length / 2);
  const earlyDays = dailyRates.slice(0, midPoint);
  const recentDays = dailyRates.slice(midPoint);

  const earlyAvg = earlyDays.reduce((a, b) => a + b, 0) / earlyDays.length;
  const recentAvg = recentDays.reduce((a, b) => a + b, 0) / recentDays.length;

  if (!earlyAvg || earlyAvg === 0) return 0;

  // Calculate absolute percentage point change (e.g., 0.52 - 0.50 = +2.0%)
  const change = (recentAvg - earlyAvg) * 100;

  return Number.isFinite(change) ? Number(change.toFixed(2)) : 0;
};

const generateTurboTabColumns = (strings: Strings) => {
  const heroColumn = generateHeroColumn(strings);

  const combinedColumns = [
    heroColumn,
    {
      displayName: strings.hero_turbo_pick_rate,
      field: "pickRateTurbo",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRateTurbo, row.matchCountTurbo),
    },
    {
      displayName: strings.hero_turbo_win_rate,
      field: "winRateTurbo",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRateTurbo, row.turbo_picks),
    },
    {
      displayName: `Change (7D)`,
      field: "custom_turbo_win_change",
      sortFn: (row: Row) => calculateTrendChange(row.turbo_wins_trend, row.turbo_picks_trend),
      displayFn: (row: Row) => {
        const change = calculateTrendChange(row.turbo_wins_trend, row.turbo_picks_trend);
        const isPositive = change >= 0;
        const sign = isPositive ? "+" : "";
        const arrow = isPositive ? "▲" : "▼";
        const color = isPositive ? "#4ade80" : "#f87171";

        return React.createElement(
          "span",
          { style: { color, display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: "500" } },
          React.createElement("span", { style: { fontSize: "10px" } }, arrow),
          `${sign}${change.toFixed(2)}%`
        );
      },
    },
    {
      displayName: strings.hero_turbo_win_rate_diff,
      field: "winRateTurboVsPub",
      sortFn: (row: Row) => row.winRateTurbo - row.winRatePub,
      displayFn: (_row: Row, _col: string, value: any) => {
        if (!Number.isFinite(value)) {
          return "–";
        }
        const diff = value * 100;
        return `${diff > 0 ? "+" : ""}${diff.toFixed(1)}`;
      },
    },
  ];

  return combinedColumns;
};

const getRankIcon = (number: number) =>
  `/assets/images/dota2/rank_icons/rank_icon_${number}.png`;

const generateProTabColumns = (strings: Strings) => {
  const heroColumn = generateHeroColumn(strings);

  const combinedColumns = [
    heroColumn,
    {
      displayName: strings.hero_pick_ban_rate,
      field: "pickBanRatePro",
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickBanRatePro, row.matchCountPro),
    },
    {
      displayName: strings.hero_pick_rate,
      field: "pickRatePro",
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRatePro, row.matchCountPro),
    },
    {
      displayName: strings.hero_ban_rate,
      field: "banRatePro",
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.banRatePro, row.matchCountPro),
    },
    {
      displayName: strings.hero_win_rate,
      field: "winRatePro",
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRatePro, row.pro_pick),
    },
  ];

  return combinedColumns;
};

const generateHeroColumn = (strings: Strings): HeroColumn => {
  return {
    displayName: strings.th_hero_id,
    tooltip: strings.tooltip_hero_id,
    field: "hero_id",
    displayFn: displayHeroId,
    sortFn: (row: Row) => {
      return heroes[row.hero_id as keyof Heroes]?.localized_name;
    },
  };
};

const decimalToCount = (decimal: number, matchTotal: number) => {
  if (decimal > 0) {
    const count = decimal * matchTotal;
    const roundedCount = abbreviateNumber(Math.floor(count));
    return roundedCount;
  }
  return 0;
};

const generatePublicTabColumns = (strings: Strings) => {
  const columns = [
    {
      displayName: `${strings.rank_tier_overall} p%`,
      field: "pickRatePub",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRatePub, row.matchCountPub),
    },
    {
      displayName: `${strings.rank_tier_overall} w%`,
      field: "winRatePub",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRatePub, row.pickCountPub),
    },
   {
      displayName: `Change (7D)`,
      field: "custom_win_change",
      sortFn: (row: Row) => calculateTrendChange(row.pub_win_trend, row.pub_pick_trend),
      displayFn: (row: Row) => {
        const change = calculateTrendChange(row.pub_win_trend, row.pub_pick_trend);
        const isPositive = change >= 0;
        const sign = isPositive ? "+" : "";
        const arrow = isPositive ? "▲" : "▼";
        const color = isPositive ? "#4ade80" : "#f87171";

        return React.createElement(
          "span",
          { style: { color, display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: "500" } },
          React.createElement("span", { style: { fontSize: "10px" } }, arrow),
          `${sign}${change.toFixed(2)}%`
        );
      },
    },
    {
      displayName: `${strings.rank_tier_high} p%`,
      displayIcon: getRankIcon(8),
      field: "pickRateHigh",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRateHigh, row.matchCountHigh),
      colColor: constants.colorImmortal,
    },
    {
      displayName: `${strings.rank_tier_high} w%`,
      displayIcon: getRankIcon(8),
      field: "winRateHigh",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRateHigh, row.pickCountHigh),
      colColor: constants.colorImmortalAlt,
    },
    {
      displayName: `${strings.rank_tier_mid} p%`,
      displayIcon: getRankIcon(5),
      field: "pickRateMid",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRateMid, row.matchCountMid),
      colColor: constants.colorLegend,
    },
    {
      displayName: `${strings.rank_tier_mid} w%`,
      displayIcon: getRankIcon(5),
      field: "winRateMid",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRateMid, row.pickCountMid),
      colColor: constants.colorLegendAlt,
    },
    {
      displayName: `${strings.rank_tier_low} p%`,
      displayIcon: getRankIcon(3),
      field: "pickRateLow",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRateLow, row.matchCountLow),
      colColor: constants.colorCrusader,
    },
    {
      displayName: `${strings.rank_tier_low} w%`,
      displayIcon: getRankIcon(3),
      field: "winRateLow",
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRateLow, row.pickCountLow),
      colColor: constants.colorCrusaderAlt,
    },
  ];

  const preparedHeroColumn = prepareHeroColumn(strings);
  const preparedColumns = prepareColumns(columns, strings);

  return preparedHeroColumn.concat(preparedColumns);
};

const prepareColumns = (columns: Column[], strings: Strings) => {
  return columns.map((column) => {
    const preparedColumn: PreparedColumn = {
      ...column,
      tooltip: column.displayName,
      paddingRight: 1,
      paddingLeft: 4,
    };

    return preparedColumn;
  });
};

const prepareHeroColumn = (strings: Strings): PreparedColumn[] => {
  const columns = [generateHeroColumn(strings)];

  return prepareColumns(columns, strings);
};