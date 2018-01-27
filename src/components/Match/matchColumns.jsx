import React from 'react';
import lodash from 'lodash/fp';
import heroes from 'dotaconstants/build/heroes.json';
import items from 'dotaconstants/build/items.json';
import orderTypes from 'dotaconstants/build/order_types.json';
import itemIds from 'dotaconstants/build/item_ids.json';
import abilityIds from 'dotaconstants/build/ability_ids.json';
import abilityKeys from 'dotaconstants/build/ability_keys.json';
import buffs from 'dotaconstants/build/permanent_buffs.json';
import util from 'util';
import strings from 'lang';
import { formatSeconds, abbreviateNumber, transformations, percentile, sum, subTextStyle, getHeroesById, rankTierToString, groupBy } from 'utility';
import { TableHeroImage, inflictorWithValue } from 'components/Visualizations';
import ReactTooltip from 'react-tooltip';
import { RadioButton } from 'material-ui/RadioButton';
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import { CompetitiveRank } from 'components/Visualizations/Table/HeroImage';
import { IconBackpack, IconRadiant, IconDire } from 'components/Icons';
import constants from '../constants';
import { StyledAbilityUpgrades, StyledBackpack, StyledCosmetic, StyledDivClearBoth, StyledGoldIcon, StyledPlayersDeath, StyledRunes, StyledUnusedItem } from './StyledMatch';

const heroNames = getHeroesById();

export const heroTd = (row, col, field, index, hideName, party, showPvgnaGuide = false) =>
  (<TableHeroImage
    image={heroes[row.hero_id] && process.env.REACT_APP_API_HOST + heroes[row.hero_id].img}
    title={row.name || row.personaname || strings.general_anonymous}
    registered={row.last_login}
    accountId={row.account_id}
    playerSlot={row.player_slot}
    subtitle={<CompetitiveRank rankTier={rankTierToString(row.rank_tier)} />}
    hideText={hideName}
    confirmed={row.account_id && row.name}
    party={party}
    heroName={heroes[row.hero_id] ? heroes[row.hero_id].localized_name : strings.general_no_hero}
    showPvgnaGuide={showPvgnaGuide}
    pvgnaGuideInfo={row.pvgnaGuide}
    randomed={row.randomed}
    repicked={row.repicked}
    predictedVictory={row.pred_vict}
    leaverStatus={row.leaver_status}
  />);

export const heroTdColumn = {
  displayName: strings.th_avatar,
  field: 'player_slot',
  key: 'heroTd',
  displayFn: heroTd,
  sortFn: true,
};

const partyStyles = (row, match) => {
  if (row.party_size === 1 || (match.players && !match.players.map(player => player.party_id).reduce(sum))) {
    return null;
  }
  // groupBy party id, then remove all the solo players, then find the index the party the row player is in
  const index = Object.values(groupBy(match.players, 'party_id'))
    .filter(x => x.length > 1)
    .findIndex(x => x.find(y => y.player_slot === row.player_slot));
  return <div className={`group${index}`} />;
};

const findBuyTime = (purchaseLog, itemKey, _itemSkipCount) => {
  let skipped = 0;
  let itemSkipCount = _itemSkipCount || 0;
  const purchaseEvent = lodash.findLast((item) => {
    if (item.key !== itemKey) {
      return false;
    }

    if (!itemSkipCount || itemSkipCount <= skipped) {
      itemSkipCount += 1;
      return true;
    }

    skipped += 1;
    return false;
  }, purchaseLog);

  return {
    itemSkipCount,
    purchaseEvent,
  };
};

export const overviewColumns = (match) => {
  const cols = [
    {
      displayName: strings.th_avatar,
      field: 'player_slot',
      displayFn: (row, col, field, i) => heroTd(row, col, field, i, false, partyStyles(row, match), true),
      sortFn: true,
    },
    {
      displayName: strings.th_level,
      tooltip: strings.tooltip_level,
      field: 'level',
      sortFn: true,
      maxFn: true,
      sumFn: true,
      underline: 'max',
    },
    {
      displayName: strings.th_kills,
      tooltip: strings.tooltip_kills,
      field: 'kills',
      sortFn: true,
      displayFn: transformations.kda,
      sumFn: true,
      underline: 'max',
    },
    {
      displayName: strings.th_deaths,
      tooltip: strings.tooltip_deaths,
      field: 'deaths',
      sortFn: true,
      sumFn: true,
      underline: 'min',
    },
    {
      displayName: strings.th_assists,
      tooltip: strings.tooltip_assists,
      field: 'assists',
      sortFn: true,
      sumFn: true,
      underline: 'max',
    },
    {
      displayName: strings.th_gold_per_min,
      tooltip: strings.tooltip_gold_per_min,
      field: 'gold_per_min',
      sortFn: true,
      color: constants.golden,
      sumFn: true,
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: strings.th_xp_per_min,
      tooltip: strings.tooltip_xp_per_min,
      field: 'xp_per_min',
      sortFn: true,
      sumFn: true,
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: strings.th_last_hits,
      tooltip: strings.tooltip_last_hits,
      field: 'last_hits',
      sortFn: true,
      sumFn: true,
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: strings.th_denies,
      tooltip: strings.tooltip_denies,
      field: 'denies',
      sortFn: true,
      sumFn: true,
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: strings.th_hero_damage,
      tooltip: strings.tooltip_hero_damage,
      field: 'hero_damage',
      sortFn: true,
      sumFn: true,
      displayFn: row => abbreviateNumber(row.hero_damage),
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: strings.th_hero_healing,
      tooltip: strings.tooltip_hero_healing,
      field: 'hero_healing',
      sortFn: true,
      sumFn: true,
      displayFn: row => abbreviateNumber(row.hero_healing),
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: strings.th_tower_damage,
      tooltip: strings.tooltip_tower_damage,
      field: 'tower_damage',
      displayFn: row => abbreviateNumber(row.tower_damage),
      sortFn: true,
      sumFn: true,
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: (
        <StyledGoldIcon>
          <img src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/gold.png`} alt="" />
          {strings.th_gold}
        </StyledGoldIcon>
      ),
      tooltip: strings.tooltip_gold,
      field: 'total_gold',
      sortFn: true,
      color: constants.golden,
      sumFn: true,
      displayFn: row => abbreviateNumber(row.total_gold),
      // relativeBars: true,
      underline: 'max',
    },
    {
      displayName: strings.th_items,
      tooltip: strings.tooltip_items,
      field: 'items',
      displayFn: (row) => {
        const itemArray = [];
        const additionalItemArray = [];
        const backpackItemArray = [];

        const visitedItemsCount = {};

        for (let i = 0; i < 6; i += 1) {
          const itemKey = itemIds[row[`item_${i}`]];
          const { itemSkipCount, purchaseEvent } = findBuyTime(row.purchase_log, itemKey, visitedItemsCount[itemKey]);
          visitedItemsCount[itemKey] = itemSkipCount;

          if (items[itemKey]) {
            itemArray.push(inflictorWithValue(itemKey, formatSeconds(purchaseEvent && purchaseEvent.time)));
          }

          // Use hero_id because Meepo showing up as an additional unit in some matches http://dev.dota2.com/showthread.php?t=132401
          if (row.hero_id === 80 && row.additional_units) {
            const additionalItemKey = itemIds[row.additional_units[0][`item_${i}`]];
            const additionalFirstPurchase = row.first_purchase_time && row.first_purchase_time[additionalItemKey];

            if (items[additionalItemKey]) {
              additionalItemArray.push(inflictorWithValue(additionalItemKey, formatSeconds(additionalFirstPurchase)));
            }
          }

          const backpackItemKey = itemIds[row[`backpack_${i}`]];
          const backpackfirstPurchase = row.first_purchase_time && row.first_purchase_time[backpackItemKey];

          if (items[backpackItemKey]) {
            backpackItemArray.push(inflictorWithValue(backpackItemKey, formatSeconds(backpackfirstPurchase)));
          }
        }

        return (
          <StyledDivClearBoth>
            {itemArray &&
              <div>
                {itemArray}
              </div>}
            {additionalItemArray &&
              <div>
                {additionalItemArray}
              </div>}
            {backpackItemArray &&
              backpackItemArray.length > 0 &&
              <StyledBackpack>
                <div data-hint={strings.tooltip_backpack} data-hint-position="bottom">
                  <IconBackpack />
                </div>
                {backpackItemArray}
              </StyledBackpack>}
          </StyledDivClearBoth>
        );
      },
    },
  ].concat(match.players.map(player => player.permanent_buffs && player.permanent_buffs.length).reduce(sum, 0) > 0
    ? {
      displayName: strings.th_permanent_buffs,
      field: 'permanent_buffs',
      displayFn: row =>
        (row.permanent_buffs && row.permanent_buffs.length > 0 ? row.permanent_buffs.map(buff => inflictorWithValue(buffs[buff.permanent_buff], buff.stack_count, 'buff')) : '-'),
    }
    : []);

  return cols;
};

export const abilityColumns = () => {
  const cols = Array.from(new Array(26), (_, index) => ({
    displayName: `${index}`,
    tooltip: 'Ability upgraded at this level',
    field: `ability_upgrades_arr_${index}`,
    displayFn: row =>
      (
        <StyledAbilityUpgrades data-tip data-for={`au_${row.player_slot}`} >
          <div className="ability">
            {inflictorWithValue(abilityIds[row[`ability_upgrades_arr_${index}`]]) || <div className="placeholder" />}
          </div>
        </StyledAbilityUpgrades>),
  }));

  cols[0] = heroTdColumn;

  return cols;
};

export const abilityDraftColumns = () => {
  const cols = Array.from(new Array(6), (_, index) => ({
    displayName: `${index}`,
    tooltip: strings.tooltip_abilitydraft,
    field: `abilities${index}`,
    displayFn: row =>
      (
        <StyledAbilityUpgrades data-tip data-for={`au_${row.player_slot}`} >
          <div className="ability">
            {inflictorWithValue(abilityIds[row.abilities[index - 1]]) || <div className="placeholder" />}
          </div>
        </StyledAbilityUpgrades>),
  }));

  cols[0] = heroTdColumn;

  return cols;
};

export const benchmarksColumns = (match) => {
  const cols = [heroTdColumn];
  if (match.players && match.players[0] && match.players[0].benchmarks) {
    Object.keys(match.players[0].benchmarks).forEach((key, i) => {
      cols.push({
        displayName: strings[`th_${key}`],
        tooltip: strings[`tooltip_${key}`],
        field: 'benchmarks',
        index: i,
        displayFn: (row, column, field) => {
          if (field) {
            const bm = field[key];
            const bucket = percentile(bm.pct);
            const percent = Number(bm.pct * 100).toFixed(2);
            const value = Number((bm.raw || 0).toFixed(2));
            return (
              <div data-tip data-for={`benchmarks_${row.player_slot}_${key}`}>
                <span style={{ color: constants[bucket.color] }}>{`${percent}%`}</span>
                <small style={{ margin: '3px' }}>
                  {value}
                </small>
                <ReactTooltip id={`benchmarks_${row.player_slot}_${key}`} place="top" effect="solid">
                  {util.format(strings.benchmarks_description, value, strings[`th_${key}`], percent)}
                </ReactTooltip>
              </div>
            );
          }
          return null;
        },
      });
    });
  }
  return cols;
};

const displayFantasyComponent = transform => (row, col, field) => {
  const score = Number(transform(field).toFixed(2));
  const raw = Number((field || 0).toFixed(2));
  return (
    <div data-tip data-for={`fantasy_${row.player_slot}_${col.field}`}>
      <span>
        {score}
      </span>
      <small style={{ margin: '3px', color: 'rgb(179, 179, 179)' }}>
        {raw}
      </small>
      <ReactTooltip id={`fantasy_${row.player_slot}_${col.field}`} place="top" effect="solid">
        {util.format(strings.fantasy_description, raw, score)}
      </ReactTooltip>
    </div>
  );
};

const fantasyComponents = [
  {
    displayName: strings.th_kills,
    field: 'kills',
    fantasyFn: v => 0.3 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_deaths,
    field: 'deaths',
    fantasyFn: v => 3 - (0.3 * v),
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_last_hits,
    field: 'last_hits',
    fantasyFn: v => 0.003 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_denies,
    field: 'denies',
    fantasyFn: v => 0.003 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_gold_per_min,
    field: 'gold_per_min',
    fantasyFn: v => 0.002 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_towers,
    field: 'towers_killed',
    fantasyFn: v => 1 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_roshan,
    field: 'roshans_killed',
    fantasyFn: v => 1 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_teamfight_participation,
    field: 'teamfight_participation',
    fantasyFn: v => 3 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_observers_placed,
    field: 'obs_placed',
    fantasyFn: v => 0.5 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_camps_stacked,
    field: 'camps_stacked',
    fantasyFn: v => 0.5 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.heading_runes,
    field: 'rune_pickups',
    fantasyFn: v => 0.25 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_firstblood_claimed,
    field: 'firstblood_claimed',
    fantasyFn: v => 4 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
  {
    displayName: strings.th_stuns,
    field: 'stuns',
    fantasyFn: v => 0.05 * v,
    get displayFn() {
      return displayFantasyComponent(this.fantasyFn);
    },
  },
];

export const fantasyColumns = [
  heroTdColumn,
  {
    displayName: strings.th_fantasy_points,
    displayFn: row => fantasyComponents.map(comp => comp.fantasyFn(row[comp.field])).reduce((a, b) => a + b).toFixed(2),
  },
].concat(fantasyComponents);

export const purchaseTimesColumns = (match, showConsumables) => {
  const cols = [heroTdColumn];
  const bucket = 300;
  for (let i = 0; i < match.duration + bucket; i += bucket) {
    const curTime = i;
    cols.push({
      displayName: `${curTime / 60}'`,
      field: 'purchase_log',
      displayFn: (row, column, field) =>
        (
          <div>
            {field
            ? field
              .filter(purchase => purchase.time >= curTime - bucket && purchase.time < curTime)
              .sort((p1, p2) => {
                const item1 = items[p1.key];
                const item2 = items[p2.key];
                if (item1 && item2 && p1.time === p2.time) {
                  // We're only concerned with sorting by value
                  // if items are bought at the same time, time is presorted
                  return item1.cost - item2.cost;
                }
                return 0;
              })
              .map((purchase) => {
                if (items[purchase.key] && (showConsumables || items[purchase.key].qual !== 'consumable')) {
                  return inflictorWithValue(purchase.key, formatSeconds(purchase.time));
                }
                return null;
              })
            : ''}
          </div>),
    });
  }
  return cols;
};

export const lastHitsTimesColumns = (match) => {
  const cols = [heroTdColumn];
  const bucket = 300;
  for (let i = bucket; i <= match.duration; i += bucket) {
    const curTime = i;
    const minutes = curTime / 60;
    cols.push({
      displayName: `${minutes}'`,
      field: i,
      sortFn: row => row.lh_t && row.lh_t[minutes],
      displayFn: row => `${row.lh_t[minutes]} (+${row.lh_t[minutes] - row.lh_t[minutes - (bucket / 60)]})`,
      relativeBars: true,
      sumFn: (acc, row) => (acc + ((row.lh_t && row.lh_t[minutes]) ? row.lh_t[minutes] : 0)),
    });
  }
  return cols;
};

export const performanceColumns = [
  heroTdColumn,
  {
    displayName: strings.th_multikill,
    tooltip: strings.tooltip_multikill,
    field: 'multi_kills_max',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_killstreak,
    tooltip: strings.tooltip_killstreak,
    field: 'kill_streaks_max',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_stuns,
    tooltip: strings.tooltip_stuns,
    field: 'stuns',
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.toFixed(2) : '-'),
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_stacked,
    tooltip: strings.tooltip_camps_stacked,
    field: 'camps_stacked',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_dead,
    tooltip: strings.tooltip_dead,
    field: 'life_state_dead',
    sortFn: true,
    displayFn: (row, col, field) => formatSeconds(field) || '-',
    relativeBars: true,
    invertBarColor: true,
    sumFn: true,
    displaySumFn: total => formatSeconds(total) || '-',
  },
  {
    displayName: strings.th_buybacks,
    tooltip: strings.tooltip_buybacks,
    field: 'buybacks',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_pings,
    tooltip: strings.tooltip_pings,
    field: 'pings',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_biggest_hit,
    tooltip: strings.tooltip_biggest_hit,
    field: 'max_hero_hit',
    sortFn: true,
    displayFn: (row, column, field) => {
      if (field) {
        const hero = heroNames[field.key] || {};
        return (
          <div>
            {inflictorWithValue(field.inflictor, abbreviateNumber(field.value))}
            <img src={`${process.env.REACT_APP_API_HOST}${hero.img}`} style={{ height: '30px' }} alt="" />
          </div>
        );
      }
      return <div />;
    },
  },
  {
    displayName: strings.th_other,
    field: 'performance_others',
    sortFn: true,
    displayFn: (row, col, field) => {
      const comp = [];
      if (field) {
        if (field.tracked_deaths) {
          const tooltip = [`${field.tracked_deaths} ${strings.tooltip_others_tracked_deaths}`, `${field.track_gold} ${strings.tooltip_others_track_gold}`];
          comp.push(inflictorWithValue('bounty_hunter_track', abbreviateNumber(field.tracked_deaths), '', tooltip.join('\n')));
        }
        if (field.greevils_greed_gold) {
          const tooltip = `${field.greevils_greed_gold} ${strings.tooltip_others_greevils_gold}`;
          comp.push(inflictorWithValue('alchemist_goblins_greed', abbreviateNumber(field.greevils_greed_gold), '', tooltip));
        }
        return comp;
      }
      return '-';
    },
  },
];

export const laningColumns = (currentState, setSelectedPlayer) => [
  { displayFn: row => <RadioButton checked={currentState.selectedPlayer === row.player_slot} onClick={() => setSelectedPlayer(row.player_slot)} /> },
  heroTdColumn,
  {
    displayName: strings.heading_is_radiant,
    tooltip: strings.heading_is_radiant,
    field: 'isRadiant',
    sortFn: true,
    displayFn: (row, col, field) =>
      (
        <span>
          {field && <IconRadiant height="30" /> }
          {!field && <IconDire height="30" /> }
        </span>
      ),
  },
  {
    displayName: strings.th_lane,
    tooltip: strings.tooltip_lane,
    field: 'lane_role',
    sortFn: true,
    displayFn: (row, col, field) =>
      (
        <div>
          <span>
            {strings[`lane_role_${field}`]}
          </span>
          {row.is_roaming &&
          <span style={subTextStyle}>
            {strings.roaming}
          </span>}
        </div>),
  },
  {
    displayName: strings.th_lane_efficiency,
    tooltip: strings.tooltip_lane_efficiency,
    field: 'lane_efficiency',
    sortFn: true,
    displayFn: (row, col, field) => (field ? `${(field * 100).toFixed(2)}%` : '-'),
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_lhten,
    tooltip: strings.tooltip_lhten,
    field: 'lh_ten',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_dnten,
    tooltip: strings.tooltip_dnten,
    field: 'dn_ten',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
];

export const unitKillsColumns = [
  heroTdColumn,
  {
    displayName: strings.th_heroes,
    tooltip: strings.farm_heroes,
    field: 'hero_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_creeps,
    tooltip: strings.farm_creeps,
    field: 'lane_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_neutrals,
    tooltip: strings.farm_neutrals,
    field: 'neutral_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_ancients,
    tooltip: strings.farm_ancients,
    field: 'ancient_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_towers,
    tooltip: strings.farm_towers,
    field: 'tower_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_couriers,
    tooltip: strings.farm_couriers,
    field: 'courier_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_roshan,
    tooltip: strings.farm_roshan,
    field: 'roshan_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_observers_placed,
    tooltip: strings.farm_observers,
    field: 'observer_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_necronomicon,
    tooltip: strings.farm_necronomicon,
    field: 'necronomicon_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  },
  {
    displayName: strings.th_other,
    field: 'specific',
    // TODO make this work for non-english (current names are hardcoded in dotaconstants)
    displayFn: (row, col, field) =>
      (
        <div>
          {Object.keys(field || {}).map((unit, index) => <div key={index}>{`${field[unit]} ${unit}`}</div>)}
        </div>),
    sumFn: (acc, row) => {
      const result = (acc != null) ? acc : {};

      Object.keys(row.specific || {}).forEach((unit) => {
        result[unit] = ((result[unit] ? result[unit] : 0) + row.specific[unit]);
      });

      return result;
    },
    displaySumFn: totals => (
      <div>
        {Object.keys(totals || {}).map((unit, index) => <div key={index}>{`${totals[unit]} ${unit}`}</div>)}
      </div>
    ),
  },
];

export const actionsColumns = [
  heroTdColumn,
  {
    displayName: strings.th_actions_per_min,
    tooltip: strings.tooltip_actions_per_min,
    field: 'actions_per_min',
    sortFn: true,
    relativeBars: true,
  },
].concat(Object.keys(orderTypes).filter(orderType => `th_${orderTypes[orderType]}` in strings).map(orderType => ({
  displayName: strings[`th_${orderTypes[orderType]}`],
  tooltip: strings[`tooltip_${orderTypes[orderType]}`],
  field: orderType,
  sortFn: row => (row.actions ? row.actions[orderType] : 0),
  displayFn: (row, column, value) => value || '-',
  relativeBars: true,
})));

export const runesColumns = [heroTdColumn].concat(Object.keys(strings).filter(str => str.indexOf('rune_') === 0).map(str => str.split('_')[1]).map(runeType => ({
  displayName: (
    <StyledRunes data-tip data-for={`rune_${runeType}`}>
      <img src={`/assets/images/dota2/runes/${runeType}.png`} alt="" />
      <ReactTooltip id={`rune_${runeType}`} effect="solid">
        <span>
          {strings[`rune_${runeType}`]}
        </span>
      </ReactTooltip>
    </StyledRunes>
  ),
  field: `rune_${runeType}`,
  displayFn: (row, col, value) => value || '-',
  sortFn: row => row.runes && row.runes[runeType],
  relativeBars: true,
})));

const cosmeticsRarity = {
  common: '#B0C3D9',
  uncommon: '#5E98D9',
  rare: '#4B69FF',
  mythical: '#8847FF',
  legendary: '#D32CE6',
  immortal: '#E4AE33',
  arcana: '#ADE55C',
  ancient: '#EB4B4B',
};
export const cosmeticsColumns = [
  heroTdColumn,
  {
    displayName: strings.th_cosmetics,
    field: 'cosmetics',
    displayFn: (row, col, field) =>
      field.map((cosmetic, i) =>
        (
          <StyledCosmetic key={i} data-tip data-for={`cosmetic_${cosmetic.item_id}`}>
            <a href={`http://steamcommunity.com/market/listings/570/${cosmetic.name}`} target="_blank" rel="noopener noreferrer">
              <img
                src={`${process.env.REACT_APP_API_HOST}/apps/570/${cosmetic.image_path}`}
                alt=""
                style={{
                borderBottom: `2px solid ${cosmetic.item_rarity ? cosmeticsRarity[cosmetic.item_rarity] : constants.colorMuted}`,
              }}
              />
              <ActionOpenInNew />
            </a>
            <ReactTooltip id={`cosmetic_${cosmetic.item_id}`} effect="solid">
              <span style={{ color: cosmetic.item_rarity && cosmeticsRarity[cosmetic.item_rarity] }}>
                {cosmetic.name}
                <span>
                  {cosmetic.item_rarity}
                </span>
              </span>
            </ReactTooltip>
          </StyledCosmetic>)),
  },
];

export const goldReasonsColumns = [heroTdColumn].concat(Object.keys(strings).filter(str => str.indexOf('gold_reasons_') === 0).map(gr => ({
  displayName: strings[gr],
  field: gr,
  sortFn: row => (row.gold_reasons ? row.gold_reasons[gr.substring('gold_reasons_'.length)] : 0),
  displayFn: (row, column, value) => value || '-',
  relativeBars: true,
  sumFn: (acc, row) => (acc + (row.gold_reasons ? (row.gold_reasons[gr.substring('gold_reasons_'.length)] || 0) : 0)),
})));

export const xpReasonsColumns = [heroTdColumn].concat(Object.keys(strings).filter(str => str.indexOf('xp_reasons_') === 0).map(xpr => ({
  displayName: strings[xpr],
  field: xpr,
  sortFn: row => (row.xp_reasons ? row.xp_reasons[xpr.substring('xp_reasons_'.length)] : 0),
  displayFn: (row, column, value) => value || '-',
  relativeBars: true,
  sumFn: (acc, row) => (acc + (row.xp_reasons ? (row.xp_reasons[xpr.substring('xp_reasons_'.length)] || 0) : 0)),
})));

export const objectiveDamageColumns = [heroTdColumn].concat(Object.keys(strings).filter(str => str.indexOf('objective_') === 0).map(obj => ({
  displayName: strings[obj],
  field: obj,
  sortFn: row => row.objective_damage && row.objective_damage[obj.substring('objective_'.length)],
  displayFn: (row, col, value) => value || '-',
  relativeBars: true,
})));

export const inflictorsColumns = [
  heroTdColumn,
  {
    displayName: strings.th_damage_dealt,
    field: 'damage_inflictor',
    displayFn: (row, col, field) =>
      (field ? Object.keys(field).sort((a, b) => field[b] - field[a]).map(inflictor => inflictorWithValue(inflictor, abbreviateNumber(field[inflictor]))) : ''),
  },
  {
    displayName: strings.th_damage_received,
    field: 'damage_inflictor_received',
    displayFn: (row, col, field) =>
      (field ? Object.keys(field).sort((a, b) => field[b] - field[a]).map(inflictor => inflictorWithValue(inflictor, abbreviateNumber(field[inflictor]))) : ''),
  },
];

const sumValues = f => Object.values(f).reduce((a, b) => a + b);

const valueStyle = {
  position: 'absolute',
  textAlign: 'center',
  marginLeft: '16px',
  marginTop: '18px',
  fontSize: '12px',
  backgroundColor: constants.darkPrimaryColor,
};

const targetTooltip = (t) => {
  const targets = [];
  Object.keys(t).forEach((target) => {
    const heroicon = heroes[getHeroesById()[target].id] && process.env.REACT_APP_API_HOST + heroes[getHeroesById()[target].id].icon;
    const j = (

      <div style={{ display: 'inline-block', paddingBottom: '20px' }}>
        <span style={valueStyle}>{`${t[target]}x`}</span>
        <img
          src={heroicon}
          alt=""
          style={{ height: '30px', paddingLeft: '15px' }}
        />
      </div>);
    targets.push([j, t[target]]);
  });

  return targets.sort((a, b) => b[1] - a[1]).map(x => x[0]);
};

export const castsColumns = [
  heroTdColumn,
  {
    displayName: strings.th_abilities,
    tooltip: strings.tooltip_casts,
    field: 'ability_uses',
    displayFn: (row, col, field) =>
      (field ? Object.keys(field).sort((a, b) => field[b] - field[a]).map(inflictor => inflictorWithValue(inflictor, abbreviateNumber(field[inflictor]))) : ''),
  },
  {
    displayName: strings.th_target_abilities,
    tooltip: strings.tooltip_target_abilities,
    field: 'ability_targets',
    displayFn: (row, col, field) => {
      if (field) {
        const r = [];
        Object.keys(field).forEach((inflictor) => {
          r.push(inflictorWithValue(inflictor, sumValues(field[inflictor])));
          r.push(targetTooltip(field[inflictor]));
        });

        return (
          <div style={{ display: 'inline-block', width: '150px' }}>{r}</div>
        );
      }
      return null;
    },
  },
  {
    displayName: strings.th_items,
    tooltip: strings.tooltip_casts,
    field: 'item_uses',
    displayFn: (row, col, field) =>
      (field ? Object.keys(field).sort((a, b) => field[b] - field[a]).map(inflictor => inflictorWithValue(inflictor, abbreviateNumber(field[inflictor]))) : ''),
  },
  {
    displayName: strings.th_hits,
    tooltip: strings.tooltip_hits,
    field: 'hero_hits',
    displayFn: (row, col, field) =>
      (field ? Object.keys(field).sort((a, b) => field[b] - field[a]).map(inflictor => inflictorWithValue(inflictor, abbreviateNumber(field[inflictor]))) : ''),
  },
];

export const analysisColumns = [
  heroTdColumn,
  {
    displayName: strings.th_analysis,
    field: 'analysis',
    displayFn: (row, col, field) =>
      Object.keys(field || {}).map((key) => {
        const val = field[key];
        val.display = `${val.name}: ${Number(val.value ? val.value.toFixed(2) : '')} / ${Number(val.top.toFixed(2))}`;
        val.pct = val.score(val.value) / val.score(val.top);
        if (val.valid) {
          const percent = field[key].pct;
          const bucket = percentile(percent);
          return (
            <div>
              <span style={{ color: constants[bucket.color], margin: '10px', fontSize: '18px' }}>
                {bucket.grade}
              </span>
              <span>
                {field[key].display}
              </span>
              <StyledUnusedItem>
                {key === 'unused_item' && field[key].metadata.map(item => inflictorWithValue(item))}
              </StyledUnusedItem>
            </div>
          );
        }
        return null;
      }),
  },
];

const playerDeaths = (row, col, field) => {
  const deaths = [];
  for (let i = 0; i < field; i += 1) {
    deaths.push(<img src="/assets/images/player_death.png" alt="" />);
  }
  return (
    field > 0 &&
    <StyledPlayersDeath>
      {deaths}
    </StyledPlayersDeath>
  );
};

const inflictorRow = obj => (row, col, field) =>
  (field
    ?
      <div style={{ maxWidth: '100px' }}>
        {Object.keys(field).map((inflictor) => {
        if (obj[inflictor]) {
          return inflictorWithValue(inflictor, field[inflictor]);
        }
        return null;
      })}
      </div>
    : '');

export const teamfightColumns = [
  heroTdColumn,
  {
    displayName: strings.th_death,
    field: 'deaths',
    sortFn: true,
    displayFn: playerDeaths,
  },
  {
    displayName: strings.th_damage,
    field: 'damage',
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_healing,
    field: 'healing',
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_gold,
    field: 'gold_delta',
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_xp,
    field: 'xp_delta',
    sortFn: true,
    relativeBars: true,
  },
  {
    displayName: strings.th_abilities,
    field: 'ability_uses',
    displayFn: inflictorRow(abilityKeys),
  },
  {
    displayName: strings.th_items,
    field: 'item_uses',
    displayFn: inflictorRow(items),
  },
];

const computeAverage = (row, type) => {
  const t = type === 'obs' ? 'ward_observer' : 'ward_sentry';
  const maxDuration = items[t].attrib.find(x => x.key === 'lifetime').value;
  const totalDuration = [];
  row[`${type}_log`].forEach((ward) => {
    const findTime = row[`${type}_left_log`].find(x => x.ehandle === ward.ehandle);
    const leftTime = (findTime && findTime.time) || false;
    if (leftTime !== false) { // exclude wards that did not expire before game ended from average time
      const duration = Math.min(Math.max(leftTime - ward.time, 0), maxDuration);
      totalDuration.push(duration);
    }
  });
  let sum = 0;
  for (let i = 0; i < totalDuration.length; i += 1) {
    sum += totalDuration[i];
  }
  const avg = sum / totalDuration.length;

  return avg;
};

const obsAvgColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} alt="" />
      &nbsp;{strings.th_duration_shorthand}
    </div>
  ),
  field: 'obs_avg_life',
  tooltip: strings.tooltip_duration_observer,
  sortFn: row => computeAverage(row, 'obs'),
  displayFn: row => formatSeconds(computeAverage(row, 'obs')) || '-',
  relativeBars: true,
};

const senAvgColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} alt="" />
      &nbsp;{strings.th_duration_shorthand}
    </div>
  ),
  field: 'sen_avg_life',
  tooltip: strings.tooltip_duration_sentry,
  sortFn: row => computeAverage(row, 'sen'),
  displayFn: row => formatSeconds(computeAverage(row, 'sen')) || '-',
  relativeBars: true,
};

const purchaseObserverColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} alt="" />
      &nbsp;{strings.th_purchase_shorthand}
    </div>
  ),
  tooltip: strings.tooltip_purchase_ward_observer,
  field: 'purchase_ward_observer',
  sortFn: true,
  displayFn: (row, col, field) => field || '-',
  relativeBars: true,
};

const purchaseSentryColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} alt="" />
      &nbsp;{strings.th_purchase_shorthand}
    </div>
  ),
  tooltip: strings.tooltip_purchase_ward_sentry,
  field: 'purchase_ward_sentry',
  sortFn: true,
  displayFn: (row, col, field) => field || '-',
  relativeBars: true,
};

const purchaseDustColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/dust_lg.png`} alt="" />
      &nbsp;{strings.th_purchase_shorthand}
    </div>
  ),
  tooltip: strings.tooltip_purchase_dust,
  field: 'purchase_dust',
  sortFn: true,
  displayFn: (row, col, field) => field || '-',
  relativeBars: true,
};

const purchaseSmokeColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/smoke_of_deceit_lg.png`} alt="" />
      &nbsp;{strings.th_purchase_shorthand}
    </div>
  ),
  tooltip: strings.tooltip_purchase_smoke_of_deceit,
  field: 'purchase_smoke_of_deceit',
  sortFn: true,
  displayFn: (row, col, field) => field || '-',
  relativeBars: true,
};

const purchaseGemColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/gem_lg.png`} alt="" />
      &nbsp;{strings.th_purchase_shorthand}
    </div>
  ),
  tooltip: strings.tooltip_purchase_gem,
  field: 'purchase_gem',
  sortFn: true,
  displayFn: (row, col, field) => field || '-',
  relativeBars: true,
};
export const visionColumns = [
  heroTdColumn,
  purchaseObserverColumn,
  {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} alt="" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_ward_observer,
    field: 'uses_ward_observer',
    sortFn: row => row.obs_log && row.obs_log.length,
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  obsAvgColumn,
  purchaseSentryColumn,
  {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} alt="" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_ward_sentry,
    field: 'uses_ward_sentry',
    sortFn: row => row.sen_log && row.sen_log.length,
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  senAvgColumn,
  purchaseDustColumn,
  {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/dust_lg.png`} alt="" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_dust,
    field: 'uses_dust',
    sortFn: row => row.item_uses && row.item_uses.dust,
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  purchaseSmokeColumn,
  {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img height="15" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/smoke_of_deceit_lg.png`} alt="" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_smoke_of_deceit,
    field: 'uses_smoke',
    sortFn: row => row.item_uses && row.item_uses.smoke_of_deceit,
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  purchaseGemColumn,
];
