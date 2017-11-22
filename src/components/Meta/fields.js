import util from 'util';
import strings from 'lang';
import heroData from 'dotaconstants/build/heroes.json';
import gameModeData from 'dotaconstants/build/game_mode.json';
import lobbyTypeData from 'dotaconstants/build/lobby_type.json';
// import patchData from 'dotaconstants/build/patch.json';

const mmrs = Array(20).fill().map((e, i) => i * 500).map(element => ({
  text: String(element),
  value: element,
  key: String(element),
}));

const durations = Array(10).fill().map((e, i) => i * 10).map(duration => ({
  text: `${util.format(strings.time_mm, duration)}`,
  searchText: util.format(strings.time_mm, duration),
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

const gameMode = Object.values(gameModeData).map(element => ({
  text: strings[`game_mode_${element.id}`],
  value: element.id,
  key: String(element.id),
}));

const lobbyType = Object.values(lobbyTypeData).map(element => ({
  text: strings[`lobby_type_${element.id}`],
  value: element.id,
  key: String(element.id),
}));

const fields = () => ({
  group: [{
    text: strings.th_hero_id,
    value: 'public_player_matches.hero_id',
    key: 'hero',
  }, {
    text: strings.match_avg_mmr,
    value: 'avg_mmr/500*500',
    key: 'mmr',
  }, {
    text: strings.explorer_side,
    value: '(public_player_matches.player_slot < 128)',
    alias: 'is_radiant',
    key: 'side',
  }, {
    text: strings.th_result,
    value: '((public_player_matches.player_slot < 128) = public_matches.radiant_win)',
    alias: 'win',
    key: 'result',
  }, {
    text: strings.heading_duration,
    value: 'duration/300*5',
    alias: 'minutes',
    key: 'duration',
  }, {
    text: strings.filter_game_mode,
    value: 'game_mode',
    key: 'game_mode',
  }, {
    text: strings.filter_lobby_type,
    value: 'lobby_type',
    key: 'lobby_type',
  } /* {
    text: strings.explorer_patch,
    value: 'patch',
    key: 'patch',
  }, */],
  minMmr: mmrs,
  maxMmr: mmrs,
  hero: Object.keys(heroData).map(heroId => ({
    text: `[${heroId}] ${heroData[heroId].localized_name}`,
    searchText: heroData[heroId].localized_name,
    value: heroData[heroId].id,
    key: String(heroData[heroId].id),
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
  gameMode,
  lobbyType,
  order: [{ text: strings.explorer_asc, value: 'ASC', key: 'asc' }, { text: strings.explorer_desc, value: 'DESC', key: 'desc' }],
  having,
  limit,
});

export default fields;
