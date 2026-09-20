// The API sorts on stored columns only, so per-minute records are ranked here:
// the full match history is fetched with the columns they're computed from.
const sourceColumns = {
  kills_per_min: "kills",
  hero_damage_per_min: "hero_damage",
  tower_damage_per_min: "tower_damage",
} as const;

type PerMinuteRecord = keyof typeof sourceColumns;

export const perMinuteRecords = Object.keys(sourceColumns) as PerMinuteRecord[];

export const isPerMinuteRecord = (field: string): field is PerMinuteRecord =>
  field in sourceColumns;

// `project` replaces the columns the API returns by default, so every field the
// records table reads has to be asked for.
const displayColumns = [
  "hero_id",
  "start_time",
  "duration",
  "game_mode",
  "lobby_type",
  "party_size",
];

export const perMinuteRecordParams = (field: PerMinuteRecord) => ({
  project: [...displayColumns, sourceColumns[field]],
});

const RECORD_COUNT = 20;

const perMinute = (total: number | null, duration: number | null) =>
  total != null && duration ? (total / duration) * 60 : null;

export const transformPerMinuteRecords =
  (field: PerMinuteRecord) => (matches: any[]) =>
    matches
      .map((match) => ({
        ...match,
        [field]: perMinute(match[sourceColumns[field]], match.duration),
      }))
      .filter((match) => match[field] !== null)
      .sort((a, b) => b[field] - a[field])
      .slice(0, RECORD_COUNT);
