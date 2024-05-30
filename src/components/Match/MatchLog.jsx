import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Tooltip } from '@material-ui/core';
import heroes from 'dotaconstants/build/heroes.json';
import {
  formatSeconds,
  getHeroesById,
  formatTemplateToString,
} from '../../utility';
import FormField from '../Form/FormField';
import { StyledLogFilterForm } from './StyledMatch';
import HeroImage from '../Visualizations/HeroImage';
import sword from '../Icons/Sword.svg';
import { IconBloodDrop, IconRoshan } from '../Icons';
import lightning from '../Icons/Lightning.svg';

const StyledLogContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  align-items: center;
  margin-top: 20px;
  letter-spacing: 0.044em;

  & .timeDivider {
    display: flex;
    max-width: 800px;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 24px;
    color: rgba(255, 255, 255, 0.8);

    & div {
      height: 1px;
      width: 100%;
      background rgba(255, 255, 255, 0.08);
      flex-shrink: 0;

      &:nth-of-type(1) {
        background: linear-gradient(to left,rgba(255,255,255,0.08), transparent);
      }
      &:nth-of-type(2) {
        background: linear-gradient(to right,rgba(255,255,255,0.08), transparent);
      }
    }

    & span {
      font-size: 14px;
      margin-left: 16px;
      margin-right: 16px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .entry:hover {
    & .time {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .entry {
    display: flex;
    max-width: 800px;
    width: 100%
    margin-top: 8px;
    margin-bottom: 8px;

    & .smallMutedText {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }

    & .smallBoldText {
      font-size: 12px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.8);
    }

    & .time {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.3);
    }

    & .entryMessagesContainer {
      display: flex;
      flex-direction: column;
      border-radius: 4px;

      &.radiant {
        background: linear-gradient(to right, #21812c26, transparent);
      }
      &.dire {
        background: linear-gradient(to left, #9d361f26, transparent);
        padding-right: 7px;
      }
    }

    & .heroImage {
      width: 72px;
      height: 40px;
      border-radius: 4px;
    }

    & .detailIcon {
      height: 16px;
      width: 16px;
      margin-right: 6px;
      margin-left: 6px;
    }

    & .entryMessage {
      display: flex;
      margin-top: 12px;
      margin-bottom: 12px;

      & .icon {
        height: 16px;
        width: 16px;
        margin-left: 6px;
        margin-right: 6px;
      }

      & .dropIcon {
        fill: #ff5555;
      }

      & .roshanIcon {
        fill: #9dddcc;
      }
    }
  }
`;

const  DIVIDER_SECONDS = 30; // insert a divider if two consecutive entries are X seconds apart

const isRadiant = (entry) => {
  if (entry.isRadiant) {
    return true;
  }
  if (entry.alt_key === 'CHAT_MESSAGE_COURIER_LOST') {
    return entry.team !== 2;
  }
  return (
    (entry.unit && entry.unit.indexOf('goodguys') !== -1) || entry.team === 2
  );
};

const heroNames = getHeroesById();
const typeConfig = {
  kills: 0,
  objectives: 1,
  runes: 2,
};
const getObjectiveDesc = (objective, strings) =>
  objective.key && objective.type === 'CHAT_MESSAGE_BARRACKS_KILL'
    ? strings[`barracks_value_${objective.key}`]
    : '';
const getObjectiveBase = (objective, strings) => {
  if (objective.type === 'building_kill') {
    const desc =
      objective.key.indexOf('npc_dota_badguys') === 0
        ? strings.general_dire
        : strings.general_radiant;
    return `${desc} ${(objective.key.split('guys_') || [])[1]}`;
  }
  return (
    strings[objective.subtype || objective.type] ||
    objective.subtype ||
    objective.type
  );
};
const generateLog = (match, { types, players }, strings) => {
  let log = [];
  const matchPlayers = !players.length
    ? match.players
    : match.players.filter((p, i) => players.includes(i));

  if (types.includes(typeConfig.objectives)) {
    log = (match.objectives || []).reduce((objectivesLog, objective) => {
      if (!players.length || players.includes(objective.slot)) {
        /*
        let name;
        if (objective.slot === -1) {
          if (objective.team === 2) {
            name = strings.general_radiant;
          } else if (objective.team === 3) {
            name = strings.general_dire;
          }
        }
        */
        if (objective.type === 'CHAT_MESSAGE_COURIER_LOST') {
          // Adjust for incorrect data from post 7.23 core bug
          // Here the team value is killer id
          if (objective.killer === undefined) {
            const team = objective.team > 4 ? 2 : 3;
            objective.killer = (team === 2 ? 123 : 0) + objective.team;
            objective.team = team;
          }
          const killer = match.players.find(player => player.player_slot === objective.killer)?.hero_id || -1;
          if (killer !== -1) {
            objective.hero_id = killer;
          }
        }
        objectivesLog.push({
          ...objective,
          ...matchPlayers[objective.slot],
          type: 'objectives',
          alt_key: objective.type,
          detail: `${getObjectiveDesc(objective, strings)} ${getObjectiveBase(
            objective,
            strings
          )}`,
        });
      }
      return objectivesLog;
    }, log);
  }

  matchPlayers.forEach((player) => {
    if (types.includes(typeConfig.kills)) {
      log = log.concat(
        (player.kills_log || []).map((entry) => ({
          ...entry,
          ...player,
          type: 'kills',
          detail: `${entry.key}`,
        }))
      );
    }

    if (types.includes(typeConfig.runes)) {
      log = log.concat(
        (player.runes_log || []).map((entry) => ({
          ...entry,
          ...player,
          type: 'runes',
          detail: `${entry.key}`,
        }))
      );
    }
    /*
    log = log.concat((player.obs_log || []).map(entry => ({
      ...entry,
      ...player,
      type: 'obs_ward',
      detail: `${entry.key}`,
    })));
    */
  });
  log = log.sort((a, b) => a.time - b.time);
  return log;
};

class MatchLog extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      players: PropTypes.arrayOf({}),
    }),
    strings: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    this.state = {
      types: Object.values(typeConfig),
      players: [],
    };

    const { strings } = props;
    this.typesSource = [
      { text: strings.heading_kills, value: 0 },
      { text: strings.tab_objectives, value: 1 },
      { text: strings.heading_runes, value: 2 },
    ];
    this.playersSource = this.props.match.players.map((player, index) => ({
      text: heroes[player.hero_id]
        ? heroes[player.hero_id].localized_name
        : strings.general_no_hero,
      value: index,
    }));
  }

  addChip = (name, input, limit) => {
    const currentChips = this.state[name];
    const newChips = [input.value].concat(currentChips).slice(0, limit);
    this.setState({ [name]: newChips });
  };

  deleteChip = (name, index) => {
    const currentChips = this.state[name];
    const newChips = [
      ...currentChips.slice(0, index),
      ...currentChips.slice(index + 1),
    ];
    this.setState({ [name]: newChips });
  };

  render() {
    const { strings } = this.props;
    const runeTooltips = Object.keys(strings)
      .filter((str) => str.indexOf('rune_') === 0)
      .map((runeKey) => {
        const runeString = strings[runeKey];
        return (
          <ReactTooltip id={runeString} key={runeString}>
            <span>{runeString}</span>
          </ReactTooltip>
        );
      });
    const logData = generateLog(this.props.match, this.state, strings);
    const groupedEntries = [];
    let lastEntryTime = Number.MIN_SAFE_INTEGER;

    return (
      <div>
        {runeTooltips}
        <StyledLogFilterForm>
          <div className="title">{strings.filter_button_text_open}</div>
          <FormField
            name="types"
            label={strings.ward_log_type}
            dataSource={this.typesSource}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
            formSelectionState={this.state}
            strict
          />
          <FormField
            name="players"
            label={strings.log_heroes}
            dataSource={this.playersSource}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
            formSelectionState={this.state}
            strict
          />
        </StyledLogFilterForm>
        <StyledLogContainer>
          {logData.map((entry, index) => {
            groupedEntries.push(entry);
            const nextEntry = logData[index + 1];

            if (
              index === logData.length - 1 ||
              nextEntry.player_slot !== entry.player_slot ||  //  group consecutive log entries by the same player together
              nextEntry.time - entry.time > DIVIDER_SECONDS // unless they're more than DIVIDER_SECONDS seconds apart
            ) {
              const renderEntries = [...groupedEntries];
              groupedEntries.length = 0;

              let renderFirst;
              if (entry.hero_id === undefined) {
                renderFirst = (
                  <img
                    src={`/assets/images/${
                      isRadiant(renderEntries[0]) ? 'radiant' : 'dire'
                    }.png`}
                    alt=""
                    className="heroImage"
                  />
                );
              } else {
                renderFirst = (
                  <HeroImage id={entry.hero_id} className="heroImage"/>
                );
              }

              let timeDivider = null;
              if (renderEntries[0].time - lastEntryTime >= DIVIDER_SECONDS) {
                timeDivider = (
                  <div className="timeDivider">
                    <div />
                    <span>{formatSeconds(renderEntries[0].time)}</span>
                    <div />
                  </div>
                );
              }

              let renderSecond = (
                <div
                  className={`entryMessagesContainer ${
                    isRadiant(renderEntries[0]) ? 'radiant' : 'dire'
                  }`}
                >
                  {renderEntries.map((e) => {
                    lastEntryTime = e.time;
                    if (isRadiant(renderEntries[0])) {
                      return (
                        <div className="entryMessage">
                          <EntryMessage entry={e} strings={strings} />
                          <span className="time" style={{ marginLeft: 15 }}>
                            {formatSeconds(e.time)}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div className="entryMessage">
                        <span className="time" style={{ marginRight: 15 }}>
                          {formatSeconds(e.time)}
                        </span>
                        <EntryMessage entry={e} strings={strings} />
                      </div>
                    );
                  })}
                </div>
              );

              if (!isRadiant(renderEntries[0])) {
                const temp = renderFirst;
                renderFirst = renderSecond;
                renderSecond = temp;
              }

              return (
                <>
                  {timeDivider}
                  <div
                    className="entry"
                    style={{
                      justifyContent: isRadiant(renderEntries[0])
                        ? 'flex-start'
                        : 'flex-end',
                    }}
                  >
                    {renderFirst}
                    <div style={{ width: 16 }} />
                    {renderSecond}
                  </div>
                </>
              );
            }
            return null;
          })}
        </StyledLogContainer>
      </div>
    );
  }
}

function EntryMessage({ entry, strings }) {
  const translateBuildings = (isRad, key) => {
    const team = isRad ? strings.general_radiant : strings.general_dire;
    const k = key.split('_').slice(3).join('_');
    const dict = {
      fort: ` ${strings.building_ancient}`,
      healers: ` ${strings.heading_shrine}`,
      tower1_top: ` ${strings.top_tower} ${strings.tier1}`,
      tower2_top: ` ${strings.top_tower} ${strings.tier2}`,
      tower3_top: ` ${strings.top_tower} ${strings.tier3}`,
      towerenderSecond_top: ` ${strings.top_tower} ${strings.tierenderSecond}`,
      tower1_mid: ` ${strings.mid_tower} ${strings.tier1}`,
      tower2_mid: ` ${strings.mid_tower} ${strings.tier2}`,
      tower3_mid: ` ${strings.mid_tower} ${strings.tier3}`,
      towerenderSecond_mid: ` ${strings.mid_tower} ${strings.tierenderSecond}`,
      tower1_bot: ` ${strings.bot_tower} ${strings.tier1}`,
      tower2_bot: ` ${strings.bot_tower} ${strings.tier2}`,
      tower3_bot: ` ${strings.bot_tower} ${strings.tier3}`,
      towerenderSecond_bot: ` ${strings.bot_tower} ${strings.tierenderSecond}`,
      tower4: ` ${strings.heading_tower} ${strings.tier4}`,
      melee_rax_top: ` ${'Top'} ${strings.building_melee_rax}`,
      melee_rax_mid: ` ${'Mid'} ${strings.building_melee_rax}`,
      melee_rax_bot: ` ${'Bot'} ${strings.building_melee_rax}`,
      range_rax_top: ` ${'Top'} ${strings.building_range_rax}`,
      range_rax_mid: ` ${'Mid'} ${strings.building_range_rax}`,
      range_rax_bot: ` ${'Bot'} ${strings.building_range_rax}`,
    };
    return team + dict[k];
  };

  switch (entry.type) {
    case 'kills': {
      const hero = heroNames[entry.detail] || {};
      return (
        <>
          <img src={sword} className="swordIcon icon" />
          <span className="smallMutedText">{strings.killed}</span>
          <HeroImage id={hero.id} className="detailIcon" isIcon />
          <span className="smallBoldText">{hero.localized_name}</span>
        </>
      );
    }
    case 'runes': {
      const runeType = entry.detail;
      const runeString = strings[`rune_${runeType}`];
      return (
        <>
          <Tooltip title={runeString}>
            <img
              src={`/assets/images/dota2/runes/${runeType}.png`}
              alt={`${runeString} rune`}
              className="detailIcon"
            />
          </Tooltip>
          <span
            className="smallMutedText"
            style={{ textTransform: 'lowercase' }}
          >
            {strings.activated}&nbsp;
          </span>
          <span className="smallBoldText">
            {runeString} {strings.rune}
          </span>
        </>
      );
    }
    case 'objectives':
      if (entry.alt_key === 'CHAT_MESSAGE_FIRSTBLOOD') {
        return (
          <>
            <IconBloodDrop className="dropIcon icon" />
            <span className="smallBoldText">
              {strings.drew_first_blood}
            </span>
          </>
        );
      }
      if (entry.alt_key === 'building_kill') {
        return (
          <>
            {/* #e5cf11 */}
            <img src={lightning} className="icon" style={{ filter: 'invert(87%) sepia(98%) saturate(4073%) hue-rotate(341deg) brightness(90%) contrast(100%)'}} />
            <span className="smallMutedText">{strings.destroyed}&nbsp;</span>
            <span className="smallBoldText">
              {translateBuildings(entry.key.indexOf('goodguys') !== -1, entry.key)}{' '}
              {(isRadiant(entry) && entry.key.indexOf('goodguys') !== -1) ||
              (!isRadiant(entry) && entry.key.indexOf('badguys') !== -1)
                ? `(${strings.building_denied})`
                : ''}
            </span>
          </>
        );
      }
      if (entry.alt_key === 'CHAT_MESSAGE_AEGIS') {
        return (
          <>
            <img
              src="/assets/images/dota2/aegis_icon.png"
              alt="Aegis of Immortality"
              className="detailIcon"
            />
            <span className="smallBoldText">{strings.CHAT_MESSAGE_AEGIS}</span>
          </>
        );
      }
      if (entry.alt_key === 'CHAT_MESSAGE_ROSHAN_KILL') {
        return (
          <>
            <IconRoshan className="roshanIcon icon" />
            <span className="smallBoldText">{strings.slain_roshan}</span>
          </>
        );
      }
      if (entry.alt_key === 'CHAT_MESSAGE_COURIER_LOST') {
        const team =
          entry.team === 2 ? strings.general_radiant : strings.general_dire;
        return (
          <>
            <img src={sword} className="swordIcon icon" />
            <span className="smallMutedText">{strings.killed}</span>
            <img
              src={`/assets/images/dota2/${
                entry.team === 2 ? 'radiant' : 'dire'
              }courier.png`}
              alt="Courier"
              className="detailIcon"
            />
            <span className="smallBoldText">
              {formatTemplateToString(strings.team_courier, {
                team,
              })}
            </span>
          </>
        );
      }
      return null;
    default:
      return null;
  }
}

const mapStateToProps = (state) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(MatchLog);
