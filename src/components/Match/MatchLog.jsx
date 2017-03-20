/* global API_HOST */
import React from 'react';
import strings from 'lang';
import {
  formatSeconds,
} from 'utility';
import ReactTooltip from 'react-tooltip';
import Table from 'components/Table';
import heroes from 'dotaconstants/build/heroes.json';
import heroNames from 'dotaconstants/build/hero_names.json';
import Form from 'components/Form/Form';
import FormGroup from 'components/Form/FormGroup';
import styles from './Match.css';
import {
  heroTdColumn,
} from './matchColumns';

const typeConfig = {
  kills: 0,
  objectives: 1,
  runes: 2,
};
const getObjectiveDesc = objective => (objective.key ? strings[`barracks_value_${objective.key}`] : '');
const getObjectiveBase = objective => strings[objective.subtype || objective.type] || objective.subtype || objective.type;
const generateLog = (match, { types, players }) => {
  let log = [];
  const matchPlayers = !players.length
                        ? match.players
                        : match.players.filter((p, i) => players.includes(i));

  if (types.includes(typeConfig.objectives)) {
    log = (match.objectives || []).reduce((objectivesLog, objective) => {
      if (!players.length || players.includes(objective.slot)) {
        let name = matchPlayers.name;
        if (objective.slot === -1) {
          if (objective.team === 2) {
            name = strings.general_radiant;
          } else if (objective.team === 3) {
            name = strings.general_dire;
          }
        }
        objectivesLog.push({
          ...objective,
          ...matchPlayers[objective.slot],
          name,
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
        return <img src={`${API_HOST}${hero.img}`} className={styles.imgSmall} role="presentation" />;
      }
      case 'runes': {
        const runeType = row.detail;
        const runeString = strings[`rune_${runeType}`];
        return (
          <img
            src={`/assets/images/dota2/runes/${runeType}.png`}
            role="presentation"
            className={styles.imgSmall}
            data-tip
            data-for={runeString}
          />
        );
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
      text: heroes[player.hero_id].localized_name || strings.general_no_hero,
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
        <Form name="logFilterForm">
          <FormGroup
            formSelectionState={this.state}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
          >
            {Field => (
              <div className={styles.logFilterForm}>
                <Field
                  name="types"
                  label={strings.ward_log_type}
                  dataSource={this.typesSource}
                  strict
                />
                <Field
                  name="players"
                  label={strings.log_heroes}
                  dataSource={this.playersSource}
                  strict
                />
              </div>
            )}
          </FormGroup>
        </Form>
        <Table data={logData} columns={logColumns} />
      </div>
    );
  }
}

export default MatchLog;
