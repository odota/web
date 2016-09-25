import constants from 'dotaconstants';

export const heroConfig = {
  text: 'localized_name',
  value: 'id',
};
export const genericConfig = {
  text: 'text',
  value: 'id',
};

// This has to be a list in order to pass it in.
// We should consider refactoring all these kinds of objects into lists. I understand
// they are probably built like this to allow map key access but it would be nice if I didn't
// have to convert them all into arrays.
export const heroList = Object.keys(constants.heroes).map(id => ({
  ...constants.heroes[id],
}));
export const laneList = Object.keys(constants.lane_ids).map(id => ({
  text: constants.lane_ids[id],
  id: Number(id),
}));
export const patchList = constants.patch.map((patch, index) => ({
  text: patch.name,
  id: index,
}));
export const modeList = Object.keys(constants.game_mode).map(id => ({
  text: constants.game_mode[id].name,
  id,
}));
export const lobbyTypeList = Object.keys(constants.lobby_type).map(id => ({
  text: constants.lobby_type[id].name,
  id,
}));
export const regionList = Object.keys(constants.region).map(id => ({
  text: constants.region[id],
  id: Number(id),
}));

export const factionList = [{
  text: 'dire',
  id: 0,
}, {
  text: 'radiant',
  id: 1,
}];
export const resultList = [{
  text: 'loss',
  id: 0,
}, {
  text: 'win',
  id: 1,
}];
export const dateList = [{
  text: 'last week',
  id: 7,
}, {
  text: 'last month',
  id: 30,
}, {
  text: 'last 3 months',
  id: 90,
}, {
  text: 'last 6 months',
  id: 180,
}];
