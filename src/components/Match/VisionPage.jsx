import React from 'react';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
import { formatSeconds } from 'utility';
import { Fixed } from 'utility/components';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import Avatar from 'material-ui/Avatar';

import Heading from 'components/Heading';
import VisionMap from './VisionMap' ;
import WardLog from './WardLog';
import _ from 'lodash/fp';
import Perf from 'react-addons-perf';
import strings from 'lang';
import styles from './Match.css';
import { heroTd } from './matchColumns';

window.Perf = Perf;

const SliderTicks = (props) => (
  <div {...props} >
    {props.ticks.map((tick) => {
       const percent = 100*(tick-props.min)/(props.max-props.min);
       const cls = [styles['slider-tick']];
       if (tick <= props.value)
         cls.push(styles['active']);

       return <a key={tick} onClick={() => props.onTickClick(tick)} className={cls.join(' ')} style={{left: percent + '%'}}>{formatSeconds(tick)}</a>
     })}
  </div>
);

const generateFilterKey = ({ player_slot }, type) => `${player_slot}-${type}`;

const PlayersFilter = ({ activatedFilters, players, onFilterClick }) => (
  <Paper className={styles['ward-log-player-filter']}>
    {players.map((p,i) => (
       <Row className={styles['filter-row']}
            middle="xs"
            between="xs">
         <Col xs={1}></Col>
         <Col xs>{heroTd(p)}</Col>
         <Col xs style={{textAlign: 'right'}}>
           <Button label={_.random(0,20)}
                   style={{color: generateFilterKey("observer") in activatedFilters ? 'blue' : 'white'}}
                   onClick={() => onFilterClick(generateFilterKey(p, "observer"), p.player_slot, "observer")}
                   icon={<Avatar size={24} src="http://a19a1164.ngrok.io/apps/dota2/images/items/ward_observer_lg.png" />}
           />
           &nbsp;
           <Button label={_.random(0,20)}
                   onClick={() => onFilterClick(generateFilterKey(p, "sentry"), p.player_slot, "sentry")}
                   icon={<Avatar size={24} src="http://a19a1164.ngrok.io/apps/dota2/images/items/ward_sentry_lg.png" />}
           />
         </Col>
       </Row>
     ))}
  </Paper>
);

import Immutable from 'seamless-immutable';
const PipelineFilter = (filters, data, iter=Array.prototype.filter) => {
  const frozenData = Immutable(data);
  let filtered = filters.map(f => iter.call(frozenData, f))
                        .reduce((o, v) => o.concat(v), []);
  return _.differenceWith((x, y) => x === y, frozenData, filtered);
}

const FixedPlayersFilter = PlayersFilter;

class VisionPage extends React.Component {
  componentWillMount() {
    Perf.start();
  }  
  
  constructor(props) {
    super(props);
    this.state = {
      currentTick: -90,
      min: -90,
      max: props.match.duration,
      from: 0,
      to: this.props.match.wards_log.length,
      wardsLog: props.match.wards_log.map((e, i) => Object.assign(e, {key: i})),
      filters: {},
    }

    this.ticks = this.computeTick();
    this.findPivot = (value) => _.flow(_.map(x => x.entered.time),
                                       _.sortedIndex(value))(this.state.wardsLog);
    this.handleViewportChange = _.debounce(50, this._handleViewportChange);
  }

  computeTick() {
    const interval = 10 * 60; // every 10 minutes interval
    return _.rangeStep(interval, 0, this.props.match.duration);
  }

  _handleViewportChange(value) {
    const log = this.state.wardsLog;
    const p = this.state.from;
    
    this.setState({ currentTick: value, from: this.findPivot(value) });
    console.log(value);
  }

  visibleData() {
    return PipelineFilter(_.values(this.state.filters),
                          this.state.wardsLog.slice(this.state.from));
  }

  togglePlayerFilter(name, filter) {
    if (this.state.filters.hasOwnProperty(name)) return this.removePlayerFilter(name);

    let newFilter = {};
    newFilter[name] = filter;
    this.setState({filters: Object.assign({}, this.state.filters, newFilter)});
  }

  removePlayerFilter(name) {
    let oldFilters = Object.assign({}, this.state.filters);
    delete oldFilters[name];
    this.setState({filters: oldFilters});
  }

  hideWardLog(player_slot, type) {
    return (l) => l.entered.player_slot == player_slot && l.type == type
  }

  render() {
    const visibleWards = this.visibleData();
    const playerFilterClick = (filterKey, player_slot, type) => this.togglePlayerFilter(filterKey, this.hideWardLog(player_slot, type));
    return (
      <div>
        <Heading title={strings.heading_vision}/>
        <Row center="xs">
          <Col xs md={6}>
            <VisionMap wardsLog={visibleWards} />
          </Col>
          <Col xs md={6}>
            Radiant
            {<FixedPlayersFilter activatedFilters={_.keys(this.state.filters)} onFilterClick={playerFilterClick} players={_.take(5, this.props.match.players)} />}
            Dire
            {<FixedPlayersFilter activatedFilters={_.keys(this.state.filters)} onFilterClick={playerFilterClick} players={_.takeRight(5, this.props.match.players)} />}
          </Col>
        </Row>
        <Row>
          <Col xs>
            <SliderTicks value={this.state.currentTick}
                         min={this.state.min}
                         max={this.state.max}
                         className={styles['slider-ticks']}
                         onTickClick={(tick) => this.handleViewportChange(tick)}
                         ticks={this.ticks} />
            <Slider min={this.state.min}
                    max={this.state.max}
                    value={this.state.currentTick}
                    step={5}
                    disableFocusRipple={true}
                    onChange={(e, value) => this.handleViewportChange(value)} />
          </Col>
        </Row>
        <WardLog match={this.props.match}
                 wardsLog={visibleWards} />
      </div>
    );
  }
}

export default VisionPage;
