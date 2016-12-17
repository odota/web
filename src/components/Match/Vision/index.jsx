import React from 'react';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
import { formatSeconds, getTeamName } from 'utility';
import Slider from 'material-ui/Slider';
import _ from 'lodash/fp';

import VisionFilter from './VisionFilter';
import VisionItems from './VisionItems';
import VisionMap from './VisionMap' ;
import VisionLog from './VisionLog';
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
  <div>
    {players.map((p, index) => <PlayerFilter key={index} player={p} activeFilters={activeFilters} onFilterClick={onFilterClick} />)}
  </div>
);

const pipelineFilter = (filters, data) => {
  const filtered = filters.map(f => data.filter(f))
                          .reduce((o, v) => o.concat(v), []);

  return _.differenceWith((x, y) => x === y, data, filtered);
};

const FixedPlayersFilter = PlayersFilter;

class Vision extends React.Component {
  static hideVisionLog(playerSlot, type) {
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
    const playerFilterClick = (filterKey, playerSlot, type) => this.togglePlayerFilter(filterKey, Vision.hideVisionLog(playerSlot, type));

    return (
      <div>
        <VisionMap match={this.props.match} wards={visibleWards} />
        <VisionFilter match={this.props.match} />
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
        <VisionItems match={this.props.match} />
        <VisionLog match={this.props.match} wards={visibleWards} />
      </div>
    );
  }
}

export default Vision;
