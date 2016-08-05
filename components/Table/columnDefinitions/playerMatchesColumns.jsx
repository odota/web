import React from 'react';
import { defaultSort } from './utility';
// import { Link } from 'react-router';
// import { API_HOST } from '../../../yasp.config';
import EditorPieChart from 'material-ui/svg-icons/editor/pie-chart';
import { transformations } from '../../../utility';

export default [{
  displayName: 'ID',
  field: 'match_id',
  width: 2,
  sortFn: defaultSort,
  displayFn: transformations.match_id,
}, {
  displayName: 'Hero',
  field: 'hero_id',
  width: 3,
  sortFn: defaultSort,
  displayFn: transformations.hero_id,
}, {
  displayName: 'Res',
  field: 'radiant_win',
  width: 1.5,
  sortFn: defaultSort,
  displayFn: transformations.radiant_win,
}, {
  displayName: 'Skill',
  field: 'skill',
  width: 1.5,
  sortFn: defaultSort,
  displayFn: ({ field }) => (
    <div className="subText">{transformations.skill({ field })}</div>),
}, {
  displayName: 'Mode',
  field: 'game_mode',
  width: 2.5,
  sortFn: defaultSort,
  displayFn: ({ field }) => (
    <div className="subText">{transformations.game_mode({ field })}</div>),
}, {
  displayName: 'Ended',
  field: 'start_time',
  width: 2,
  displayFn: ({ field }) => (
    <div className="subText">{transformations.start_time({ field })}</div>),
}, {
  displayName: 'Length',
  field: 'duration',
  width: 2,
  sortFn: defaultSort,
  displayFn: ({ field }) => (
    <div className="subText">{transformations.duration({ field })}</div>),
}, {
  displayName: 'K',
  field: 'kills',
  width: 1,
  sortFn: defaultSort,
}, {
  displayName: 'D',
  field: 'deaths',
  width: 1,
  sortFn: defaultSort,
}, {
  displayName: 'A',
  field: 'assists',
  width: 1,
  sortFn: defaultSort,
}, {
  displayName: 'P',
  field: 'version',
  width: 1,
  sortFn: defaultSort,
  displayFn: ({ field }) => (field ? <EditorPieChart /> : <div />),
},
];
