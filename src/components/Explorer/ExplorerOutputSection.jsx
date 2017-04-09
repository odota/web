import React from 'react';
import {
  transformations,
  formatSeconds,
}
from 'utility';
import {
  Link,
}
from 'react-router';
import strings from 'lang';
import Table from 'components/Table';
import itemData from 'dotaconstants/build/items.json';
import { IconRadiant, IconDire } from 'components/Icons';
import matchStyles from 'components/Match/Match.css';
import heroes from 'dotaconstants/build/heroes.json';
import {
  TablePercent,
  inflictorWithValue,
}
from 'components/Visualizations';
import redrawGraphs from './redrawGraphs';
import styles from './Explorer.css';

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

class ExplorerOutputSection extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.rows !== this.props.rows || nextProps.format !== this.props.format;
  }
  render() {
    const { rows, fields, expandedBuilder, teamMapping, playerMapping, format } = this.props;
    setTimeout(() => {
      const firstCol = fields[0].name;
      redrawGraphs(rows.map(row => ({
        ...row,
        [firstCol]: resolveId(firstCol, row[firstCol], { teamMapping, playerMapping }) }
      )), firstCol, (expandedBuilder.select && expandedBuilder.select.key) || strings.th_count);
    }, 100);
    if (format === 'donut') {
      return <div id="donut" />;
    } else if (format === 'bar') {
      return <div id="bar" />;
    } else if (format === 'timeseries') {
      return <div id="timeseries" />;
    }
    return (
      <Table
        data={(rows || []).slice(0, 1000)}
        columns={(fields || []).map(column => ({
          displayName: column.name,
          field: column.name,
        })).map(column => ({
          ...column,
          displayFn: (row, col, field) => {
            if (column.field === 'match_id') {
              return <Link to={`/matches/${field}`}>{field}</Link>;
            } else if (column.field.indexOf('hero_id') === 0) {
              return transformations.hero_id(row, col, field);
            } else if (column.field.indexOf('account_id') === 0) {
              return <Link to={`/players/${field}`}>{playerMapping[field] || field}</Link>;
            } else if (column.field === 'winrate') {
              return (field >= 0 && field <= 1 ? <TablePercent
                percent={Number((field * 100).toFixed(2))}
              /> : null);
            } else if (column.field === 'adj_winrate') {
          /*
          const phat = field;
          const z = 1.96;
          const n = row.count;
          return ((phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n)).toFixed(2);
          */
              return field;
            } else if (column.field === 'rune_id') {
              return strings[`rune_${field}`];
            } else if (column.field === 'item_name') {
              return itemData[field] ? itemData[field].dname : field;
            } else if (column.field === 'team_id') {
              return teamMapping[field] || field;
            } else if (column.field === 'time' || (column.field === 'avg' && expandedBuilder.select && expandedBuilder.select.formatSeconds)) {
              return formatSeconds(field);
            } else if (column.field === 'inflictor') {
              return <span>{inflictorWithValue(field)} {field}</span>;
            } else if (column.field === 'win') {
              return <span className={field ? styles.textSuccess : styles.textDanger}>{field ? strings.td_win : strings.td_loss}</span>;
            } else if (column.field === 'is_radiant') {
              return field
            ? <span className={matchStyles.teamIconContainer}><IconRadiant className={matchStyles.iconRadiant} />{strings.general_radiant}</span>
            : <span className={matchStyles.teamIconContainer}><IconDire className={matchStyles.iconDire} />{strings.general_dire}</span>;
            } else if (column.field === 'start_time') {
              return (new Date(field * 1000)).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });
            }
            return typeof field === 'string' ? field : JSON.stringify(field);
          },
          sortFn: row => (isNaN(Number(row[column.field])) ? row[column.field] : Number(row[column.field])),
        }))}
      />);
  }
}

export default ExplorerOutputSection;
