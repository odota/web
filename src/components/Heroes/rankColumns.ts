import heroes from 'dotaconstants/build/heroes.json';
import constants from 'src/components/constants'
import { abbreviateNumber, displayHeroId } from '../../utility';
import { GlobalString } from 'src/types/common/GlobalString'
import { Heroes } from 'src/types/Hero/Heroes'
import React from 'react'

type Props = {
  tabType: HeroesTab
  strings: GlobalString
}

enum HeroesTab {
  PRO = 'pro',
  PUBLIC = 'public',
  TURBO = 'turbo'
}

type ProColumn = {
  displayName: string,
  field: string,
  sortFn: boolean,
  percentBarsWithValue: (row: Row) => string
}

type PublicColumn = {
  displayName: string,
  field: string,
  sortFn: boolean,
  percentBarsWithValue: (row: Row) => string
  displayIcon: string
  colColor: string
}

type HeroColumn = {
  displayName: string,
  tooltip: string,
  field: string
  displayFn: () => React.ReactNode,
  sortFn: (row: Row) => string
}

type PreparedColumn = (ProColumn | PublicColumn | HeroColumn) & ColumnAddition

type ColumnAddition = {
  paddingLeft: number,
  paddingRight: number,
  tooltip: string
}

type Row = {
  [key in string]: number
}

type Column = ProColumn | PublicColumn | HeroColumn

export const rankColumns = (props: Props) => {
  const columns = {
    [HeroesTab.PRO]: generateProTabColumns(props.strings),
    [HeroesTab.PUBLIC]: generatePublicTabColumns(props.strings),
    [HeroesTab.TURBO]: generateTurboTabColumns(props.strings),
  }
  return columns[props.tabType];
};

const generateTurboTabColumns = (strings: GlobalString) => {
  const heroColumn = generateHeroColumn(strings)

  const combinedColumns = [heroColumn, {
    displayName: strings.hero_turbo_pick_rate,
    field: 'pickRateTurbo',
    sortFn: true,
    displayFn: (_row: Row, _col: string, field: any) => (field * 100).toFixed(1),
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRateTurbo, row.matchCountTurbo),
  }, {
    displayName: strings.hero_turbo_win_rate,
    field: 'winRateTurbo',
    sortFn: true,
    displayFn: (_row: Row, _col: string, field: any) => (field * 100).toFixed(1),
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRateTurbo, row.turbo_picks),
  }]

  return combinedColumns;
};

const generateProTabColumns = (strings: GlobalString) => {
  const heroColumn = generateHeroColumn(strings)

  const combinedColumns = [heroColumn, {
    displayName: strings.hero_pick_ban_rate,
    field: 'pickBanRatePro',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickBanRatePro, row.matchCountPro),
  }, {
    displayName: strings.hero_pick_rate,
    field: 'pickRatePro',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRatePro, row.matchCountPro),
  }, {
    displayName: strings.hero_ban_rate,
    field: 'banRatePro',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.banRatePro, row.matchCountPro),
  }, {
    displayName: strings.hero_win_rate,
    field: 'winRatePro',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRatePro, row.pro_pick),
  }]

  return combinedColumns
};

const generateHeroColumn = (strings: GlobalString): HeroColumn => {
  return {
    displayName: strings.th_hero_id,
    tooltip: strings.tooltip_hero_id,
    field: 'hero_id',
    displayFn: displayHeroId,
    sortFn: (row: Row) => {
      const typedHeroes: Heroes = heroes;
      return (typedHeroes[row.hero_id]?.localized_name);
    },
  }
};

const decimalToCount = (decimal: number, matchTotal: number) => {
  if (decimal > 0) {
    const count = decimal * matchTotal
    const roundedCount = abbreviateNumber(Math.floor(count))
    return roundedCount
  }
  return 0
}

const generatePublicTabColumns = (strings: GlobalString) => {
  const columns = [{
    displayName: strings.rank_tier_8,
    displayIcon: getRankIcon(8),
    field: 'pickRate8',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate8, row.matchCount8),
    colColor: constants.colorImmortal,
  }, {
    displayName: strings.rank_tier_8,
    displayIcon: getRankIcon(8),
    field: 'winRate8',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate8, row['8_pick']),
    colColor: constants.colorImmortalAlt,
  }, {
    displayName: strings.rank_tier_7,
    displayIcon: getRankIcon(7),
    field: 'pickRate7',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate7, row.matchCount7),
    colColor: constants.colorDivine,
  }, {
    displayName: strings.rank_tier_7,
    displayIcon: getRankIcon(7),
    field: 'winRate7',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate7, row['7_pick']),
    colColor: constants.colorDivineAlt,
  }, {
    displayName: strings.rank_tier_6,
    displayIcon: getRankIcon(6),
    field: 'pickRate6',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate6, row.matchCount6),
    colColor: constants.colorAncient,
  }, {
    displayName: strings.rank_tier_6,
    displayIcon: getRankIcon(6),
    field: 'winRate6',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate6, row['6_pick']),
    colColor: constants.colorAncientAlt,
  }, {
    displayName: strings.rank_tier_5,
    displayIcon: getRankIcon(5),
    field: 'pickRate5',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate5, row.matchCount5),
    colColor: constants.colorLegend,
  }, {
    displayName: strings.rank_tier_5,
    displayIcon: getRankIcon(5),
    field: 'winRate5',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate5, row['5_pick']),
    colColor: constants.colorLegendAlt,
  }, {
    displayName: strings.rank_tier_4,
    displayIcon: getRankIcon(4),
    field: 'pickRate4',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate4, row.matchCount4),
    colColor: constants.colorArchon,
  }, {
    displayName: strings.rank_tier_4,
    displayIcon: getRankIcon(4),
    field: 'winRate4',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate4, row['4_pick']),
    colColor: constants.colorArchonAlt,
  }, {
    displayName: strings.rank_tier_3,
    displayIcon: getRankIcon(3),
    field: 'pickRate3',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate3, row.matchCount3),
    colColor: constants.colorCrusader,
  }, {
    displayName: strings.rank_tier_3,
    displayIcon: getRankIcon(3),
    field: 'winRate3',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate3, row['3_pick']),
    colColor: constants.colorCrusaderAlt,
  }, {
    displayName: strings.rank_tier_2,
    displayIcon: getRankIcon(2),
    field: 'pickRate2',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate2, row.matchCount2),
    colColor: constants.colorGuardian,
  }, {
    displayName: strings.rank_tier_2,
    displayIcon: getRankIcon(2),
    field: 'winRate2',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate2, row['2_pick']),
    colColor: constants.colorGuardianAlt,
  }, {
    displayName: strings.rank_tier_1,
    displayIcon: getRankIcon(1),
    field: 'pickRate1',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.pickRate1, row.matchCount1),
    colColor: constants.colorHerald,
  }, {
    displayName: strings.rank_tier_1,
    displayIcon: getRankIcon(1),
    field: 'winRate1',
    sortFn: true,
    percentBarsWithValue: (row: Row) => decimalToCount(row.winRate1, row['1_pick']),
    colColor: constants.colorHeraldAlt,
  }]

  const preparedHeroColumn = prepareHeroColumn(strings)
  const preparedColumns = prepareColumns(columns, strings)

  return preparedHeroColumn.concat(preparedColumns);
};

const getRankIcon = (number: number) => `/assets/images/dota2/rank_icons/rank_icon_${number}.png`;

const prepareColumns = (columns: Column[], strings: GlobalString) => {
  return columns.map((column) => {
    const preparedColumn: PreparedColumn = {
      ...column,
      displayName: prepareDisplayName(column, strings),
      tooltip: column.displayName,
      paddingRight: 1,
      paddingLeft: 4,
    }

    return preparedColumn
  })
}

const prepareDisplayName = (column: Column, strings: GlobalString) => {
  if (isHeroColumn(column)) {
    return column.displayName
  }

  const baseName = `${(column.displayName || '').substring(0, 2)}`
  const variableName = column.field.startsWith('pick')
    ? `${strings.abbr_pick}`
    : `${strings.abbr_win}`

  return `${baseName} ${variableName}%`
}

const isHeroColumn = (column: Column): column is HeroColumn => {
  return column.field === 'hero_id'
}

const prepareHeroColumn = (strings: GlobalString): PreparedColumn[] => {
  const columns = [
    generateHeroColumn(strings),
  ];

  return prepareColumns(columns, strings);
}
