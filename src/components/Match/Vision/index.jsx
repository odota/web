import React from 'react';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
import { formatSeconds, getTeamName } from 'utility';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import _ from 'lodash/fp';

import VisionMap from './VisionMap' ;
import WardLog from './WardLog';
import PlayerFilter from './PlayerFilter';
import styles from './Vision.css';

const SliderTicks = props => (
  <div className={styles.sliderTicks}>
    {props.ticks.map((tick) => {
      const [t, min, max] = [tick, props.min, props.max];
      const percent = 100 * ((t - min) / (max - min));
      const cls = [styles.sliderTick];

      if (tick <= props.value) {
        cls.push(styles.active);
      }

      return (
        <a key={tick} onClick={() => props.onTickClick(tick)} className={cls.join(' ')} style={{ left: `${percent}%` }}>
          {formatSeconds(tick)}
        </a>
      );
    })}
  </div>
);

// remove this component
const PlayersFilter = ({ activeFilters, players, onFilterClick }) => (
  <Paper>
    {players.map((p, index) => <PlayerFilter key={index} player={p} activeFilters={activeFilters} onFilterClick={onFilterClick} />)}
  </Paper>
);

const pipelineFilter = (filters, data) => {
  const filtered = filters.map(f => data.filter(f))
                          .reduce((o, v) => o.concat(v), []);

  return _.differenceWith((x, y) => x === y, data, filtered);
};

const FixedPlayersFilter = PlayersFilter;

class Vision extends React.Component {
  static hideWardLog(playerSlot, type) {
    return l => l.entered.player_slot === playerSlot && l.type === type;
  }

  constructor(props) {
    super(props);

    this.sliderMin = -90;
    this.sliderMax = props.match.duration;

    this.state = {
      currentTick: -90,
      filters: {},
    };

    this.ticks = this.computeTick();
    this.handleViewportChange = _.debounce(50, this.viewportChange);
  }

  computeTick() {
    const interval = 10 * 60; // every 10 minutes interval
    return _.rangeStep(interval, 0, this.sliderMax);
  }

  viewportChange(value) {
    this.setState({ currentTick: value });
  }

  visibleData() {
    const time = this.state.currentTick;

    return this.props.match.wards_log.filter(ward => time == -90 || (time > ward.entered.time && (!ward.left || time < ward.left.time)));
  }

  togglePlayerFilter(name, filter) {
    if (name in this.state.filters) {
      const oldFilters = Object.assign({}, this.state.filters);

      delete oldFilters[name];
      this.setState({ filters: oldFilters });
    } else {
      const newFilter = {};

      newFilter[name] = filter;
      this.setState({ filters: Object.assign({}, this.state.filters, newFilter) });
    }
  }

  render() {
    const visibleWards = this.visibleData();
    const playerFilterClick = (filterKey, playerSlot, type) => this.togglePlayerFilter(filterKey, Vision.hideWardLog(playerSlot, type));

    return (
      <div>
        <VisionMap match={this.props.match} wards={visibleWards} />
        <div className={styles.wardSliderText}>{this.state.currentTick == -90 ? "all time" : formatSeconds(this.state.currentTick)}</div>
        <SliderTicks
          value={this.state.currentTick}
          min={this.sliderMin}
          max={this.sliderMax}
          onTickClick={tick => this.handleViewportChange(tick)}
          ticks={this.ticks}
        />
        <Slider
          value={this.state.currentTick}
          min={this.sliderMin}
          max={this.sliderMax}
          step={5}
          disableFocusRipple
          onChange={(e, value) => this.handleViewportChange(value)}
        />
        <Row>
          <Col xs={12} md={6} lg={6} className={styles.wardLogPlayerFilter}>
            <Col xs className={styles.filterHeader}>
              {getTeamName(this.props.match.radiant_team, true)}
            </Col>
            {<FixedPlayersFilter
              activeFilters={this.state.filters}
              onFilterClick={playerFilterClick}
              players={this.props.match.players.slice(0, 5)}
            />
            }
          </Col>
          <Col xs={12} md={6} lg={6} className={styles.wardLogPlayerFilter}>
            <Col xs className={styles.filterHeader}>
              {getTeamName(this.props.match.dire_team, false)}
            </Col>
            {<FixedPlayersFilter
              activeFilters={this.state.filters}
              onFilterClick={playerFilterClick}
              players={this.props.match.players.slice(5)}
            />
            }
          </Col>
        </Row>
        <WardLog match={this.props.match} wards={visibleWards} />
      </div>
    );
  }
}

export default Vision;
