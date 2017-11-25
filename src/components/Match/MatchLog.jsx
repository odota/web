import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import {
  formatSeconds,
  getHeroesById,
  translateBuildings as tb,
} from 'utility';
import ReactTooltip from 'react-tooltip';
import Table from 'components/Table';
import heroes from 'dotaconstants/build/heroes.json';
import FormField from 'components/Form/FormField';
import {
  heroTdColumn,
} from './matchColumns';
import { StyledLogFilterForm } from './StyledMatch';

const heroNames = getHeroesById();
const typeConfig = {
  kills: 0,
  objectives: 1,
  runes: 2,
};
const getObjectiveDesc = objective => (objective.key && objective.type === 'CHAT_MESSAGE_BARRACKS_KILL' ? strings[`barracks_value_${objective.key}`] : '');
const getObjectiveBase = (objective) => {
  if (objective.type === 'building_kill') {
    const desc = objective.key.indexOf('npc_dota_badguys') === 0 ? strings.general_dire : strings.general_radiant;
    return `${desc} ${(objective.key.split('guys_') || [])[1]}`;
  }
  return strings[objective.subtype || objective.type] || objective.subtype || objective.type;
};
const generateLog = (match, { types, players }) => {
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
        objectivesLog.push({
          ...objective,
          ...matchPlayers[objective.slot],
          type: 'objectives',
          detail: `${getObjectiveDesc(objective)} ${getObjectiveBase(objective)}`,
        });
      }
      return objectivesLog;
    }, log);
  }

  matchPlayers.forEach((player) => {
    if (types.includes(typeConfig.kills)) {
      log = log.concat((player.kills_log || []).map(entry => ({
        ...entry,
        ...player,
        type: 'kills',
        detail: `${entry.key}`,
      })));
    }

    if (types.includes(typeConfig.runes)) {
      log = log.concat((player.runes_log || []).map(entry => ({
        ...entry,
        ...player,
        type: 'runes',
        detail: `${entry.key}`,
      })));
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

const logColumns = [heroTdColumn, {
  displayName: strings.th_time,
  field: 'time',
  displayFn: (row, col, field) => formatSeconds(field),
}, {
  displayName: strings.ward_log_type,
  field: 'type',
}, {
  displayName: strings.log_detail,
  field: 'detail',
  displayFn: (row) => {
    switch (row.type) {
      case 'kills': {
        const hero = heroNames[row.detail] || {};
        return <img src={`${process.env.REACT_APP_API_HOST}${hero.img}`} style={{ height: '30px' }} alt="" />;
      }
      case 'runes': {
        const runeType = row.detail;
        const runeString = strings[`rune_${runeType}`];
        return (
          <img
            src={`/assets/images/dota2/runes/${runeType}.png`}
            alt=""
            style={{ height: '30px' }}
            data-tip
            data-for={runeString}
          />
        );
      }
      case 'objectives': {
        if (row.detail === ' First Blood') {
          return (
            <span>
              <img
                src="/assets/images/dota2/bloodsplattersmall.png"
                alt=""
                style={{ height: '30px', float: 'left', paddingTop: '7px' }}
              />
              <p>{strings.th_firstblood_claimed}</p>
            </span>
          );
        }
        if (tb.radiant[row.key]) {
          return (
            <span>
              <img
                src="/assets/images/dota2/dotastructuresmallradiant.png"
                alt=""
                style={{ height: '30px', float: 'left', paddingTop: '7px' }}
              />
              <p>{tb.radiant[row.key]}</p>
            </span>
          );
        }
        if (tb.dire[row.key]) {
          return (
            <span>
              <img
                src="/assets/images/dota2/dotastructuresmalldire.png"
                alt=""
                style={{ height: '30px', float: 'left', paddingTop: '7px' }}
              />
              <p>{tb.dire[row.key]}</p>
            </span>
          );
        }
        if (row.detail === ' Picked up the Aegis') {
          return (
            <span>
              <img
                src="/assets/images/dota2/aegis_icon.png"
                alt=""
                style={{ height: '30px', float: 'left', paddingTop: '7px' }}
              />
              <p>{strings.CHAT_MESSAGE_AEGIS}</p>
            </span>
          );
        }
        if (row.detail === ' Roshan') {
          return (
            <span>
              <img
                src="/assets/images/dota2/deadroshan.png"
                alt=""
                style={{ height: '30px', float: 'left', paddingTop: '7px' }}
              />
              <p>{strings.th_roshan}</p>
            </span>
          );
        }
        return row.detail;
      }
      default:
        return row.detail;
    }
  },
}];

class MatchLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: Object.values(typeConfig),
      players: [],
    };

    this.typesSource = [
      { text: strings.heading_kills, value: 0 },
      { text: strings.tab_objectives, value: 1 },
      { text: strings.heading_runes, value: 2 },
    ];
    this.playersSource = this.props.match.players.map((player, index) => ({
      text: heroes[player.hero_id] ? heroes[player.hero_id].localized_name : strings.general_no_hero,
      value: index,
    }));

    this.addChip = this.addChip.bind(this);
    this.deleteChip = this.deleteChip.bind(this);
  }

  addChip(name, input, limit) {
    const currentChips = this.state[name];
    const newChips = [input.value].concat(currentChips).slice(0, limit);
    this.setState({ [name]: newChips });
  }

  deleteChip(name, index) {
    const currentChips = this.state[name];
    const newChips = [
      ...currentChips.slice(0, index),
      ...currentChips.slice(index + 1),
    ];
    this.setState({ [name]: newChips });
  }

  render() {
    const runeTooltips = Object.keys(strings)
      .filter(str => str.indexOf('rune_') === 0)
      .map((runeKey) => {
        const runeString = strings[runeKey];
        return (
          <ReactTooltip id={runeString} key={runeString}>
            <span>{runeString}</span>
          </ReactTooltip>
        );
      });
    const logData = generateLog(this.props.match, this.state);

    return (
      <div>
        {runeTooltips}
        <StyledLogFilterForm >
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
        <Table data={logData} columns={logColumns} />
      </div>
    );
  }
}

MatchLog.propTypes = {
  match: PropTypes.shape({
    players: PropTypes.arrayOf({}),
  }),
};

export default MatchLog;
