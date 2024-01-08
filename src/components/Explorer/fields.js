import heroData from 'dotaconstants/build/heroes.json';
import patchData from 'dotaconstants/build/patch.json';
import regionData from 'dotaconstants/build/region.json';
import clusterData from 'dotaconstants/build/cluster.json';
import store from '../../store';
import { formatTemplateToString } from '../../utility';
// import { isActiveItem } from '../../utility';

const items = (await import('dotaconstants/build/items.json')).default;

const getItemSuffix = itemKey => (['_2', '_3', '_4', '_5'].some(suffix => itemKey.indexOf(suffix) !== -1) ? itemKey[itemKey.length - 1] : '');

const getFields = (players = [], leagues = [], teams = []) => {
  const { strings } = store.getState().app;
  const jsonSelect = {
    value: 'key',
    groupValue: 'value::text::int',
    groupKey: 'key',
    avgPerMatch: true,
    bundle: 'json_select',
    singleSelection: 'true',
  };

  const usesSelect = itemKey => ({
    text: `${strings.explorer_uses} - ${items[itemKey].dname} ${getItemSuffix(itemKey)}`,
    value: `(item_uses->>'${itemKey}')::int`,
    key: `uses_${itemKey}`,
    alias: 'uses',
    bundle: 'uses',
  });

  // const timingSelect = itemKey => ({
  //   text: `${strings.explorer_timing} - ${items[itemKey].dname} ${getItemSuffix(itemKey)}`,
  //   value: 'match_logs.time',
  //   order: 'ASC',
  //   join: `JOIN match_logs 
  // ON match_logs.match_id = matches.match_id 
  // AND player_matches.player_slot = match_logs.targetname_slot 
  // AND match_logs.type = 'DOTA_COMBATLOG_PURCHASE'
  // AND match_logs.valuename = 'item_${itemKey}'`,
  //   key: `timing_${itemKey}`,
  //   formatSeconds: true,
  //   bundle: 'timing',
  //   singleSelection: true,
  // });

  // const killSelect = ({
  //   text,
  //   unitKey,
  // }) => ({
  //   text: `${strings.explorer_kill} - ${text}`,
  //   value: 'match_logs.time',
  //   order: 'ASC',
  //   join: `JOIN match_logs 
  // ON match_logs.match_id = matches.match_id 
  // AND player_matches.player_slot = match_logs.sourcename_slot 
  // AND match_logs.type = 'DOTA_COMBATLOG_DEATH'
  // AND match_logs.targetname LIKE '${unitKey}'`,
  //   key: `kill_${unitKey}`,
  //   bundle: 'kill',
  //   singleSelection: true,
  // });

  const singleFields = [{
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
    bucket: 50,
    key: 'gold_per_min',
  }, {
    text: strings.heading_xp_per_min,
    value: 'xp_per_min',
    bucket: 50,
    key: 'xp_per_min',
  }, {
    text: strings.heading_last_hits,
    value: 'last_hits',
    bucket: 10,
    key: 'last_hits',
  }, {
    text: strings.heading_denies,
    value: 'denies',
    key: 'denies',
  }, {
    text: strings.heading_hero_damage,
    value: 'hero_damage',
    bucket: 1000,
    key: 'hero_damage',
  }, {
    text: strings.heading_tower_damage,
    value: 'tower_damage',
    bucket: 1000,
    key: 'tower_damage',
  }, {
    text: strings.heading_hero_healing,
    value: 'hero_healing',
    bucket: 1000,
    key: 'hero_healing',
  }, {
    text: strings.heading_level,
    value: 'level',
    key: 'level',
  }, {
    text: strings.heading_stuns,
    value: 'stuns',
    bucket: 1,
    key: 'stuns',
  }, {
    text: strings.heading_camps_stacked,
    value: 'camps_stacked',
    key: 'camps_stacked',
  }, {
    text: strings.heading_lhten,
    value: 'lh_t[11]',
    bucket: 10,
    key: 'lh10',
  }, {
    text: strings.heading_lhtwenty,
    value: 'lh_t[21]',
    bucket: 10,
    key: 'lh20',
  }, {
    text: strings.heading_lhthirty,
    value: 'lh_t[31]',
    bucket: 10,
    key: 'lh30',
  }, {
    text: strings.heading_lhforty,
    value: 'lh_t[41]',
    bucket: 10,
    key: 'lh40',
  }, {
    text: strings.heading_lhfifty,
    value: 'lh_t[51]',
    bucket: 10,
    key: 'lh50',
  },
  {
    text: strings.th_buybacks,
    value: 'array_length(buyback_log, 1)',
    key: 'buybacks',
  },
  {
    text: strings.th_scans_used,
    value: '(actions->>\'31\')::int',
    key: 'scans_used',
  },
  {
    text: strings.th_glyphs_used,
    value: '(actions->>\'24\')::int',
    key: 'glyphs_used',
  },
  {
    text: strings.th_obs_placed,
    value: 'array_length(obs_log, 1)',
    key: 'obs_placed',
  },
  {
    text: strings.th_sen_placed,
    value: 'array_length(sen_log, 1)',
    key: 'sen_placed',
  },
  {
    text: strings.th_obs_destroyed,
    value: '(killed->>\'npc_dota_observer_wards\')::int',
    key: 'obs_destroyed',
  },
  {
    text: strings.th_sen_destroyed,
    value: '(killed->>\'npc_dota_sentry_wards\')::int',
    key: 'sen_destroyed',
  },
  {
    text: strings.th_legs,
    value: 'heroes.legs',
    key: 'legs',
  },
  {
    text: strings.th_fantasy_points,
    value: 'round((0.3 * kills + (3 - 0.3 * deaths) + 0.003 * (last_hits + denies) + 0.002 * gold_per_min + towers_killed + roshans_killed + 3 * teamfight_participation + 0.5 * observers_placed + 0.5 * camps_stacked + 0.25 * rune_pickups + 4 * firstblood_claimed + 0.05 * stuns)::numeric, 1)',
    key: 'fantasy_points',
    bucket: 1,
  },
  {
    text: strings.heading_damage_dealt,
    value: '(SELECT SUM(value::text::int) FROM json_each(damage_inflictor))',
    key: 'dmg_dealt',
  },
  {
    text: strings.heading_damage_received,
    value: '(SELECT SUM(value::text::int) FROM json_each(damage_inflictor_received))',
    key: 'dmg_received',
  }].map(select => ({
    ...select,
    alias: select.alias || select.key,
    bundle: 'single',
  }));

  const patches = patchData.reverse().map(patch => ({
    text: patch.name,
    value: patch.name,
    key: patch.name,
  }));

  const durations = Array(10).fill().map((e, i) => i * 10).map(duration => ({
    text: `${formatTemplateToString(strings.time_mm, duration)}`,
    searchText: formatTemplateToString(strings.time_mm, duration),
    value: duration * 60,
    key: String(duration),
  }));

  const having = Array(5).fill().map((e, i) => (i + 1) * 5).map(element => ({
    text: String(element),
    value: element,
    key: String(element),
  }));

  const limit = [100, 200, 500, 1000].map(element => ({
    text: String(element),
    value: element,
    key: String(element),
  }));

  const goldAdvantage = Array(31).fill().map((_, i) => i * 1000).map(element => ({
    text: String(element),
    value: element,
    key: String(element),
  }));

  return {
    select: [
      {
        text: strings.heading_duration,
        value: 'duration',
        alias: 'as time',
        key: 'duration',
        formatSeconds: true,
        bundle: 'duration',
      },
      {
        text: strings.heading_distinct_heroes,
        value: 'player_matches.hero_id',
        countValue: 'count(distinct player_matches.hero_id) distinct_heroes',
        key: 'distinct_heroes',
        distinct: true,
        bundle: 'distinct_heroes',
      },
      {
        ...jsonSelect,
        text: strings.heading_item_purchased,
        alias: 'item_name',
        join: ', json_each(player_matches.purchase)',
        key: 'item_purchased',
      }, {
        ...jsonSelect,
        text: strings.heading_ability_used,
        alias: 'ability_name',
        join: ', json_each(player_matches.ability_uses)',
        key: 'ability_used',
      }, {
        ...jsonSelect,
        text: strings.heading_item_used,
        alias: 'item_name',
        join: ', json_each(player_matches.item_uses)',
        key: 'item_used',
      }, {
        ...jsonSelect,
        text: strings.heading_damage_inflictor,
        alias: 'inflictor',
        join: ', json_each(player_matches.damage_inflictor)',
        key: 'damage_inflictor',
      }, {
        ...jsonSelect,
        text: strings.heading_damage_inflictor_received,
        alias: 'inflictor',
        join: ', json_each(player_matches.damage_inflictor_received)',
        key: 'damage_inflictor_received',
      }, {
        ...jsonSelect,
        text: strings.heading_runes,
        alias: 'rune_id',
        join: ', json_each(player_matches.runes)',
        key: 'runes',
      }, {
        ...jsonSelect,
        text: strings.heading_unit_kills,
        join: ', json_each(player_matches.killed)',
        key: 'unit_kills',
      }, {
        ...jsonSelect,
        text: strings.heading_damage_instances,
        join: ', json_each(player_matches.hero_hits)',
        key: 'damage_instances',
      }, 
      // killSelect({
      //   text: strings.heading_courier,
      //   unitKey: 'npc_dota_courier',
      // }),
      // killSelect({
      //   text: strings.heading_roshan,
      //   unitKey: 'npc_dota_roshan',
      // }),
      // killSelect({
      //   text: strings.heading_tower,
      //   unitKey: '%tower%',
      // }),
      // killSelect({
      //   text: strings.heading_barracks,
      //   unitKey: '%rax%',
      // }),
      // killSelect({
      //   text: strings.heading_shrine,
      //   unitKey: '%healers%',
      // }),
      {
        text: strings.explorer_hero_combos,
        value: 1,
        groupValue: 1,
        groupKeySelect: 'player_matches.hero_id, player_matches2.hero_id hero_id2',
        groupKey: 'player_matches.hero_id, player_matches2.hero_id',
        joinFn: props => `JOIN player_matches player_matches2
ON player_matches.match_id = player_matches2.match_id
AND player_matches.hero_id != player_matches2.hero_id 
AND abs(player_matches.player_slot - player_matches2.player_slot) < 10
${props.hero && props.hero.value ? '' : 'AND player_matches.hero_id < player_matches2.hero_id'}`,
        key: 'hero_combos',
        bundle: 'combinations',
      },
      {
        text: strings.explorer_hero_player,
        value: 1,
        groupValue: 1,
        groupKey: 'player_matches.hero_id, player_matches.account_id',
        key: 'hero_player',
        bundle: 'combinations',
      },
      {
        text: strings.explorer_player_player,
        value: 1,
        groupValue: 1,
        groupKeySelect: 'player_matches.account_id, player_matches2.account_id account_id2',
        groupKey: 'player_matches.account_id, player_matches2.account_id',
        joinFn: props => `JOIN player_matches player_matches2
ON player_matches.match_id = player_matches2.match_id
AND player_matches.account_id != player_matches2.account_id 
AND abs(player_matches.player_slot - player_matches2.player_slot) < 10
${props.player && props.player.value ? '' : 'AND player_matches.account_id < player_matches2.account_id'}`,
        key: 'player_player',
        bundle: 'combinations',
      },
      {
        text: strings.explorer_picks_bans,
        template: 'picks_bans',
        key: 'picks_bans',
        // picks_bans.team is 0 for radiant, 1 for dire
        where: 'AND team_match.radiant::int != picks_bans.team',
        value: 1,
        bundle: 'picks_bans',
      },
      {
        text: strings.explorer_counter_picks_bans,
        template: 'picks_bans',
        key: 'counter_picks_bans',
        where: 'AND team_match.radiant::int = picks_bans.team',
        value: 1,
        bundle: 'picks_bans',
      },
    ]
      .concat(Object.keys(items).filter(itemKey => items[itemKey].cd).map(usesSelect))
      // .concat(Object.keys(items).filter(itemKey => items[itemKey].cost > 2000).map(timingSelect))
      .concat(singleFields)
      .sort((a, b) => a.text && a.text.localeCompare(b.text)),
    group: [{
      text: strings.explorer_player,
      value: 'notable_players.name',
      key: 'player',
    }, {
      text: strings.th_hero_id,
      value: 'heroes.localized_name',
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
    }, {
      text: strings.explorer_organization,
      value: 'teams2.name',
      key: 'organization',
    }, {
      text: strings.explorer_match,
      value: 'matches.match_id',
      key: 'match',
    },
    ].concat(singleFields),
    minPatch: patches,
    maxPatch: patches,
    hero: Object.keys(heroData).map(heroId => ({
      text: `[${heroId}] ${heroData[heroId].localized_name}`,
      searchText: heroData[heroId].localized_name,
      value: heroData[heroId].id,
      key: String(heroData[heroId].id),
    })),
    playerPurchased: Object.keys(items).map(itemName => ({
      text: items[itemName].dname,
      value: itemName,
      key: itemName,
    })),
    minDuration: durations,
    maxDuration: durations,
    side: [{
      text: strings.general_radiant,
      value: true,
      key: 'radiant',
    }, {
      text: strings.general_dire,
      value: false,
      key: 'dire',
    }],
    result: [{
      text: strings.td_win,
      value: true,
      key: 'win',
    }, {
      text: strings.td_loss,
      value: false,
      key: 'loss',
    }],
    region: Object.keys(regionData).map(regionKey => ({
      text: strings[`region_${regionKey}`],
      value: Object.keys(clusterData).filter(key => String(clusterData[key]) === regionKey),
      key: String(regionKey),
    })),
    league: leagues.map(league => ({
      text: `[${league.leagueid}] ${league.name}`,
      searchText: league.name,
      value: league.leagueid,
      key: String(league.leagueid),
    })),
    team: teams.map(team => ({
      text: `[${team.team_id}] ${team.name}`,
      searchText: team.name,
      value: team.team_id,
      key: String(team.team_id),
    })),
    organization: teams.map(team => ({
      text: `[${team.team_id}] ${team.name}`,
      searchText: team.name,
      value: team.team_id,
      key: String(team.team_id),
    })),
    player: players.map(player => ({
      text: `[${player.account_id}] ${player.name}`,
      searchText: player.name,
      value: player.account_id,
      key: String(player.account_id),
    })),
    tier: ['premium', 'professional'].map(tier => ({
      text: strings[`tier_${tier}`],
      value: tier,
      key: tier,
    })),
    order: [{ text: strings.explorer_asc, value: 'ASC', key: 'asc' }, { text: strings.explorer_desc, value: 'DESC', key: 'desc' }],
    having,
    limit,
    laneRole: Object.keys(strings).filter(str => str.indexOf('lane_role_') === 0).map((str) => {
      const laneRoleId = Number(str.substring('lane_role_'.length));
      return { text: strings[str], value: laneRoleId, key: String(laneRoleId) };
    }),
    isTiTeam: [{ text: 'Yes', value: true, key: 'true' }],
    megaWin: [{ text: 'Yes', value: true, key: 'true' }],
    minGoldAdvantage: goldAdvantage,
    maxGoldAdvantage: goldAdvantage,
  };
};

export default getFields;
