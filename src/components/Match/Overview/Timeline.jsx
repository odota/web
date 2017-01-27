import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
  formatSeconds,
  isRadiant,
  jsonFn,
  getTeamName,
} from 'utility';
import {
  IconBloodDrop,
  IconRoshan,
  IconBattle,
} from 'components/Icons';
import strings from 'lang';
import ReactTooltip from 'react-tooltip';

import heroes from 'dotaconstants/build/heroes.json';
import PlayerThumb from 'components/Match/PlayerThumb';

import styles from './Timeline.css';

const heroesArr = jsonFn(heroes);

const getWinnerStyle = obj =>
  (obj && obj.radiant_gold_advantage_delta >= 0 ? styles.radiantWinner : styles.direWinner);

const Timeline = ({
  match,
  onTeamfightClick,
  onTeamfightHover,
  selectedTeamfight,
}) => {
  const preHorn = 90; // Seconds before the battle horn

  if (match.objectives && match.objectives.length > 0) {
    // Firstblood
    const fbIndex = match.objectives.findIndex(obj => obj.type === 'CHAT_MESSAGE_FIRSTBLOOD');
    let fbArr = [{ type: 'firstblood', time: match.first_blood_time || 0 }];

    if (fbIndex > -1) {
      const fbKey = match.players.map(player =>
        player.kills_log &&
          player.kills_log.length > 0 &&
          player.kills_log.filter(kill => kill.time === match.objectives[fbIndex].time),
      ).filter(String).filter(Boolean);

      fbArr = [{
        type: 'firstblood',
        time: match.objectives[fbIndex].time,
        player_slot: match.objectives[fbIndex].player_slot,
        key: fbKey && fbKey.length > 0 && fbKey[0][0].key,
      }];
    }

    const events = fbArr

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
        radiant_gold_advantage_delta: fight.radiant_gold_advantage_delta,
        deaths: fight.players
          .map((player, i) => (player.deaths > 0 ? {
            key: i,
            gold_delta: player.gold_delta,
          } : ''))
          .filter(String),
      })) : [],
    );

    // Aegis pickups
    const aegis = (match.objectives || [])
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
        }));

    let fTower = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_TOWER_KILL' || o.type === 'CHAT_MESSAGE_TOWER_DENY');
    fTower = match.objectives[fTower] ? match.objectives[fTower].time : null;

    let fRax = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_BARRACKS_KILL');
    fRax = match.objectives[fRax] || null;

    return (
      Math.abs(events.filter(obj => obj.type === 'firstblood')[0].time - match.first_blood_time) <= preHorn &&
      // some old (source1) matches have wrong time in objectives, ex: 271008789.
      // preHorn (90) is just small allowable mismatch. Since first_blood_time always >= 0, ex: 2792706825, fb before battle horn
      <div>
        <main className={styles.timeline}>
          <section>
            <mark>{getTeamName(match.radiant_team, true)}</mark>
            <time>-1:30</time>
            <mark>{getTeamName(match.dire_team, false)}</mark>
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
                events.map((obj, i) => {
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
                        //   obj.radiant_gold_advantage_delta >= 0 ? styles.green : styles.red
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
                          onClick={onTeamfightClick && onTeamfightClick(obj.start)}
                          onMouseEnter={onTeamfightHover && onTeamfightHover(obj.start)}
                          onMouseLeave={onTeamfightHover && onTeamfightHover(null)}
                          data-tip
                          data-for={`event_${i}`}
                          className={classNames(
                            styles.iconBattle,
                            (selectedTeamfight === obj.start) ? styles.selectedTeamfight : getWinnerStyle(obj),
                            (selectedTeamfight || selectedTeamfight === 0) && styles.clickable,
                          )}
                        />
                      }
                      <ReactTooltip
                        // Hide tooltip if it's not in objectives
                        id={obj.type === 'firstblood' && !obj.key && !obj.player_slot ? '' : `event_${i}`}
                        effect="solid"
                        place="right"
                      >
                        {obj.type === 'firstblood' &&
                          <section>
                            {match.players
                              .filter(player => player.player_slot === obj.player_slot)
                              .map((player, index) => <PlayerThumb key={index} {...player} />)
                            }
                            <span>
                              {obj.key ? strings.timeline_firstblood_key : strings.timeline_firstblood}
                            </span>
                            {obj.key &&
                              <PlayerThumb
                                {...match.players.find((player) => {
                                  const foundHero = heroesArr('find')(hero => hero.name === obj.key);
                                  return foundHero && player.hero_id === foundHero.id;
                                })}
                              />
                            }
                          </section>
                        }
                        {obj.type === 'roshan' && aegis[obj.key] &&
                          match.players
                            .filter(player => player.player_slot === aegis[obj.key].player_slot)
                            .map(player => (
                              <section key={i}>
                                <PlayerThumb {...player} />
                                <span>
                                  {!aegis[obj.key].act && strings.timeline_aegis_picked_up}
                                  {aegis[obj.key].act === 'stolen' && strings.timeline_aegis_snatched}
                                  {aegis[obj.key].act === 'denied' && strings.timeline_aegis_denied}
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
                                <PlayerThumb {...match.players[death.key]} />
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
              <span>{strings.match_first_barracks} ({strings[`barracks_value_${fRax.key}`]}) </span>
              {formatSeconds(fRax.time)}
            </div>
          }
        </div>
      </div>
    );
  }

  return null;
};

Timeline.PropTypes = {
  match: PropTypes.object,
};

export default Timeline;
