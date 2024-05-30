import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import heroes from 'dotaconstants/build/heroes.json';
import itemColors from 'dotaconstants/build/item_colors.json';
import emotes from 'dota2-emoticons/resources/json/charname.json';
import { IconRadiant, IconDire } from '../Icons';
import HeroImage from "../Visualizations/HeroImage";
import {
  formatSeconds,
  jsonFn,
  formatTemplate,
  formatTemplateToString,
} from '../../utility';
import { StyledEmote, StyledStoryNetWorthBar, StyledStoryNetWorthText, StyledStoryGoldAmount, StyledStorySpan, StyledStoryWrapper } from './StyledMatch';
import constants from '../constants';
import store from '../../store';
import config from '../../config';

const items = (await import('dotaconstants/build/items.json')).default;

const heroesArr = jsonFn(heroes);

// can be used in conjunction with is_radiant
const TEAM = {
  radiant: true,
  dire: false,
};

const GoldSpan = (amount) => {
  const { strings } = store.getState().app;
  return (
    <StyledStorySpan key={`gold_${amount}`}>
      <StyledStoryGoldAmount>
        {amount.toLocaleString()}
      </StyledStoryGoldAmount>
      <img
        width="25px"
        height="17px"
        alt={` ${strings.story_gold}`}
        src='/assets/images/dota2/gold.png'
        style={{ marginLeft: '3px' }}
      />
    </StyledStorySpan>
  );
};

const TeamSpan = (isRadiant) => {
  const { strings } = store.getState().app;
  return (
    <StyledStorySpan isRadiant={isRadiant} key={`team_${isRadiant ? 'radiant' : 'dire'}`}>
      {isRadiant ? <IconRadiant /> : <IconDire />}
      {isRadiant ? strings.general_radiant : strings.general_dire}
    </StyledStorySpan>
  );
};

// Modified version of PlayerThumb
const PlayerSpan = (player) => {
  const { strings } = store.getState().app;

  if (!player || !heroes[player.hero_id]) {
    return strings.story_invalid_hero;
  }
  const heroName = heroes[player.hero_id] ? heroes[player.hero_id].localized_name : strings.story_invalid_hero;
  return (
    <span>
      <Tooltip title={player.account_id ? player.personaname : strings.general_anonymous}>
        <StyledStorySpan
          key={`player_${player.player_slot}`}
          style={{ color: (player.isRadiant ? constants.colorGreen : constants.colorRed) }}
        >
          <HeroImage id={player.hero_id} isIcon />
          {heroName}
        </StyledStorySpan>
      </Tooltip>
    </span>);
};

// Modified version of PlayerThumb
const ItemSpan = item => (
  <StyledStorySpan
    key={`item_${item}`}
    style={{ color: itemColors[(items[item] || {}).qual] }}
  >
    <img
      width="26px"
      src={items[item]
        ? `${config.VITE_IMAGE_CDN}${items[item].img}`
        : '/assets/images/blank-1x1.gif'
      }
      alt={(items[item] || {}).dname}
    />
    {(items[item] || {}).dname}
  </StyledStorySpan>
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

// Adds a fullstop to the end of a sentence, and capitalizes the first letter if it can
const toSentence = (content) => {
  const { strings } = store.getState().app;

  const result = capitalizeFirst(content);
  result.push(`${strings.story_fullstop} `);
  return result;
};

const articleFor = (followingWord) => {
  const { strings } = store.getState().app;

  // Whether we use a or an depends on the sound of the following word, but that's much hardder to detect programmatically,
  // so we're looking solely at vowel usage for now.
  if (['A', 'E', 'I', 'O', 'U'].includes(followingWord.charAt(0))) {
    return strings.article_before_vowel_sound;
  }

  return strings.article_before_consonant_sound;
};

const formatApproximateTime = (timeSeconds) => {
  const { strings } = store.getState().app;

  const timeMinutes = parseInt(timeSeconds / 60, 10);

  // If the time is at least two hours, describe it in hours
  if (timeMinutes > 120) {
    const timeHours = parseInt(timeSeconds / (60 * 60), 10);
    return `${strings.advb_over} ${formatTemplateToString(strings.time_hh, timeHours)}`;
  } else if (timeMinutes > 60 && timeMinutes <= 120) {
    // If the time is an hour to a quarter after, describe it as "over an hour"
    return `${strings.advb_over} ${strings.time_h}`;
  } else if (timeMinutes >= 50 && timeMinutes < 60) {
    // If the time is between 50 and 60 minutes, describe it as "almost an hour"
    return `${strings.advb_almost} ${strings.time_h}`;
  }
  // Otherwise, describe the time in minutes
  return `${strings.advb_about} ${formatTemplateToString(strings.time_mm, timeMinutes)}`;
};

const renderSentence = (template, dict) => toSentence(formatTemplate(template, dict));

// Enumerates a list of items using the correct language syntax
const formatList = (list, noneValue = []) => {
  const { strings } = store.getState().app;

  switch (list.length) {
    case 0:
      return noneValue;
    case 1:
      return list;
    case 2:
      return formatTemplate(strings.story_list_2, { 1: list[0], 2: list[1] });
    case 3:
      return formatTemplate(strings.story_list_3, { 1: list[0], 2: list[1], 3: list[2] });
    default:
      return formatTemplate(strings.story_list_n, { i: list.shift(), rest: formatList(list) });
  }
};

const isQuestion = message => /\w(?:\W*(\?)\W*)$/.test(message);

// evaluate the sentiment behind the message - rage, question, statement etc
const evaluateSentiment = (event, lastMessage) => {
  const { strings } = store.getState().app;

  const { message, player, time } = event;
  const sentiment = isQuestion(message) ? ['question'] : ['statement'];

  if (lastMessage && lastMessage.time + 130 > time) {
    if (player && lastMessage.player_slot === player.player_slot) {
      sentiment.push('continued');
    } else if (isQuestion(lastMessage.key)) {
      sentiment.push('response');
    }
  }

  if (message.split(' ').length > 10) {
    sentiment.push('long');
  } else if (['XD', ':D', 'LOL'].includes(message.replace('?', '').toUpperCase())) {
    sentiment.push('laughed');
  } else if (message.toUpperCase() === message && /\w/.test(message)) {
    sentiment.push('shouted');
  } else if (/(\?|!|@|~|#|\$){2,}/.test(message)) {
    sentiment.push('excited');
  } else {
    sentiment.push('normal');
  }

  return strings[sentiment.join('_')];
};

const emoteKeys = Object.keys(emotes);

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

class IntroEvent extends StoryEvent {
  constructor(match) {
    super(-90);
    this.game_mode = match.game_mode;
    this.region = match.region;
    this.date = new Date(match.start_time * 1000);
    this.match_duration_seconds = match.duration;
  }
  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_intro, {
      game_mode_article: articleFor(strings[`game_mode_${this.game_mode}`]),
      game_mode: strings[`game_mode_${this.game_mode}`],
      date: this.date.toLocaleDateString(
        (window.localStorage && window.localStorage.getItem('localization')) || 'en-US',
        {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        },
      ),
      region: strings[`region_${this.region}`],
      duration_in_words: formatApproximateTime(this.match_duration_seconds),
    });
  }
}

class FirstbloodEvent extends StoryEvent {
  constructor(match, obj) {
    super(obj.time);
    this.killer = match.players.find(player => player.player_slot === obj.player_slot);

    if (obj.key !== null && obj.key !== undefined) {
      this.victim = match.players[obj.key];
    } else {
      const killerLog = this.killer.kills_log;
      const victimHero = (Array.isArray(killerLog) && killerLog[0] ? killerLog[0].key : null);
      const foundHero = heroesArr('find')(hero => hero.name === victimHero);
      this.victim = match.players.find(player => foundHero && player.hero_id === foundHero.id);
    }
  }
  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_firstblood, {
      time: formatSeconds(this.time),
      killer: PlayerSpan(this.killer),
      victim: PlayerSpan(this.victim),
    });
  }
}

class ChatMessageEvent extends StoryEvent {
  constructor(match, obj, lastMessage) {
    super(obj.time + 70);
    this.type = obj.type;
    this.player = match.players.find(player => player.player_slot === obj.player_slot);
    this.lastMessage = lastMessage;
    this.message = obj.key.trim();
  }

  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_chatmessage, {
      player: PlayerSpan(this.player),
      message: this.message.split('')
        .map((char) => {
          const emote = emotes[emoteKeys[emoteKeys.indexOf(char)]];
          if (emote) {
            return <StyledEmote emote={emote} />;
          }
          return char;
        }),
      said_verb: evaluateSentiment(this, this.lastMessage),
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
    const { strings } = store.getState().app;

    return ((this.action === 'CHAT_MESSAGE_AEGIS' && strings.timeline_aegis_picked_up) ||
      (this.action === 'CHAT_MESSAGE_AEGIS_STOLEN' && strings.timeline_aegis_snatched) ||
      (this.action === 'CHAT_MESSAGE_DENIED_AEGIS' && strings.timeline_aegis_denied));
  }
  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_aegis, {
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
    const { strings } = store.getState().app;

    const formatted = formatTemplate(strings.story_roshan, { team: TeamSpan(this.team) });
    return this.aegis ? formatList([formatted, this.aegis.format()]) : formatted;
  }
}

class CourierKillEvent extends StoryEvent {
  constructor(match, obj) {
    super(obj.time);
    this.team = obj.team === 2;
    // Adjust for incorrect data from post 7.23 core bug
    // Here the team value is killer id
    if (obj.killer === undefined) {
        this.team = obj.team > 4
        obj.killer = (this.team ? 123 : 0) + obj.team
    }
    this.killer = match.players.find(player => player.player_slot === obj.killer) || -1;
    this.amount = obj.value || 0;
  }
  format() {
    const { strings } = store.getState().app;
    const team = TeamSpan(this.team)
    const killer = this.killer === -1 ? TeamSpan(!this.team) : PlayerSpan(this.killer);

    // Legacy team couriers
    if (this.killer === null) {
      return formatTemplate(strings.story_courier_kill, {
        team,
      });
    }
    if (this.amount === 0) {
      return formatTemplate(strings.story_courier_kill_killer, {
        team,
        killer,
      });
    }
    return formatTemplate(strings.story_courier_kill_gold, {
      team,
      killer,
      gold: GoldSpan(this.amount),
    });
  }
}

class PredictionEvent extends StoryEvent {
  constructor(match, team) {
    super(team);
    if (team === -89) {
      this.team = true; // radiant
      this.players = match.players.filter(player => player.isRadiant && player.pred_vict);
    } else {
      this.team = false; // dire
      this.players = match.players.filter(player => !player.isRadiant && player.pred_vict);
    }
  }
  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_predicted_victory, {
      players: formatList(this.players.map(PlayerSpan), strings.story_predicted_victory_empty),
      team: TeamSpan(this.team),
    });
  }
}

const localizedLane = strings => ({
  1: strings.lane_pos_1,
  2: strings.lane_pos_2,
  3: strings.lane_pos_3,
});

const getLaneScore = players => (Math.max(...players.map(player => player.gold_t[10] || 0)) || 0);
const laneScoreDraw = 500;

class LaneStory {
  constructor(match, lane) {
    this.radiant_players = match.players.filter(player => player.lane === parseInt(lane, 10) && player.isRadiant && (!player.is_roaming));
    this.dire_players = match.players.filter(player => player.lane === parseInt(lane, 10) && !player.isRadiant && (!player.is_roaming));
    this.lane = lane;
    this.winning_team = getLaneScore(this.radiant_players) > getLaneScore(this.dire_players);
    this.is_draw = Math.abs(getLaneScore(this.radiant_players) - getLaneScore(this.dire_players)) <= laneScoreDraw;
  }
  format() {
    const { strings } = store.getState().app;

    // If there is nobody in this lane
    if (this.radiant_players.length === 0 && this.dire_players.length === 0) {
      return renderSentence(strings.story_lane_empty, {
        lane: localizedLane(strings)[this.lane],
      });
    }
    // If only one team is in this lane
    if (this.radiant_players.length === 0 || this.dire_players.length === 0) {
      return renderSentence(strings.story_lane_free, {
        players: formatList(this.radiant_players.concat(this.dire_players).map(PlayerSpan)),
        lane: localizedLane(strings)[this.lane],
      });
    }
    // If both teams are in this lane

    // If it's close enough to be a draw
    if (this.is_draw) {
      return renderSentence(strings.story_lane_draw, {
        radiant_players: formatList(this.radiant_players.map(PlayerSpan), strings.story_lane_empty),
        dire_players: formatList(this.dire_players.map(PlayerSpan), strings.story_lane_empty),
        lane: localizedLane(strings)[this.lane],
      });
    }

    // If one team won
    return renderSentence(this.winning_team ? strings.story_lane_radiant_win : strings.story_lane_radiant_lose, {
      radiant_players: formatList(this.radiant_players.map(PlayerSpan), strings.story_lane_empty),
      dire_players: formatList(this.dire_players.map(PlayerSpan), strings.story_lane_empty),
      lane: localizedLane(strings)[this.lane],
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
    const { strings } = store.getState().app;

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
    const { strings } = store.getState().app;

    return renderSentence(strings.story_lane_roam, {
      players: formatList(this.players.map(PlayerSpan)),
    });
  }
}

class LanesEvent extends StoryEvent {
  constructor(match) {
    super(10 * 60);
    this.lanes = Object.keys(localizedLane({})).map(lane => new LaneStory(match, lane));
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
    const { strings } = store.getState().app;

    return [strings.story_lane_intro, <ul key="lanestory">{this.lanes.map(lane => <li key={lane.lane}>{lane.format()}</li>)}</ul>];
  }
}

// returnes a formatted template when given a TowerEvent or BarracksEvent
const formatBuilding = (event) => {
  const { strings } = store.getState().app;

  let template = strings.story_building_destroy;
  if (event.player) {
    template = event.player.isRadiant === event.team ? strings.story_building_deny_player : strings.story_building_destroy_player;
  }
  return formatTemplate(template, {
    building: event.localizedBuilding,
    player: event.player ? PlayerSpan(event.player) : null,
  });
};

class TowerEvent extends StoryEvent {
  constructor(match, obj) {
    super(obj.time);
    if (obj.type === 'building_kill') {
      const groups = /npc_dota_(good|bad)guys_tower(1|2|3|4)_?(bot|mid|top|)/.exec(obj.key);
      this.team = groups[1] === 'good';
      this.tier = parseInt(groups[2], 10);
      this.lane = {
        bot: 1,
        mid: 2,
        top: 3,
        '': 2,
      }[groups[3]];
      this.player = match.players.find(player => player.player_slot === obj.player_slot);
    } else if (obj.type === 'CHAT_MESSAGE_TOWER_KILL' || obj.type === 'CHAT_MESSAGE_TOWER_DENY') {
      this.player = match.players.find(player => player.player_slot === obj.player_slot);
      this.team = obj.type === 'CHAT_MESSAGE_TOWER_DENY' ? this.player.isRadiant : obj.team !== 2;
    }
  }
  get localizedBuilding() {
    const { strings } = store.getState().app;

    const template = this.tier === undefined ? strings.story_tower_simple : strings.story_tower;
    return formatTemplate(template, {
      team: TeamSpan(this.team),
      tier: this.tier,
      lane: localizedLane(strings)[this.lane],
    });
  }
  format() {
    return formatBuilding(this);
  }
}

class BarracksEvent extends StoryEvent {
  constructor(match, obj) {
    super(obj.time);
    if (obj.type === 'building_kill') {
      const groups = /npc_dota_(good|bad)guys_(range|melee)_rax_(bot|mid|top)/.exec(obj.key);
      this.team = groups[1] === 'good';
      this.is_melee = groups[2] === 'melee';
      this.lane = {
        bot: 1,
        mid: 2,
        top: 3,
      }[groups[3]];
      this.player = match.players.find(player => player.player_slot === obj.player_slot);
    } else if (obj.type === 'CHAT_MESSAGE_BARRACKS_KILL') {
      this.team = obj.key >= 64;
      this.key = obj.key < 64 ? obj.key : obj.key / 64;
      const power = Math.log2(this.key);
      this.is_melee = (power % 2) === 0;
      this.lane = Math.floor(power / 2) + 1;
    }
  }
  get localizedBuilding() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_barracks, {
      team: TeamSpan(this.team),
      lane: localizedLane(strings)[this.lane],
      rax_type: this.is_melee ? strings.building_melee_rax : strings.building_range_rax,
    });
  }
  format() {
    return formatBuilding(this);
  }
}

class BuildingListEvent extends StoryEvent {
  constructor(buildingEvents) {
    super(buildingEvents[0].time);
    this.buildings = buildingEvents;
  }
  format() {
    const { strings } = store.getState().app;

    const buildingList = [];
    [TEAM.radiant, TEAM.dire].forEach((team) => {
      const towers = this.buildings.filter(building => building.team === team && building instanceof TowerEvent);
      if (towers.length === 1) {
        buildingList.push(towers[0].localizedBuilding);
      } else if (towers.length > 1) {
        buildingList.push(formatTemplate(strings.story_towers_n, {
          team: TeamSpan(team),
          n: towers.length,
        }));
      }
      Object.keys(localizedLane(strings)).forEach((lane) => {
        const barracks = this.buildings.filter(building => (
          building.team === team && building instanceof BarracksEvent && building.lane === parseInt(lane, 10)));
        if (barracks.length === 1) {
          buildingList.push(barracks[0].localizedBuilding);
        } else if (barracks.length === 2) {
          buildingList.push(formatTemplate(strings.story_barracks_both, {
            team: TeamSpan(team),
            lane: localizedLane(strings)[lane],
          }));
        }
      });
    });
    return formatTemplate(strings.story_building_list_destroy, { buildings: formatList(buildingList) });
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
    const { strings } = store.getState().app;

    let template = strings.story_teamfight;
    if (this.win_dead.length === 0) {
      template = strings.story_teamfight_none_dead;
    } else if (this.lose_dead.length === 0) {
      template = strings.story_teamfight_none_dead_loss;
    }
    let formatted = [renderSentence(template, {
      winning_team: TeamSpan(this.winning_team),
      net_change: GoldSpan(this.gold_delta),
      win_dead: formatList(this.win_dead.map(death => (
        death.count === 1 ? PlayerSpan(death.player) : [PlayerSpan(death.player), `(x${death.count})`]))),
      lose_dead: formatList(this.lose_dead.map(death => (
        death.count === 1 ? PlayerSpan(death.player) : [PlayerSpan(death.player), `(x${death.count})`]))),
    })];
    if (this.during_events.length > 0) {
      formatted = formatted.concat(renderSentence(
        strings.story_during_teamfight,
        { events: formatObjectiveEvents(this.during_events) },
      ));
    }
    if (this.after_events.length > 0) {
      formatted = formatted.concat(renderSentence(
        strings.story_after_teamfight,
        { events: formatObjectiveEvents(this.after_events) },
      ));
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
        if (item in items && items[item].cost >= price && time < this.time) {
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
        if (item in items && items[item].cost >= price) {
          found = true;
        }
      });
    });
    return found;
  }
  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_expensive_item, {
      time: formatSeconds(this.time),
      player: PlayerSpan(this.player),
      item: ItemSpan(this.item),
      price_limit: GoldSpan(this.price_limit),
    });
  }
}

class ItemPurchaseEvent extends StoryEvent {
  constructor(player, purchase) {
    super(purchase.time);
    this.player = player;
    this.item = purchase.key;
  }
  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_item_purchase, {
      time: formatSeconds(this.time),
      player: PlayerSpan(this.player),
      item: ItemSpan(this.item),
    });
  }
}

class TimeMarkerEvent extends StoryEvent {
  constructor(match, minutes) {
    super(minutes * 60);
    this.radiant_gold = match.players
      .filter(player => player.isRadiant)
      .map(player => player.gold_t[minutes])
      .reduce((a, b) => a + b, 0);
    this.dire_gold = match.players
      .filter(player => !player.isRadiant)
      .map(player => player.gold_t[minutes])
      .reduce((a, b) => a + b, 0);
    this.radiant_percent = Math.round(100 * this.radiant_gold / (this.radiant_gold + this.dire_gold));
    this.dire_percent = 100 - this.radiant_percent;
  }
  formatSentence() {
    return this.format();
  }
  get minutes() {
    return this.time / 60;
  }
  format() {
    const { strings } = store.getState().app;

    return [
      <h3 key={`minute_${this.minutes}_subheading`} style={{ marginBottom: 0 }}>
        {formatTemplate(strings.story_time_marker, { minutes: this.minutes })}
      </h3>,
      <StyledStoryNetWorthText key={`minute_${this.minutes}_networth_text`}>
        <StyledStoryNetWorthText width={this.radiant_percent}>
          {GoldSpan(this.radiant_gold)}
        </StyledStoryNetWorthText>
        <StyledStoryNetWorthText style={{ backgroundColor: 'rgba(0,0,0,0)' }} color={this.radiant_gold > this.dire_gold ? constants.colorGreen : constants.colorRed} left={this.radiant_percent}>
          {formatTemplate(strings.story_networth_diff, {
            percent: Math.abs(this.radiant_percent - this.dire_percent),
            gold: GoldSpan(Math.abs(this.radiant_gold - this.dire_gold)),
          })}
        </StyledStoryNetWorthText>
        <StyledStoryNetWorthText width={this.dire_percent}>
          {GoldSpan(this.dire_gold)}
        </StyledStoryNetWorthText>
      </StyledStoryNetWorthText>,
      <StyledStoryNetWorthBar key={`minute_${this.minutes}_networth`}>
        <StyledStoryNetWorthText color={constants.colorGreen} width={this.radiant_percent} />
        <StyledStoryNetWorthText color={constants.colorRed} width={this.dire_percent} />
      </StyledStoryNetWorthBar>,
    ];
  }
}

class GameoverEvent extends StoryEvent {
  constructor(match) {
    super(match.duration);
    this.winning_team = match.radiant_win;
    this.radiant_score = match.radiant_score || match.players
      .filter(player => player.isRadiant)
      .map(player => player.kills)
      .reduce((a, b) => a + b, 0);
    this.dire_score = match.dire_score || match.players
      .filter(player => !player.isRadiant)
      .map(player => player.kills)
      .reduce((a, b) => a + b, 0);
  }
  format() {
    const { strings } = store.getState().app;

    return formatTemplate(strings.story_gameover, {
      duration: formatSeconds(this.time),
      winning_team: TeamSpan(this.winning_team),
      radiant_score: <font key="radiant_score" color={constants.colorGreen}>{this.radiant_score}</font>,
      dire_score: <font key="dire_score" color={constants.colorRed}>{this.dire_score}</font>,
    });
  }
}

// Modified version of timeline data
const generateStory = (match) => {
  let events = [];

  // Intro
  events.push(new IntroEvent(match));

  // Prediction
  let predExists = false;
  match.players.forEach((player) => {
    if (player.pred_vict === true) {
      predExists = true;
    }
  });
  if (predExists === true) {
    events.push(new PredictionEvent(match, -89));
    events.push(new PredictionEvent(match, -88));
  }

  // Firstblood
  const fbIndex = match.objectives.findIndex(obj => obj.type === 'CHAT_MESSAGE_FIRSTBLOOD');

  if (fbIndex > -1) {
    events.push(new FirstbloodEvent(match, match.objectives[fbIndex]));
  }

  // Chat messages
  const chatMessageEvents = match.chat
    .filter(obj => obj.type === 'chat')
    .map((obj, i, array) => new ChatMessageEvent(match, obj, i > 0 && array[i - 1]));
  events = events.concat(chatMessageEvents);

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

  // Courier kills
  events = events.concat(match.objectives
    .filter(obj => obj.type === 'CHAT_MESSAGE_COURIER_LOST')
    .map(obj => new CourierKillEvent(match, obj)));

  // Teamfights
  events = events.concat(match.teamfights && match.teamfights.length > 0 ? match.teamfights.map(fight => new TeamfightEvent(match, fight)) : []);

  // Lanes (1=Bottom, 2=Middle, 3=Top) (jungle/roaming not considered a lane here)
  if (match.duration > 10 * 60) {
    events.push(new LanesEvent(match));
  }

  // New Buildings Events
  match.objectives.filter(obj => obj.type === 'building_kill').forEach((obj) => {
    if (obj.key.includes('tower')) {
      events.push(new TowerEvent(match, obj));
    } else if (obj.key.includes('rax')) {
      events.push(new BarracksEvent(match, obj));
    }
  });

  // Old Buildings Events
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

  // Rapiers
  match.players.forEach((player) => {
    player.purchase_log.forEach((purchase) => {
      if (purchase.key === 'rapier') {
        events.push(new ItemPurchaseEvent(player, purchase));
      }
    });
  });

  // Time Markers
  for (let min = 20; min < (match.duration / 60); min += 10) {
    events.push(new TimeMarkerEvent(match, min));
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

  // Remove any unneeded Time Markers
  events = events.filter((event, i, list) => i === (list.length - 1) || !(event instanceof TimeMarkerEvent && list[i + 1] instanceof TimeMarkerEvent));

  return events;
};

class MatchStory extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({}),
  }

  renderEvents() {
    const events = generateStory(this.props.match);
    return (<StyledStoryWrapper key="matchstory">{events.map(event => event.render())}</StyledStoryWrapper>);
  }
  render() {
    const { strings } = this.props;
    try {
      return this.renderEvents();
    } catch (e) {
      let exmsg = 'Story Tab Error:\n';
      if (e.message) {
        exmsg += e.message;
      }
      if (e.stack) {
        exmsg += ` | stack: ${e.stack}`;
      }
      console.error(exmsg); // eslint-disable-line no-console
      return (<div>{strings.story_error}</div>);
    }
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(MatchStory);
