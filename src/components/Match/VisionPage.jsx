import React from 'react';
import {
  Row,
  Col,
} from 'react-flexbox-grid';

import Slider from 'material-ui/Slider';
import Heading from 'components/Heading';
import VisionMap from './VisionMap' ;
import WardLog from './WardLog';
import _ from 'lodash/fp';
import Immutable from 'immutable';
import Perf from 'react-addons-perf';
import strings from 'lang';

window.Perf = Perf;

class VisionPage extends React.Component {
  componentWillMount() {
    Perf.start();
  }  
  
  constructor(props) {
    super(props);
    const min = _.first(props.match.wards_log).entered.time;
    const max = _.last(props.match.wards_log).entered.time + 360;
    this.state = {
      from: 0,
      to: this.props.match.wards_log.length,
      min: min,
      max: max,
      wardsLog: Immutable.List(props.match.wards_log).map((e, i) => Object.assign(e, {key: i}))
    }

    this.findPivot = (value) => this.state.wardsLog
                                    .toSeq()
                                    .map(x => x.entered.time)
                                    .findKey((e) => e > value);
  }

  handleViewportChange(e, value) {
    const log = this.state.wardsLog;
    const p = this.state.from;
    
    this.setState({ from: this.findPivot(value) });
  }

  shouldComponentUpdate(newProps, newState) {
    return this.state.from != newState.from;
  }

  visibleData() {
    return this.state.wardsLog.skip(this.state.from);
  }

  render() {
    const visibleWards = this.visibleData();
    return (
      <div>
        <Heading title={strings.heading_vision} />
        <VisionMap match={this.props.match} />
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
