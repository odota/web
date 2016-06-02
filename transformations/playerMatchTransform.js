import transformation from './transformations';

const playerMatchTransformSwitch = (match, field, heroes) => {
  switch (field) {
    case 'hero_id':
      return transformation.heroId(match[field], heroes);
    case 'radiant_win':
      return transformation.radiantWin(match[field], match.player_slot);
    case 'game_mode':
      return transformation.gameMode(match[field]);
    case 'start_time':
      return transformation.startTime(match[field]);
    case 'duration':
      return transformation.duration(match[field]);
    default:
      return match[field];
  }
};

const playerMatchTransform = (match) => (heroes) => {
  const transformedMatch = {};
  Object.keys(match).forEach((field) => {
    transformedMatch[`${field}Display`] = playerMatchTransformSwitch(match, field, heroes);
  });
  return transformedMatch;
};

export default playerMatchTransform;
