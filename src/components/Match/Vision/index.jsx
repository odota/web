import React from 'react';
import PropTypes from 'prop-types';
import { formatSeconds } from 'utility';
import Slider from 'material-ui/Slider';
import _ from 'lodash/fp';
import strings from 'lang';
import styled from 'styled-components';
import VisionFilter from './VisionFilter';
import VisionItems from './VisionItems';
import VisionMap from './VisionMap';
import VisionLog from './VisionLog';
import constants from '../../constants';

const Styled = styled.div`
.visionLog {
  margin-top: 30px;
}

.visionSliderText {
  text-align: center;
  width: 200px;
  margin: 5px auto;
  text-transform: uppercase;
  color: ${constants.colorMutedLight};
}

.sliderTicks {
  position: relative;
  height: 30px;
  margin-top: 33px;
  margin-bottom: -33px;
  font-size: ${constants.fontSizeTiny};
  border-color: ${constants.sliderTicksColor};
  color: ${constants.sliderTicksColor};

  & .sliderTick {
    position: absolute;
    display: inline-block;
    height: 100%;
    padding: 0 0.4em;
    border-width: 0;
    border-color: inherit;
    border-style: solid;
    border-left-width: 1px;
    cursor: pointer;
    transition: color 150ms ease, border-color 150ms ease;

    &.active {
      border-color: ${constants.sliderTicksColorActive};
      color: ${constants.sliderTicksColorActive};
    }
  }
}

.visionFilter {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 50px -0.5rem 0;

  & .tableWrapper {
    box-sizing: border-box;
    flex-basis: 50%;
    max-width: 50%;
    padding-right: 0.5rem;
    padding-left: 0.5rem;

    @media only screen and (max-width: 1024px) {
      flex-basis: 100%;
      max-width: 100%;
    }
  }

  & table th > div {
    text-align: left !important;
  }

  & table td > img {
    margin-left: -2px;
  }
}
`;

const SliderTicks = props => (
  <Styled>
    <div className="sliderTicks">
      {props.ticks.map((tick) => {
        const { min, max } = props;
        const percent = 100 * ((tick - min) / (max - min));
        const classNames = ['sliderTick'];

        if (tick <= props.value) {
          classNames.push('active');
        }

        return (
          <a role="link" tabIndex={0} key={tick} onClick={() => props.onTickClick(tick)} className={classNames.join(' ')} style={{ left: `${percent}%` }}>
            {formatSeconds(tick)}
          </a>
        );
      })}
    </div>
  </Styled>
);

SliderTicks.propTypes = {
  value: PropTypes.shape({}),
  ticks: PropTypes.arrayOf({}),
};

const alive = (ward, time) => time === -90 || (time > ward.entered.time && (!ward.left || time < ward.left.time));
// const team = (ward, teams) => (teams.radiant && ward.player < 5) || (teams.dire && ward.player > 4);
// Currently always return true for team since we're just using it as a mass select-deselect
const isTeam = () => true;

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
        observer: Array(...new Array(10)).map(() => true),
        sentry: Array(...new Array(10)).map(() => true),
      },
    };

    this.ticks = this.computeTick();
    this.handleViewportChange = _.debounce(50, this.viewportChange);
  }

  componentWillReceiveProps(props) {
    this.sliderMax = props.match.duration;
  }

  setPlayer(player, type, value) {
    const newArray = this.state.players[type];
    newArray[player] = value;
    this.setState({ ...this.state, players: { ...this.state.players, [type]: newArray } });
  }

  setTeam(team, value) {
    const start = team === 'radiant' ? 0 : 5;
    const end = start + 5;
    const newPlayerObs = this.state.players.observer;
    const newPlayerSentry = this.state.players.sentry;
    for (let i = start; i < end; i += 1) {
      newPlayerObs[i] = value;
      newPlayerSentry[i] = value;
    }
    const newState = { ...this.state, teams: { ...this.state.teams, [team]: value }, players: { observer: newPlayerObs, sentry: newPlayerSentry } };
    this.setState(newState);
  }

  computeTick() {
    const interval = 10 * 60; // every 10 minutes interval
    return _.rangeStep(interval, 0, this.sliderMax);
  }

  viewportChange(value) {
    this.setState({ ...this.state, currentTick: value });
  }

  visibleData() {
    const self = this;
    const filter = ward => alive(ward, self.state.currentTick) && isTeam(ward, self.state.teams) && self.state.players[ward.type][ward.player];

    return this.props.match.wards_log.filter(filter);
  }

  render() {
    const visibleWards = this.visibleData();
    const { match } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: '30%', margin: '10px', flexGrow: '1' }}>
            <VisionMap match={match} wards={visibleWards} />
          </div>
          <div style={{ flexGrow: '1' }}>
            <div className="visionSliderText">
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
            <VisionFilter match={match} parent={this} />
          </div>
        </div>
        <VisionItems match={match} />
        <VisionLog match={match} wards={visibleWards} />
      </div>
    );
  }
}

Vision.propTypes = {
  match: PropTypes.shape({
    duration: PropTypes.number,
    wards_log: PropTypes.arrayOf({}),
  }),
};

export default Vision;
