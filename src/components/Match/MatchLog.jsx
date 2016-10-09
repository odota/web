import React from 'react';
import strings from 'lang';
import {
  formatSeconds,
} from 'utility';
import Table from 'components/Table/Table2';
import objectives from 'dotaconstants/json/objectives.json';
import barracksValue from 'dotaconstants/json/barracks_value.json';
import {
  heroTdColumn,
} from './matchColumns';

const getObjectiveDesc = objective => (objective.key ? barracksValue[objective.key] : '');
const getObjectiveBase = objective => objectives[objective.subtype || objective.type] || objective.subtype || objective.type;
const generateLog = (match) => {
  let log = [];
  log = log.concat(match.objectives || [])
    .map(objective => ({
      ...objective,
      ...match.players[objective.slot],
      type: 'objective',
      detail: `${getObjectiveDesc(objective)} ${getObjectiveBase(objective)}`,
    }));
  match.players.forEach((player) => {
    log = log.concat((player.kills_log || []).map(entry => ({
      ...entry,
      ...player,
      type: 'kill',
      detail: `${entry.key}`,
    })));
    log = log.concat((player.obs_log || []).map(entry => ({
      ...entry,
      ...player,
      type: 'obs_ward',
      detail: `${entry.key}`,
    })));
  });
  log = log.sort((a, b) => a.time - b.time);
  return log;
};

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
}];

class MatchLog extends React.Component {
  // TODO selector component
  componentWillMount() {
    this.setState({ selectedTypes: {} });
  }
  render() {
    return (<div>
      <Table data={generateLog(this.props.match)} columns={logColumns} />
    </div>);
  }
}

export default MatchLog;
