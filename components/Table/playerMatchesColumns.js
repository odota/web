import React from 'react';

const defaultSort = (array, field) => array.sort((a, b) => {
  if (a[field] < b[field]) return -1;
  if (a[field] > b[field]) return 1;
  return 0;
});

const useOriginalValueSort = (array, field) => {
  const origField = field.slice(0, field.lastIndexOf('Display'));
  return defaultSort(array, origField);
};

export default [{
  displayName: 'ID',
  field: 'match_idDisplay',
  width: 2,
  sortFn: defaultSort,
}, {
  displayName: 'Hero',
  field: 'hero_idDisplay',
  width: 1.5,
  sortFn: defaultSort,
  component: (srcUrl) => <img src={srcUrl} style={{ height: '24px' }} role="presentation" />,
}, {
  displayName: 'W/L',
  field: 'radiant_winDisplay',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Mode',
  field: 'game_modeDisplay',
  width: 3,
  sortFn: defaultSort,
}, {
  displayName: 'Date',
  field: 'start_timeDisplay',
  width: 2,
  sortFn: useOriginalValueSort,
}, {
  displayName: 'Duration',
  field: 'durationDisplay',
  width: 2,
  sortFn: defaultSort,
}, {
  displayName: 'Kills',
  field: 'killsDisplay',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Deaths',
  field: 'deathsDisplay',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Assists',
  field: 'assistsDisplay',
  width: 1.5,
  sortFn: defaultSort,
}];
