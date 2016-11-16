import React from 'react';
import {
  formatSeconds,
  isRadiant,
  getShortHeroName,
} from 'utility';
import {
  IconBloodDrop,
  IconRoshan,
  IconBattle,
} from 'components/Icons';
import strings from 'lang';
import ReactTooltip from 'react-tooltip';

import playerColors from 'dotaconstants/json/player_colors.json';
import heroes from 'dotaconstants/json/heroes.json';
import barracksValue from 'dotaconstants/json/barracks_value.json';

import styles from './Timeline.css';

export default ({ match }) => {
  const preHorn = 90; // Seconds before the battle horn

  const obj = [];
  const aegis = [];

  if (match.objectives && match.objectives.length > 0) {
    // Firstblood
    const fbIndex = match.objectives.findIndex(obj => obj.type === 'CHAT_MESSAGE_FIRSTBLOOD');
    const fbKey = match.players.map(player =>
      player.kills_log &&
        player.kills_log.length > 0 &&
        player.kills_log.filter(kill => kill.time === match.objectives[fbIndex].time),
    ).filter(String).filter(Boolean);

    obj.push([{
      type: 'firstblood',
      time: match.objectives[fbIndex].time,
      player_slot: match.objectives[fbIndex].player_slot,
      key: fbKey && fbKey.length > 0 && fbKey[0][0].key,
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
    .concat(match.teamfights && match.teamfights.length > 0 ?
      match.teamfights.map(fight => ({
        type: 'teamfight',
        start: fight.start,
        end: fight.end,
        time: (fight.start + fight.end) / 2,
        radiant_gold_delta: fight.radiant_gold_delta,
        deaths: fight.players
          .map((player, i) => (player.deaths > 0 ? {
            key: i,
            gold_delta: player.gold_delta,
          } : ''))
          .filter(String),
      })) : [],
    ));

    // Aegis pickups
    aegis.push(
      match.objectives
        .filter(obj => (
          obj.type === 'CHAT_MESSAGE_AEGIS' ||
            obj.type === 'CHAT_MESSAGE_AEGIS_STOLEN' ||
            obj.type === 'CHAT_MESSAGE_DENIED_AEGIS'
        ))
        .map(obj => ({
          type: 'aegis',
          act: (
            (obj.type === 'CHAT_MESSAGE_AEGIS_STOLEN' && 'stolen') ||
              (obj.type === 'CHAT_MESSAGE_DENIED_AEGIS' && 'denied')
          ),
          time: obj.time,
          player_slot: obj.player_slot,
        })) || [],
    );

    let fTower = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_TOWER_KILL' || o.type === 'CHAT_MESSAGE_TOWER_DENY');
    fTower = match.objectives[fTower] ? match.objectives[fTower].time : null;

    let fRax = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_BARRACKS_KILL');
    fRax = match.objectives[fRax] || null;

    return (
      Math.abs(obj[0].filter(obj => obj.type === 'firstblood')[0].time - match.first_blood_time) <= 10 &&
      // some old (source1) matches have wrong time in objectives, ex: 271008789. So 10 is just small allowable mismatch
      <div>
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
                        <IconBattle
                          data-tip
                          data-for={`event_${i}`}
                          style={{ fill: obj.radiant_gold_delta >= 0 ? styles.green : styles.red }}
                        />
                      }
                      <ReactTooltip
                        id={`event_${i}`}
                        effect="solid"
                        place="right"
                      >
                        {obj.type === 'firstblood' &&
                          <section>
                            {match.players
                              .filter(player => player.player_slot === obj.player_slot)
                              .map(player => (
                                <aside style={{ color: playerColors[obj.player_slot] }}>
                                  <img
                                    src={`${API_HOST}/apps/dota2/images/heroes/${getShortHeroName(heroes[player.hero_id].name)}_icon.png`}
                                    role="presentation"
                                  />
                                  {player.name || player.personaname || strings.general_anonymous}
                                </aside>
                              ))
                            }
                            <span>
                              {obj.key ? strings.timeline_firstblood_key : strings.timeline_firstblood}
                            </span>
                            {obj.key &&
                              <aside>
                                <img
                                  src={`${API_HOST}/apps/dota2/images/heroes/${getShortHeroName(obj.key)}_icon.png`}
                                  role="presentation"
                                />
                                {match.players
                                  .filter(player =>
                                    player.hero_id === heroes[Object.keys(heroes).filter(key => heroes[key].name === obj.key)].id,
                                  ).map(player => (
                                    <div style={{ color: playerColors[player.player_slot] }}>
                                      {player.name || player.personaname || strings.general_anonymous}
                                    </div>
                                  ))
                                }
                              </aside>
                            }
                          </section>
                        }
                        {obj.type === 'roshan' &&
                          match.players
                            .filter(player => player.player_slot === aegis[0][obj.key].player_slot)
                            .map(player => (
                              <section key={i}>
                                <aside style={{ color: playerColors[player.player_slot] }}>
                                  <img
                                    src={`${API_HOST}/apps/dota2/images/heroes/${getShortHeroName(heroes[player.hero_id].name)}_icon.png`}
                                    role="presentation"
                                  />
                                  {player.name || player.personaname || strings.general_anonymous}
                                </aside>
                                <span>
                                  {!aegis[0][obj.key].act && strings.timeline_aegis_picked_up}
                                  {aegis[0][obj.key].act === 'stolen' && strings.timeline_aegis_snatched}
                                  {aegis[0][obj.key].act === 'denied' && strings.timeline_aegis_denied}
                                </span>
                                <img
                                  src="/assets/images/dota2/aegis_icon.png"
                                  role="presentation"
                                />
                              </section>
                            ))
                        }
                        {obj.type === 'teamfight' &&
                          <div>
                            <header>
                              {strings.timeline_teamfight_deaths}
                              <span className={styles.subtitle}>
                                & {strings.timeline_teamfight_gold_delta}, {formatSeconds(obj.start)} - {formatSeconds(obj.end)}
                              </span>
                            </header>
                            {obj.deaths.map(death => (
                              <section key={death.key}>
                                <aside style={{ color: playerColors[match.players[death.key].player_slot] }}>
                                  <img
                                    src={`
                                      ${API_HOST}/apps/dota2/images/heroes/${getShortHeroName(heroes[match.players[death.key].hero_id].name)}_icon.png
                                    `}
                                    role="presentation"
                                  />
                                  {match.players[death.key].name || match.players[death.key].personaname || strings.general_anonymous}
                                </aside>
                                <span>
                                  {death.gold_delta > 0 ? <span className={styles.goldGot} /> : <span className={styles.goldLost} />}
                                  {/* nothing if === 0 */}
                                  <font color={styles.golden}>{Math.abs(death.gold_delta)} </font>
                                  <img
                                    role="presentation"
                                    src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`}
                                  />
                                </span>
                              </section>
                            ))}
                          </div>
                        }
                      </ReactTooltip>
                      <time>
                        {obj.type !== 'teamfight' && formatSeconds(obj.time)}
                      </time>
                    </mark>
                  );
                })
              }
            </div>
          </div>
          <time>{formatSeconds(match.duration)}</time>
        </main>
        <div className={styles.matchNumbers}>
          {fTower &&
            <div>
              <span>{strings.match_first_tower} </span>
              {formatSeconds(fTower)}
            </div>
          }
          {fRax &&
            <div>
              <span>{strings.match_first_barracks} ({barracksValue[fRax.key]}) </span>
              {formatSeconds(fRax.time)}
            </div>
          }
        </div>
      </div>
    );
  }

  return null;
};
