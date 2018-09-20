import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import heroes from 'dotaconstants/build/heroes.json';
import {
  formatSeconds,
  getHeroesById,
  formatTemplateToString,
} from '../../utility';
import Table from '../Table';
import FormField from '../Form/FormField';
import { IconRadiant, IconDire } from '../Icons';
import mcs from './matchColumns';
import { StyledLogFilterForm } from './StyledMatch';
import HeroImage from '../Visualizations/HeroImage';

const St = styled.div`
table {
  width: 650px !important;
`;

const killIcon = (isRadiant) => {
  const icon = isRadiant ? 'radiant_kill.png' : 'dire_kill.png';
  return (
    <img
      src={`/assets/images/dota2/${icon}`}
      alt=""
      style={{ paddingRight: '6px', paddingBottom: '2px', float: 'left' }}
    />
  );
};

const isRadiant = (field, row) => {
  if (row.alt_key === 'CHAT_MESSAGE_COURIER_LOST') {
    return row.team !== 2;
  }
  return field === true || (row.unit && row.unit.indexOf('goodguys') !== -1) || row.team === 2;
};
const isDire = (field, row) => {
  if (row.alt_key === 'CHAT_MESSAGE_COURIER_LOST') {
    return row.team === 2;
  }
  return field === false || (row.unit && row.unit.indexOf('badguys') !== -1) || row.team === 3;
};

const logDetailIconStyle = {
  height: '30px', float: 'left', paddingTop: '7px', paddingRight: '5px',
};
const logDetailIconStyleTower = {
  height: '31px', paddingTop: '6px', float: 'left', position: 'relative', right: '6px',
};
const heroNames = getHeroesById();
const typeConfig = {
  kills: 0,
  objectives: 1,
  runes: 2,
};
const getObjectiveDesc = (objective, strings) => (objective.key && objective.type === 'CHAT_MESSAGE_BARRACKS_KILL' ? strings[`barracks_value_${objective.key}`] : '');
const getObjectiveBase = (objective, strings) => {
  if (objective.type === 'building_kill') {
    const desc = objective.key.indexOf('npc_dota_badguys') === 0 ? strings.general_dire : strings.general_radiant;
    return `${desc} ${(objective.key.split('guys_') || [])[1]}`;
  }
  return strings[objective.subtype || objective.type] || objective.subtype || objective.type;
};
const generateLog = (match, { types, players }, strings) => {
  let log = [];
  const matchPlayers = !players.length
    ? match.players
    : match.players.filter((p, i) => players.includes(i));

  if (types.includes(typeConfig.objectives)) {
    log = (match.objectives || []).reduce((objectivesLog, objective) => {
      if (!players.length || players.includes(objective.slot)) {
        /*
        let name;
        if (objective.slot === -1) {
          if (objective.team === 2) {
            name = strings.general_radiant;
          } else if (objective.team === 3) {
            name = strings.general_dire;
          }
        }
        */
        objectivesLog.push({
          ...objective,
          ...matchPlayers[objective.slot],
          type: 'objectives',
          alt_key: objective.type,
          detail: `${getObjectiveDesc(objective, strings)} ${getObjectiveBase(objective, strings)}`,
        });
      }
      return objectivesLog;
    }, log);
  }

  matchPlayers.forEach((player) => {
    if (types.includes(typeConfig.kills)) {
      log = log.concat((player.kills_log || []).map(entry => ({
        ...entry,
        ...player,
        type: 'kills',
        detail: `${entry.key}`,
      })));
    }

    if (types.includes(typeConfig.runes)) {
      log = log.concat((player.runes_log || []).map(entry => ({
        ...entry,
        ...player,
        type: 'runes',
        detail: `${entry.key}`,
      })));
    }
    /*
    log = log.concat((player.obs_log || []).map(entry => ({
      ...entry,
      ...player,
      type: 'obs_ward',
      detail: `${entry.key}`,
    })));
    */
  });
  log = log.sort((a, b) => a.time - b.time);
  return log;
};

const logColumns = (strings) => {
  const { heroTdColumn } = mcs(strings);
  return [
    {
      displayName: strings.th_time,
      field: 'time',
      displayFn: (row, col, field) => formatSeconds(field),
    },
    {
      displayName: strings.heading_is_radiant,
      tooltip: strings.heading_is_radiant,
      field: 'isRadiant',
      sortFn: true,
      displayFn: (row, col, field) =>
        (
          <span>
            {isRadiant(field, row) && <IconRadiant height="30" />}
            {isDire(field, row) && <IconDire height="30" />}
          </span>
        ),
    }, heroTdColumn,
    {
      displayName: strings.log_detail,
      field: 'detail',
      displayFn: (row) => {
        const translateBuildings = (isRad, key) => {
          const team = isRad ? strings.general_radiant : strings.general_dire;
          const k = key.split('_').slice(3).join('_');
          const dict = {
            fort: ` ${strings.building_ancient}`,
            healers: ` ${strings.heading_shrine}`,
            tower1_top: ` ${strings.top_tower} ${strings.tier1}`,
            tower2_top: ` ${strings.top_tower} ${strings.tier2}`,
            tower3_top: ` ${strings.top_tower} ${strings.tier3}`,
            tower1_mid: ` ${strings.mid_tower} ${strings.tier1}`,
            tower2_mid: ` ${strings.mid_tower} ${strings.tier2}`,
            tower3_mid: ` ${strings.mid_tower} ${strings.tier3}`,
            tower1_bot: ` ${strings.bot_tower} ${strings.tier1}`,
            tower2_bot: ` ${strings.bot_tower} ${strings.tier2}`,
            tower3_bot: ` ${strings.bot_tower} ${strings.tier3}`,
            tower4: ` ${strings.heading_tower} ${strings.tier4}`,
            melee_rax_top: ` ${'Top'} ${strings.building_melee_rax}`,
            melee_rax_mid: ` ${'Mid'} ${strings.building_melee_rax}`,
            melee_rax_bot: ` ${'Bot'} ${strings.building_melee_rax}`,
            range_rax_top: ` ${'Top'} ${strings.building_range_rax}`,
            range_rax_mid: ` ${'Mid'} ${strings.building_range_rax}`,
            range_rax_bot: ` ${'Bot'} ${strings.building_range_rax}`,
          };
          return team + dict[k];
        };

        switch (row.type) {
          case 'kills': {
            const hero = heroNames[row.detail] || {};
            return (
              <span>
                {killIcon(row.isRadiant)}
                <HeroImage id={hero.id} style={{ height: '30px', float: 'left', paddingTop: '6px' }} />
              </span>
            );
          }
          case 'runes': {
            const runeType = row.detail;
            const runeString = strings[`rune_${runeType}`];
            return (
              <span>
                <p style={{ float: 'left' }}>{strings.activated}</p>
                <img
                  src={`/assets/images/dota2/runes/${runeType}.png`}
                  alt=""
                  style={{ height: '30px', float: 'left' }}
                  data-tip
                  data-for={runeString}
                />
                <p style={{ float: 'left' }}> {runeString} {strings.rune}</p>
              </span>
            );
          }
          case 'objectives': {
            if (row.alt_key === 'CHAT_MESSAGE_FIRSTBLOOD') {
              return (
                <span>
                  <img
                    src="/assets/images/dota2/bloodsplattersmall2.png" // https://pixabay.com/en/ink-red-splatter-abstract-paint-303244/
                    alt=""
                    style={logDetailIconStyle}
                  />
                  <p>{strings.th_firstblood_claimed}</p>
                </span>
              );
            }
            if (row.alt_key === 'building_kill') {
              if (row.key.indexOf('goodguys') !== -1) {
                return (
                  <span>
                    {killIcon(row.isRadiant)}
                    <IconRadiant
                      style={logDetailIconStyleTower}
                    />
                    <p style={{ float: 'left' }}>
                      {translateBuildings(true, row.key)} {row.isRadiant === true ? `(${strings.building_denied})` : ''}
                    </p>
                  </span>
                );
              }

              return (
                <span>
                  {killIcon(row.isRadiant)}
                  <IconDire
                    style={logDetailIconStyleTower}
                  />
                  <p style={{ float: 'left' }}>
                    {translateBuildings(false, row.key)} {row.isRadiant === false ? `(${strings.building_denied})` : ''}
                  </p>
                </span>
              );
            }
            if (row.alt_key === 'CHAT_MESSAGE_AEGIS') {
              return (
                <span>
                  <img
                    src="/assets/images/dota2/aegis_icon.png"
                    alt=""
                    style={logDetailIconStyle}
                  />
                  <p>{strings.CHAT_MESSAGE_AEGIS}</p>
                </span>
              );
            }
            if (row.alt_key === 'CHAT_MESSAGE_ROSHAN_KILL') {
              return (
                <span>
                  <img
                    src="/assets/images/dota2/roshan.png"
                    alt=""
                    style={logDetailIconStyle}
                  />
                  <p>{strings.th_roshan}</p>
                </span>
              );
            }
            if (row.alt_key === 'CHAT_MESSAGE_COURIER_LOST') {
              const team = row.team === 2 ? strings.general_radiant : strings.general_dire;
              const courierIcon = row.team === 2 ? 'radiantcourier.png' : 'direcourier.png';
              return (
                <span>
                  <img
                    src={`/assets/images/dota2/${courierIcon}`}
                    alt=""
                    style={logDetailIconStyle}
                  />
                  <p>{formatTemplateToString(strings.story_courier_kill, { team })}</p>
                </span>
              );
            }
            return row.detail;
          }
          default:
            return row.detail;
        }
      },
    }];
};

class MatchLog extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      players: PropTypes.arrayOf({}),
    }),
    strings: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.state = {
      types: Object.values(typeConfig),
      players: [],
    };

    const { strings } = props;
    this.typesSource = [
      { text: strings.heading_kills, value: 0 },
      { text: strings.tab_objectives, value: 1 },
      { text: strings.heading_runes, value: 2 },
    ];
    this.playersSource = this.props.match.players.map((player, index) => ({
      text: heroes[player.hero_id] ? heroes[player.hero_id].localized_name : strings.general_no_hero,
      value: index,
    }));
  }

  addChip = (name, input, limit) => {
    const currentChips = this.state[name];
    const newChips = [input.value].concat(currentChips).slice(0, limit);
    this.setState({ [name]: newChips });
  };

  deleteChip = (name, index) => {
    const currentChips = this.state[name];
    const newChips = [
      ...currentChips.slice(0, index),
      ...currentChips.slice(index + 1),
    ];
    this.setState({ [name]: newChips });
  };

  render() {
    const { strings } = this.props;
    const runeTooltips = Object.keys(strings)
      .filter(str => str.indexOf('rune_') === 0)
      .map((runeKey) => {
        const runeString = strings[runeKey];
        return (
          <ReactTooltip id={runeString} key={runeString}>
            <span>{runeString}</span>
          </ReactTooltip>
        );
      });
    const logData = generateLog(this.props.match, this.state, strings);

    return (
      <div>
        {runeTooltips}
        <StyledLogFilterForm >
          <FormField
            name="types"
            label={strings.ward_log_type}
            dataSource={this.typesSource}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
            formSelectionState={this.state}
            strict
          />
          <FormField
            name="players"
            label={strings.log_heroes}
            dataSource={this.playersSource}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
            formSelectionState={this.state}
            strict
          />
        </StyledLogFilterForm>
        <St>
          <Table data={logData} columns={logColumns(strings)} />
        </St>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(MatchLog);
