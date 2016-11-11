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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  grey800 as filterOff,
  blueGrey700 as filterOn
} from 'material-ui/styles/colors';
import Immutable from 'seamless-immutable'

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


class PlayerFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getObserverCount = () => this.props.player.obs_log.length;
    this.getSentryCount = () => this.props.player.sen_log.length;
  }
  
  generateFilterKey(type) {
    return `${this.props.player.player_slot}-${type}`;
  }
  
  getMuiThemeProps() {
    return {
      fullWidth: true,
      backgroundColor: _.sample([filterOn, filterOff]),
      disabledBackgroundColor: filterOff,
    };
  }

  render() {
    const {
      player,
      onFilterClick,
    } = this.props;
    const obs_count = this.getObserverCount();
    const sen_count = this.getSentryCount();
    const [opacityOn, opacityOff] = [1, .4];
    return (
      <Row className={styles['filter-row']}
           middle="xs"
           between="xs">
        <Col xs={12} sm={7}>
          <Row xs>
            <Col>{heroTd(player)}</Col>
          </Row>
        </Col>
        <Col xs={12} sm={5}>
          <Row>
            <Col xs>
                  <Button {...this.getMuiThemeProps()}
                        label={obs_count}
                        disabled={obs_count == 0}
                        backgroundColor={this.generateFilterKey("observer") in this.props.activeFilters ? filterOff : filterOn}
                        style={{opacity: obs_count > 0 ? opacityOn : opacityOff}}
                        onClick={() => onFilterClick(this.generateFilterKey("observer"), player.player_slot, "observer")}
                        icon={<Avatar size={24} src="http://a19a1164.ngrok.io/apps/dota2/images/items/ward_observer_lg.png" />}
                />
              </Col>
              <Col xs>
                  <Button {...this.getMuiThemeProps()}
                        label={sen_count}
                        disabled={sen_count == 0}
                        backgroundColor={this.generateFilterKey("sentry") in this.props.activeFilters ? filterOff : filterOn}
                        style={{opacity: sen_count > 0 ? opacityOn : opacityOff}}
                        onClick={() => onFilterClick(this.generateFilterKey("sentry"), player.player_slot, "sentry")}
                        icon={<Avatar size={24} src="http://a19a1164.ngrok.io/apps/dota2/images/items/ward_sentry_lg.png" />}
                />
              </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

// remove this component
const PlayersFilter = ({ activeFilters, players, onFilterClick }) => (
  <Paper>
    {players.map((p,i) => <PlayerFilter player={p} activeFilters={activeFilters} onFilterClick={onFilterClick} />)}
  </Paper>
);

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
        <Row center="md">
          <Col sm={12} md={4}>
            <VisionMap wardsLog={visibleWards} />
          </Col>
          <Col sm={12} md={8}>
            <Row>
              <Col xs={12} md={6} lg={12} className={styles['ward-log-player-filter']}>
                <Col xs className={styles['filter-header']}>
                  {strings.general_radiant}
                </Col>
                {<FixedPlayersFilter activeFilters={this.state.filters} onFilterClick={playerFilterClick} players={_.take(5, this.props.match.players)} />}
              </Col>
              <Col xs={12} md={6} lg={12} className={styles['ward-log-player-filter']}>
                <Col xs className={styles['filter-header']}>
                  {strings.general_dire}
                </Col>
                {<FixedPlayersFilter activeFilters={this.state.filters} onFilterClick={playerFilterClick} players={_.takeRight(5, this.props.match.players)} />}
              </Col>
            </Row>
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
