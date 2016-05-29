import React from 'react';

// there is no possible way this is the right place for this logic...
// TODO - put this shit in the right place
const matchColumns = [{
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

// there is no possible way this is the right place for this logic...
// TODO - put this shit in the right place
const playerMatchTransformSwitch = (match, field) => {
  switch (field) {
    case 'hero_id':
      return 'https://yasp.co/apps/dota2/images/heroes/pudge_full.png';
    case 'radiant_win':
      return match.player_slot < 64 && match[field] || match.player_slot >= 64 && !match[field] ? 'W' : 'L';
    case 'game_mode':
      return match[field] === 22 ? 'Ranked All Pick' : 'All Pick';
    case 'start_time': {
      const today = new Date();
      const matchDate = new Date(match[field] * 1000);
      const leftoverDays = Math.floor((today - matchDate) / 1000 / 60 / 60 / 24);
      switch (leftoverDays) {
        case 0:
          return 'Today';
        case 1:
          return 'Yesterday';
        default:
          return `${leftoverDays} days ago`;
      }
    }
    case 'duration':
      return `${Math.floor(match[field] / 60)}:${match[field] % 60}`;
    default:
      return match[field];
  }
};

// there is no possible way this is the right place for this logic...
// TODO - put this shit in the right place
const playerMatchTransform = (match) => {
  const transformedMatch = {};
  Object.keys(match).forEach((field) => {
    transformedMatch[`${field}Display`] = playerMatchTransformSwitch(match, field);
  });
  return transformedMatch;
};

const HOST_URL = 'https://yasp.co';

export {
  HOST_URL,
  matchColumns,
  playerMatchTransform,
};
