/* global API_HOST */
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import strings from 'lang';
import classNames from 'classnames';
import {
  formatSeconds,
  jsonFn,
} from 'utility';
import { IconRadiant, IconDire } from 'components/Icons';
import ReactTooltip from 'react-tooltip';
import heroes from 'dotaconstants/build/heroes.json';
import styles from './Match.css';

const heroesArr = jsonFn(heroes);
const radiantColor = "#66bb6a";
const direColor = "#ff4c4c"

const formatList = (items, none_value = []) => {
  switch(items.length){
    case 0:
      return none_value;
    case 1:
      return items;
    case 2:
      items.splice(1, 0, ` ${strings.story_conjunctive} `);
      return items;
    default:
      for(var i = 1; i < items.length; i += 2){
        items.splice(i, 0, ", ");
      }
      items.splice(items.length - 1, 0, `${strings.story_conjunctive} `);
      return items;
  }
}

const GoldSpan = (amount) => (
  <span className={styles.container}>
    <font color={styles.golden}>{amount} </font>
    <img
      role="presentation"
      src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`}
      style={{ "vertical-align": "middle" }}
    />
  </span>
);

const TeamSpan = (is_radiant) => (
  <span style={{ color: (is_radiant ? radiantColor : direColor) }} className={styles.teamIconContainer}>
    {is_radiant ? <IconRadiant className={styles.iconRadiant} /> : <IconDire className={styles.iconDire} />}
    {is_radiant ? strings.general_radiant : strings.general_dire}
  </span>
);

// Modified version of PlayerThumb
const PlayerSpan = ({ hero_id, personaname, isRadiant }) => (
  <span style={{ color: (isRadiant ? radiantColor : direColor) }} className={styles.container}>
    <img
      className={styles.heroThumb}
      src={heroes[hero_id]
        ? `${API_HOST}${heroes[hero_id].icon}`
        : '/assets/images/blank-1x1.gif'
      }
      role="presentation"
      height="24px"
      width="24px"
      style={{ "verticalAlign": "middle" }}
    />
    {heroes[hero_id].localized_name}
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
  let vars_dict = {}
  switch(event.type){
    case "firstblood":
      vars_dict = {
        time: formatSeconds(event.time),
        killer: match.players
                    .filter(player => player.player_slot === event.player_slot)
                    .map(player => PlayerSpan({...player})),
        victim: PlayerSpan({...match.players.find((player) => {
                    const foundHero = heroesArr('find')(hero => hero.name === event.key);
                    return foundHero && player.hero_id === foundHero.id;
                  })})
      }
      return renderTemplate(strings.story_firstblood, vars_dict);
    case "teamfight":
      let radiant_win = event.radiant_gold_advantage_delta >= 0;
      vars_dict = {
        winning_team: TeamSpan(radiant_win),
        net_change: GoldSpan(Math.abs(event.radiant_gold_advantage_delta)),
        win_dead: formatList(event.deaths
          .filter(death => match.players[death.key].isRadiant == radiant_win)
          .map(death => PlayerSpan(match.players[death.key]))),
        lose_dead: formatList(event.deaths
          .filter(death => match.players[death.key].isRadiant != radiant_win)
          .map(death => PlayerSpan(match.players[death.key])))
      }
      return renderTemplate(vars_dict['win_dead'].length > 0 ? strings.story_teamfight : strings.story_teamfight_none_dead, vars_dict);
    case "roshan":
      vars_dict = { team: TeamSpan(event.team == 2) }
      if(event.aegis != null){
        let aegis_vars_dict = {
          action: ((event.aegis.action === 'CHAT_MESSAGE_AEGIS' && strings.timeline_aegis_picked_up) ||
                  (event.aegis.action === 'CHAT_MESSAGE_AEGIS_STOLEN' && strings.timeline_aegis_snatched) ||
                  (event.aegis.action === 'CHAT_MESSAGE_DENIED_AEGIS' && strings.timeline_aegis_denied)),
          player: match.players
                    .filter(player => player.player_slot === event.aegis.player_slot)
                    .map(player => PlayerSpan({...player})),
        }
        return formatList([ renderTemplate(strings.story_roshan, vars_dict), renderTemplate(strings.story_aegis, aegis_vars_dict) ]);
      }
      else{
        return renderTemplate(strings.story_roshan, vars_dict);
      }
    case "lanes":
      var lanes = event.lanes.map(lane => {
        vars_dict = {
          radiant_players: formatList(lane.radiant_players.map(player => PlayerSpan({...player})), strings.story_lane_empty),
          dire_players: formatList(lane.dire_players.map(player => PlayerSpan({...player})), strings.story_lane_empty),
          lane: ((lane.lane === 1 && strings.lane_1) ||
                (lane.lane === 2 && strings.lane_2) ||
                (lane.lane === 3 && strings.lane_3)),
        }
        return renderTemplate(event.radiant_win ? strings.story_lane_radiant_win : strings.story_lane_radiant_lose, vars_dict);
      });
      return [ strings.story_lane_intro, <ul>{lanes.map(lane => <li>{lane}</li>)}</ul> ];
    case "building":
      vars_dict = {
        building: event.is_tower ? strings.CHAT_MESSAGE_TOWER_KILL : strings[`barracks_value_${event.key}`],
        player: match.players
                  .filter(player => player.player_slot == event.player_slot)
                  .map(player => PlayerSpan({...player})) || null,
        is_deny: event.is_deny,
        team: TeamSpan(event.team == 2)
      }
      // barracks_value_{key}
      // objective_tower1_top
      if(vars_dict.player.length == 0){
        return renderTemplate(strings.story_building_destroy, vars_dict);
      }
      else{
        if(vars_dict.is_deny){
          return renderTemplate(strings.story_building_deny_player, vars_dict);
        }
        else{
          return renderTemplate(strings.story_building_destroy_player, vars_dict);
        }
      }
    case "gameover":
      vars_dict = {
        duration: formatSeconds(match.duration),
        winning_team: TeamSpan(match.radiant_win),
        radiant_score: <font color={radiantColor}>{match.radiant_score}</font>,
        dire_score: <font color={direColor}>{match.dire_score}</font>
      }
      return renderTemplate(strings.story_gameover, vars_dict);
    default:
      return `unknown type: ${event.type}`;
  }
}

const renderStory = (match) => {
  var events = generateStory(match);
  return (<div>
      {events.map(event => (<div style={{ "marginBottom": "24px" }}>{renderEvent(event, match)}</div>))}
    </div>);
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


  // Aegis pickups
  const aegis = (match.objectives || [])
    .filter(obj => (
      obj.type === 'CHAT_MESSAGE_AEGIS' ||
        obj.type === 'CHAT_MESSAGE_AEGIS_STOLEN' ||
        obj.type === 'CHAT_MESSAGE_DENIED_AEGIS'
    ))
    .map(obj => ({
      type: 'aegis',
      action: obj.type,
      player_slot: obj.player_slot,
  }));

    // Roshan kills, team 2 = radiant, 3 = dire
  events = events.concat(
    match.objectives
      .filter(obj => obj.type === 'CHAT_MESSAGE_ROSHAN_KILL')
      .map((obj, i) => ({
        type: 'roshan',
        time: obj.time,
        team: obj.team,
        key: i,
        aegis: i < aegis.length ? aegis[i] : null,
      })) || [],
  )

  // Teamfights
  events = events.concat(match.teamfights && match.teamfights.length > 0 ?
    match.teamfights.map(fight => ({
      type: 'teamfight',
      time: fight.start,
      time_end: fight.end,
      duration: (fight.start + fight.end) / 2,
      radiant_gold_advantage_delta: fight.radiant_gold_advantage_delta,
      deaths: fight.players
        .map((player, i) => (player.deaths > 0 ? {key: i, count: player.deaths} : ''))
        .filter(String),
    })) : [],
  );

  // Lanes (1=Bottom, 2=Middle, 3=Top) (jungle/roaming not considered a lane here)
  if(match.duration > 10 * 60) {
    events.push({
      type: "lanes",
      time: 10 * 60, // analysis at 10 minutes in
      lanes: [ 1, 2, 3 ].map(lane => {
          let radiant_players = match.players.filter(player => player.lane == lane && player.isRadiant) || [];
          let dire_players = match.players.filter(player => player.lane == lane && !player.isRadiant) || [];
          return {
            lane: lane,
            radiant_players: radiant_players,
            dire_players: dire_players,
            radiant_win: (Math.max(radiant_players.map(player => player.lane_efficiency)) || 0) >
                      (Math.max(dire_players.map(player => player.lane_efficiency)) || 0) // Which carry got more farm in lane
          };
        })
    });
  }

  // Towers & Barracks
  events = events.concat(
    match.objectives
      .filter(obj => obj.type === 'CHAT_MESSAGE_TOWER_KILL' || obj.type === 'CHAT_MESSAGE_TOWER_DENY' || obj.type === 'CHAT_MESSAGE_BARRACKS_KILL')
      .map((obj, i) => ({
        type: 'building',
        time: obj.time,
        team: obj.team,
        is_tower: obj.type === 'CHAT_MESSAGE_TOWER_KILL' || obj.type === 'CHAT_MESSAGE_TOWER_DENY',
        is_deny: obj.type === 'CHAT_MESSAGE_TOWER_DENY',
        key: obj.key < 64 ? obj.key : obj.key << 6,
        player_slot: obj.player_slot || null,
      })) || [],
  )

  // Gameover
  events.push({
    type: "gameover",
    time: match.duration
  })

  // Sort by time
  console.log(events);
  events.sort((a, b) => {return a.time - b.time});

  return events;
};

class MatchStory extends React.Component {
  constructor() {
    super();

  }
  render() {
    try {
      return (<div>
            {renderStory(this.props.match)}
      </div>);
    }
    catch(e) {
      var exmsg = "";
      if (e.message) {
        exmsg += e.message;
      }
      if (e.stack) {
        exmsg += ' | stack: ' + e.stack;
      }
      console.log(exmsg);
      return (<div>{exmsg}</div>);
    }
  }
}

export default MatchStory;
