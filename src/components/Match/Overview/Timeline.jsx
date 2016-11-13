import React from 'react';
import { formatSeconds } from 'utility';

import styles from './Timeline.css';

export default ({ match }) => {
  const obj = [];

  if (match.objectives) {
    // Firstblood
    const fbIndex = match.objectives.findIndex(obj => obj.type === 'CHAT_MESSAGE_FIRSTBLOOD');
    obj.push([{
      type: 'firstblood',
      time: match.objectives[fbIndex].time,
      player_slot: match.objectives[fbIndex].player_slot,
      key: match.players.map(player =>
        player.kills_log.filter(kill =>
          kill.time === match.objectives[fbIndex].time,
        )).filter(String)[0][0].key,
    }]

    // Roshan kills, team 2 = radiant, 3 = dire
    .concat(
      match.objectives
        .filter(obj => obj.type === 'CHAT_MESSAGE_ROSHAN_KILL')
        .map(obj => ({
          type: 'roshan',
          time: obj.time,
          team: obj.team,
        })) || [],
    )

    // Aegis pickups
    .concat(
      match.objectives
        .filter(obj => obj.type === 'CHAT_MESSAGE_AEGIS')
        .map(obj => ({
          type: 'aegis',
          time: obj.time,
          player_slot: obj.player_slot,
        })) || [],
    )

    // Teamfights
    .concat(
      match.teamfights.map(fight => ({
        type: 'teamfight',
        start: fight.start,
        end: fight.end,
      })),
    ));
  }

  const wPreCreep = (90 * 100) / (match.duration + 90); // 90 - pre-creep time

  return (
    <main className={styles.timeline}>
      <time>-1:30</time>
      <div className={styles.battle}>
        <div className={styles.line}>
          <section style={{ width: `${wPreCreep}%` }} />
          <div />
          <section style={{ width: '100%' }} />
        </div>
        <div className={styles.events}>
          {
            obj[0].map(obj => (obj.time && obj.type !== 'aegis' &&
              <mark style={{ left: `${(100 * obj.time) / match.duration}%` }}>
                {formatSeconds(obj.time)}
              </mark>
            ))
          }
        </div>
      </div>
      <time>{formatSeconds(match.duration)}</time>
    </main>
  );
};
