import React from 'react';
// import { Link } from 'react-router';
// import { API_HOST } from '../../../yasp.config';
import EditorPieChart from 'material-ui/svg-icons/editor/pie-chart';
import { transformations } from '../../../utility';

export default [{
  displayName: 'ID',
  field: 'match_id',
  width: 2,
  sortFn: true,
  displayFn: transformations.match_id,
}, {
  displayName: 'Hero',
  field: 'hero_id',
  width: 3,
  displayFn: transformations.hero_id,
}, {
  displayName: 'Res',
  field: 'radiant_win',
  width: 1.5,
  displayFn: transformations.radiant_win,
}, {
  displayName: 'Skill',
  field: 'skill',
  width: 1.5,
  sortFn: true,
  displayFn: transformations.skill,
}, {
  displayName: 'Mode',
  field: 'game_mode',
  width: 2.5,
  sortFn: true,
  displayFn: transformations.game_mode,
}, {
  displayName: 'Ended',
  field: 'start_time',
  width: 2,
  displayFn: transformations.start_time,
  sortFn: true,
}, {
  displayName: 'Length',
  field: 'duration',
  width: 2,
  sortFn: true,
  displayFn: transformations.duration,
}, {
  displayName: 'K',
  field: 'kills',
  width: 1,
  sortFn: true,
}, {
  displayName: 'D',
  field: 'deaths',
  width: 1,
  sortFn: true,
}, {
  displayName: 'A',
  field: 'assists',
  width: 1,
  sortFn: true,
}, {
  displayName: 'P',
  field: 'version',
  width: 1,
  sortFn: true,
  displayFn: (row, col, field) => (field ? <EditorPieChart /> : <div />),
},
];
