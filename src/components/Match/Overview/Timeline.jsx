import React from 'react';
import {
  formatSeconds,
  isRadiant,
} from 'utility';
import { IconGithub } from 'components/Icons';

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
        time: (fight.start + fight.end) / 2,
      })) || [],
    ));
  }

  return (
    <main className={styles.timeline}>
      <time>-1:30</time>
      <div className={styles.battle}>
        <div className={styles.line}>
          <section style={{ width: '100%' }} />
        </div>
        <div className={styles.events}>
          {
            obj[0].map((obj) => {
              const side = (
                obj.player_slot && isRadiant(obj.player_slot))
                  || (obj.team && obj.team === 2
              ) ? 'radiant' : 'dire';

              return (obj.type !== 'aegis' &&
                <mark
                  className={obj.type === 'teamfight' ? styles.teamfight : styles[side]}
                  style={{
                    left: obj.time !== undefined && `${
                      (100 * (obj.time > 0 ? obj.time : (obj.time + 90))) / (match.duration + 90)
                    }%`, // 90 - pre-creep
                  }}
                  title={formatSeconds(obj.time)}
                >
                  <IconGithub />
                </mark>
              );
            })
          }
        </div>
      </div>
      <time>{formatSeconds(match.duration)}</time>
    </main>
  );
};
