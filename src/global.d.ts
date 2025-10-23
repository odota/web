declare module 'ace-builds/src-noconflict/ace';
declare module 'ace-builds/src-noconflict/ext-language_tools';
declare module 'ace-builds/src-noconflict/theme-monokai';
declare module 'ace-builds/src-noconflict/mode-sql';

type Strings = typeof import('./lang/en-US.json');
type Heroes = typeof import('dotaconstants/build/heroes.json');
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
  players: MatchPlayer[],
  match_id: number,
  duration: number,
  radiant_win: boolean,
  tower_status_radiant: number,
  barracks_status_radiant: number,
  barracks_status_dire: number,
  tower_status_dire: number,
  start_time: number,
  radiant_team?: { name: string }
  dire_team?: { name: string }
  radiant_score: number,
  dire_score: number,
  league?: { name: string }
  version?: number,
  replay_url?: string,
  region: number,
  game_mode: number,
};

type MatchPlayer = {
  hero_id: keyof Heroes,
  account_id: number,
  killed: Record<string, any>,
  player_slot: number,
  damage: Record<string, any>,
  name: string,
  personaname: string,
  isRadiant: boolean,
  is_roaming: boolean,
  desc: string,
  lane: number,
  cs_t: number[],
  lh_t: number[],
  kills_log: any[],
  lane_pos: any,
};