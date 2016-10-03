import {
  objectives,
  barracks_value as barracksValue,
} from 'dotaconstants';

export default (match) => {
  let log = [];
  log = log.concat(match.objectives || [])
    .map(c => ({
      ...c,
      ...match.players[c.slot],
      type: 'objective',
      objective: `${c.key ? barracksValue[c.key] : ''} ${objectives[c.subtype || c.type] || c.subtype || c.type}`,
    }));
  match.players.forEach(p => {
    log = log.concat(p.kills_log.map(l => ({
      ...l,
      ...p,
      type: 'kill',
      objective: `${l.key}`,
    })));
  });
  log = log.sort((a, b) => a.time - b.time);
  return log;
};
