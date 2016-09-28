import React from 'react';
import fetch from 'isomorphic-fetch';
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Row, Col } from 'react-flexbox-grid';
// import { Tabs, Tab } from 'material-ui/Tabs';
import DatePicker from 'material-ui/DatePicker';
import constants from 'dotaconstants';
import Spinner from '../Spinner';
import { API_HOST } from '../../config';
// import {blue300} from 'material-ui/styles/colors';


class Combos extends React.Component {

  constructor() {
    super();
    const today = new Date();
    const aWhileAgo = new Date();
    aWhileAgo.setMonth(aWhileAgo.getMonth() - 2);
    this.state = {
      hero_id: 1,
      team_size: 2,
      oppo_size: 1,
      loading: false,
      loading_matchup: false,
      date_max: today,
      date_min: aWhileAgo,
      result: {},
      matchup: {},
      matchup_ids: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMatchupIds = this.getMatchupIds.bind(this);
  }

  componentDidMount() {}

  getMatchupIds(matchup) {
    this.setState(Object.assign({}, this.state, { loading_matchup: true }));
    
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

    const team_heroes = Object.keys(matchup)
      .map((k) => k.indexOf('team') === 0 ? matchup[k] : null)
      .filter((k) => k);
    
    // const opp_heroes =  Object.keys(matchup)
    //   .map((k) => k.indexOf('opp') === 0 ? matchup[k] : null)
    //   .filter((k) => k);
    
    const filter = team_heroes.map((k, i) => `pm${i + 1}.hero_id = ${k}`)
      .concat(
         Object.keys(matchup)
        .map((k) => k.indexOf('opp') === 0 ? matchup[k] : null)
        .filter((k) => k)
        .map((k, i) => `opm${i + 1}.hero_id = ${k}`)
      )
      .join(' AND ');
    
    console.log(filter);
    
    fetch(`${API_HOST}/api/explorer`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: `
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
        `,
      }),
    }).then(resp => resp.json()).then((json) =>
      this.setState(Object.assign({}, this.state, {
        loading_matchup: false,
        matchup: matchup,
        matchup_ids: json,
      }))
    );
  }
  
  handleSubmit() {
    const dateToTimestamp = date => date.getTime() / 1000;
    const minTimestamp = dateToTimestamp(this.state.date_min);
    const maxTimestamp = dateToTimestamp(this.state.date_max);
    const select = [1, 2, 3, 4, 5].map(i => (`${i <= this.state.team_size ?
            `pm${i}.hero_id` : `''`} team${i},`)).join('');
    const select2 = [1, 2, 3, 4, 5].map(i => (`${i <= this.state.oppo_size ?
            `opm${i}.hero_id` : `''`} opp${i},`)).join('');
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
    fetch(`${API_HOST}/api/explorer`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: `
        select
        ${select}
        ${select2}
        count(*),
        sum(case when ((pm1.player_slot < 128) = m.radiant_win)
            then 1 else 0 end)::float / count(*) as win
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
        HAVING count(*) > 5
        ORDER BY win DESC
        LIMIT 1000
        `,
      }),
    }).then(resp => resp.json()).then((json) =>
      this.setState(Object.assign({}, this.state, {
        loading: false,
        result: json,
      }))
    );
  }

  render() {
    return (<div>
      <h3>Hero Combos</h3>
      {/* Form */}
      <Row>
        <Col md={3}>
          <SelectField
            value={this.state.hero_id}
            floatingLabelFixed
            onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { hero_id: value }))}
            floatingLabelText="Hero"
          >
            {Object.keys(constants.heroes)
            .sort((a, b) => constants.heroes[a].localized_name.localeCompare(
                constants.heroes[b].localized_name))
            .map(h => (
              <MenuItem value={constants.heroes[h].id} primaryText={constants.heroes[h].localized_name} />
            ))}
          </SelectField> <br />
          <SelectField
            value={this.state.team_size}
            floatingLabelFixed
            onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { team_size: value }))}
            floatingLabelText="Team Stack Size"
          >
            {[1, 2, 3, 4, 5].map(i => (
              <MenuItem value={i} primaryText={i.toString()} />
            ))}
          </SelectField> <br />
          <SelectField
            value={this.state.oppo_size}
            floatingLabelFixed
            onChange={(e, i, value) => this.setState(Object.assign({}, this.state, { oppo_size: value }))}
            floatingLabelText="Opponent Stack Size"
          >
            {[0, 1, 2, 3, 4, 5].map(i => (
              <MenuItem value={i} primaryText={i.toString()} />
            ))}
          </SelectField> <br />
          <DatePicker
            value={this.state.date_min}
            floatingLabelFixed
            onChange={(e, date) => this.setState(Object.assign({}, this.state, { date_min: date }))}
            floatingLabelText="Date Range: Min"
          />
          <DatePicker
            value={this.state.date_max}
            floatingLabelFixed
            onChange={(e, date) => this.setState(Object.assign({}, this.state, { date_max: date }))}
            floatingLabelText="Date Range: Max"
          />
          <RaisedButton label="Submit" primary onClick={this.handleSubmit} />
        </Col>
        <Col md={9}>
          {/* Detailed Row */}
          {this.state.loading_matchup ?
            <Spinner />
            :
            <div>
              <h3>Match Up</h3>
                {this.state.matchup_ids.result ?
                  (Object.keys(this.state.matchup).map((k) => (
                    (k.indexOf('team') === 0 || k.indexOf('opp') === 0) &&
                    constants.heroes[this.state.matchup_ids.result[k]] ?
                      <TableRowColumn>
                        <img
                          src={`${API_HOST}${constants.heroes[this.state.matchup_ids.result[k]].img}`}
                          style={{ width: '50px' }} title={this.state.matchup_ids.result[k]}
                          role="presentation"
                        />
                        <div>{constants.heroes[this.state.matchup_ids.result[k]].localized_name}</div>
                      </TableRowColumn> : ""
                  ))
                : <p>{"No matchup selected. Click a number in the 'counts' column."}</p>}
              <Table>
                 <TableBody displayRowCheckbox={false}>
                    {
                      this.state.matchup_ids.result ? 
                        this.state.matchup_ids.result.rows.map(r =>
                          (
                          <TableRow><TableRowColumn>
                            <a href={`${API_HOST}/matches/${r.match_id}`}>{r.match_id}</a>
                          </TableRowColumn></TableRow>
                          )
                        )
                      : <div/>
                    }
                  </TableBody>
              </Table>
            </div>
          }
        </Col>
      </Row>
      {/* Counts table */}
      <br /> <br /> {!this.state.loading ?
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              {this.state.result.result ?
              this.state.result.result.fields.map(f =>
                <TableHeaderColumn>{f.name}</TableHeaderColumn>) : []}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.result.result ?
              this.state.result.result.rows.map(r => (
                <TableRow>
                  {
                    Object.keys(r).map((k) => (
                      (k.indexOf('team') === 0 || k.indexOf('opp') === 0) &&
                      constants.heroes[r[k]] ?
                        <TableRowColumn>
                          <img
                            src={`${API_HOST}${constants.heroes[r[k]].img}`}
                            style={{ width: '50px' }} title={r[k]}
                            role="presentation"
                          />
                          <div>{constants.heroes[r[k]].localized_name}</div>
                        </TableRowColumn> :
                        <TableRowColumn>
                          {k === 'win' ?
                            `${(r[k] * 100).toFixed(2)}%`
                            : 
                          k === 'count' ?
                            <div onClick={() => {this.getMatchupIds(r)}}>{r[k]}</div>
                            :
                            r[k]
                          }
                        </TableRowColumn>
                    ))
                  }
                </TableRow>
                )
              )
              : <div />
            }
          </TableBody>
        </Table> : <Spinner />
      }
    </div>);
  }

}

export default Combos;
