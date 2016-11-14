import React from 'react';
import {
  formatSeconds,
  isRadiant,
  playerColors,
} from 'utility';
import {
  IconBloodDrop,
  IconRoshan,
  IconBattle,
} from 'components/Icons';
import strings from 'lang';
import ReactTooltip from 'react-tooltip';
import heroes from 'dotaconstants/json/heroes.json';

import styles from './Timeline.css';

export default ({ match }) => {
  const preHorn = 90; // Seconds before the battle horn

  const obj = [];
  const aegis = [];

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
        .map((obj, i) => ({
          type: 'roshan',
          time: obj.time,
          team: obj.team,
          key: i,
        })) || [],
    )

    // Teamfights
    .concat(
      match.teamfights.map(fight => ({
        type: 'teamfight',
        start: fight.start,
        end: fight.end,
        time: (fight.start + fight.end) / 2,
        radiant_gold_delta: fight.radiant_gold_delta,
      })) || [],
    ));

    // Aegis pickups
    aegis.push(
      match.objectives
        .filter(obj => obj.type === 'CHAT_MESSAGE_AEGIS')
        .map(obj => ({
          type: 'aegis',
          time: obj.time,
          player_slot: obj.player_slot,
        })) || [],
    );
  }

  return (
    <main className={styles.timeline}>
      <section>
        <mark>{strings.general_radiant}</mark>
        <time>-1:30</time>
        <mark>{strings.general_dire}</mark>
      </section>
      <div className={styles.battle}>
        <div className={styles.line}>
          <section style={{ width: '100%' }} />
        </div>
        <div className={styles.events}>
          <mark
            className={styles.battleHorn}
            style={{
              left: `${(preHorn * 100) / (match.duration + preHorn)}%`,
            }}
          />
          {
            obj[0].map((obj, i) => {
              const side = (
                obj.player_slot && isRadiant(obj.player_slot))
                  || (obj.team && obj.team === 2
              ) ? 'radiant' : 'dire';

              const wTeamfight = obj.type === 'teamfight' && (100 * (obj.end - obj.start)) / (match.duration + preHorn);

              return (
                <mark
                  key={i}
                  className={obj.type === 'teamfight' ? styles.teamfight : styles[side]}
                  style={{
                    left: obj.time && `${
                      ((100 * (obj.time + preHorn)) / (match.duration + preHorn)) - (wTeamfight / 2)
                    }%`,
                    width: `${wTeamfight}%`,
                    // backgroundColor: obj.type === 'teamfight' && (
                    //   obj.radiant_gold_delta >= 0 ? styles.green : styles.red
                    // ),
                  }}
                >
                  {obj.type === 'firstblood' &&
                    <IconBloodDrop
                      data-tip
                      data-for={`event_${i}`}
                    />
                  }
                  {obj.type === 'roshan' &&
                    <IconRoshan
                      data-tip
                      data-for={`event_${i}`}
                    />
                  }
                  {obj.type === 'teamfight' &&
                    <IconBattle style={{ fill: obj.radiant_gold_delta >= 0 ? styles.green : styles.red }} />
                  }
                  <ReactTooltip id={`event_${i}`} effect="solid" place="right">
                    {obj.type === 'firstblood' &&
                      <div>
                        {match.players
                          .filter(player => player.player_slot === obj.player_slot)
                          .map(player => (
                            <aside style={{ color: playerColors[obj.player_slot] }}>
                              <img
                                src={`${API_HOST}/apps/dota2/images/heroes/${heroes[player.hero_id].name.split('npc_dota_hero_')[1]}_icon.png`}
                                role="presentation"
                              />
                              {player.name || player.personaname || strings.general_anonymous}
                            </aside>
                          ))
                        }
                        <span>
                          drew first blood by killing
                        </span>
                        <img
                          src={`${API_HOST}/apps/dota2/images/heroes/${obj.key.split('npc_dota_hero_')[1]}_icon.png`}
                          role="presentation"
                        />
                        {match.players
                          .filter(player =>
                            player.hero_id === heroes[Object.keys(heroes).filter(key => heroes[key].name === obj.key)].id,
                          ).map(player => (
                            <aside style={{ color: playerColors[player.player_slot] }}>
                              {player.name || player.personaname || strings.general_anonymous}
                            </aside>
                          ))
                        }
                      </div>
                    }
                    {obj.type === 'roshan' &&
                      match.players
                        .filter(player => player.player_slot === aegis[0][obj.key].player_slot)
                        .map(player => (
                          <div>
                            <aside style={{ color: playerColors[player.player_slot] }}>
                              <img
                                src={`${API_HOST}/apps/dota2/images/heroes/${heroes[player.hero_id].name.split('npc_dota_hero_')[1]}_icon.png`}
                                role="presentation"
                              />
                              {player.name || player.personaname || strings.general_anonymous}
                            </aside>
                            <span>picked up</span>
                            <img
                              src={`${API_HOST}/apps/dota2/images/items/aegis_lg.png`}
                              role="presentation"
                            />
                          </div>
                        ))
                    }
                  </ReactTooltip>
                  <time>
                    {obj.type === 'teamfight' ? '' : formatSeconds(obj.time)}
                  </time>
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
