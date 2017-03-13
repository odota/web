import strings from 'lang';
// import fields from './fields';

// const cols = [...new Set(fields.select.map(e => e.value).filter(Boolean).filter(e => typeof e === 'string'))];
const cols = [
  {
    table_name: 'matches',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'matches',
    column_name: 'match_seq_num',
    data_type: 'bigint',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_win',
    data_type: 'boolean',
  },
  {
    table_name: 'matches',
    column_name: 'start_time',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'duration',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'tower_status_radiant',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'tower_status_dire',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'barracks_status_radiant',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'barracks_status_dire',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'cluster',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'first_blood_time',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'lobby_type',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'human_players',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'leagueid',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'positive_votes',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'negative_votes',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'game_mode',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'engine',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'picks_bans',
    data_type: 'ARRAY',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_team_id',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'dire_team_id',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_team_name',
    data_type: 'character varying',
  },
  {
    table_name: 'matches',
    column_name: 'dire_team_name',
    data_type: 'character varying',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_team_complete',
    data_type: 'smallint',
  },
  {
    table_name: 'matches',
    column_name: 'dire_team_complete',
    data_type: 'smallint',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_captain',
    data_type: 'bigint',
  },
  {
    table_name: 'matches',
    column_name: 'dire_captain',
    data_type: 'bigint',
  },
  {
    table_name: 'matches',
    column_name: 'chat',
    data_type: 'ARRAY',
  },
  {
    table_name: 'matches',
    column_name: 'objectives',
    data_type: 'ARRAY',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_gold_adv',
    data_type: 'ARRAY',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_xp_adv',
    data_type: 'ARRAY',
  },
  {
    table_name: 'matches',
    column_name: 'teamfights',
    data_type: 'ARRAY',
  },
  {
    table_name: 'matches',
    column_name: 'version',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'cosmetics',
    data_type: 'json',
  },
  {
    table_name: 'matches',
    column_name: 'radiant_score',
    data_type: 'integer',
  },
  {
    table_name: 'matches',
    column_name: 'dire_score',
    data_type: 'integer',
  },
  {
    table_name: 'players',
    column_name: 'account_id',
    data_type: 'bigint',
  },
  {
    table_name: 'players',
    column_name: 'steamid',
    data_type: 'character varying',
  },
  {
    table_name: 'players',
    column_name: 'avatar',
    data_type: 'character varying',
  },
  {
    table_name: 'players',
    column_name: 'avatarmedium',
    data_type: 'character varying',
  },
  {
    table_name: 'players',
    column_name: 'avatarfull',
    data_type: 'character varying',
  },
  {
    table_name: 'players',
    column_name: 'profileurl',
    data_type: 'character varying',
  },
  {
    table_name: 'players',
    column_name: 'personaname',
    data_type: 'character varying',
  },
  {
    table_name: 'players',
    column_name: 'last_login',
    data_type: 'timestamp with time zone',
  },
  {
    table_name: 'players',
    column_name: 'full_history_time',
    data_type: 'timestamp with time zone',
  },
  {
    table_name: 'players',
    column_name: 'cheese',
    data_type: 'integer',
  },
  {
    table_name: 'players',
    column_name: 'fh_unavailable',
    data_type: 'boolean',
  },
  {
    table_name: 'players',
    column_name: 'loccountrycode',
    data_type: 'character varying',
  },
  {
    table_name: 'player_matches',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'player_matches',
    column_name: 'account_id',
    data_type: 'bigint',
  },
  {
    table_name: 'player_matches',
    column_name: 'player_slot',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'hero_id',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'item_0',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'item_1',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'item_2',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'item_3',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'item_4',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'item_5',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'kills',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'deaths',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'assists',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'leaver_status',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'gold',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'last_hits',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'denies',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'gold_per_min',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'xp_per_min',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'gold_spent',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'hero_damage',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'tower_damage',
    data_type: 'bigint',
  },
  {
    table_name: 'player_matches',
    column_name: 'hero_healing',
    data_type: 'bigint',
  },
  {
    table_name: 'player_matches',
    column_name: 'level',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'additional_units',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'stuns',
    data_type: 'real',
  },
  {
    table_name: 'player_matches',
    column_name: 'max_hero_hit',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'times',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'gold_t',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'lh_t',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'xp_t',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'obs_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'sen_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'purchase_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'kills_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'buyback_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'lane_pos',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'obs',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'sen',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'actions',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'pings',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'purchase',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'gold_reasons',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'xp_reasons',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'killed',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'item_uses',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'ability_uses',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'hero_hits',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'damage',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'damage_taken',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'damage_inflictor',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'runes',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'killed_by',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'kill_streaks',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'multi_kills',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'life_state',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'damage_inflictor_received',
    data_type: 'json',
  },
  {
    table_name: 'player_matches',
    column_name: 'obs_placed',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'sen_placed',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'creeps_stacked',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'camps_stacked',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'rune_pickups',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'obs_left_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'sen_left_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'ability_upgrades_arr',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'party_id',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'permanent_buffs',
    data_type: 'ARRAY',
  },
  {
    table_name: 'player_matches',
    column_name: 'backpack_0',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'backpack_1',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'backpack_2',
    data_type: 'integer',
  },
  {
    table_name: 'player_matches',
    column_name: 'runes_log',
    data_type: 'ARRAY',
  },
  {
    table_name: 'public_matches',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'public_matches',
    column_name: 'match_seq_num',
    data_type: 'bigint',
  },
  {
    table_name: 'public_matches',
    column_name: 'radiant_win',
    data_type: 'boolean',
  },
  {
    table_name: 'public_matches',
    column_name: 'start_time',
    data_type: 'integer',
  },
  {
    table_name: 'public_matches',
    column_name: 'duration',
    data_type: 'integer',
  },
  {
    table_name: 'public_matches',
    column_name: 'avg_mmr',
    data_type: 'integer',
  },
  {
    table_name: 'public_matches',
    column_name: 'num_mmr',
    data_type: 'integer',
  },
  {
    table_name: 'public_player_matches',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'public_player_matches',
    column_name: 'player_slot',
    data_type: 'integer',
  },
  {
    table_name: 'public_player_matches',
    column_name: 'hero_id',
    data_type: 'integer',
  },
  {
    table_name: 'heroes',
    column_name: 'id',
    data_type: 'integer',
  },
  {
    table_name: 'heroes',
    column_name: 'name',
    data_type: 'text',
  },
  {
    table_name: 'heroes',
    column_name: 'localized_name',
    data_type: 'text',
  },
  {
    table_name: 'leagues',
    column_name: 'leagueid',
    data_type: 'bigint',
  },
  {
    table_name: 'leagues',
    column_name: 'ticket',
    data_type: 'character varying',
  },
  {
    table_name: 'leagues',
    column_name: 'banner',
    data_type: 'character varying',
  },
  {
    table_name: 'leagues',
    column_name: 'tier',
    data_type: 'character varying',
  },
  {
    table_name: 'leagues',
    column_name: 'name',
    data_type: 'character varying',
  },
  {
    table_name: 'items',
    column_name: 'id',
    data_type: 'integer',
  },
  {
    table_name: 'items',
    column_name: 'name',
    data_type: 'text',
  },
  {
    table_name: 'items',
    column_name: 'cost',
    data_type: 'integer',
  },
  {
    table_name: 'items',
    column_name: 'secret_shop',
    data_type: 'smallint',
  },
  {
    table_name: 'items',
    column_name: 'side_shop',
    data_type: 'smallint',
  },
  {
    table_name: 'items',
    column_name: 'recipe',
    data_type: 'smallint',
  },
  {
    table_name: 'items',
    column_name: 'localized_name',
    data_type: 'text',
  },
  {
    table_name: 'team_match',
    column_name: 'team_id',
    data_type: 'bigint',
  },
  {
    table_name: 'team_match',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'team_match',
    column_name: 'radiant',
    data_type: 'boolean',
  },
  {
    table_name: 'match_patch',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'match_patch',
    column_name: 'patch',
    data_type: 'text',
  },
  {
    table_name: 'picks_bans',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'picks_bans',
    column_name: 'is_pick',
    data_type: 'boolean',
  },
  {
    table_name: 'picks_bans',
    column_name: 'hero_id',
    data_type: 'integer',
  },
  {
    table_name: 'picks_bans',
    column_name: 'team',
    data_type: 'smallint',
  },
  {
    table_name: 'picks_bans',
    column_name: 'ord',
    data_type: 'smallint',
  },
  {
    table_name: 'teams',
    column_name: 'team_id',
    data_type: 'bigint',
  },
  {
    table_name: 'teams',
    column_name: 'name',
    data_type: 'character varying',
  },
  {
    table_name: 'teams',
    column_name: 'tag',
    data_type: 'character varying',
  },
  {
    table_name: 'notable_players',
    column_name: 'account_id',
    data_type: 'bigint',
  },
  {
    table_name: 'notable_players',
    column_name: 'name',
    data_type: 'character varying',
  },
  {
    table_name: 'notable_players',
    column_name: 'country_code',
    data_type: 'character varying',
  },
  {
    table_name: 'notable_players',
    column_name: 'fantasy_role',
    data_type: 'integer',
  },
  {
    table_name: 'notable_players',
    column_name: 'team_id',
    data_type: 'integer',
  },
  {
    table_name: 'notable_players',
    column_name: 'team_name',
    data_type: 'character varying',
  },
  {
    table_name: 'notable_players',
    column_name: 'team_tag',
    data_type: 'character varying',
  },
  {
    table_name: 'notable_players',
    column_name: 'is_locked',
    data_type: 'boolean',
  },
  {
    table_name: 'notable_players',
    column_name: 'is_pro',
    data_type: 'boolean',
  },
  {
    table_name: 'notable_players',
    column_name: 'locked_until',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'match_id',
    data_type: 'bigint',
  },
  {
    table_name: 'match_logs',
    column_name: 'time',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'type',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'team',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'unit',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'key',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'value',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'slot',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'player_slot',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'player1',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'player2',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'attackerhero',
    data_type: 'boolean',
  },
  {
    table_name: 'match_logs',
    column_name: 'targethero',
    data_type: 'boolean',
  },
  {
    table_name: 'match_logs',
    column_name: 'attackerillusion',
    data_type: 'boolean',
  },
  {
    table_name: 'match_logs',
    column_name: 'targetillusion',
    data_type: 'boolean',
  },
  {
    table_name: 'match_logs',
    column_name: 'inflictor',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'gold_reason',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'xp_reason',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'valuename',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'gold',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'lh',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'xp',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'x',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'y',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'z',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'entityleft',
    data_type: 'boolean',
  },
  {
    table_name: 'match_logs',
    column_name: 'ehandle',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'stuns',
    data_type: 'real',
  },
  {
    table_name: 'match_logs',
    column_name: 'hero_id',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'life_state',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'level',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'kills',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'deaths',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'assists',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'denies',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'attackername_slot',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'targetname_slot',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'sourcename_slot',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'targetsourcename_slot',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'player1_slot',
    data_type: 'smallint',
  },
  {
    table_name: 'match_logs',
    column_name: 'attackername',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'targetname',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'sourcename',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'targetsourcename',
    data_type: 'character varying',
  },
  {
    table_name: 'match_logs',
    column_name: 'obs_placed',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'sen_placed',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'creeps_stacked',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'camps_stacked',
    data_type: 'integer',
  },
  {
    table_name: 'match_logs',
    column_name: 'rune_pickups',
    data_type: 'integer',
  }];
const sqlfs = ['SELECT', 'WHERE', 'GROUP BY', 'ORDER BY', 'USING()'];
const sqlts = ['FROM', 'JOIN', 'LEFT JOIN'];
const tables = ['matches', 'player_matches', 'teams', 'match_logs', 'public_matches', 'public_player_matches'];
const sqlks = ['OFFSET', 'LIMIT', 'DISTINCT', 'IN'];
const sqlfuncs = ['to_timestamp()', 'count()', 'avg()', 'sum()', 'stddev()', 'min()', 'max()'];
/*
select table_name, column_name, data_type
from INFORMATION_SCHEMA.COLUMNS
where table_schema = 'public'
*/

const completions = []
    .concat(sqlfuncs.map(e => ({ value: e, meta: strings.explorer_postgresql_function })))
    .concat(sqlfs.map(e => ({ value: e, meta: strings.explorer_sql })))
    .concat(sqlts.map(e => ({ value: e, meta: strings.explorer_sql })))
    .concat(sqlks.map(e => ({ value: e, meta: strings.explorer_sql })))
    .concat(tables.map(e => ({ value: e, meta: strings.explorer_table })))
    .concat(cols.map(e => ({ value: `${e.table_name}.${e.column_name}`, meta: e.data_type })));

const autocomplete = {
  getCompletions(editor, session, pos, prefix, callback) {
    callback(null, completions);
  },
};

export default autocomplete;
