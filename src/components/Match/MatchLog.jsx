/* global API_HOST */
import React from 'react';
import strings from 'lang';
import {
  formatSeconds,
} from 'utility';
import Table from 'components/Table';
import objectives from 'dotaconstants/json/objectives.json';
import barracksValue from 'dotaconstants/json/barracks_value.json';
import Checkbox from 'material-ui/Checkbox';
import heroNames from 'dotaconstants/json/hero_names.json';
import styles from './Match.css';
import {
  heroTdColumn,
} from './matchColumns';

const getObjectiveDesc = objective => (objective.key ? barracksValue[objective.key] : '');
const getObjectiveBase = objective => objectives[objective.subtype || objective.type] || objective.subtype || objective.type;
const generateLog = (match, selectedTypes) => {
  let log = [];
  if (selectedTypes.objectives) {
    log = log.concat(match.objectives || [])
    .map(objective => ({
      ...objective,
      ...match.players[objective.slot],
      type: 'objectives',
      detail: `${getObjectiveDesc(objective)} ${getObjectiveBase(objective)}`,
    }));
  }
  match.players.forEach((player) => {
    if (selectedTypes.kills) {
      log = log.concat((player.kills_log || []).map(entry => ({
        ...entry,
        ...player,
        type: 'kills',
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

// TODO localize strings
const logColumns = [heroTdColumn, {
  displayName: strings.th_time,
  field: 'time',
  displayFn: (row, col, field) => formatSeconds(field),
}, {
  displayName: 'Type',
  field: 'type',
}, {
  displayName: 'Detail',
  field: 'detail',
  displayFn: (row) => {
    const hero = heroNames[row.detail] || {};
    return row.type === 'kills' ? <img src={`${API_HOST}${hero.img}`} className={styles.imgSmall} role="presentation" /> : row.detail;
  },
}];
const checkboxes = [
  { label: 'kills' },
  // {label:"obs_ward"},
  { label: 'objectives' },
];
class MatchLog extends React.Component {
  constructor() {
    super();
    this.handleCheck = this.handleCheck.bind(this);
  }
  componentWillMount() {
    const initState = {};
    checkboxes.forEach((checkbox) => {
      initState[checkbox.label] = true;
    });
    this.setState(initState);
  }
  handleCheck(label, isChecked) {
    this.setState({ ...this.state, [label]: isChecked });
  }
  render() {
    return (<div>
      {checkboxes.map((checkbox, index) => (<span key={index}>
        <Checkbox defaultChecked label={checkbox.label} onCheck={(event, isChecked) => this.handleCheck(checkbox.label, isChecked)} />
      </span>))}
      <Table data={generateLog(this.props.match, this.state)} columns={logColumns} />
    </div>);
  }
}

export default MatchLog;
