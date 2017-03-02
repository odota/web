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

// can be used in conjunction with is_radiant
const TEAM = {
  radiant: true,
  dire: false
}

const formatList = (items, none_value = []) => {
  switch(items.length){
    case 0:
      return none_value;
    case 1:
      return items;
    case 2:
      return renderTemplate(strings.story_list_2, { 1: items[0], 2: items[1] });
    case 3:
      return renderTemplate(strings.story_list_3, { 1: items[0], 2: items[1], 3: items[2] });
    default:
      return renderTemplate(strings.story_list_n, { i: items.shift(), rest: formatList(items) });
  }
}

const GoldSpan = (amount) => (
  <span className={styles.storySpan}>
    <font color={styles.golden}>{amount} </font>
    <img
      role="presentation"
      src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`}
      style={{ "verticalAlign": "middle" }}
    />
  </span>
);

const TeamSpan = (is_radiant) => (
  <span style={{ color: (is_radiant ? radiantColor : direColor) }} className={styles.storySpan}>
    {is_radiant ? <IconRadiant className={styles.iconRadiant} /> : <IconDire className={styles.iconDire} />}
    {is_radiant ? strings.general_radiant : strings.general_dire}
  </span>
);

// Modified version of PlayerThumb
const PlayerSpan = ({ hero_id, personaname, isRadiant }) => (
  <span style={{ color: (isRadiant ? radiantColor : direColor) }} className={styles.storySpan}>
    <img
      className={styles.heroThumb}
      src={heroes[hero_id]
        ? `${API_HOST}${heroes[hero_id].icon}`
        : '/assets/images/blank-1x1.gif'
      }
      role="presentation"
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

// Abstract class
class StoryEvent extends React.Component{
  constructor(time) {
    super();
    this.time = time;
  }
  render() {
    return <p>{this.format()}</p>;
  }
}

class TeamfightEvent extends StoryEvent {
  constructor(match, fight) {
    super(fight.start);
    this.time_end = fight.end;

    this.winning_team = fight.radiant_gold_advantage_delta >= 0; // is_radiant value basically
    this.gold_delta = Math.abs(fight.radiant_gold_advantage_delta);
    let deaths = fight.players
        .map((player, i) => ({player: match.players[i], count: player.deaths}))
        .filter(death => death.count > 0);
    this.win_dead = deaths.filter(death => death.player.isRadiant == this.winning_team);
    this.lose_dead = deaths.filter(death => death.player.isRadiant != this.winning_team);
    this.during_events = [];
    this.after_events = [];
  }
  format() {
    var formatted = [ renderTemplate(this.win_dead.length > 0 ? strings.story_teamfight : strings.story_teamfight_none_dead, {
      winning_team: TeamSpan(this.winning_team),
      net_change: GoldSpan(this.gold_delta),
      win_dead: formatList(this.win_dead.map(death => 
        death.count == 1 ? new PlayerSpan(death.player) : [ new PlayerSpan(death.player), `(x${death.count})` ])),
      lose_dead: formatList(this.lose_dead.map(death => 
        death.count == 1 ? new PlayerSpan(death.player) : [ new PlayerSpan(death.player), `(x${death.count})` ]))
    }) ];
    if(this.during_events.length > 0){
      formatted = formatted.concat(renderTemplate(strings.story_during_teamfight, 
        { events: formatList(this.during_events.map(event => event.format())) }));
    }
    if(this.after_events.length > 0){
      formatted = formatted.concat(renderTemplate(strings.story_after_teamfight, 
        { events: formatList(this.after_events.map(event => event.format())) }));
    }
    return formatted;
  }
}

class FirstbloodEvent extends StoryEvent {
  constructor(match, time, player_slot, key) {
    super(time);
    this.killer = match.players.find(player => player.player_slot === player_slot);
    this.victim = match.players.find(player => {
      const foundHero = heroesArr('find')(hero => hero.name === key);
      return foundHero && player.hero_id === foundHero.id;
    });
  }
  format() {
    return renderTemplate(strings.story_firstblood, {
      time: formatSeconds(this.time),
      killer: PlayerSpan(this.killer),
      victim: PlayerSpan(this.victim)
    });
  }
}

class AegisEvent extends StoryEvent {
  constructor(match, obj, index) {
    super(obj.time);
    this.action = obj.type;
    this.index = index;
    this.player = match.players.find(player => player.player_slot == obj.player_slot);
  }
  get localized_action() {
    return ((this.action === 'CHAT_MESSAGE_AEGIS' && strings.timeline_aegis_picked_up) ||
            (this.action === 'CHAT_MESSAGE_AEGIS_STOLEN' && strings.timeline_aegis_snatched) ||
            (this.action === 'CHAT_MESSAGE_DENIED_AEGIS' && strings.timeline_aegis_denied));
  }
  format() {
    return renderTemplate(strings.story_aegis, {
      action: this.localized_action,
      player: PlayerSpan(this.player)
    });
  }
}

class RoshanEvent extends StoryEvent {
  constructor(match, obj, index, aegis_events) {
    super(obj.time);
    this.team = obj.team == 2;
    this.aegis = aegis_events.find(aegis => aegis.index == index);
  }
  format() {
    let formatted = renderTemplate(strings.story_roshan, { team: TeamSpan(this.team) });
    return this.aegis ? formatList([ formatted, this.aegis.format() ]) : formatted;
  }
}

class LaneStory {
  constructor(match, lane) {
    this.radiant_players = match.players.filter(player => player.lane == lane && player.isRadiant);
    this.dire_players = match.players.filter(player => player.lane == lane && !player.isRadiant);
    this.lane = lane;
    this.winning_team = (Math.max(this.radiant_players.map(player => player.lane_efficiency)) || 0) >
                (Math.max(this.dire_players.map(player => player.lane_efficiency)) || 0);
  }
  get localized_lane() {
    return ((this.lane === 1 && strings.lane_1) ||
            (this.lane === 2 && strings.lane_2) ||
            (this.lane === 3 && strings.lane_3));
  }
  format() {
    return renderTemplate(this.winning_team ? strings.story_lane_radiant_win : strings.story_lane_radiant_lose, {
      radiant_players: formatList(this.radiant_players.map(PlayerSpan), strings.story_lane_empty),
      dire_players: formatList(this.dire_players.map(PlayerSpan), strings.story_lane_empty),
      lane: this.localized_lane
    })
  }
}

class LanesEvent extends StoryEvent {
  constructor(match) {
    super(10 * 60);
    this.lanes = [ 1, 2, 3 ].map(lane => new LaneStory(match, lane));
  }
  format() {
    return [ strings.story_lane_intro, <ul>{this.lanes.map(lane => <li>{lane.format()}</li>)}</ul> ];
  }
}

class BuildingEvent extends StoryEvent {
  constructor(match, obj) {
    super(obj.time);
    this.team = !(obj.team == 2); // We want the team that the tower belongs to, so get the opposite
    this.is_tower = obj.type === 'CHAT_MESSAGE_TOWER_KILL' || obj.type === 'CHAT_MESSAGE_TOWER_DENY';
    this.is_deny = obj.type === 'CHAT_MESSAGE_TOWER_DENY';
    this.key = obj.key < 64 ? obj.key : obj.key << 6;
    this.player = match.players.find(player => player.player_slot == obj.player_slot);
  }
  get localized_building() {
    return this.is_tower ? strings.CHAT_MESSAGE_TOWER_KILL : strings[`story_barracks_value_${this.key}`];
  }
  format() {
    return renderTemplate(!this.player ? strings.story_building_destroy : (this.is_deny ? strings.story_building_deny_player : strings.story_building_destroy_player), {
      building: this.localized_building,
      player: this.player ? PlayerSpan(this.player) : null,
      team: TeamSpan(this.team)
    });
  }
}

class GameoverEvent extends StoryEvent {
  constructor(match) {
    super(match.duration);
    this.winning_team = match.radiant_win;
    this.radiant_score = match.radiant_score;
    this.dire_score = match.dire_score;
  }
  format() {
    return renderTemplate(strings.story_gameover, {
      duration: formatSeconds(this.time),
      winning_team: TeamSpan(this.winning_team),
      radiant_score: <font color={radiantColor}>{this.radiant_score}</font>,
      dire_score: <font color={direColor}>{this.dire_score}</font>
    });
  }
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

    events.push(new FirstbloodEvent(match,
      match.objectives[fbIndex].time,
      match.objectives[fbIndex].player_slot,
      fbKey && fbKey.length > 0 && fbKey[0][0].key));
  }


  // Aegis pickups
  let aegis_events = match.objectives
    .filter(obj => obj.type === 'CHAT_MESSAGE_AEGIS' ||
                   obj.type === 'CHAT_MESSAGE_AEGIS_STOLEN' ||
                   obj.type === 'CHAT_MESSAGE_DENIED_AEGIS')
    .map((obj, index) => new AegisEvent(match, obj, index));

  // Roshan kills, team 2 = radiant, 3 = dire
  events = events.concat(match.objectives
    .filter(obj => obj.type == 'CHAT_MESSAGE_ROSHAN_KILL')
    .map((obj, index) => new RoshanEvent(match, obj, index, aegis_events)))

  // Teamfights
  events = events.concat(match.teamfights && match.teamfights.length > 0 ? match.teamfights.map(fight => new TeamfightEvent(match, fight)) : []);

  // Lanes (1=Bottom, 2=Middle, 3=Top) (jungle/roaming not considered a lane here)
  if(match.duration > 10 * 60) {
    events.push(new LanesEvent(match));
  }

  // Towers & Barracks
  events = events.concat(match.objectives
      .filter(obj => obj.type === 'CHAT_MESSAGE_TOWER_KILL' || obj.type === 'CHAT_MESSAGE_TOWER_DENY' || obj.type === 'CHAT_MESSAGE_BARRACKS_KILL')
      .map(obj => new BuildingEvent(match, obj)));

  // Gameover
  events.push(new GameoverEvent(match));

  // Sort by time
  events.sort((a, b) => {return a.time - b.time});

  //////// Group events together now

  // Group during events for teamfights

  var last_fight = null;
  for(var i = 0; i < events.length; i++) {
    if(events[i] instanceof TeamfightEvent){
      last_fight = events[i];
      continue;
    }
    if(last_fight == null) { continue; }
    if(events[i] instanceof RoshanEvent || events[i] instanceof BuildingEvent) {
      if(events[i].time < last_fight.time_end){ // During
        last_fight.during_events.push(events[i]);
        events.splice(i, 1);
        i--;
      }
      else if(events[i].time < last_fight.time_end + (60 * 2)){ // After (within 2 minutes)
        last_fight.after_events.push(events[i]);
        events.splice(i, 1);
        i--;
      }
    }
  }

  return events;
};

class MatchStory extends React.Component {
  constructor() {
    super();
  }
  render() {
    try {
      var events = generateStory(this.props.match);
      return (<div>{events.map(event => event.render())}</div>);
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
