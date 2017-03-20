import util from 'util';
import strings from 'lang';
import heroData from 'dotaconstants/build/heroes.json';
import patchData from 'dotaconstants/build/patch.json';
import itemData from 'dotaconstants/build/items.json';

const getItemSuffix = itemKey => (['_2', '_3', '_4', '_5'].some(suffix => itemKey.indexOf(suffix) !== -1) ? itemKey[itemKey.length - 1] : '');

const jsonSelect = {
  value: 'key',
  groupValue: 'value::text::int',
  groupKey: 'key',
};

const timingSelect = itemKey => ({
  text: `${strings.explorer_timing} - ${itemData[itemKey].dname} ${getItemSuffix(itemKey)}`,
  value: 'match_logs.time',
  order: 'ASC',
  join: `JOIN match_logs 
ON match_logs.match_id = matches.match_id 
AND player_matches.player_slot = match_logs.targetname_slot 
AND match_logs.type = 'DOTA_COMBATLOG_PURCHASE'
AND match_logs.valuename = 'item_${itemKey}'`,
  key: `timing_${itemKey}`,
  formatSeconds: true,
});

const killSelect = ({
  text,
  unitKey,
}) => ({
  text: `${strings.explorer_kill} - ${text}`,
  value: 'match_logs.time',
  order: 'ASC',
  join: `JOIN match_logs 
ON match_logs.match_id = matches.match_id 
AND player_matches.player_slot = match_logs.sourcename_slot 
AND match_logs.type = 'DOTA_COMBATLOG_DEATH'
AND match_logs.targetname LIKE '${unitKey}'`,
  key: `kill_${unitKey}`,
});

const fields = {
  select: [{
    text: strings.heading_kills,
    value: 'kills',
    key: 'kills',
  }, {
    text: strings.heading_deaths,
    value: 'deaths',
    key: 'deaths',
  }, {
    text: strings.heading_assists,
    value: 'assists',
    key: 'assists',
  }, {
    text: strings.heading_gold_per_min,
    value: 'gold_per_min',
    key: 'gold_per_min',
  }, {
    text: strings.heading_xp_per_min,
    value: 'xp_per_min',
    key: 'xp_per_min',
  }, {
    text: strings.heading_last_hits,
    value: 'last_hits',
    key: 'last_hits',
  }, {
    text: strings.heading_denies,
    value: 'denies',
    key: 'denies',
  }, {
    text: strings.heading_hero_damage,
    value: 'hero_damage',
    key: 'hero_damage',
  }, {
    text: strings.heading_tower_damage,
    value: 'tower_damage',
    key: 'tower_damage',
  }, {
    text: strings.heading_hero_healing,
    value: 'hero_healing',
    key: 'hero_healing',
  }, {
    text: strings.heading_level,
    value: 'level',
    key: 'level',
  }, {
    text: strings.heading_stuns,
    value: 'stuns',
    key: 'stuns',
  }, {
    text: strings.heading_camps_stacked,
    value: 'camps_stacked',
    key: 'camps_stacked',
  }, {
    text: strings.heading_lhten,
    value: 'lh_t[10]',
    key: 'lh10',
  }, {
    text: strings.heading_lhtwenty,
    value: 'lh_t[20]',
    key: 'lh20',
  }, {
    text: strings.heading_lhthirty,
    value: 'lh_t[30]',
    key: 'lh30',
  }, {
    text: strings.heading_lhforty,
    value: 'lh_t[40]',
    key: 'lh40',
  }, {
    text: strings.heading_lhfifty,
    value: 'lh_t[50]',
    key: 'lh50',
  }, {
    text: strings.heading_duration,
    value: 'duration',
    avgCountValue: 1,
    alias: 'as time',
    key: 'duration',
    formatSeconds: true,
  }, { ...jsonSelect,
    text: strings.heading_item_purchased,
    alias: 'item_name',
    join: ', json_each(player_matches.purchase)',
    key: 'item_purchased',
  }, { ...jsonSelect,
    text: strings.heading_ability_used,
    alias: 'ability_name',
    join: ', json_each(player_matches.ability_uses)',
    key: 'ability_used',
  }, { ...jsonSelect,
    text: strings.heading_item_used,
    alias: 'item_name',
    join: ', json_each(player_matches.item_uses)',
    key: 'item_used',
  }, { ...jsonSelect,
    text: strings.heading_damage_inflictor,
    alias: 'inflictor',
    join: ', json_each(player_matches.damage_inflictor)',
    key: 'damage_inflictor',
  }, { ...jsonSelect,
    text: strings.heading_damage_inflictor_received,
    alias: 'inflictor',
    join: ', json_each(player_matches.damage_inflictor_received)',
    key: 'damage_inflictor_received',
  }, { ...jsonSelect,
    text: strings.heading_runes,
    alias: 'rune_id',
    join: ', json_each(player_matches.runes)',
    key: 'runes',
  }, { ...jsonSelect,
    text: strings.heading_unit_kills,
    join: ', json_each(player_matches.killed)',
    key: 'unit_kills',
  }, { ...jsonSelect,
    text: strings.heading_damage_instances,
    join: ', json_each(player_matches.hero_hits)',
    key: 'damage_instances',
  }, killSelect({
    text: strings.heading_courier,
    unitKey: 'npc_dota_courier',
  }),
    killSelect({
      text: strings.heading_roshan,
      unitKey: 'npc_dota_roshan',
    }),
    killSelect({
      text: strings.heading_tower,
      unitKey: '%tower%',
    }),
    killSelect({
      text: strings.heading_barracks,
      unitKey: '%rax%',
    }),
    killSelect({
      text: strings.heading_shrine,
      unitKey: '%healers%',
    }),
  {
    text: strings.th_buybacks,
    value: 'json_array_length(array_to_json(buyback_log))',
    alias: 'buybacks',
    key: 'buybacks',
  },
  {
    text: strings.explorer_hero_combos,
    value: 1,
    groupValue: 1,
    groupKeySelect: 'player_matches.hero_id, player_matches2.hero_id hero_id2',
    groupKey: 'player_matches.hero_id, player_matches2.hero_id',
    join: `JOIN player_matches player_matches2
ON player_matches.match_id = player_matches2.match_id
AND player_matches.hero_id != player_matches2.hero_id 
AND abs(player_matches.player_slot - player_matches2.player_slot) < 10`,
    key: 'hero_combos',
  },
  ]
    .concat(Object.keys(itemData).filter(itemKey => itemData[itemKey].cost > 2000).map(timingSelect)),
  group: [{
    text: strings.explorer_player,
    value: 'notable_players.account_id',
    key: 'player',
  }, {
    text: strings.th_hero_id,
    value: 'player_matches.hero_id',
    key: 'hero',
  }, {
    text: strings.explorer_league,
    value: 'leagues.name',
    alias: 'leaguename',
    key: 'league',
  }, {
    text: strings.explorer_patch,
    value: 'patch',
    key: 'patch',
  }, {
    text: strings.heading_duration,
    value: 'duration/300*5',
    alias: 'minutes',
    key: 'duration',
  }, {
    text: strings.explorer_side,
    value: '(player_matches.player_slot < 128)',
    alias: 'is_radiant',
    key: 'side',
  }, {
    text: strings.th_result,
    value: '((player_matches.player_slot < 128) = matches.radiant_win)',
    alias: 'win',
    key: 'result',
  }, {
    text: strings.explorer_team,
    value: 'teams.name',
    key: 'team',
  },
  ],
  patch: patchData.reverse().map(patch => ({
    text: patch.name,
    value: patch.name,
    key: patch.name,
  })),
  hero: Object.keys(heroData).map(heroId => ({
    text: heroData[heroId].localized_name,
    value: heroData[heroId].id,
    key: String(heroData[heroId].id),
  })),
  playerPurchased: Object.keys(itemData).map(itemName => ({
    text: itemData[itemName].dname,
    value: itemName,
    key: itemName,
  })),
  duration: [10, 20, 30, 40, 50].map(duration => ({
    text: `> ${util.format(strings.time_mm, duration)}`,
    value: duration * 60,
    key: String(duration),
  })),
  side: [{ text: strings.general_radiant, value: true, key: 'radiant' }, { text: strings.general_dire, value: false, key: 'dire' }],
  result: [{ text: strings.td_win, value: true, key: 'win' }, { text: strings.td_loss, value: false, key: 'loss' }],
  /*
  lanePos: Object.keys(strings).filter(str => str.indexOf('lane_pos_') === 0).map(str => {
    const lanePosId = Number(str.substring('lane_pos_'.length));
    return { text: strings[str], value: lanePosId, key: lanePosId };
  }),
  */
};

export default fields;
