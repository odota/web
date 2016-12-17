import React from 'react';
import { formatSeconds } from 'utility';
import Slider from 'material-ui/Slider';
import _ from 'lodash/fp';
import strings from 'lang';

import VisionFilter from './VisionFilter';
import VisionItems from './VisionItems';
import VisionMap from './VisionMap' ;
import VisionLog from './VisionLog';
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

const alive = (ward, time) => time === -90 || (time > ward.entered.time && (!ward.left || time < ward.left.time));
const team = (ward, teams) => (teams.radiant && ward.player < 5) || (teams.dire && ward.player > 4);

class Vision extends React.Component {
  constructor(props) {
    super(props);

    this.sliderMin = -90;
    this.sliderMax = props.match.duration;

    this.state = {
      currentTick: -90,
      teams: {
        radiant: true,
        dire: true,
      },
      players: {
        observer: [
          true, true, true, true, true,
          true, true, true, true, true,
        ],
        sentry: [
          true, true, true, true, true,
          true, true, true, true, true,
        ],
      },
    };

    this.ticks = this.computeTick();
    this.handleViewportChange = _.debounce(50, this.viewportChange);
  }

  setPlayer(player, type, value) {
    this.state.players[type][player] = value;
    this.setState(this.state);
  }

  setTeam(team, value) {
    this.state.teams[team] = value;
    this.setState(this.state);
  }

  computeTick() {
    const interval = 10 * 60; // every 10 minutes interval
    return _.rangeStep(interval, 0, this.sliderMax);
  }

  viewportChange(value) {
    this.state.currentTick = value;
    this.setState(this.state);
  }

  visibleData() {
    const self = this;
    const filter = ward => alive(ward, self.state.currentTick) && team(ward, self.state.teams) && self.state.players[ward.type][ward.player];

    return this.props.match.wards_log.filter(filter);
  }

  render() {
    const visibleWards = this.visibleData();

    return (
      <div>
        <VisionMap match={this.props.match} wards={visibleWards} />
        <VisionFilter match={this.props.match} parent={this} />
        <div className={styles.visionSliderText}>
          {this.state.currentTick === -90 ? strings.vision_all_time : formatSeconds(this.state.currentTick)}
        </div>
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
