import React from 'react';

export default [{
  displayName: 'ID',
  field: 'match_idDisplay',
  width: 2,
  sorted: false,
}, {
  displayName: 'Hero',
  field: 'hero_idDisplay',
  width: 2,
  sorted: false,
  component: (srcUrl) => <img src={srcUrl} style={{ height: '24px' }} role="presentation" />,
}, {
  displayName: 'W/L',
  field: 'radiant_winDisplay',
  width: 1,
  sorted: false,
}, {
  displayName: 'Mode',
  field: 'game_modeDisplay',
  width: 2,
  sorted: false,
}, {
  displayName: 'Date',
  field: 'start_timeDisplay',
  width: 2,
  sorted: false,
}, {
  displayName: 'Duration',
  field: 'durationDisplay',
  width: 2,
  sorted: false,
}, {
  displayName: 'Kills',
  field: 'killsDisplay',
  width: 2,
  sorted: false,
}, {
  displayName: 'Deaths',
  field: 'deathsDisplay',
  width: 2,
  sorted: false,
}, {
  displayName: 'Assists',
  field: 'assistsDisplay',
  width: 2,
  sorted: false,
}];
