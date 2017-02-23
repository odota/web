/* global API_HOST */
import React from 'react';
import strings from 'lang';
import {
  formatSeconds,
} from 'utility';
import ReactTooltip from 'react-tooltip';
import heroNames from 'dotaconstants/build/hero_names.json';
import styles from './Match.css';


const renderEvent = (event) => {
  return (<div>{event.type}</div>);
}

const renderStory = (match) => {
  var events = generateStory(match);
  return (<div>{events.map(renderEvent)}</div>);
}

const generateStory = (match) => {
  // Firstblood
  const fbIndex = match.objectives.findIndex(obj => obj.type === 'CHAT_MESSAGE_FIRSTBLOOD');
  var events = [];

  if (fbIndex > -1) {
    const fbKey = match.players.map(player =>
        player.kills_log &&
        player.kills_log.length > 0 &&
        player.kills_log.filter(kill => kill.time === match.objectives[fbIndex].time),
    ).filter(String).filter(Boolean);

    events.push({
      type: 'firstblood',
      time: match.objectives[fbIndex].time,
      player_slot: match.objectives[fbIndex].player_slot,
      key: fbKey && fbKey.length > 0 && fbKey[0][0].key,
    });
  }

    // Roshan kills, team 2 = radiant, 3 = dire
  events = events.concat(
    match.objectives
      .filter(obj => obj.type === 'CHAT_MESSAGE_ROSHAN_KILL')
      .map((obj, i) => ({
        type: 'roshan',
        time: obj.time,
        team: obj.team,
        key: i,
      })) || [],
  )

  // Teamfights
  events = events.concat(match.teamfights && match.teamfights.length > 0 ?
    match.teamfights.map(fight => ({
      type: 'teamfight',
      start: fight.start,
      end: fight.end,
      time: (fight.start + fight.end) / 2,
      radiant_gold_advantage_delta: fight.radiant_gold_advantage_delta,
      deaths: fight.players
        .map((player, i) => (player.deaths > 0 ? {
          key: i,
          gold_delta: player.gold_delta,
        } : ''))
        .filter(String),
    })) : [],
  );

  // Sort by time
  events.sort((a, b) => {return a.time > b.time;} );

  return events;
};

class MatchStory extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (<div>
          {renderStory(this.props.match)}
    </div>);
  }
}

export default MatchStory;
