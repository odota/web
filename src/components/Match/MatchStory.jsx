/* global API_HOST */
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import strings from 'lang';
import classNames from 'classnames';
import {
  formatSeconds,
  jsonFn,
} from 'utility';
import ReactTooltip from 'react-tooltip';
import heroes from 'dotaconstants/build/heroes.json';
import styles from './Match.css';

const heroesArr = jsonFn(heroes);

// Modified version of PlayerThumb
const playerSpan = ({ hero_id, name, personaname, hideText, isRadiant }) => (
  <span style={{ color: (isRadiant ? "green" : "red") }} className={styles.container}>
    <img
      className={styles.heroThumb}
      src={heroes[hero_id]
        ? `${API_HOST}${heroes[hero_id].icon}`
        : '/assets/images/blank-1x1.gif'
      }
      role="presentation"
      height="24px"
      width="24px"
      style={{ "vertical-align": "middle" }}
    />
    {!hideText && (name || personaname || strings.general_anonymous)}
  </span>
);

const renderTemplate = (template, dict) => {
  var pattern = /(\{[^}]+\})/g;
  var result = template.split(pattern);
  for (var i = 0; i < result.length; i++) {
    if (result[i].match(pattern) && result[i].slice(1, -1) in dict) {
      result[i] = dict[result[i].slice(1, -1)];
    }
  }
  return result;
}

const renderEvent = (event, match) => {
  switch(event.type){
    case "firstblood":
      let vars_dict = {
        time: formatSeconds(event.time),
        killer: match.players
                    .filter(player => player.player_slot === event.player_slot)
                    .map(player => playerSpan({...player})),
        victim: playerSpan({...match.players.find((player) => {
                    const foundHero = heroesArr('find')(hero => hero.name === event.key);
                    return foundHero && player.hero_id === foundHero.id;
                  })})
      }
      return (<div>{renderTemplate(strings.story_firstblood, vars_dict)}</div>)
    default:
      return (<div>{`unknown type: ${event.type}`}</div>);
  }
}

const renderStory = (match) => {
  var events = generateStory(match);
  return (<div>{events.map(event => {return renderEvent(event, match)})}</div>);
}

// Modified version of timeline data
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
