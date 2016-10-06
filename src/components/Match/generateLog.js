import {
  objectives,
  barracks_value as barracksValue,
} from 'dotaconstants';

const getObjectiveDesc = objective => (objective.key ? barracksValue[objective.key] : '');
const getObjectiveBase = objective => objectives[objective.subtype || objective.type] || objective.subtype || objective.type;
export default (match) => {
  let log = [];
  log = log.concat(match.objectives || [])
    .map(objective => ({
      ...objective,
      ...match.players[objective.slot],
      type: 'objective',
      detail: `${getObjectiveDesc(objective)} ${getObjectiveBase(objective)}`,
    }));
  match.players.forEach((player) => {
    log = log.concat((player.kills_log || []).map(entry => ({
      ...entry,
      ...player,
      type: 'kill',
      detail: `${entry.key}`,
    })));
    log = log.concat((player.obs_log || []).map(entry => ({
      ...entry,
      ...player,
      type: 'obs_ward',
      detail: `${entry.key}`,
    })));
  });
  log = log.sort((a, b) => a.time - b.time);
  return log;
};
