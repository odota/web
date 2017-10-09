import React from 'react';
import fetch from 'isomorphic-fetch';
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {
// transformations,
// formatSeconds,
}
  from 'utility';
import DataTable from 'components/Table';
import {
  TablePercent,
  // inflictorWithValue,
}
  from 'components/Visualizations';
import DatePicker from 'material-ui/DatePicker';
import heroes from 'dotaconstants/build/heroes.json';
import Spinner from 'components/Spinner';
import styled from 'styled-components';
import constants from 'components/constants';
import { Link } from 'react-router-dom';

// TODO show matchids for a row
// TODO integrate into explorer?

const selectField = { width: '200px' };
const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};
const ButtonAsLink = styled.button`
     background:none!important;
     color:${constants.colorBlue};
     border:none; 
     padding:0!important;
     font: inherit;
     cursor: pointer;
`;

class Combos extends React.Component {
  constructor() {
    super();
    const today = new Date();
    const aWhileAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
    this.state = {
      hero_id: 1,
      team_size: 2,
      oppo_size: 1,
      loading: false,
      // loading_matchup: false,
      date_max: today,
      date_min: aWhileAgo,
      result: {},
      // matchup: {},
      // matchup_ids: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
  getMatchupIds = (matchup) => {
    // this.setState(Object.assign({}, this.state, { loading_matchup: true }));

    const dateToTimestamp = date => date.getTime() / 1000;
    const minTimestamp = dateToTimestamp(this.state.date_min);
    const maxTimestamp = dateToTimestamp(this.state.date_max);

    const join1 = [2, 3, 4, 5].map(i => (i <= this.state.team_size ? `
          JOIN player_matches pm${i}
          ON pm1.match_id = pm${i}.match_id
          AND (pm1.player_slot < 128) = (pm${i}.player_slot < 128)
          AND pm${i}.hero_id != pm1.hero_id
          AND pm${i}.hero_id > 0
          ${i >= 3 ? `AND pm${i}.hero_id > pm${i - 1}.hero_id` : ''}
          ` : '')).join('');
    const join2 = [1, 2, 3, 4, 5].map(i => (i <= this.state.oppo_size ? `
          JOIN player_matches opm${i}
          ON pm1.match_id = opm${i}.match_id
          AND (pm1.player_slot < 128) != (opm${i}.player_slot < 128)
          ${i >= 2 ? `AND opm${i}.hero_id > opm${i - 1}.hero_id` : ''}
          ` : '')).join('');

    const teamHeroes = Object.keys(matchup)
      .map(k => (k.indexOf('team') === 0 ? matchup[k] : null))
      .filter(k => k);

    // const opp_heroes =  Object.keys(matchup)
    //   .map((k) => k.indexOf('opp') === 0 ? matchup[k] : null)
    //   .filter((k) => k);

    const filter = teamHeroes.map((k, i) => `pm${i + 1}.hero_id = ${k}`)
      .concat(Object.keys(matchup)
        .map(k => (k.indexOf('opp') === 0 ? matchup[k] : null))
        .filter(k => k)
        .map((k, i) => `opm${i + 1}.hero_id = ${k}`))
      .join(' AND ');

    const sql = `
    select pm1.match_id
    from player_matches pm1
    ${join1}
    ${join2}
    JOIN matches m
      ON pm1.match_id = m.match_id
      WHERE ${filter}
      AND m.start_time >= ${minTimestamp}
      AND m.start_time <= ${maxTimestamp}
    LIMIT 1000
    `;
    fetch(`${process.env.REACT_APP_API_HOST}/api/explorer?sql=${encodeURIComponent(sql)}`).then(resp => resp.json()).then(json =>
      this.setState(Object.assign({}, this.state, {
        // loading_matchup: false,
        // matchup,
        // matchup_ids: json,
      })));
  }
  */

  handleSubmit() {
    const dateToTimestamp = date => date.getTime() / 1000;
    const minTimestamp = dateToTimestamp(this.state.date_min);
    const maxTimestamp = dateToTimestamp(this.state.date_max);
    const select = [1, 2, 3, 4, 5].map(i => (`${i <= this.state.team_size ?
      `pm${i}.hero_id` : '\'\''} team${i},`)).join('');
    const select2 = [1, 2, 3, 4, 5].map(i => (`${i <= this.state.oppo_size ?
      `opm${i}.hero_id` : '\'\''} opp${i},`)).join('');
    const join1 = [2, 3, 4, 5].map(i => (i <= this.state.team_size ? `
          JOIN player_matches pm${i} 
          ON pm1.match_id = pm${i}.match_id 
          AND (pm1.player_slot < 128) = (pm${i}.player_slot < 128)
          AND pm${i}.hero_id != pm1.hero_id
          AND pm${i}.hero_id > 0
          ${i >= 3 ? `AND pm${i}.hero_id > pm${i - 1}.hero_id` : ''}
          ` : '')).join('');
    const join2 = [1, 2, 3, 4, 5].map(i => (i <= this.state.oppo_size ? `
          JOIN player_matches opm${i} 
          ON pm1.match_id = opm${i}.match_id 
          AND (pm1.player_slot < 128) != (opm${i}.player_slot < 128)
          ${i >= 2 ? `AND opm${i}.hero_id > opm${i - 1}.hero_id` : ''}
          ` : '')).join('');
    const groupBy = [1, 2, 3, 4, 5].map(i => `team${i}`)
      .concat([1, 2, 3, 4, 5].map(i => `opp${i}`))
      .join();
    console.log(select, select2, join1, join2, groupBy);
    this.setState(Object.assign({}, this.state, { loading: true }));
    const sql = `
    select
    ${select}
    'vs' as vs,
    ${select2}
    count(*),
    sum(case when ((pm1.player_slot < 128) = m.radiant_win)
        then 1 else 0 end)::float / count(*) as winrate
    from player_matches pm1
    ${join1}
    ${join2}
    JOIN matches m
      ON pm1.match_id = m.match_id
      WHERE pm1.hero_id = ${this.state.hero_id}
      AND m.start_time >= ${minTimestamp}
      AND m.start_time <= ${maxTimestamp}
    GROUP BY
    ${groupBy}
    HAVING count(*) >= 5
    ORDER BY winrate DESC
    LIMIT 1000
    `;
    fetch(`${process.env.REACT_APP_API_HOST}/api/explorer?sql=${encodeURIComponent(sql)}`).then(resp => resp.json()).then(json =>
      this.setState(Object.assign({}, this.state, {
        loading: false,
        result: json,
      })));
  }

  render() {
    return (
      <div>
        <h3>Hero Combos</h3>
        <div style={containerStyle}>
          <span style={selectField}>
            <SelectField
              value={this.state.hero_id}
              floatingLabelFixed
              onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { hero_id: value }))}
              floatingLabelText="Hero"
            >
              {Object.keys(heroes)
            .sort((a, b) => heroes[a].localized_name.localeCompare(heroes[b].localized_name))
            .map(h => (
              <MenuItem key={heroes[h].id} value={heroes[h].id} primaryText={heroes[h].localized_name} />
            ))}
            </SelectField>
          </span>
          <span style={selectField}>
            <SelectField
              value={this.state.team_size}
              floatingLabelFixed
              onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { team_size: value }))}
              floatingLabelText="Team Stack Size"
            >
              {[1, 2, 3, 4, 5].map(i => (
                <MenuItem key={i} value={i} primaryText={i.toString()} />
            ))}
            </SelectField>
          </span>
          <span style={selectField}>
            <SelectField
              value={this.state.oppo_size}
              floatingLabelFixed
              onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { oppo_size: value }))}
              floatingLabelText="Opponent Stack Size"
            >
              {[0, 1, 2, 3, 4, 5].map(i => (
                <MenuItem key={i} value={i} primaryText={i.toString()} />
            ))}
            </SelectField>
          </span>
          <span style={selectField}>
            <DatePicker
              autoOk
              container="inline"
              value={this.state.date_min}
              floatingLabelFixed
              onChange={(e, date) => this.setState(Object.assign({}, this.state, { date_min: date }))}
              floatingLabelText="Date Range: Min"
            />
          </span>
          <span style={selectField}>
            <DatePicker
              autoOk
              container="inline"
              value={this.state.date_max}
              floatingLabelFixed
              onChange={(e, date) => this.setState(Object.assign({}, this.state, { date_max: date }))}
              floatingLabelText="Date Range: Max"
            />
          </span>
        </div>
        <RaisedButton label="Submit" primary onClick={this.handleSubmit} />
        {this.state.loading ? <Spinner /> :
        <DataTable
          columns={(this.state.result.fields || []).map(column => ({
          displayName: column.name,
          field: column.name,
        })).map(column => ({
          ...column,
          displayFn: (row, col, field) => {
            if (column.field === 'match_id') {
              return <Link to={`/matches/${field}`}>{field}</Link>;
            } else if (column.field.indexOf('team') === 0 || column.field.indexOf('opp') === 0) {
              return heroes[row[column.field]] ?
                <div>
                  <img
                    src={`${process.env.REACT_APP_API_HOST}${heroes[row[column.field]].img}`}
                    style={{ width: '50px' }}
                    title={row[column.field]}
                    alt=""
                  />
                </div> : null;
            } else if (column.field === 'winrate') {
              return (field >= 0 && field <= 1 ? <TablePercent
                percent={Number((field * 100).toFixed(2))}
              /> : null);
            } else if (column.field === 'count') {
              return <ButtonAsLink onClick={() => { /* this.getMatchupIds(row); */ }} onKeyPress={() => {}}>{row[column.field]}</ButtonAsLink>;
            }
            return typeof field === 'string' ? field : JSON.stringify(field);
          },
          sortFn: row => (Number.isNaN(Number(row[column.field])) ? row[column.field] : Number(row[column.field])),
        }))}
          data={(this.state.result.rows || [])}
        />}
      </div>);
  }
}

export default Combos;
