import heroes from 'dotaconstants/build/heroes.json';
import constants from '../constants';
import { abbreviateNumber, displayHeroId } from '../../utility';
import { GlobalString } from 'src/types/common/GlobalString';
import { Heroes } from '../../types/Hero/Heroes';
import React from 'react';

type Props = {
  tabType: HeroesTab;
  strings: GlobalString;
};

enum HeroesTab {
  PRO = 'pro',
  PUBLIC = 'public',
  TURBO = 'turbo',
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
  sortFn: boolean;
  percentBarsWithValue: (row: Row) => string | number;
  displayIcon?: string;
  colColor?: string;
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

type Row = {
  [key in string]: number;
};

type Column = ProColumn | PublicColumn | HeroColumn;

export const rankColumns = (props: Props) => {
  const columns = {
    [HeroesTab.PRO]: generateProTabColumns(props.strings),
    [HeroesTab.PUBLIC]: generatePublicTabColumns(props.strings),
    [HeroesTab.TURBO]: generateTurboTabColumns(props.strings),
  };
  return columns[props.tabType];
};

const generateTurboTabColumns = (strings: GlobalString) => {
  const heroColumn = generateHeroColumn(strings);

  const combinedColumns = [
    heroColumn,
    {
      displayName: strings.hero_turbo_pick_rate,
      field: 'pickRateTurbo',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRateTurbo, row.matchCountTurbo),
    },
    {
      displayName: strings.hero_turbo_win_rate,
      field: 'winRateTurbo',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRateTurbo, row.turbo_picks),
    },
  ];

  return combinedColumns;
};

const generateProTabColumns = (strings: GlobalString) => {
  const heroColumn = generateHeroColumn(strings);

  const combinedColumns = [
    heroColumn,
    {
      displayName: strings.hero_pick_ban_rate,
      field: 'pickBanRatePro',
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickBanRatePro, row.matchCountPro),
    },
    {
      displayName: strings.hero_pick_rate,
      field: 'pickRatePro',
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.pickRatePro, row.matchCountPro),
    },
    {
      displayName: strings.hero_ban_rate,
      field: 'banRatePro',
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.banRatePro, row.matchCountPro),
    },
    {
      displayName: strings.hero_win_rate,
      field: 'winRatePro',
      sortFn: true,
      percentBarsWithValue: (row: Row) =>
        decimalToCount(row.winRatePro, row.pro_pick),
    },
  ];

  return combinedColumns;
};

const generateHeroColumn = (strings: GlobalString): HeroColumn => {
  return {
    displayName: strings.th_hero_id,
    tooltip: strings.tooltip_hero_id,
    field: 'hero_id',
    displayFn: displayHeroId,
    sortFn: (row: Row) => {
      const typedHeroes: Heroes = heroes;
      return typedHeroes[row.hero_id]?.localized_name;
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

const generatePublicTabColumns = (strings: GlobalString) => {
  const columns = [
    {
      displayName: `${strings.rank_tier_overall  } ${  strings.abbr_pick  }%`,
      field: 'pickRatePub',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.pickRatePub, row.matchCountPub),
    },
    {
      displayName: `${strings.rank_tier_overall  } ${  strings.abbr_win  }%`,
      field: 'winRatePub',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.winRatePub, row.pickCountPub),
    },
    {
      displayName: `${strings.rank_tier_high  } ${  strings.abbr_pick  }%`,
      displayIcon: getRankIcon(8),
      field: 'pickRateHigh',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.pickRateHigh, row.matchCountHigh),
      colColor: constants.colorImmortal,
    },
    {
      displayName: `${strings.rank_tier_high  } ${  strings.abbr_win  }%`,
      displayIcon: getRankIcon(8),
      field: 'winRateHigh',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.winRateHigh, row.pickCountHigh),
      colColor: constants.colorImmortalAlt,
    },
    {
      displayName: `${strings.rank_tier_mid  } ${  strings.abbr_pick  }%`,
      displayIcon: getRankIcon(5),
      field: 'pickRateMid',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.pickRateMid, row.matchCountMid),
      colColor: constants.colorLegend,
    },
    {
      displayName: `${strings.rank_tier_mid  } ${  strings.abbr_win  }%`,
      displayIcon: getRankIcon(5),
      field: 'winRateMid',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.winRateMid, row.pickCountMid),
      colColor: constants.colorLegendAlt,
    },
    {
      displayName: `${strings.rank_tier_low  } ${  strings.abbr_pick  }%`,
      displayIcon: getRankIcon(3),
      field: 'pickRateLow',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.pickRateLow, row.matchCountLow),
      colColor: constants.colorCrusader,
    },
    {
      displayName: `${strings.rank_tier_low  } ${  strings.abbr_win  }%`,
      displayIcon: getRankIcon(3),
      field: 'winRateLow',
      sortFn: true,
      displayFn: (_row: Row, _col: string, field: any) =>
        (field * 100).toFixed(1),
      percentBarsWithValue: (row: Row) => decimalToCount(row.winRateLow, row.pickCountLow),
      colColor: constants.colorCrusaderAlt,
    },
  ];

  const preparedHeroColumn = prepareHeroColumn(strings);
  const preparedColumns = prepareColumns(columns, strings);

  return preparedHeroColumn.concat(preparedColumns);
};

const getRankIcon = (number: number) =>
  `/assets/images/dota2/rank_icons/rank_icon_${number}.png`;

const prepareColumns = (columns: Column[], strings: GlobalString) => {
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

const prepareHeroColumn = (strings: GlobalString): PreparedColumn[] => {
  const columns = [generateHeroColumn(strings)];

  return prepareColumns(columns, strings);
};
