/* global API_HOST */
import React from 'react';
import strings from 'lang';
import {
  formatSeconds,
  jsonFn,
} from 'utility';
import { IconRadiant, IconDire } from 'components/Icons';
import heroes from 'dotaconstants/build/heroes.json';
import items from 'dotaconstants/build/items.json';
import ReactTooltip from 'react-tooltip';
import styles from './Match.css';

const heroesArr = jsonFn(heroes);

// can be used in conjunction with is_radiant
const TEAM = {
  radiant: true,
  dire: false,
};

const GoldSpan = amount => (
  <span key={`gold_${amount}`} className={styles.storySpan}>
    <font color={styles.golden}>{amount} </font>
    <img
      width="25px"
      height="17px"
      role="presentation"
      src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`}
    />
  </span>
);

const TeamSpan = isRadiant => (
  <span key={`team_${isRadiant ? 'radiant' : 'dire'}`} style={{ color: (isRadiant ? styles.green : styles.red) }} className={styles.storySpan}>
    {isRadiant ? <IconRadiant className={styles.iconRadiant} /> : <IconDire className={styles.iconDire} />}
    {isRadiant ? strings.general_radiant : strings.general_dire}
  </span>
);

// Modified version of PlayerThumb
const PlayerSpan = (player) => {
  if (!player || !heroes[player.hero_id]) {
    return strings.story_invalid_hero;
  }
  return (
    <span>
      <span
        data-tip
        data-for={`player_${player.account_id}`}
        key={`player_${player.player_slot}`}
        style={{ color: (player.isRadiant ? styles.green : styles.red) }}
        className={styles.storySpan}
      >
        <img
          src={heroes[player.hero_id]
            ? `${API_HOST}${heroes[player.hero_id].icon}`
            : '/assets/images/blank-1x1.gif'
          }
          role="presentation"
        />
        {heroes[player.hero_id] ? heroes[player.hero_id].localized_name : strings.story_invalid_hero}
      </span>
      <ReactTooltip id={`player_${player.account_id}`} place="left" effect="solid">
        {player.account_id ? player.personaname : strings.general_anonymous}
      </ReactTooltip>
    </span>);
};

// Modified version of PlayerThumb
const ItemSpan = item => (
  <span key={`item_${item}`} className={styles.storySpan}>
    <img
      width="26px"
      src={items[item]
        ? `${API_HOST}${items[item].img}`
        : '/assets/images/blank-1x1.gif'
      }
      role="presentation"
    />
    {items[item].dname}
  </span>
);

const capitalizeFirst = (list) => {
  if (typeof list[0] === 'string' || list[0] instanceof String) {
    if (list[0].length > 0) { // MORE STUFF HERE
      return [list[0][0].toUpperCase() + list[0].slice(1)].concat(list.slice(1));
    }
  } else if (list[0] instanceof Array) {
    if (list[0].length > 0) {
      return [capitalizeFirst(list[0])].concat(list.slice(1));
    }
  }
  return list.slice(0);
};

// Fills in a template with the vars provided in the dict
// Adds a fullstop if it's indicated that this is a sentence
const renderTemplate = (template, dict) => {
  const pattern = /(\{[^}]+\})/g;
  let result = template.split(pattern);
  for (let i = 0; i < result.length; i += 1) {
    if (result[i].match(pattern) && result[i].slice(1, -1) in dict) {
      result[i] = dict[result[i].slice(1, -1)];
    }
  }
  result = result.filter(part => part !== '');
  return result;
};

// Adds a fullstop to the end of a sentence, and capitalizes the first letter if it can
const toSentence = (content) => {
  const result = capitalizeFirst(content);
  result.push(`${strings.story_fullstop} `);
  return result;
};

const renderSentence = (template, dict) => toSentence(renderTemplate(template, dict));

// Enumerates a list of items using the correct language syntax
const formatList = (items, noneValue = []) => {
  switch (items.length) {
    case 0:
      return noneValue;
    case 1:
      return items;
    case 2:
      return renderTemplate(strings.story_list_2, { 1: items[0], 2: items[1] });
    case 3:
      return renderTemplate(strings.story_list_3, { 1: items[0], 2: items[1], 3: items[2] });
    default:
      return renderTemplate(strings.story_list_n, { i: items.shift(), rest: formatList(items) });
  }
};

// Abstract class
class StoryEvent {
  constructor(time) {
    this.time = time;
  }
  formatSentence() {
    return toSentence(this.format());
  }
  render() {
    return <div key={`event_at_${this.time}`}>{this.formatSentence()}</div>;
  }
}

class FirstbloodEvent extends StoryEvent {
  constructor(match, time, playerSlot, key) {
    super(time);
    this.killer = match.players.find(player => player.player_slot === playerSlot);
    this.victim = match.players.find((player) => {
      const foundHero = heroesArr('find')(hero => hero.name === key);
      return foundHero && player.hero_id === foundHero.id;
    });
  }
  format() {
    return renderTemplate(strings.story_firstblood, {
      time: formatSeconds(this.time),
      killer: PlayerSpan(this.killer),
      victim: PlayerSpan(this.victim),
    });
  }
}

class AegisEvent extends StoryEvent {
  constructor(match, obj, index) {
    super(obj.time);
    this.action = obj.type;
    this.index = index;
    this.player = match.players.find(player => player.player_slot === obj.player_slot);
  }
  get localizedAction() {
    return ((this.action === 'CHAT_MESSAGE_AEGIS' && strings.timeline_aegis_picked_up) ||
            (this.action === 'CHAT_MESSAGE_AEGIS_STOLEN' && strings.timeline_aegis_snatched) ||
            (this.action === 'CHAT_MESSAGE_DENIED_AEGIS' && strings.timeline_aegis_denied));
  }
  format() {
    return renderTemplate(strings.story_aegis, {
      action: this.localizedAction,
      player: PlayerSpan(this.player),
    });
  }
}

class RoshanEvent extends StoryEvent {
  constructor(match, obj, index, aegisEvents) {
    super(obj.time);
    this.team = obj.team === 2;
    this.aegis = aegisEvents.find(aegis => aegis.index === index);
  }
  format() {
    const formatted = renderTemplate(strings.story_roshan, { team: TeamSpan(this.team) });
    return this.aegis ? formatList([formatted, this.aegis.format()]) : formatted;
  }
}

const localizedLane = {
  1: strings.lane_pos_1,
  2: strings.lane_pos_2,
  3: strings.lane_pos_3,
};

const getLaneScore = players => (Math.max(players.map(player => player.lane_efficiency)) || 0);

class LaneStory {
  constructor(match, lane) {
    this.radiant_players = match.players.filter(player => player.lane === parseInt(lane, 10) && player.isRadiant && (!player.is_roaming));
    this.dire_players = match.players.filter(player => player.lane === parseInt(lane, 10) && !player.isRadiant && (!player.is_roaming));
    this.lane = lane;
    this.winning_team = getLaneScore(this.radiant_players) > getLaneScore(this.dire_players);
  }
  format() {
    // If there is nobody in this lane
    if (this.radiant_players.length === 0 && this.dire_players.length === 0) {
      return renderSentence(strings.story_lane_empty, {
        lane: localizedLane[this.lane],
      });
    }
    // If only one team is in this lane
    if (this.radiant_players.length === 0 || this.dire_players.length === 0) {
      return renderSentence(strings.story_lane_free, {
        players: this.radiant_players.concat(this.dire_players),
        lane: localizedLane[this.lane],
      });
    }
    // If both teams are in this lane
    return renderSentence(this.winning_team ? strings.story_lane_radiant_win : strings.story_lane_radiant_lose, {
      radiant_players: formatList(this.radiant_players.map(PlayerSpan), strings.story_lane_empty),
      dire_players: formatList(this.dire_players.map(PlayerSpan), strings.story_lane_empty),
      lane: localizedLane[this.lane],
    });
  }
}

class JungleStory {
  constructor(match) {
    this.players = match.players.filter(player => (player.lane === 4 || player.lane === 5) && !player.is_roaming);
    this.lane = 4;
  }
  static exists(match) {
    return match.players.filter(player => (player.lane === 4 || player.lane === 5) && !player.is_roaming).length > 0;
  }
  format() {
    return renderSentence(strings.story_lane_jungle, {
      players: formatList(this.players.map(PlayerSpan)),
    });
  }
}

class RoamStory {
  constructor(match) {
    this.players = match.players.filter(player => player.is_roaming);
    this.lane = 6;
  }
  static exists(match) {
    return match.players.filter(player => player.is_roaming).length > 0;
  }
  format() {
    return renderSentence(strings.story_lane_roam, {
      players: formatList(this.players.map(PlayerSpan)),
    });
  }
}

class LanesEvent extends StoryEvent {
  constructor(match) {
    super(10 * 60);
    this.lanes = Object.keys(localizedLane).map(lane => new LaneStory(match, lane));
    if (JungleStory.exists(match)) {
      this.lanes.push(new JungleStory(match));
    }
    if (RoamStory.exists(match)) {
      this.lanes.push(new RoamStory(match));
    }
  }
  formatSentence() {
    return this.format();
  }
  format() {
    return [strings.story_lane_intro, <ul key="lanestory">{this.lanes.map(lane => <li key={lane.lane}>{lane.format()}</li>)}</ul>];
  }
}

class TowerEvent extends StoryEvent {
  constructor(match, obj) {
    super(obj.time);
    this.is_deny = obj.type === 'CHAT_MESSAGE_TOWER_DENY';
    this.team = obj.team !== 2; // We want the team that the tower belongs to, so get the opposite
    this.player = match.players.find(player => player.player_slot === obj.player_slot);
    if (!this.player) {
      this.template = strings.story_building_destroy;
    } else {
      this.template = this.is_deny ? strings.story_building_deny_player : strings.story_building_destroy_player;
    }
  }
  get localizedBuilding() {
    return renderTemplate(strings.story_tower, { team: TeamSpan(this.team) });
  }
  format() {
    return renderTemplate(this.template, {
      building: this.localizedBuilding,
      player: this.player ? PlayerSpan(this.player) : null,
    });
  }
}

class BarracksEvent extends StoryEvent {
  constructor(match, obj) {
    super(obj.time);
    this.team = obj.key >= 64;
    this.key = obj.key < 64 ? obj.key : obj.key / 64;
    const power = Math.log2(this.key);
    this.is_melee = (power % 2) === 0;
    this.lane = Math.floor(power / 2) + 1;
  }
  get localizedBuilding() {
    return renderTemplate(strings.story_barracks, {
      team: TeamSpan(this.team),
      lane: localizedLane[this.lane],
      rax_type: this.is_melee ? strings.building_melee_rax : strings.building_range_rax,
    });
  }
  format() {
    return renderTemplate(strings.story_building_destroy, { building: this.localizedBuilding });
  }
}

class BuildingListEvent extends StoryEvent {
  constructor(buildingEvents) {
    super(buildingEvents[0].time);
    this.buildings = buildingEvents;
  }
  format() {
    const buildingList = [];
    [TEAM.radiant, TEAM.dire].forEach((team) => {
      const towers = this.buildings.filter(building => building.team === team && building instanceof TowerEvent);
      if (towers.length === 1) {
        buildingList.push(towers[0].localizedBuilding);
      } else if (towers.length > 1) {
        buildingList.push(renderTemplate(strings.story_towers_n, {
          team: TeamSpan(team),
          n: towers.length,
        }));
      }
      Object.keys(localizedLane).forEach((lane) => {
        const barracks = this.buildings.filter(building => (
          building.team === team && building instanceof BarracksEvent && building.lane === parseInt(lane, 10)));
        if (barracks.length === 1) {
          buildingList.push(barracks[0].localizedBuilding);
        } else if (barracks.length === 2) {
          buildingList.push(renderTemplate(strings.story_barracks_both, {
            team: TeamSpan(team),
            lane: localizedLane[lane],
          }));
        }
      });
    });
    return renderTemplate(strings.story_building_list_destroy, { buildings: formatList(buildingList) });
  }
}


const formatObjectiveEvents = (events) => {
  let formatted = events.filter(event => !(event instanceof TowerEvent || event instanceof BarracksEvent));
  const buildings = events.filter(event => event instanceof TowerEvent || event instanceof BarracksEvent);
  if (buildings.length <= 1) {
    formatted = formatted.concat(buildings);
  } else {
    formatted.push(new BuildingListEvent(buildings));
  }
  return formatList(formatted.map(event => event.format()));
};

class TeamfightEvent extends StoryEvent {
  constructor(match, fight) {
    super(fight.start);
    this.time_end = fight.end;

    this.winning_team = fight.radiant_gold_advantage_delta >= 0; // is_radiant value basically
    this.gold_delta = Math.abs(fight.radiant_gold_advantage_delta);
    const deaths = fight.players
        .map((player, i) => ({ player: match.players[i], count: player.deaths }))
        .filter(death => death.count > 0);
    this.win_dead = deaths.filter(death => death.player.isRadiant === this.winning_team);
    this.lose_dead = deaths.filter(death => death.player.isRadiant !== this.winning_team);
    this.during_events = [];
    this.after_events = [];
  }
  formatSentence() {
    return this.format();
  }
  format() {
    let formatted = [renderSentence(this.win_dead.length > 0 ? strings.story_teamfight : strings.story_teamfight_none_dead, {
      winning_team: TeamSpan(this.winning_team),
      net_change: GoldSpan(this.gold_delta),
      win_dead: formatList(this.win_dead.map(death => (
        death.count === 1 ? new PlayerSpan(death.player) : [new PlayerSpan(death.player), `(x${death.count})`]))),
      lose_dead: formatList(this.lose_dead.map(death => (
        death.count === 1 ? new PlayerSpan(death.player) : [new PlayerSpan(death.player), `(x${death.count})`]))),
    })];
    if (this.during_events.length > 0) {
      formatted = formatted.concat(renderSentence(strings.story_during_teamfight,
        { events: formatObjectiveEvents(this.during_events) }));
    }
    if (this.after_events.length > 0) {
      formatted = formatted.concat(renderSentence(strings.story_after_teamfight,
        { events: formatObjectiveEvents(this.after_events) }));
    }
    return formatted;
  }
}

class ExpensiveItemEvent extends StoryEvent {
  constructor(match, price) {
    super(match.duration);
    this.price_limit = price;
    match.players.forEach((player) => {
      Object.entries(player.first_purchase_time).forEach(([item, time]) => {
        if (items[item].cost >= price && time < this.time) {
          this.time = time;
          this.item = item;
          this.player = player;
        }
      });
    });
  }
  static exists(match, price) {
    let found = false;
    match.players.forEach((player) => {
      Object.keys(player.first_purchase_time).forEach((item) => {
        if (items[item].cost >= price) {
          found = true;
        }
      });
    });
    return found;
  }
  format() {
    return renderTemplate(strings.story_expensive_item, {
      time: formatSeconds(this.time),
      player: PlayerSpan(this.player),
      item: ItemSpan(this.item),
      price_limit: GoldSpan(this.price_limit),
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
      radiant_score: <font key="radiant_score" color={styles.green}>{this.radiant_score}</font>,
      dire_score: <font key="dire_score" color={styles.red}>{this.dire_score}</font>,
    });
  }
}

// Modified version of timeline data
const generateStory = (match) => {
  // Firstblood
  const fbIndex = match.objectives.findIndex(obj => obj.type === 'CHAT_MESSAGE_FIRSTBLOOD');
  let events = [];

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
  const aegisEvents = match.objectives
    .filter(obj => obj.type === 'CHAT_MESSAGE_AEGIS' ||
                   obj.type === 'CHAT_MESSAGE_AEGIS_STOLEN' ||
                   obj.type === 'CHAT_MESSAGE_DENIED_AEGIS')
    .map((obj, index) => new AegisEvent(match, obj, index));

  // Roshan kills, team 2 = radiant, 3 = dire
  events = events.concat(match.objectives
    .filter(obj => obj.type === 'CHAT_MESSAGE_ROSHAN_KILL')
    .map((obj, index) => new RoshanEvent(match, obj, index, aegisEvents)));

  // Teamfights
  events = events.concat(match.teamfights && match.teamfights.length > 0 ? match.teamfights.map(fight => new TeamfightEvent(match, fight)) : []);

  // Lanes (1=Bottom, 2=Middle, 3=Top) (jungle/roaming not considered a lane here)
  if (match.duration > 10 * 60) {
    events.push(new LanesEvent(match));
  }

  // Towers
  events = events.concat(match.objectives
      .filter(obj => obj.type === 'CHAT_MESSAGE_TOWER_KILL' || obj.type === 'CHAT_MESSAGE_TOWER_DENY')
      .map(obj => new TowerEvent(match, obj)));

  // Barracks
  events = events.concat(match.objectives
      .filter(obj => obj.type === 'CHAT_MESSAGE_BARRACKS_KILL')
      .map(obj => new BarracksEvent(match, obj)));

  // Expensive Item
  if (ExpensiveItemEvent.exists(match, 4000)) {
    events = events.concat(new ExpensiveItemEvent(match, 4000));
  }

  // Gameover
  events.push(new GameoverEvent(match));

  // Sort by time
  events.sort((a, b) => a.time - b.time);

  // ////// Group events together now

  // Group during events for teamfights

  let lastFight = null;
  for (let i = 0; i < events.length; i += 1) {
    if (events[i] instanceof TeamfightEvent) {
      lastFight = events[i];
    } else if (lastFight !== null && (events[i] instanceof RoshanEvent || events[i] instanceof TowerEvent || events[i] instanceof BarracksEvent)) {
      if (events[i].time < lastFight.time_end) { // During
        lastFight.during_events.push(events[i]);
        events.splice(i, 1);
        i -= 1;
      } else if (events[i].time < lastFight.time_end + (60 * 2)) { // After (within 2 minutes)
        lastFight.after_events.push(events[i]);
        events.splice(i, 1);
        i -= 1;
      }
    }
  }

  return events;
};

class MatchStory extends React.Component {
  renderEvents() {
    const events = generateStory(this.props.match);
    return (<div className={styles.storyWrapper} key="matchstory">{events.map(event => event.render())}</div>);
  }
  render() {
    try {
      return this.renderEvents();
    } catch (e) {
      return (<div>{strings.story_error}</div>);
    }
  }
}

export default MatchStory;
