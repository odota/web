import React from 'react';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
import { formatSeconds } from 'utility';

import Slider from 'material-ui/Slider';
import Heading from 'components/Heading';
import VisionMap from './VisionMap' ;
import WardLog from './WardLog';
import _ from 'lodash/fp';
import Perf from 'react-addons-perf';
import strings from 'lang';
import styles from './Match.css';

window.Perf = Perf;

const SliderTicks = (props) => (
  <div {...props} >
    {props.ticks.map((tick) => {
      const percent = 100*(tick-props.min)/props.max;
      const cls = [styles['slider-tick']];
      if (tick <= props.value)
        cls.push(styles['active']);

      return <span key={tick} className={cls.join(' ')} style={{left: percent + '%'}}>{tick}</span>
    })}
  </div>
);

class VisionPage extends React.Component {
  componentWillMount() {
    Perf.start();
  }  
  
  constructor(props) {
    super(props);
    this.state = {
      currentTick: 0,
      from: 0,
      to: this.props.match.wards_log.length,
      min: -90,
      max: props.match.duration,
      wardsLog: props.match.wards_log.map((e, i) => Object.assign(e, {key: i}))
    }

    this.ticks = this.computeTick();
    this.findPivot = (value) => _.flow(_.map(x => x.entered.time),
                                       _.sortedIndex(value))(this.state.wardsLog);
  }

  computeTick() {
    const minute = 60;
    // we place the 0/end of the match
    // then every 10 minutes interval
    const { duration } = this.props.match; 
    let ticks = _.rangeStep(10 * minute, 0, duration);
    return [...ticks, duration];
  }

  handleViewportChange(e, value) {
    const log = this.state.wardsLog;
    const p = this.state.from;
    
    this.setState({ currentTick: value, from: this.findPivot(value) });
    console.log(value);
  }

  visibleData() {
    return this.state.wardsLog.slice(this.state.from);
  }

  render() {
    const visibleWards = this.visibleData();
    return (
      <div>
        <Heading title={strings.heading}/>
        <VisionMap match={this.props.match} />
        <SliderTicks value={this.state.currentTick}
                     min={this.state.min}
                     max={this.state.max}
                     className={styles['slider-ticks']}
                     ticks={this.ticks} />
        <Slider min={this.state.min}
                max={this.state.max}
                step={5}
                onChange={(e, value) => this.handleViewportChange(e, value)} />
        <WardLog match={this.props.match}
                 wardsLog={visibleWards} />
      </div>
    );
  }
}

export default VisionPage;
