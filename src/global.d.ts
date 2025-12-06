declare module 'ace-builds/src-noconflict/ace';
declare module 'ace-builds/src-noconflict/ext-language_tools';
declare module 'ace-builds/src-noconflict/theme-monokai';
declare module 'ace-builds/src-noconflict/mode-sql';
declare module 'abcolor';

type ScenariosTab = 'itemTimings' | 'laneRoles' | 'misc';
type Strings = typeof import('./lang/en-US.json');
type Heroes = typeof import('dotaconstants/build/heroes.json');
type Items = typeof import('dotaconstants/build/items.json');
type PatchNotes =
  | Record<
      string,
      {
        general?: string[];
        items?: Record<string, string[]>;
        heroes?: Record<string, any>;
      }
    >
  | undefined;
type Hero = {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  cm_enabled: boolean;
  base_health: number;
  base_health_regen: number | null;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  move_speed: number;
  turn_rate: number | null;
  legs: number | null;
};

type Heroes = Record<string, Hero>;

type Match = {
  players: MatchPlayer[];
  match_id: number;
  duration: number;
  radiant_win: boolean;
  tower_status_radiant: number;
  barracks_status_radiant: number;
  barracks_status_dire: number;
  tower_status_dire: number;
  start_time: number;
  radiant_team?: { name: string };
  dire_team?: { name: string };
  radiant_score: number;
  dire_score: number;
  league?: { name: string };
  version?: number;
  replay_url?: string;
  region: number;
  game_mode: number;
  picks_bans: any[];
  objectives: any[];
  teamfights: {
    start: number;
    end: number;
    radiant_gold_advantage_delta: number;
    players: any[];
  }[];
  first_blood_time: number;
  draft_timings: any[];
  chat: any[];
  radiant_gold_adv: number[];
  radiant_xp_adv: number[];
  wards_log: any[];
};

type MatchPlayer = {
  hero_id: keyof Heroes;
  hero_name: string;
  hero_healing: number;
  item_neutral: number;
  item_neutral2: number;
  account_id: number;
  killed: Record<string, any>;
  killed_by: Record<string, any>;
  damage_taken: Record<string, number>;
  kills_log: any[];
  player_slot: number;
  damage: Record<string, any>;
  name: string;
  personaname: string;
  isRadiant: boolean;
  is_roaming: boolean;
  desc: string;
  lane: number;
  gold_t: number[];
  cs_t: number[];
  lh_t: number[];
  lane_pos: any;
  gold_reasons: Record<string, number>;
  xp_reasons: Record<string, number>;
  cosmetics: any[];
  runes_log: any[];
  pred_vict: boolean;
  first_purchase_time: Record<string, number>;
  kills: number;
  deaths: number;
  assists: number;
  purchase_log: any[];
  last_login: string;
  is_contributor: boolean;
  is_subscriber: boolean;
  rank_tier: number;
  hero_variant: number;
  randomed: boolean;
  repicked: boolean;
  leaver_status: number;
  party_size: number;
  party_id: number;
  additional_units: any[];
  permanent_buffs: any[];
  ability_upgrades_arr: number[];
  abilities: any[];
  specific: any;
  actions: Record<string, number>;
  runes: Record<string, number>;
  objective_damage: Record<string, number>;
  damage_inflictor: Record<string, number>;
  ability_uses: Record<string, number>;
  obs_log: any[];
  sen_log: any[];
  obs_left_log: any[];
  sen_left_log: any[];
  item_uses: Record<string, number>;
  net_worth: number;
  hero_damage: number;
  tower_damage: number;
  benchmarks: Record<string, any>;
  computed_mmr: number;
};

type RouterProps = {
  location: import('history').Location;
  match: {
    params: {
      playerId: string;
      info?: string;
    };
    isExact: boolean;
    path: string;
    url: string;
  };
  history: import('history').History;
};

type WardType = 'observer' | 'sentry';

type VisionState = {
  players: { observer: boolean[]; sentry: boolean[] };
  teams: Record<string, any>;
  currentTick?: number;
};
