import transformation from './transformations';

const playerMatchTransform = (match, field, constants) => {
  switch (field) {
    case 'hero_id':
      return transformation.heroId(match[field], constants);
    case 'radiant_win':
      return transformation.radiantWin(match[field], match.player_slot);
    case 'game_mode':
      return transformation.gameMode(match[field], constants);
    case 'start_time':
      return transformation.startTime(match[field]);
    case 'duration':
      return transformation.duration(match[field]);
    default:
      return match[field];
  }
};

export default playerMatchTransform;
