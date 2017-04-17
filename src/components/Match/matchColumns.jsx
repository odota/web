/* global API_HOST */
import React from 'react';
import heroes from 'dotaconstants/build/heroes.json';
import items from 'dotaconstants/build/items.json';
import orderTypes from 'dotaconstants/build/order_types.json';
import itemIds from 'dotaconstants/build/item_ids.json';
import abilityIds from 'dotaconstants/build/ability_ids.json';
import abilityKeys from 'dotaconstants/build/ability_keys.json';
import heroNames from 'dotaconstants/build/hero_names.json';
import buffs from 'dotaconstants/build/permanent_buffs.json';
import util from 'util';
import strings from 'lang';
import {
  formatSeconds,
  abbreviateNumber,
  transformations,
  percentile,
  sum,
  unpackPositionData,
} from 'utility';
import Heatmap from 'components/Heatmap';
import {
  TableHeroImage,
  inflictorWithValue,
} from 'components/Visualizations';
import ReactTooltip from 'react-tooltip';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import { Mmr } from 'components/Visualizations/Table/HeroImage';
import { IconRadiant, IconDire, IconBackpack } from 'components/Icons';
import styles from './Match.css';

export const heroTd = (row, col, field, index, hideName, party, showPvgnaGuide = false) =>
  (<TableHeroImage
    image={heroes[row.hero_id] && API_HOST + heroes[row.hero_id].img}
    title={row.name || row.personaname || strings.general_anonymous}
    registered={row.last_login}
    accountId={row.account_id}
    subtitle={<Mmr number={row.solo_competitive_rank} />}
    playerSlot={row.player_slot}
    hideText={hideName}
    confirmed={row.account_id && row.name}
    party={party}
    heroName={heroes[row.hero_id] ? heroes[row.hero_id].localized_name : strings.general_no_hero}
    showPvgnaGuide={showPvgnaGuide}
    pvgnaGuideInfo={row.pvgnaGuide}
    randomed={row.randomed}
    repicked={row.repicked}
    predictedVictory={row.pred_vict}
  />
);

export const heroTdColumn = {
  displayName: strings.th_avatar,
  field: 'player_slot',
  displayFn: heroTd,
  sortFn: true,
};

const parties = (row, match) => {
  if (match.players && match.players.map(player => player.party_id).reduce(sum) > 0) {
    const i = match.players.findIndex(player => player.player_slot === row.player_slot);
    const partyPrev = (match.players[i - 1] || {}).party_id === row.party_id;
    const partyNext = (match.players[i + 1] || {}).party_id === row.party_id;
    if (!partyPrev && partyNext) {
      return <div data-next />;
    }
    if (partyPrev && partyNext) {
      return <div data-prev-next />;
    }
    if (partyPrev && !partyNext) {
      return <div data-prev />;
    }
  }
  return null;
};

export const overviewColumns = (match) => {
  const cols = [{
    displayName: strings.th_avatar,
    field: 'player_slot',
    displayFn: (row, col, field, i) => heroTd(row, col, field, i, false, parties(row, match), true),
    sortFn: true,
  }, {
    displayName: strings.th_level,
    tooltip: strings.tooltip_level,
    field: 'level',
    sortFn: true,
    maxFn: true,
    sumFn: true,
  }, {
    displayName: strings.th_kills,
    tooltip: strings.tooltip_kills,
    field: 'kills',
    sortFn: true,
    displayFn: transformations.kda,
    sumFn: true,
  }, {
    displayName: strings.th_deaths,
    tooltip: strings.tooltip_deaths,
    field: 'deaths',
    sortFn: true,
    sumFn: true,
  }, {
    displayName: strings.th_assists,
    tooltip: strings.tooltip_assists,
    field: 'assists',
    sortFn: true,
    sumFn: true,
  }, {
    displayName: strings.th_gold_per_min,
    tooltip: strings.tooltip_gold_per_min,
    field: 'gold_per_min',
    sortFn: true,
    color: styles.golden,
    sumFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_xp_per_min,
    tooltip: strings.tooltip_xp_per_min,
    field: 'xp_per_min',
    sortFn: true,
    sumFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_last_hits,
    tooltip: strings.tooltip_last_hits,
    field: 'last_hits',
    sortFn: true,
    sumFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_denies,
    tooltip: strings.tooltip_denies,
    field: 'denies',
    sortFn: true,
    sumFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_hero_damage,
    tooltip: strings.tooltip_hero_damage,
    field: 'hero_damage',
    sortFn: true,
    sumFn: true,
    displayFn: row => abbreviateNumber(row.hero_damage),
    relativeBars: true,
  }, {
    displayName: strings.th_hero_healing,
    tooltip: strings.tooltip_hero_healing,
    field: 'hero_healing',
    sortFn: true,
    sumFn: true,
    displayFn: row => abbreviateNumber(row.hero_healing),
    relativeBars: true,
  }, {
    displayName: strings.th_tower_damage,
    tooltip: strings.tooltip_tower_damage,
    field: 'tower_damage',
    displayFn: row => abbreviateNumber(row.tower_damage),
    sortFn: true,
    sumFn: true,
    relativeBars: true,
  }, {
    displayName: (
      <span className={styles.thGold}>
        <img src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`} role="presentation" />
        {strings.th_gold}
      </span>
    ),
    tooltip: strings.tooltip_gold,
    field: 'total_gold',
    sortFn: true,
    color: styles.golden,
    sumFn: true,
    displayFn: row => abbreviateNumber(row.total_gold),
    relativeBars: true,
  }, {
    displayName: strings.th_items,
    tooltip: strings.tooltip_items,
    field: 'items',
    displayFn: (row) => {
      const itemArray = [];
      const additionalItemArray = [];
      const backpackItemArray = [];

      for (let i = 0; i < 6; i += 1) {
        const itemKey = itemIds[row[`item_${i}`]];
        const firstPurchase = row.first_purchase_time && row.first_purchase_time[itemKey];

        if (items[itemKey]) {
          itemArray.push(
            inflictorWithValue(itemKey, formatSeconds(firstPurchase)),
          );
        }

        // Use hero_id because Meepo showing up as an additional unit in some matches http://dev.dota2.com/showthread.php?t=132401
        if (row.hero_id === 80 && row.additional_units) {
          const additionalItemKey = itemIds[row.additional_units[0][`item_${i}`]];
          const additionalFirstPurchase = row.first_purchase_time && row.first_purchase_time[additionalItemKey];

          if (items[additionalItemKey]) {
            additionalItemArray.push(
              inflictorWithValue(additionalItemKey, formatSeconds(additionalFirstPurchase)),
            );
          }
        }

        const backpackItemKey = itemIds[row[`backpack_${i}`]];
        const backpackfirstPurchase = row.first_purchase_time && row.first_purchase_time[backpackItemKey];

        if (items[backpackItemKey]) {
          backpackItemArray.push(
            inflictorWithValue(backpackItemKey, formatSeconds(backpackfirstPurchase)),
          );
        }
      }

      return (
        <div className={styles.items}>
          {itemArray && <div>{itemArray}</div>}
          {additionalItemArray && <div>{additionalItemArray}</div>}
          {backpackItemArray && backpackItemArray.length > 0 &&
            <div className={styles.backpack}>
              <div
                data-hint={strings.tooltip_backpack}
                data-hint-position="bottom"
              ><IconBackpack /></div>
              {backpackItemArray}
            </div>
          }
        </div>
      );
    },
  }]
  .concat(
    match.players.map(player => player.permanent_buffs && player.permanent_buffs.length).reduce(sum, 0) > 0 ? {
      displayName: strings.th_permanent_buffs,
      field: 'permanent_buffs',
      displayFn: row => (
        row.permanent_buffs && row.permanent_buffs.length > 0
          ? row.permanent_buffs.map(buff => inflictorWithValue(buffs[buff.permanent_buff], buff.stack_count, 'buff'))
          : '-'
      ),
    } : [],
  )
  .concat({
    displayName: (
      <div style={{ marginLeft: 10 }}>
        {strings.th_ability_builds}
      </div>
    ),
    tooltip: strings.tooltip_ability_builds,
    displayFn: row => (
      <div data-tip data-for={`au_${row.player_slot}`} className={styles.abilityUpgrades}>
        {row.ability_upgrades_arr ? <NavigationMoreHoriz /> : <NavigationMoreHoriz style={{ opacity: 0.4 }} />}
        <ReactTooltip id={`au_${row.player_slot}`} place="left" effect="solid">
          {row.ability_upgrades_arr ? row.ability_upgrades_arr.map(
            (ab) => {
              if (ab && abilityIds[ab]) {
                return (
                  <div className={styles.ability}>
                    {inflictorWithValue(abilityIds[ab])}
                  </div>
                );
              }
              return null;
            },
          ) : <div style={{ paddingBottom: 5 }}>{strings.tooltip_ability_builds_expired}</div>}
        </ReactTooltip>
      </div>
    ),
  });

  return cols;
};

export const benchmarksColumns = (match) => {
  const cols = [
    heroTdColumn,
  ];
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
            const value = Number(bm.raw.toFixed(2));
            return (<div data-tip data-for={`benchmarks_${row.player_slot}_${key}`}>
              <span style={{ color: styles[bucket.color] }}>{`${percent}%`}</span>
              <small style={{ margin: '3px' }}>{value}</small>
              <ReactTooltip id={`benchmarks_${row.player_slot}_${key}`} place="top" effect="solid">
                {util.format(strings.benchmarks_description, value, strings[`th_${key}`], percent)}
              </ReactTooltip>
            </div>);
          }
          return null;
        },
      });
    });
  }
  return cols;
};

export const purchaseTimesColumns = (match) => {
  const cols = [heroTdColumn];
  const bucket = 300;
  for (let i = 0; i < match.duration + bucket; i += bucket) {
    const curTime = i;
    cols.push({
      displayName: `${curTime / 60}'`,
      field: 'purchase_log',
      displayFn: (row, column, field) => (<div>
        {field ? field
        .filter(purchase => (purchase.time >= curTime - bucket && purchase.time < curTime))
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
          if (items[purchase.key]) {
            return inflictorWithValue(purchase.key, formatSeconds(purchase.time));
          }
          return null;
        }) : ''}
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
      sortFn: row => (row.lh_t && row.lh_t[minutes]),
      relativeBars: true,
    });
  }
  return cols;
};

export const performanceColumns = [
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
    sumFn: true,
  }, {
    displayName: strings.th_lhten,
    tooltip: strings.tooltip_lhten,
    field: 'lh_ten',
    sortFn: true,
    displayFn: (row, col, field) => (field || '-'),
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_dnten,
    tooltip: strings.tooltip_dnten,
    field: 'dn_ten',
    sortFn: true,
    displayFn: (row, col, field) => (field || '-'),
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_multikill,
    tooltip: strings.tooltip_multikill,
    field: 'multi_kills_max',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_killstreak,
    tooltip: strings.tooltip_killstreak,
    field: 'kill_streaks_max',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_stuns,
    tooltip: strings.tooltip_stuns,
    field: 'stuns',
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.toFixed(2) : '-'),
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_stacked,
    tooltip: strings.tooltip_camps_stacked,
    field: 'camps_stacked',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_dead,
    tooltip: strings.tooltip_dead,
    field: 'life_state_dead',
    sortFn: true,
    displayFn: (row, col, field) => formatSeconds(field) || '-',
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_buybacks,
    tooltip: strings.tooltip_buybacks,
    field: 'buybacks',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
  }, {
    displayName: strings.th_pings,
    tooltip: strings.tooltip_pings,
    field: 'pings',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
    sumFn: true,
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
          <img src={`${API_HOST}${hero.img}`} className={styles.imgSmall} role="presentation" />
        </div>);
      }
      return <div />;
    },
  },
];

export const chatColumns = [
  {
    displayName: strings.filter_is_radiant,
    field: '',
    displayFn: row =>
      <div className={styles.teamIconContainer}>
        {
          row.isRadiant ?
            <IconRadiant className={styles.iconRadiant} /> :
            <IconDire className={styles.iconDire} />
        }
      </div>
    ,
  },
  Object.assign({}, heroTdColumn, { sortFn: false }),
  {
    displayName: strings.th_time,
    field: 'time',
    displayFn: (row, col, field) => formatSeconds(field),
  }, {
    displayName: strings.th_message,
    field: '',
    displayFn: row => row.key || row.text,
  },
];

export const unitKillsColumns = [
  heroTdColumn, {
    displayName: strings.th_heroes,
    tooltip: strings.farm_heroes,
    field: 'hero_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_creeps,
    tooltip: strings.farm_creeps,
    field: 'lane_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_neutrals,
    tooltip: strings.farm_neutrals,
    field: 'neutral_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_ancients,
    tooltip: strings.farm_ancients,
    field: 'ancient_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_towers,
    tooltip: strings.farm_towers,
    field: 'tower_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_couriers,
    tooltip: strings.farm_couriers,
    field: 'courier_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_roshan,
    tooltip: strings.farm_roshan,
    field: 'roshan_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_necronomicon,
    tooltip: strings.farm_necronomicon,
    field: 'necronomicon_kills',
    sortFn: true,
    displayFn: (row, col, field) => field || '-',
    relativeBars: true,
  }, {
    displayName: strings.th_other,
    field: 'specific',
    // TODO make this work for non-english (current names are hardcoded in dotaconstants)
    displayFn: (row, col, field) => (<div>
      {Object.keys(field).map((unit, index) => (<div key={index}>{`${field[unit]} ${unit}`}</div>))}
    </div>),
  },
];

export const actionsColumns = [heroTdColumn, {
  displayName: strings.th_actions_per_min,
  tooltip: strings.tooltip_actions_per_min,
  field: 'actions_per_min',
  sortFn: true,
  relativeBars: true,
}]
  .concat(Object.keys(orderTypes).filter(orderType => `th_${orderTypes[orderType]}` in strings).map(orderType => ({
    displayName: strings[`th_${orderTypes[orderType]}`],
    tooltip: strings[`tooltip_${orderTypes[orderType]}`],
    field: orderType,
    sortFn: row => (row.actions ? row.actions[orderType] : 0),
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  })));

export const runesColumns = [heroTdColumn]
  .concat(Object.keys(strings)
  .filter(str => str.indexOf('rune_') === 0)
  .map(str => str.split('_')[1])
  .map(runeType => ({
    displayName: (
      <div
        className={styles.runes}
        data-tip data-for={`rune_${runeType}`}
      >
        <img
          src={`/assets/images/dota2/runes/${runeType}.png`}
          role="presentation"
        />
        <ReactTooltip id={`rune_${runeType}`} effect="solid">
          <span>
            {strings[`rune_${runeType}`]}
          </span>
        </ReactTooltip>
      </div>
    ),
    field: `rune_${runeType}`,
    displayFn: (row, col, value) => (value || '-'),
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
export const cosmeticsColumns = [heroTdColumn, {
  displayName: strings.th_cosmetics,
  field: 'cosmetics',
  displayFn: (row, col, field) => field.map((cosmetic, i) => (
    <div
      key={i}
      className={styles.cosmetics}
      data-tip
      data-for={`cosmetic_${cosmetic.item_id}`}
    >
      <a
        href={`https://www.lootmarket.com/dota-2/item/${cosmetic.name}?partner=1101&utm_source=misc&utm_medium=misc&utm_campaign=opendota`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${API_HOST}/apps/570/${cosmetic.image_path}`} role="presentation"
          style={{
            borderBottom: `2px solid ${cosmetic.item_rarity ? cosmeticsRarity[cosmetic.item_rarity] : styles.gray}`,
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
    </div>
  )),
}];


export const goldReasonsColumns = [heroTdColumn]
  .concat(Object.keys(strings)
    .filter(str => str.indexOf('gold_reasons_') === 0)
    .map(gr => ({
      displayName: strings[gr],
      field: gr,
      sortFn: row => (row.gold_reasons ? row.gold_reasons[gr.substring('gold_reasons_'.length)] : 0),
      displayFn: (row, column, value) => value || '-',
      relativeBars: true,
    })));

export const xpReasonsColumns = [heroTdColumn]
  .concat(Object.keys(strings)
    .filter(str => str.indexOf('xp_reasons_') === 0)
    .map(xpr => ({
      displayName: strings[xpr],
      field: xpr,
      sortFn: row => (row.xp_reasons ? row.xp_reasons[xpr.substring('xp_reasons_'.length)] : 0),
      displayFn: (row, column, value) => value || '-',
      relativeBars: true,
    })));

export const objectiveDamageColumns = [heroTdColumn]
  .concat(Object.keys(strings).filter(str => str.indexOf('objective_') === 0)
    .map(obj => ({
      displayName: strings[obj],
      field: obj,
      sortFn: row => (row.objective_damage && row.objective_damage[obj.substring('objective_'.length)]),
      displayFn: (row, col, value) => value || '-',
      relativeBars: true,
    })));


export const inflictorsColumns = [
  heroTdColumn, {
    displayName: strings.th_damage_dealt,
    field: 'damage_inflictor',
    displayFn: (row, col, field) => (field ? Object.keys(field)
      .sort((a, b) => field[b] - field[a])
      .map(inflictor => inflictorWithValue(inflictor, abbreviateNumber(field[inflictor]))) : ''),
  }, {
    displayName: strings.th_damage_received,
    field: 'damage_inflictor_received',
    displayFn: (row, col, field) => (field ? Object.keys(field)
      .sort((a, b) => field[b] - field[a])
      .map(inflictor => inflictorWithValue(inflictor, abbreviateNumber(field[inflictor]))) : ''),
  },
];

export const analysisColumns = [heroTdColumn, {
  displayName: strings.th_analysis,
  field: 'analysis',
  displayFn: (row, col, field) => (
    Object.keys(field).map((key) => {
      const val = field[key];
      val.display = `${val.name}: ${Number(val.value ? val.value.toFixed(2) : '')} / ${Number(val.top.toFixed(2))}`;
      val.pct = val.score(val.value) / val.score(val.top);
      if (val.valid) {
        const percent = field[key].pct;
        const bucket = percentile(percent);
        return (<div>
          <span style={{ color: styles[bucket.color], margin: '10px', fontSize: '18px' }}>{bucket.grade}</span>
          <span>{field[key].display}</span>
          <div className={styles.unusedItem}>{ key === 'unused_item' && field[key].metadata.map(item => inflictorWithValue(item)) }</div>
        </div>);
      }
      return null;
    })
  ),
}];

const playerDeaths = (row, col, field) => {
  const deaths = [];
  for (let i = 0; i < field; i += 1) {
    deaths.push(<img src="/assets/images/player_death.png" role="presentation" />);
  }
  return (
    field > 0 && <div className={styles.playerDeath}>
      {deaths}
    </div>
  );
};

const inflictorRow = obj => (row, col, field) => (
  field ? (
    <div style={{ maxWidth: '100px' }}>
      {Object.keys(field).map((inflictor) => {
        if (obj[inflictor]) {
          return inflictorWithValue(inflictor, field[inflictor]);
        }
        return null;
      })}
    </div>
  ) : ''
);

export const teamfightColumns = [
  heroTdColumn, {
    displayName: strings.th_death,
    field: 'deaths',
    sortFn: true,
    displayFn: playerDeaths,
  }, {
    displayName: strings.th_damage,
    field: 'damage',
    sortFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_healing,
    field: 'healing',
    sortFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_gold,
    field: 'gold_delta',
    sortFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_xp,
    field: 'xp_delta',
    sortFn: true,
    relativeBars: true,
  }, {
    displayName: strings.th_abilities,
    field: 'ability_uses',
    displayFn: inflictorRow(abilityKeys),
  }, {
    displayName: strings.th_items,
    field: 'item_uses',
    displayFn: inflictorRow(items),
  },
];

const purchaseObserverColumn = {
  center: true,
  displayName: (
    <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <img height="15" src={`${API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} role="presentation" />
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
      <img height="15" src={`${API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} role="presentation" />
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
      <img height="15" src={`${API_HOST}/apps/dota2/images/items/dust_lg.png`} role="presentation" />
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
      <img height="15" src={`${API_HOST}/apps/dota2/images/items/smoke_of_deceit_lg.png`} role="presentation" />
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
      <img height="15" src={`${API_HOST}/apps/dota2/images/items/gem_lg.png`} role="presentation" />
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
        <img height="15" src={`${API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} role="presentation" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_ward_observer,
    field: 'uses_ward_observer',
    sortFn: row => (row.item_uses && row.item_uses.ward_observer),
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  purchaseSentryColumn,
  {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img height="15" src={`${API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} role="presentation" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_ward_sentry,
    field: 'uses_ward_sentry',
    sortFn: row => (row.item_uses && row.item_uses.ward_sentry),
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  purchaseDustColumn,
  {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img height="15" src={`${API_HOST}/apps/dota2/images/items/dust_lg.png`} role="presentation" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_dust,
    field: 'uses_dust',
    sortFn: row => (row.item_uses && row.item_uses.dust),
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  purchaseSmokeColumn,
  {
    center: true,
    displayName: (
      <div style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
        <img height="15" src={`${API_HOST}/apps/dota2/images/items/smoke_of_deceit_lg.png`} role="presentation" />
        &nbsp;{strings.th_use_shorthand}
      </div>
    ),
    tooltip: strings.tooltip_used_smoke_of_deceit,
    field: 'uses_smoke',
    sortFn: row => (row.item_uses && row.item_uses.smoke_of_deceit),
    displayFn: (row, column, value) => value || '-',
    relativeBars: true,
  },
  purchaseGemColumn,
];
