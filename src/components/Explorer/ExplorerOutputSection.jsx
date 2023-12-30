import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  displayHeroId,
  formatSeconds,
  IMAGESIZE_ENUM,
}
  from '../../utility';
import Table from '../Table';
import { IconRadiant, IconDire, IconTrophy } from '../Icons';
// import heroes from 'dotaconstants/build/heroes.json';
import {
  TablePercent,
  inflictorWithValue,
}
  from '../Visualizations';
// import redrawGraphs from './redrawGraphs';
import constants from '../constants';
import { StyledTeamIconContainer } from '../Match/StyledMatch';
import HeroImage from './../Visualizations/HeroImage';
import { WinnerSpan } from '../Matches';

const items = (await import('dotaconstants/build/items.json')).default;

/*
function resolveId(key, value, mappings) {
  if (key === 'hero_id') {
    return (heroes[value] || {}).localized_name;
  } else if (key === 'account_id') {
    return mappings.playerMapping[value];
  } else if (key === 'team_id') {
    return mappings.teamMapping[value];
  }
  return value;
}
*/

class ExplorerOutputSection extends React.Component {
  static propTypes = {
    rows: PropTypes.string,
    fields: PropTypes.string,
    expandedBuilder: PropTypes.string,
    // teamMapping: PropTypes.string,
    playerMapping: PropTypes.string,
    format: PropTypes.string,
    strings: PropTypes.shape({}),
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.rows !== this.props.rows || nextProps.format !== this.props.format;
  }
  render() {
    const {
      rows = [], fields, expandedBuilder, playerMapping, format, strings,
    } = this.props;
    /*
    setTimeout(() => {
      const firstCol = fields && fields[0].name;
      redrawGraphs(rows.map(row => ({
        ...row,
        [firstCol]: resolveId(firstCol, row[firstCol], { teamMapping, playerMapping }) }
      )), firstCol, (expandedBuilder.select && expandedBuilder.select.key) || strings.th_count);
    }, 100);
      */
    if (format === 'donut') {
      return <div id="donut" />;
    } else if (format === 'bar') {
      return <div id="bar" />;
    } else if (format === 'timeseries') {
      return <div id="timeseries" />;
    }
    return (
      <Table
        data={(rows || []).slice(0, 500)}
        columns={(fields || []).map(column => ({
          displayName: column.name === 'count' ? strings.general_matches : column.name,
          field: column.name,
        })).map(column => ({
          ...column,
          displayFn: (row, col, field) => {
            if (column.field === 'match_id') {
              return <Link to={`/matches/${field}`}>{field}</Link>;
            } else if (column.field.indexOf('hero_id') === 0) {
              return displayHeroId(row, col, field);
            } else if (column.field.indexOf('_composition') !== -1) {
              return (
                <React.Fragment>
                  {row.team_a_win === (column.field.indexOf('team_a') === 0)
                  && (
                  <WinnerSpan style={{ position: 'relative' }}>
                    <IconTrophy style={{ position: 'absolute', left: -12, bottom: 12 }} />
                  </WinnerSpan>
                  )}
                  {field.map((id) => (
                    <HeroImage
                      id={id}
                      imageSizeSuffix={IMAGESIZE_ENUM.SMALL.suffix}
                      style={{ marginRight: 3, height: 25 }}
                    />
                  ))}
                </React.Fragment>
              );
            } else if (column.field.indexOf('account_id') === 0) {
              return <Link to={`/players/${field}`}>{playerMapping[field] || field}</Link>;
            } else if (column.field.indexOf('winrate') === 0 || column.field.indexOf('pickrate') === 0 || column.field === 'winrate_wilson') {
              return (field >= 0 && field <= 1 ? <TablePercent
                percent={Number((field * 100).toFixed(2))}
              /> : null);
            } else if (column.field === 'rune_id') {
              return strings[`rune_${field}`];
            } else if (column.field === 'item_name') {
              return items[field] ? items[field].dname : field;
            } else if (column.field === 'time' || (column.field === 'avg' && expandedBuilder.select && expandedBuilder.select.formatSeconds)) {
              return formatSeconds(field);
            } else if (column.field === 'inflictor') {
              return <span>{inflictorWithValue(field)} {field}</span>;
            } else if (column.field === 'win') {
              return <span style={{ color: field ? constants.colorSuccess : constants.colorDanger }}>{field ? strings.td_win : strings.td_loss}</span>;
            } else if (column.field === 'is_radiant') {
              return field
                ? <StyledTeamIconContainer><IconRadiant width={30} />{strings.general_radiant}</StyledTeamIconContainer>
                : <StyledTeamIconContainer><IconDire width={30} />{strings.general_dire}</StyledTeamIconContainer>;
            } else if (column.field === 'start_time') {
              return (new Date(field * 1000)).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });
            } else if (column.field === 'game_mode') {
              return strings[`game_mode_${field}`];
            } else if (column.field === 'lobby_type') {
              return strings[`lobby_type_${field}`];
            }
            if (typeof field === 'string') {
              return field;
            }
            return JSON.stringify(field);
          },
          sortFn: (row) => {
            if (row[column.field] === null || typeof row[column.field] === 'boolean' || Number.isNaN(Number(row[column.field]))) {
              return row[column.field];
            }
            return Number(Number(row[column.field]).toFixed(4));
          },
        }))}
      />);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(ExplorerOutputSection);
