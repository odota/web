import React from 'react';
import findLast from 'lodash/fp/findLast';
import { Tooltip } from '@material-ui/core';
import heroes from 'dotaconstants/build/heroes.json';
import orderTypes from 'dotaconstants/build/order_types.json';
import itemIds from 'dotaconstants/build/item_ids.json';
import buffs from 'dotaconstants/build/permanent_buffs.json';
import ReactTooltip from 'react-tooltip';
import { RadioButton } from 'material-ui/RadioButton';
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import {
  formatSeconds,
  abbreviateNumber,
  percentile,
  sum,
  subTextStyle,
  getHeroesById,
  rankTierToString,
  groupBy,
  compileLevelOneStats,
  formatTemplateToString,
} from '../../utility';
import { TableHeroImage, inflictorWithValue } from '../Visualizations';
import { CompetitiveRank } from '../Visualizations/Table/HeroImage';
import { IconBackpack, IconRadiant, IconDire, IconTrophy } from '../Icons';
import constants from '../constants';
import {
  StyledAbilityUpgrades,
  StyledBackpack,
  StyledCosmetic,
  StyledDivClearBoth,
  StyledPlayersDeath,
  StyledRunes,
  StyledUnusedItem,
  StyledAghanimsBuffs,
  StyledLevel,
  StyledLineWinnerSpan,
} from './StyledMatch';
import TargetsBreakdown from './TargetsBreakdown';
import HeroImage from './../Visualizations/HeroImage';
import ItemTooltip from '../ItemTooltip';
import config from '../../config';

const items = (await import('dotaconstants/build/items.json')).default;
const heroNames = getHeroesById();
const parsedBenchmarkCols = ['lhten', 'stuns_per_min'];

const shardTooltip = <ItemTooltip item={items.aghanims_shard} />;
const scepterTooltip = <ItemTooltip item={items.ultimate_scepter} />;
const AGHANIMS_SHARD = 12;
const AGHANIMS_SCEPTER = 2;

export default (strings) => {
  const heroTd = (
    row,
    col,
    field,
    index,
    hideName,
    party,
    showGuide = false,
    guideType
  ) => {
    const heroName =
      heroes[row.hero_id] &&
      heroes[row.hero_id].localized_name.toLowerCase().replace(' ', '-');
    return (
      <TableHeroImage
        title={row.name || row.personaname || strings.general_anonymous}
        registered={row.last_login}
        contributor={row.is_contributor}
        subscriber={row.is_subscriber}
        accountId={row.account_id}
        playerSlot={row.player_slot}
        subtitle={
          <CompetitiveRank
            rankTier={rankTierToString(row.rank_tier)}
            strings={strings}
          />
        }
        hideText={hideName}
        confirmed={row.account_id && row.name}
        party={party}
        heroName={
          heroes[row.hero_id]
            ? heroes[row.hero_id].localized_name
            : strings.general_no_hero
        }
        heroID={row.hero_id}
        facet={row.hero_variant}
        showGuide={showGuide}
        guideType={guideType}
        guideUrl={
          heroes[row.hero_id] &&
          `https://moremmr.com/en/heroes/${heroName}/videos?utm_source=opendota&utm_medium=heroes&utm_campaign=${heroName}`
        }
        randomed={row.randomed}
        repicked={row.repicked}
        predictedVictory={row.pred_vict}
        leaverStatus={row.leaver_status}
        hero={compileLevelOneStats(heroes[row.hero_id])}
      />
    );
  };

  const heroTdColumn = {
    displayName: strings.th_avatar,
    field: 'player_slot',
    key: 'heroTd',
    displayFn: heroTd,
    sortFn: true,
  };

  const partyStyles = (row, match) => {
    if (
      row.party_size === 1 ||
      (match.players &&
        !match.players.map((player) => player.party_id).reduce(sum))
    ) {
      return null;
    }
    // groupBy party id, then remove all the solo players, then find the index the party the row player is in
    const index = Object.values(groupBy(match.players, 'party_id'))
      .filter((x) => x.length > 1)
      .findIndex((x) => x.find((y) => y.player_slot === row.player_slot));
    return (
      <div className={`group group${index}`}>
        <div className="numerals">{['I', 'II', 'III', 'IV'][index]}</div>
      </div>
    );
  };

  const findBuyTime = (purchaseLog, itemKey, _itemSkipCount) => {
    let skipped = 0;
    let itemSkipCount = _itemSkipCount || 0;
    const purchaseEvent = findLast((item) => {
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

  const itemsTd = (row) => {
    const itemArray = [];
    const additionalItemArray = [];
    const backpackItemArray = [];

    const visitedItemsCount = {};

    for (let i = 0; i < 6; i += 1) {
      const itemKey = itemIds[row[`item_${i}`]];
      const { itemSkipCount, purchaseEvent } = findBuyTime(
        row.purchase_log,
        itemKey,
        visitedItemsCount[itemKey]
      );
      visitedItemsCount[itemKey] = itemSkipCount;

      if (items[itemKey]) {
        itemArray.push(
          inflictorWithValue(
            itemKey,
            formatSeconds(purchaseEvent && purchaseEvent.time)
          )
        );
      }

      // Use hero_id because Meepo showing up as an additional unit in some matches http://dev.dota2.com/showthread.php?t=132401
      if (row.hero_id === 80 && row.additional_units) {
        const additionalItemKey = itemIds[row.additional_units[0][`item_${i}`]];
        const additionalFirstPurchase =
          row.first_purchase_time && row.first_purchase_time[additionalItemKey];

        if (items[additionalItemKey]) {
          additionalItemArray.push(
            inflictorWithValue(
              additionalItemKey,
              formatSeconds(additionalFirstPurchase)
            )
          );
        }
      }

      const backpackItemKey = itemIds[row[`backpack_${i}`]];
      const backpackfirstPurchase =
        row.first_purchase_time && row.first_purchase_time[backpackItemKey];

      if (items[backpackItemKey]) {
        backpackItemArray.push(
          inflictorWithValue(
            backpackItemKey,
            formatSeconds(backpackfirstPurchase),
            'backpack'
          )
        );
      }
    }

    return (
      <StyledDivClearBoth>
        {itemArray && <div>{itemArray}</div>}
        {additionalItemArray && <div>{additionalItemArray}</div>}
        {backpackItemArray && backpackItemArray.length > 0 && (
          <StyledBackpack>
            <div
              data-hint={strings.tooltip_backpack}
              data-hint-position="bottom"
            >
              <IconBackpack />
            </div>
            {backpackItemArray}
          </StyledBackpack>
        )}
      </StyledDivClearBoth>
    );
  };

  const overviewColumns = (match) => {
    const cols = [
      {
        displayName: strings.th_avatar,
        field: 'player_slot',
        displayFn: (row, col, field, i) =>
          heroTd(
            row,
            col,
            field,
            i,
            false,
            partyStyles(row, match),
            false,
            null
          ),
        sortFn: true,
        width: 170,
      },
      {
        displayName: strings.th_level,
        tooltip: strings.tooltip_level,
        field: 'level',
        sortFn: true,
        maxFn: true,
        sumFn: true,
        textAlign: 'center',
        paddingRight: 7,
        width: 41,
        displayFn: (row, col, field) => (
          <StyledLevel>
            <span>{field}</span>
            <svg viewBox="0 0 36 36" className="circular_chart">
              <path
                className="circle"
                strokeDasharray={`${(field / constants.dotaMaxLevel) * 100
                  }, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </StyledLevel>
        ),
      },
      {
        displayName: strings.th_kills,
        tooltip: strings.tooltip_kills,
        field: 'kills',
        displayFn: (row, col, field) => field || '-',
        sortFn: true,
        sumFn: true,
        color: 'hsla(123, 25%, 57%, 1)',
        textAlign: 'right',
        paddingLeft: 10,
        paddingRight: 5,
        width: 21,
        underline: 'max',
      },
      {
        displayName: strings.th_deaths,
        tooltip: strings.tooltip_deaths,
        field: 'deaths',
        displayFn: (row, col, field) => field || '-',
        sortFn: true,
        sumFn: true,
        color: 'hsla(0, 80%, 65%, 1)',
        textAlign: 'right',
        paddingLeft: 5,
        paddingRight: 5,
        width: 21,
        underline: 'min',
      },
      {
        displayName: strings.th_assists,
        tooltip: strings.tooltip_assists,
        field: 'assists',
        displayFn: (row, col, field) => field || '-',
        sortFn: true,
        sumFn: true,
        color: constants.colorBlueGray,
        textAlign: 'right',
        paddingLeft: 5,
        paddingRight: 14,
        width: 21,
        underline: 'max',
      },
      {
        displayName: strings.th_last_hits,
        tooltip: strings.tooltip_last_hits,
        field: 'last_hits',
        displayFn: (row, col, field) => field || '-',
        sortFn: true,
        sumFn: true,
        // relativeBars: true,
        textAlign: 'right',
        paddingRight: 0,
        paddingLeft: 14,
        width: 21,
        underline: 'max',
      },
      {
        displayName: '/',
        displayFn: () => '/',
        sumFn: true,
        displaySumFn: () => '/',
        width: 5,
        paddingRight: 2,
        paddingLeft: 2,
        color: 'rgba(255, 255, 255, 0.4)',
        className: 'no-col-hover',
      },
      {
        displayName: strings.th_denies,
        tooltip: strings.tooltip_denies,
        field: 'denies',
        displayFn: (row, col, field) => field || '-',
        sortFn: true,
        sumFn: true,
        // relativeBars: true,
        paddingLeft: 0,
        paddingRight: 8,
        width: 21,
        underline: 'max',
      },
      {
        displayName: strings.th_net_worth,
        tooltip: strings.tooltip_net_worth,
        field: 'net_worth',
        sortFn: true,
        color: constants.golden,
        sumFn: true,
        displayFn: (row) => abbreviateNumber(row.net_worth),
        textAlign: 'right',
        width: 32,
        underline: 'max',
      },
      {
        displayName: strings.th_gold_per_min,
        tooltip: strings.tooltip_gold_per_min,
        field: 'gold_per_min',
        sortFn: true,
        sumFn: true,
        // relativeBars: true,
        textAlign: 'right',
        paddingRight: 0,
        paddingLeft: 10,
        width: 25,
        underline: 'max',
      },
      {
        displayName: '/',
        displayFn: () => '/',
        sumFn: true,
        displaySumFn: () => '/',
        width: 5,
        paddingRight: 2,
        paddingLeft: 2,
        color: 'rgba(255, 255, 255, 0.4)',
        className: 'no-col-hover',
      },
      {
        displayName: strings.th_xp_per_min,
        tooltip: strings.tooltip_xp_per_min,
        field: 'xp_per_min',
        sortFn: true,
        sumFn: true,
        // relativeBars: true,
        paddingLeft: 0,
        paddingRight: 11,
        width: 25,
        underline: 'max',
      },
      {
        displayName: strings.th_hero_damage,
        tooltip: strings.tooltip_hero_damage,
        field: 'hero_damage',
        sortFn: true,
        sumFn: true,
        displayFn: (row) => abbreviateNumber(row.hero_damage),
        // relativeBars: true,
        textAlign: 'right',
        paddingLeft: 14,
        paddingRight: 5,
        width: 32,
        underline: 'max',
      },
      {
        displayName: strings.th_tower_damage,
        tooltip: strings.tooltip_tower_damage,
        field: 'tower_damage',
        displayFn: (row) => abbreviateNumber(row.tower_damage),
        sortFn: true,
        sumFn: true,
        // relativeBars: true,
        textAlign: 'right',
        paddingLeft: 5,
        paddingRight: 5,
        width: 32,
        underline: 'max',
      },
      {
        displayName: strings.th_hero_healing,
        tooltip: strings.tooltip_hero_healing,
        field: 'hero_healing',
        sortFn: true,
        sumFn: true,
        displayFn: (row) => abbreviateNumber(row.hero_healing),
        // relativeBars: true,
        textAlign: 'right',
        paddingLeft: 5,
        paddingRight: 14,
        width: 32,
        underline: 'max',
      },
      {
        displayName: strings.th_items,
        tooltip: strings.tooltip_items,
        field: 'items',
        width: 240,
        displayFn: itemsTd,
      },
    ]
      .concat(
        match.players.map((player) => player.item_neutral).reduce(sum, 0) > 0
          ? {
            field: 'item_neutral',
            width: 20,
            paddingRight: 23,
            paddingLeft: 5,
            displayFn: (row) => (
              <div
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: 'rgba(38, 71, 90, 0.29)',
                  borderRadius: '15px',
                }}
              >
                {row.item_neutral
                  ? inflictorWithValue(
                    itemIds[row.item_neutral],
                    null,
                    'neutral'
                  )
                  : null}
              </div>
            ),
          }
          : []
      )
      .concat({
        paddingLeft: 5,
        paddingRight: 0,
        width: 32,
        displayFn: (row) => (
          <StyledAghanimsBuffs>
            <ReactTooltip id="scepter" effect="solid" place="left">
              {scepterTooltip}
            </ReactTooltip>
            <ReactTooltip id="shard" effect="solid" place="left">
              {shardTooltip}
            </ReactTooltip>
            <img
              src={`/assets/images/dota2/scepter_${row.permanent_buffs &&
                row.permanent_buffs.some(
                  (b) => b.permanent_buff === AGHANIMS_SCEPTER
                )
                ? '1'
                : '0'
                }.png`}
              alt="Aghanim's Scepter"
              data-tip={scepterTooltip}
              data-for="scepter"
            />
            <img
              src={`/assets/images/dota2/shard_${row.permanent_buffs &&
                row.permanent_buffs.some(
                  (b) => b.permanent_buff === AGHANIMS_SHARD
                )
                ? '1'
                : '0'
                }.png`}
              alt="Aghanim's Shard"
              data-tip={shardTooltip}
              data-for="shard"
            />
          </StyledAghanimsBuffs>
        ),
      })
      .concat(
        match.players
          .map(
            (player) => player.permanent_buffs && player.permanent_buffs.length
          )
          .reduce(sum, 0) > 0
          ? {
            displayName: strings.th_permanent_buffs,
            tooltip: strings.tooltip_permanent_buffs,
            field: 'permanent_buffs',
            width: 60,
            displayFn: (row) =>
              row.permanent_buffs && row.permanent_buffs.length > 0
                ? row.permanent_buffs
                  .filter(
                    (b) =>
                      b.permanent_buff !== AGHANIMS_SCEPTER &&
                      b.permanent_buff !== AGHANIMS_SHARD
                  )
                  .map((buff) =>
                    inflictorWithValue(
                      buffs[buff.permanent_buff],
                      buff.stack_count,
                      'buff'
                    )
                  )
                : '-',
          }
          : []
      );

    return cols;
  };

  const abilityMapping = (index, upgradesArr, hero) => {
    // Map the actual level position to the position in the data array
    // Some levels now don't correspond to any ability upgrade
    // 21 to 23 are the additional abilities gained at level 30
    const mapping = {
      17: -1,
      19: -1,
      18: 16,
      20: 17,
      25: 18,
      30: -1,
      21: -1,
      22: -1,
      23: -1,
    };
    const ability = upgradesArr[(hero !== 74 && mapping[index]) || index - 1];

    return ability ? inflictorWithValue(null, null, null, null, ability) : null;
  };

  const abilityColumns = () => {
    const cols = Array.from(new Array(26), (_, index) => ({
      displayName: `${index}`,
      tooltip: 'Ability upgraded at this level',
      field: `ability_upgrades_arr_${index}`,
      displayFn: (row) => {
        if (!row.ability_upgrades_arr) {
          return null;
        }
        return (
          <StyledAbilityUpgrades data-tip data-for={`au_${row.player_slot}`}>
            <div className="ability">
              {abilityMapping(index, row.ability_upgrades_arr, row.hero_id) || (
                <div className="placeholder" />
              )}
            </div>
          </StyledAbilityUpgrades>
        );
      },
    }));

    cols[0] = heroTdColumn;

    return cols;
  };

  const abilityDraftColumns = () => {
    const cols = Array.from(new Array(6), (_, index) => ({
      displayName: `${index}`,
      tooltip: strings.tooltip_abilitydraft,
      field: `abilities${index}`,
      displayFn: (row) => (
        <StyledAbilityUpgrades data-tip data-for={`au_${row.player_slot}`}>
          <div className="ability">
            {inflictorWithValue(
              null,
              null,
              null,
              null,
              row.abilities[index - 1]
            ) || <div className="placeholder" />}
          </div>
        </StyledAbilityUpgrades>
      ),
    }));

    cols[0] = heroTdColumn;

    return cols;
  };

  const benchmarksColumns = (match) => {
    const cols = [heroTdColumn];
    if (match.players && match.players[0] && match.players[0].benchmarks) {
      Object.keys(match.players[0].benchmarks).forEach((key, i) => {
        if (match.version || !parsedBenchmarkCols.includes(key)) {
          cols.push({
            displayName:
              strings[`th_${key}`] ||
              strings[`heading_${key}`] ||
              strings[`tooltip_${key}`],
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
                  <div
                    data-tip
                    data-for={`benchmarks_${row.player_slot}_${key}`}
                  >
                    <span style={{ color: constants[bucket.color] }}>
                      {`${percent}%`}
                    </span>
                    <small style={{ margin: '3px' }}>{value}</small>
                    <ReactTooltip
                      id={`benchmarks_${row.player_slot}_${key}`}
                      place="top"
                      effect="solid"
                    >
                      {formatTemplateToString(
                        strings.benchmarks_description,
                        value,
                        strings[`th_${key}`],
                        percent
                      )}
                    </ReactTooltip>
                  </div>
                );
              }
              return null;
            },
          });
        }
      });
    }
    return cols;
  };

  const displayFantasyComponent = (transform) => (row, col, field) => {
    const score = Number(transform(field).toFixed(2));
    const raw = Number((field || 0).toFixed(2));
    return (
      <Tooltip
        title={formatTemplateToString(strings.fantasy_description, raw, score)}
      >
        <div>
          <span>{score}</span>
          <small style={{ margin: '3px', color: 'rgb(179, 179, 179)' }}>
            {raw}
          </small>
        </div>
      </Tooltip>
    );
  };

  const fantasyComponents = [
    {
      displayName: strings.th_kills,
      field: 'kills',
      tooltip: strings.tooltip_kills,
      fantasyFn: (v) => 0.3 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_deaths,
      field: 'deaths',
      tooltip: strings.tooltip_deaths,
      fantasyFn: (v) => 3 - (0.3 * v),
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_last_hits,
      field: 'last_hits',
      tooltip: strings.tooltip_last_hits,
      fantasyFn: (v) => 0.003 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_denies,
      field: 'denies',
      tooltip: strings.tooltip_denies,
      fantasyFn: (v) => 0.003 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_gold_per_min,
      field: 'gold_per_min',
      tooltip: strings.tooltip_gold_per_min,
      fantasyFn: (v) => 0.002 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_towers,
      field: 'towers_killed',
      tooltip: strings.tooltip_tower_kills,
      fantasyFn: (v) => 1 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_roshan,
      field: 'roshans_killed',
      tooltip: strings.farm_roshan,
      fantasyFn: (v) => 1 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_teamfight_participation,
      field: 'teamfight_participation',
      tooltip: strings.tooltip_teamfight_participation,
      fantasyFn: (v) => 3 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_observers_placed,
      field: 'obs_placed',
      tooltip: strings.tooltip_used_ward_observer,
      fantasyFn: (v) => 0.5 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_camps_stacked,
      field: 'camps_stacked',
      tooltip: strings.tooltip_camps_stacked,
      fantasyFn: (v) => 0.5 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.heading_runes,
      field: 'rune_pickups',
      tooltip: strings.analysis_rune_control,
      fantasyFn: (v) => 0.25 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_firstblood_claimed,
      field: 'firstblood_claimed',
      tooltip: strings.th_firstblood_claimed,
      fantasyFn: (v) => 4 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
    {
      displayName: strings.th_stuns,
      field: 'stuns',
      tooltip: strings.tooltip_stuns,
      fantasyFn: (v) => 0.05 * v,
      get displayFn() {
        return displayFantasyComponent(this.fantasyFn);
      },
    },
  ];

  const fantasyColumns = [
    heroTdColumn,
    {
      displayName: strings.th_fantasy_points,
      displayFn: (row) =>
        fantasyComponents
          .map((comp) => comp.fantasyFn(row[comp.field]))
          .reduce((a, b) => a + b)
          .toFixed(2),
    },
  ].concat(fantasyComponents);

  const purchaseTimesColumns = (match, showConsumables) => {
    const cols = [heroTdColumn];
    const bucket = 300;
    for (let i = 0; i < match.duration + bucket; i += bucket) {
      const curTime = i;
      cols.push({
        displayName: `${curTime / 60}'`,
        field: 'purchase_log',
        displayFn: (row, column, field) => (
          <div>
            {field
              ? field
                .filter(
                  (purchase) =>
                    purchase.time >= curTime - bucket &&
                    purchase.time < curTime
                )
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
                  if (
                    items[purchase.key] &&
                    (showConsumables ||
                      items[purchase.key].qual !== 'consumable')
                  ) {
                    return inflictorWithValue(
                      purchase.key,
                      formatSeconds(purchase.time),
                      null,
                      null,
                      null,
                      purchase.charges
                    );
                  }
                  return null;
                })
              : ''}
          </div>
        ),
      });
    }
    return cols;
  };

  const lastHitsTimesColumns = (match) => {
    const cols = [heroTdColumn];
    const bucket = 300;
    for (let i = bucket; i <= match.duration; i += bucket) {
      const curTime = i;
      const minutes = curTime / 60;
      cols.push({
        displayName: `${minutes}'`,
        field: i,
        sortFn: (row) => row.lh_t && row.lh_t[minutes],
        displayFn: (row) =>
          `${row.lh_t[minutes]} (+${row.lh_t[minutes] - row.lh_t[minutes - (bucket / 60)]
          })`,
        relativeBars: true,
        sumFn: (acc, row) =>
          acc + (row.lh_t && row.lh_t[minutes] ? row.lh_t[minutes] : 0),
      });
    }
    return cols;
  };

  const performanceColumns = [
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
      displaySumFn: (total) => formatSeconds(total) || '-',
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
              {inflictorWithValue(
                field.inflictor,
                abbreviateNumber(field.value)
              )}
              <HeroImage id={hero.id} style={{ height: '30px' }} />
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
            const tooltip = [
              `${field.tracked_deaths} ${strings.tooltip_others_tracked_deaths}`,
              `${field.track_gold} ${strings.tooltip_others_track_gold}`,
            ];
            comp.push(
              inflictorWithValue(
                'bounty_hunter_track',
                abbreviateNumber(field.tracked_deaths),
                '',
                tooltip.join('\n')
              )
            );
          }
          if (field.greevils_greed_gold) {
            const tooltip = `${field.greevils_greed_gold} ${strings.tooltip_others_greevils_gold}`;
            comp.push(
              inflictorWithValue(
                'alchemist_goblins_greed',
                abbreviateNumber(field.greevils_greed_gold),
                '',
                tooltip
              )
            );
          }
          return comp;
        }
        return '-';
      },
    },
  ];

  const laningColumns = (currentState, setSelectedPlayer) => [
    {
      displayFn: (row) => (
        <RadioButton
          checked={currentState.selectedPlayer === row.player_slot}
          onClick={() => setSelectedPlayer(row.player_slot)}
        />
      ),
    },
    heroTdColumn,
    {
      displayName: strings.heading_is_radiant,
      tooltip: strings.heading_is_radiant,
      field: 'isRadiant',
      sortFn: true,
      displayFn: (row, col, field) => (
        <span>
          {field && <IconRadiant height="30" />}
          {!field && <IconDire height="30" />}
        </span>
      ),
    },
    {
      displayName: strings.th_lane,
      tooltip: strings.tooltip_lane,
      field: 'lane_role',
      sortFn: true,
      displayFn: (row, col, field) => (
        <div>
          <span>{strings[`lane_role_${field}`]}</span>
          {row.is_roaming && (
            <span style={subTextStyle}>{strings.roaming}</span>
          )}
        </div>
      ),
    },
    {
      displayName: strings.th_win_lane,
      tooltip: strings.tooltip_win_lane,
      field: 'line_win',
      sortFn: true,
      displayFn: (row, col, field) => (
        field && <StyledLineWinnerSpan><IconTrophy /></StyledLineWinnerSpan>
      ),
    },
    {
      displayName: strings.cs_over_time,
      tooltip: strings.tooltip_cs_over_time,
      field: 'cs_t',
      sparkline: true,
      strings,
      width: 200,
    },
    {
      displayName: strings.th_lane_efficiency,
      tooltip: strings.tooltip_lane_efficiency,
      field: 'lane_efficiency',
      sortFn: true,
      displayFn: (row, col, field) =>
        field ? `${(field * 100).toFixed(2)}%` : '-',
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

  const unitKillsColumns = [
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
      displayFn: (row, col, field) => (
        <div>
          {Object.keys(field || {}).map((unit) => (
            <div key={unit}>{`${field[unit]} ${unit}`}</div>
          ))}
        </div>
      ),
      sumFn: (acc, row) => {
        const result = acc != null ? acc : {};

        Object.keys(row.specific || {}).forEach((unit) => {
          result[unit] = (result[unit] ? result[unit] : 0) + row.specific[unit];
        });

        return result;
      },
      displaySumFn: (totals) => (
        <div>
          {Object.keys(totals || {}).map((unit) => (
            <div key={unit}>{`${totals[unit]} ${unit}`}</div>
          ))}
        </div>
      ),
    },
  ];

  const actionsColumns = [
    heroTdColumn,
    {
      displayName: strings.th_actions_per_min,
      tooltip: strings.tooltip_actions_per_min,
      field: 'actions_per_min',
      sortFn: true,
      relativeBars: true,
    },
  ].concat(
    Object.keys(orderTypes)
      .filter((orderType) => `th_${orderTypes[orderType]}` in strings)
      .map((orderType) => ({
        displayName: strings[`th_${orderTypes[orderType]}`],
        tooltip: strings[`tooltip_${orderTypes[orderType]}`],
        field: orderType,
        sortFn: (row) => (row.actions ? row.actions[orderType] : 0),
        displayFn: (row, column, value) => value || '-',
        relativeBars: true,
      }))
  );

  const runesColumns = [heroTdColumn].concat(
    Object.keys(strings)
      .filter((str) => str.indexOf('rune_') === 0)
      .map((str) => str.split('_')[1])
      .map((runeType) => ({
        displayName: (
          <StyledRunes data-tip data-for={`rune_${runeType}`}>
            <Tooltip title={strings[`rune_${runeType}`]}>
              <img src={`/assets/images/dota2/runes/${runeType}.png`} alt={strings[`rune_${runeType}`]} />
            </Tooltip>
          </StyledRunes>
        ),
        field: `rune_${runeType}`,
        displayFn: (row, col, value) => value || '-',
        sortFn: (row) => row.runes && row.runes[runeType],
        relativeBars: true,
      }))
  );

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
  const cosmeticsColumns = [
    heroTdColumn,
    {
      displayName: strings.th_cosmetics,
      field: 'cosmetics',
      displayFn: (row, col, field) =>
        field.map((cosmetic) => (
          <StyledCosmetic
            key={cosmetic.item_id}
            data-tip
            data-for={`cosmetic_${cosmetic.item_id}`}
          >
            <a
              href={`http://steamcommunity.com/market/listings/570/${cosmetic.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${config.VITE_IMAGE_CDN}/apps/570/${cosmetic.image_path}`}
                alt={cosmetic.name}
                style={{
                  borderBottom: `2px solid ${cosmetic.item_rarity
                    ? cosmeticsRarity[cosmetic.item_rarity]
                    : constants.colorMuted
                    }`,
                }}
              />
              <ActionOpenInNew />
            </a>
            <ReactTooltip id={`cosmetic_${cosmetic.item_id}`} effect="solid">
              <span
                style={{
                  color:
                    cosmetic.item_rarity &&
                    cosmeticsRarity[cosmetic.item_rarity],
                }}
              >
                {cosmetic.name}
                <span>{cosmetic.item_rarity}</span>
              </span>
            </ReactTooltip>
          </StyledCosmetic>
        )),
    },
  ];

  const goldReasonsColumns = [heroTdColumn].concat(
    Object.keys(strings)
      .filter((str) => str.indexOf('gold_reasons_') === 0)
      .map((gr) => ({
        displayName: strings[gr],
        field: gr,
        sortFn: (row) =>
          row.gold_reasons
            ? row.gold_reasons[gr.substring('gold_reasons_'.length)]
            : 0,
        displayFn: (row, column, value) => value || '-',
        relativeBars: true,
        sumFn: (acc, row) =>
          acc +
          (row.gold_reasons
            ? row.gold_reasons[gr.substring('gold_reasons_'.length)] || 0
            : 0),
      }))
  );

  const xpReasonsColumns = [heroTdColumn].concat(
    Object.keys(strings)
      .filter((str) => str.indexOf('xp_reasons_') === 0)
      .map((xpr) => ({
        displayName: strings[xpr],
        field: xpr,
        sortFn: (row) =>
          row.xp_reasons
            ? row.xp_reasons[xpr.substring('xp_reasons_'.length)]
            : 0,
        displayFn: (row, column, value) => value || '-',
        relativeBars: true,
        sumFn: (acc, row) =>
          acc +
          (row.xp_reasons
            ? row.xp_reasons[xpr.substring('xp_reasons_'.length)] || 0
            : 0),
      }))
  );

  const objectiveDamageColumns = [heroTdColumn].concat(
    Object.keys(strings)
      .filter((str) => str.indexOf('objective_') === 0)
      .map((obj) => ({
        displayName: strings[obj],
        field: obj,
        tooltip: strings[`tooltip_${obj}`],
        sortFn: (row) =>
          row.objective_damage &&
          row.objective_damage[obj.substring('objective_'.length)],
        displayFn: (row, col, value) => value || '-',
        relativeBars: true,
      }))
  );

  const inflictorsColumns = [
    heroTdColumn,
    {
      displayName: strings.th_damage_dealt,
      field: 'damage_targets',
      width: '1px',
      displayFn: (row, col, field) => {
        if (field) {
          return <TargetsBreakdown field={field} />;
        }
        if (row.damage_inflictor) {
          // backwards compatibility 2018-03-17
          return Object.keys(row.damage_inflictor)
            .sort((a, b) => row.damage_inflictor[b] - row.damage_inflictor[a])
            .map((inflictor) =>
              inflictorWithValue(
                inflictor,
                abbreviateNumber(row.damage_inflictor[inflictor])
              )
            );
        }
        return null;
      },
    },
    {
      displayName: strings.th_damage_received,
      field: 'damage_inflictor_received',
      displayFn: (row, col, field) => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {field
            ? Object.keys(field)
              .sort((a, b) => field[b] - field[a])
              .map((inflictor) =>
                inflictorWithValue(
                  inflictor,
                  abbreviateNumber(field[inflictor])
                )
              )
            : ''}
        </div>
      ),
    },
  ];

  const castsColumns = [
    heroTdColumn,
    {
      displayName: strings.th_abilities,
      tooltip: strings.tooltip_casts,
      field: 'ability_targets',
      displayFn: (row, col, field) => {
        if (field) {
          return (
            <TargetsBreakdown field={field} abilityUses={row.ability_uses} />
          );
        }
        // backwards compatibility 2018-03-17
        return Object.keys(row.ability_uses)
          .sort((a, b) => row.ability_uses[b] - row.ability_uses[a])
          .map((inflictor) =>
            inflictorWithValue(
              inflictor,
              abbreviateNumber(row.ability_uses[inflictor])
            )
          );
      },
    },
    {
      displayName: strings.th_items,
      tooltip: strings.tooltip_casts,
      field: 'item_uses',
      displayFn: (row, col, field) => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {field
            ? Object.keys(field)
              .sort((a, b) => field[b] - field[a])
              .map((inflictor) =>
                inflictorWithValue(
                  inflictor,
                  abbreviateNumber(field[inflictor])
                )
              )
            : ''}
        </div>
      ),
    },
    {
      displayName: strings.th_hits,
      tooltip: strings.tooltip_hits,
      field: 'hero_hits',
      displayFn: (row, col, field) => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {field
            ? Object.keys(field)
              .sort((a, b) => field[b] - field[a])
              .map((inflictor) =>
                inflictorWithValue(
                  inflictor,
                  abbreviateNumber(field[inflictor])
                )
              )
            : ''}
        </div>
      ),
    },
  ];

  const analysisColumns = [
    heroTdColumn,
    {
      displayName: strings.th_analysis,
      field: 'analysis',
      displayFn: (row, col, field) =>
        Object.keys(field || {}).map((key) => {
          const val = field[key];
          val.display = `${val.name}: ${Number(
            val.value ? val.value.toFixed(2) : ''
          )} / ${Number(val.top.toFixed(2))}`;
          val.pct = val.score(val.value) / val.score(val.top);
          if (val.valid) {
            const percent = field[key].pct;
            const bucket = percentile(percent);
            return (
              <div>
                <span
                  style={{
                    color: constants[bucket.color],
                    margin: '10px',
                    fontSize: '18px',
                  }}
                >
                  {bucket.grade}
                </span>
                <span>{field[key].display}</span>
                <StyledUnusedItem>
                  {key === 'unused_item' &&
                    field[key].metadata.map((item) => inflictorWithValue(item))}
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
      deaths.push(<img src="/assets/images/player_death.png" alt="Player death icon, a skull with a glowing red outline" />);
    }
    return field > 0 && <StyledPlayersDeath>{deaths}</StyledPlayersDeath>;
  };

  const inflictorRow = (row, col, field) =>
    field ? (
      <div style={{ maxWidth: '100px' }}>
        {Object.keys(field).map((inflictor) =>
          inflictorWithValue(inflictor, field[inflictor])
        )}
      </div>
    ) : (
      ''
    );

  const teamfightColumns = [
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
      displayFn: inflictorRow,
    },
    {
      displayName: strings.th_items,
      field: 'item_uses',
      displayFn: inflictorRow,
    },
  ];

  const computeAverage = (row, type) => {
    // const wardType = type === 'obs' ? 'ward_observer' : 'ward_sentry';
    // const maxDuration = items[wardType].attrib.find(x => x.key === 'lifetime').value;
    // 7.31 broke attrib values, so hardcode them here
    const maxDuration = type === 'obs' ? 360 : 420;
    const totalDuration = [];
    row[`${type}_log`].forEach((ward) => {
      const findTime =
        row[`${type}_left_log`] &&
        row[`${type}_left_log`].find((x) => x.ehandle === ward.ehandle);
      const leftTime = (findTime && findTime.time) || false;
      if (leftTime !== false) {
        // exclude wards that did not expire before game ended from average time
        const duration = Math.min(
          Math.max(leftTime - ward.time, 0),
          maxDuration
        );
        totalDuration.push(duration);
      }
    });

    const total = totalDuration.reduce((a, b) => a + b, 0);
    const avg = total / totalDuration.length;

    return avg;
  };

  const obsAvgColumn = {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img
          height="15"
          src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_observer.png`}
          alt="Observer ward"
        />
        &nbsp;{strings.th_duration_shorthand}
      </div>
    ),
    field: 'obs_avg_life',
    tooltip: strings.tooltip_duration_observer,
    sortFn: (row) => computeAverage(row, 'obs'),
    displayFn: (row) => formatSeconds(computeAverage(row, 'obs')) || '-',
    relativeBars: true,
  };

  const senAvgColumn = {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img
          height="15"
          src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_sentry.png`}
          alt="Sentry ward"
        />
        &nbsp;{strings.th_duration_shorthand}
      </div>
    ),
    field: 'sen_avg_life',
    tooltip: strings.tooltip_duration_sentry,
    sortFn: (row) => computeAverage(row, 'sen'),
    displayFn: (row) => formatSeconds(computeAverage(row, 'sen')) || '-',
    relativeBars: true,
  };

  const purchaseObserverColumn = {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img
          height="15"
          src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_observer.png`}
          alt="Observer ward"
        />
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
        <img
          height="15"
          src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_sentry.png`}
          alt="Sentry ward"
        />
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
        <img
          height="15"
          src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/dust.png`}
          alt="Dust of Appearance"
        />
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
        <img
          height="15"
          src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/smoke_of_deceit.png`}
          alt="Smoke of Deceit"
        />
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
        <img
          height="15"
          src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/gem.png`}
          alt="Gem of Truesight"
        />
        &nbsp;{strings.th_purchase_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_purchase_gem,
    field: 'purchase_gem',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  };

  const visionColumns = (visionStrings) => [
    heroTdColumn,
    purchaseObserverColumn,
    {
      center: true,
      displayName: (
        <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
          <img
            height="15"
            src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_observer.png`}
            alt="Observer ward"
          />
          &nbsp;{visionStrings.th_use_shorthand}
        </div>
      ),
      tooltip: visionStrings.tooltip_used_ward_observer,
      field: 'uses_ward_observer',
      sortFn: (row) => row.obs_log && row.obs_log.length,
      displayFn: (row, column, value) => value || '-',
      relativeBars: true,
    },
    obsAvgColumn,
    purchaseSentryColumn,
    {
      center: true,
      displayName: (
        <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
          <img
            height="15"
            src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_sentry.png`}
            alt="Sentry ward"
          />
          &nbsp;{visionStrings.th_use_shorthand}
        </div>
      ),
      tooltip: visionStrings.tooltip_used_ward_sentry,
      field: 'uses_ward_sentry',
      sortFn: (row) => row.sen_log && row.sen_log.length,
      displayFn: (row, column, value) => value || '-',
      relativeBars: true,
    },
    senAvgColumn,
    purchaseDustColumn,
    {
      center: true,
      displayName: (
        <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
          <img
            height="15"
            src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/dust.png`}
            alt="Dust of Appearance"
          />
          &nbsp;{visionStrings.th_use_shorthand}
        </div>
      ),
      tooltip: visionStrings.tooltip_used_dust,
      field: 'uses_dust',
      sortFn: (row) => row.item_uses && row.item_uses.dust,
      displayFn: (row, column, value) => value || '-',
      relativeBars: true,
    },
    purchaseSmokeColumn,
    {
      center: true,
      displayName: (
        <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
          <img
            height="15"
            src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/smoke_of_deceit.png`}
            alt="Smoke of Deceit"
          />
          &nbsp;{visionStrings.th_use_shorthand}
        </div>
      ),
      tooltip: visionStrings.tooltip_used_smoke_of_deceit,
      field: 'uses_smoke',
      sortFn: (row) => row.item_uses && row.item_uses.smoke_of_deceit,
      displayFn: (row, column, value) => value || '-',
      relativeBars: true,
    },
    purchaseGemColumn,
  ];

  return {
    abilityColumns,
    abilityDraftColumns,
    actionsColumns,
    analysisColumns,
    benchmarksColumns,
    castsColumns,
    cosmeticsColumns,
    fantasyColumns,
    goldReasonsColumns,
    heroTd,
    heroTdColumn,
    itemsTd,
    inflictorsColumns,
    laningColumns,
    lastHitsTimesColumns,
    objectiveDamageColumns,
    overviewColumns,
    performanceColumns,
    purchaseTimesColumns,
    runesColumns,
    teamfightColumns,
    unitKillsColumns,
    visionColumns,
    xpReasonsColumns,
  };
};
