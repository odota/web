import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import heroes from 'dotaconstants/build/heroes.json';
import styled from 'styled-components';
import {
  formatSeconds,
  isRadiant,
  jsonFn,
  getTeamName,
} from '../../../utility';
import {
  IconBloodDrop,
  IconRoshan,
  IconBattle,
} from '../../Icons';
import PlayerThumb from '../PlayerThumb';
import constants from '../../constants';
import config from '../../../config';

const Styled = styled.div`
.clickable {
  &[data-tip="true"] {
    cursor: pointer;
  }
}

.iconBattle {
  transition: ${constants.linearTransition};
}

.radiantWinner {
  fill: ${constants.colorSuccess} !important;
}

.direWinner {
  fill: ${constants.colorDanger} !important;
}

.timeline {
  width: 100%;
  margin: 30px 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & time {
    margin: 0 5px;

    @media only screen and (max-width: 768px) {
      font-size: ${constants.fontSizeMedium};
    }
  }

  & > section {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > mark {
      background: none;
      color: ${constants.colorMuted};
      font-size: ${constants.fontSizeSmall};
    }
  }
}

.battle {
  width: 100%;
  margin: 0 5px;

  @media only screen and (max-width: 768px) {
    margin: 0;
  }
}

.line {
  width: 100%;
  display: flex;
  height: 4px;

  & div,
  & section {
    height: inherit;
  }

  & section {
    background-color: ${constants.colorMuted};
  }
}

.events {
  position: relative;
  width: 100%;

  & header {
    margin-bottom: 3px;
    font-weight: ${constants.fontWeightNormal};
  }

  & .subtitle {
    margin-left: 4px;
    font-size: ${constants.fontSizeSmall};
    font-weight: ${constants.fontWeightLight};
    color: ${constants.colorMutedLight};
  }

  & mark {
    position: absolute;
    background: none;
    width: 0;
    height: 0;

    & time {
      color: ${constants.colorMutedLight};
      font-size: ${constants.fontSizeSmall};
      text-align: center;
      position: absolute;
      width: 32px;
      left: -16px;
      margin: 0;
    }

    & svg {
      fill: ${constants.colorMutedLight};
      width: 18px;
      position: absolute;
      left: -9px;

      @media only screen and (max-width: 768px) {
        width: 16px;
        left: -8px;
      }
    }

    & div[data-id="tooltip"] {
      /* Override react-tooltip */
      margin-top: 0 !important;
      padding: 2px 6px !important;
      margin-left: 5px !important;
      font-weight: ${constants.fontWeightLight} !important;
      white-space: nowrap;

      & img {
        height: 24px;
        margin-right: 4px;
      }

      & span {
        margin: 0 4px;

        & img {
          height: 8px;
        }
      }

      & section {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      & span.goldDelta {
        margin-left: auto;
      }

      & .goldChange {
        display: inline;
      }
    }
  }

  & .radiant,
  & .dire {
    border-style: solid;
    margin-left: -6px;
  }

  & .radiant {
    border-width: 0 6px 5px;
    border-color: transparent transparent ${constants.colorSuccess} transparent;
    bottom: 4px;

    & time {
      top: 11px;
    }

    & svg {
      bottom: 5px;
    }
  }

  & .dire {
    top: 0;
    border-width: 5px 6px 0 6px;
    border-color: ${constants.colorDanger} transparent transparent transparent;

    & time {
      top: -28px;
    }

    & svg {
      top: 5px;
    }
  }

  & .teamfight {
    bottom: 0;
    height: 4px;

    & svg {
      width: 12px;
      top: -5px;
      left: calc(50% - 5px);
      filter: drop-shadow(1px 0 3px ${constants.darkPrimaryColor});

      @media only screen and (max-width: 768px) {
        width: 10px;
        top: -3px;
        left: calc(50% - 3px);
      }
    }
  }

  & .battleHorn {
    width: 2px;
    height: 4px;
    bottom: 0;
    background-color: ${constants.textColorPrimary};
  }
}

.goldChange {
  &::after {
    content: '';
    border-style: solid;
    display: inline-block;
  }
}

.goldGot {
  &::after {
    border-width: 0 4px 7px 4px;
    border-color: transparent transparent ${constants.colorSuccess} transparent;
  }
}

.goldLost {
  &::after {
    border-width: 7px 4px 0 4px;
    border-color: ${constants.colorDanger} transparent transparent transparent;
  }
}

.matchNumbers {
  text-align: center;
  margin: 0 5px;

  & > div {
    display: inline;

    & span {
      font-size: ${constants.fontSizeSmall};
      color: ${constants.colorMutedLight};
      white-space: pre-line;

      &:first-child {
        margin-left: 20px;
      }
    }

    @media only screen and (max-width: 768px) {
      font-size: ${constants.fontSizeMedium};
    }

    @media only screen and (max-width: 560px) {
      display: block;
      line-height: 2;

      & span {
        margin-left: 0;
      }
    }
  }
}

.selectedTeamfight {
  fill: ${constants.colorGolden} !important;
  transform: scale(1.66, 1.66);
}
`;

const heroesArr = jsonFn(heroes);

const getWinnerStyle = obj =>
  (obj && obj.radiant_gold_advantage_delta >= 0 ? 'radiantWinner' : 'direWinner');

const Timeline = ({
  match,
  onTeamfightClick,
  onTeamfightHover,
  selectedTeamfight,
  strings,
}) => {
  const preHorn = 90; // Seconds before the battle horn

  if (match.objectives && match.objectives.length > 0) {
    // Firstblood
    const fbIndex = match.objectives.findIndex(obj => obj.type === 'CHAT_MESSAGE_FIRSTBLOOD');
    let fbArr = [{ type: 'firstblood', time: match.first_blood_time || 0 }];

    if (fbIndex > -1 && match.objectives[fbIndex].player_slot !== undefined) {
      const killer = match.players.find(player =>
        player.player_slot === match.objectives[fbIndex].player_slot) || {};
      const killerLog = killer.kills_log;

      fbArr = [{
        type: 'firstblood',
        time: match.objectives[fbIndex].time,
        player_slot: match.objectives[fbIndex].player_slot,
        key: killerLog && killerLog[0] ? killerLog[0].key : null,
      }];
    }

    const events = fbArr

    // Roshan kills, team 2 = radiant, 3 = dire
      .concat(match.objectives
        .filter(obj => obj.type === 'CHAT_MESSAGE_ROSHAN_KILL')
        .map((obj, i) => ({
          type: 'roshan',
          time: obj.time,
          team: obj.team,
          key: i,
        })) || [])

      // Teamfights
      .concat(match.teamfights && match.teamfights.length > 0 ?
        match.teamfights.map(fight => ({
          type: 'teamfight',
          start: fight.start,
          end: fight.end,
          time: (fight.start + fight.end) / 2,
          radiant_gold_advantage_delta: fight.radiant_gold_advantage_delta,
          deaths: fight.players
            .map((player, i) => ({
              key: i,
              gold_delta: player.gold_delta,
              deaths: player.deaths,
            }))
            .filter(String),
        })) : []);

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
      <Styled>
        <main className="timeline">
          <section>
            <mark>{getTeamName(match.radiant_team, true)}</mark>
            <time>-1:30</time>
            <mark>{getTeamName(match.dire_team, false)}</mark>
          </section>
          <div className="battle">
            <div className="line">
              <section style={{ width: '100%' }} />
            </div>
            <div className="events">
              <mark
                className="battleHorn"
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
                      key={`${obj.type}_${obj.time}`}
                      className={obj.type === 'teamfight' ? 'teamfight' : side}
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
                          className={`iconBattle
                            ${(selectedTeamfight === obj.start) ? 'selectedTeamfight' : getWinnerStyle(obj)}
                            ${(selectedTeamfight || selectedTeamfight === 0) && 'clickable'}
                          `}
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
                              .map(player => <PlayerThumb key={player.player_slot} {...player} />)
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
                              <section key={player.player_slot}>
                                <PlayerThumb {...player} />
                                <span>
                                  {!aegis[obj.key].act && strings.timeline_aegis_picked_up}
                                  {aegis[obj.key].act === 'stolen' && strings.timeline_aegis_snatched}
                                  {aegis[obj.key].act === 'denied' && strings.timeline_aegis_denied}
                                </span>
                                <img
                                  src="/assets/images/dota2/aegis_icon.png"
                                  alt="Aegis of Immortality"
                                />
                              </section>
                            ))
                        }
                        {obj.type === 'teamfight' &&
                          <div>
                            <header>
                              {strings.timeline_teamfight_deaths}
                              <span className="subtitle">
                                & {strings.timeline_teamfight_gold_delta}, {formatSeconds(obj.start)} - {formatSeconds(obj.end)}
                              </span>
                            </header>
                            {obj.deaths.map(death => (
                              <section key={death.key}>
                                <PlayerThumb {...match.players[death.key]} />
                                {death.deaths > 0 ? <img src="/assets/images/player_death.png" alt="Death icon" /> : ''}
                                <span className="goldDelta">
                                  {death.gold_delta > 0 ? <span className="goldChange goldGot" /> : <span className="goldChange goldLost" />}
                                  {/* nothing if === 0 */}
                                  <font style={{ color: constants.colorGolden }}>{Math.abs(death.gold_delta)} </font>
                                  <img
                                    alt="Gold"
                                    src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`}
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
        <div className="matchNumbers">
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
      </Styled>
    );
  }

  return null;
};

Timeline.propTypes = {
  match: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Timeline);
