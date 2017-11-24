import heroes from 'dotaconstants/build/heroes.json';
import patch from 'dotaconstants/build/patch.json';
import region from 'dotaconstants/build/region.json';
import strings from 'lang';

// This has to be a list in order to pass it in.
// We should consider refactoring all these kinds of objects into lists. I understand
// they are probably built like this to allow map key access but it would be nice if I didn't
// have to convert them all into arrays.
export const heroList = Object.keys(heroes).map(id => ({
  text: heroes[id] && heroes[id].localized_name,
  value: id,
})).sort((a, b) => a.text.localeCompare(b.text));
export const laneList = Object.keys(strings)
  .filter(str => str.indexOf('lane_role_') === 0)
  .map(str => str.substring('lane_role_'.length))
  .map(id => ({
    text: strings[`lane_role_${id}`],
    value: Number(id),
  }));
export const patchList = patch.map((_patch, index) => ({
  text: _patch.name,
  value: index,
})).reverse();
export const modeList = Object.keys(strings)
  .filter(str => str.indexOf('game_mode_') === 0)
  .map(str => str.substring('game_mode_'.length))
  .map(id => ({
    text: strings[`game_mode_${id}`],
    value: id,
  }));
export const lobbyTypeList = Object.keys(strings)
  .filter(str => str.indexOf('lobby_type_') === 0)
  .map(str => str.substring('lobby_type_'.length))
  .map(id => ({
    text: strings[`lobby_type_${id}`],
    value: id,
  }));
export const regionList = Object.keys(region).map(id => ({
  text: strings[`region_${id}`],
  value: Number(id),
}));

export const factionList = [{
  text: strings.general_radiant,
  value: 1,
}, {
  text: strings.general_dire,
  value: 0,
}];
export const resultList = [{
  text: strings.td_win,
  value: 1,
}, {
  text: strings.td_loss,
  value: 0,
}];
export const dateList = [{
  text: strings.filter_last_week,
  value: 7,
}, {
  text: strings.filter_last_month,
  value: 30,
}, {
  text: strings.filter_last_3_months,
  value: 90,
}, {
  text: strings.filter_last_6_months,
  value: 180,
}];
export const significantList = [{
  text: strings.filter_significant_include,
  value: 0,
}];
export const gamesPlayedList = [{
  text: '5',
  value: 5,
}, {
  text: '10',
  value: 10,
}, {
  text: '15',
  value: 15,
}, {
  text: '20',
  value: 20,
}, {
  text: '25',
  value: 25,
}];
