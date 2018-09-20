import heroData from 'dotaconstants/build/heroes.json';
import gameModeData from 'dotaconstants/build/game_mode.json';
import lobbyTypeData from 'dotaconstants/build/lobby_type.json';
// import patchData from 'dotaconstants/build/patch.json';
import store from '../../store';
import { formatTemplateToString } from '../../utility';

const getFields = () => {
  const { strings } = store.getState().app;

  /*
const mmrs = Array(20).fill().map((e, i) => i * 500).map(element => ({
  text: String(element),
  value: element,
  key: String(element),
}));
*/

  const rankTiers = Object.keys(strings).filter(str => str.indexOf('rank_tier_') === 0 && str !== 'rank_tier_0').map((str) => {
    const num = str.substring('rank_tier_'.length);
    return {
      text: `[${num}] ${strings[str]}`,
      value: num,
      key: String(num),
    };
  });

  const durations = Array(10).fill().map((e, i) => i * 10).map(duration => ({
    text: `${formatTemplateToString(strings.time_mm, duration)}`,
    searchText: formatTemplateToString(strings.time_mm, duration),
    value: duration * 60,
    key: String(duration),
  }));

  const having = Array(5).fill().map((e, i) => (i + 1) * 5).map(element => ({
    text: String(element),
    value: element,
    key: String(element),
  }));

  const limit = [100, 200, 500, 1000].map(element => ({
    text: String(element),
    value: element,
    key: String(element),
  }));

  const gameMode = Object.values(gameModeData).map(element => ({
    text: strings[`game_mode_${element.id}`],
    value: element.id,
    key: String(element.id),
  }));

  const lobbyType = Object.values(lobbyTypeData).map(element => ({
    text: strings[`lobby_type_${element.id}`],
    value: element.id,
    key: String(element.id),
  }));

  return ({
    group: [{
      text: strings.th_hero_id,
      value: 'public_player_matches.hero_id',
      key: 'hero',
      groupSize: 10,
    }, /* {
    text: strings.match_avg_mmr,
    value: 'avg_mmr/500*500',
    alias: 'avg_mmr',
    key: 'mmr',
  }, */
    {
      text: strings.match_avg_rank_tier,
      value: 'floor(avg_rank_tier)',
      key: 'avg_rank_tier',
      alias: 'avg_rank_tier',
    },
    {
      text: strings.explorer_side,
      value: '(public_player_matches.player_slot < 128)',
      alias: 'is_radiant',
      key: 'side',
      groupSize: 5,
    }, {
      text: strings.th_result,
      value: '((public_player_matches.player_slot < 128) = public_matches.radiant_win)',
      alias: 'win',
      key: 'result',
      groupSize: 5,
    }, {
      text: strings.heading_duration,
      value: 'duration/300*5',
      alias: 'minutes',
      key: 'duration',
    }, {
      text: strings.filter_game_mode,
      value: 'game_mode',
      key: 'game_mode',
    }, {
      text: strings.filter_lobby_type,
      value: 'lobby_type',
      key: 'lobby_type',
    }, {
      text: strings.th_primary_attr,
      value: 'primary_attr',
      key: 'primary_attr',
      groupSize: 10,
    }, {
      text: strings.th_legs,
      value: 'legs',
      key: 'legs',
      groupSize: 10,
    }, {
      text: strings.th_attack_type,
      value: 'attack_type',
      key: 'attack_type',
      groupSize: 10,
    }, /* {
    text: strings.explorer_patch,
    value: 'patch',
    key: 'patch',
  }, */],
    // minMmr: mmrs,
    // maxMmr: mmrs,
    minRankTier: rankTiers,
    maxRankTier: rankTiers,
    hero: Object.keys(heroData).map(heroId => ({
      text: `[${heroId}] ${heroData[heroId].localized_name}`,
      searchText: heroData[heroId].localized_name,
      value: heroData[heroId].id,
      key: String(heroData[heroId].id),
    })),
    minDuration: durations,
    maxDuration: durations,
    side: [{
      text: strings.general_radiant,
      value: true,
      key: 'radiant',
    }, {
      text: strings.general_dire,
      value: false,
      key: 'dire',
    }],
    result: [{
      text: strings.td_win,
      value: true,
      key: 'win',
    }, {
      text: strings.td_loss,
      value: false,
      key: 'loss',
    }],
    gameMode,
    lobbyType,
    order: [{ text: strings.explorer_asc, value: 'ASC', key: 'asc' }, { text: strings.explorer_desc, value: 'DESC', key: 'desc' }],
    having,
    limit,
  });
};

export default getFields;
