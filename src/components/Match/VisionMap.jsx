import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {
  isRadiant,
  transformations,
} from 'utility';
import { Row, Col } from 'react-flexbox-grid';

const obsWard = (style, stroke, iconSize) => (<svg style={style} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
  <g>
    <title>Observer</title>
    <circle fill="#ffff00" strokeWidth="5" stroke={stroke} r={iconSize * 0.4} cy={iconSize / 2} cx={iconSize / 2} fillOpacity="0.4" />
  </g>
  <defs>
    <filter id="_blur">
      <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
    </filter>
  </defs>
</svg>);

const senWard = (style, stroke, iconSize) => (<svg style={style} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
  <g>
    <title>Sentry</title>
    <circle fill="#0000ff" strokeWidth="5" stroke={stroke} r={iconSize * 0.4} cy={iconSize / 2} cx={iconSize / 2} fillOpacity="0.4" />
  </g>
  <defs>
    <filter id="_blur">
      <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
    </filter>
  </defs>
</svg>);

// TODO Hero icon on ward circles?
class VisionMap extends React.Component {
  componentWillMount() {
    this.setState({
      obsIcons: [],
      senIcons: [],
      enabledIndex: {},
    });
  }
  super() {
    this.updateMap = this.updateMap.bind(this);
  }
  updateMap(event, checked, index) {
    const newEnabledIndex = Object.assign({}, this.state.enabledIndex, {
      [index]: checked,
    });
    this.setState(Object.assign({}, this.state, {
      enabledIndex: newEnabledIndex,
    }));
  }
  render() {
    const match = this.props.match;
    const width = this.props.width;
    const enabledIndex = this.state.enabledIndex;
    const style = ward => ({
      position: 'absolute',
      top: ((width / 127) * ward.y) - (width / 12),
      left: ((width / 127) * ward.x) - (width / 12),
    });
    const iconSize = width / 8;
    const obsIcons = [];
    const senIcons = [];
    Object.keys(enabledIndex).forEach((index) => {
      if (enabledIndex[index]) {
        if (match && match.players && match.players[index]) {
          const obs = (match.players[index].posData && match.players[index].posData.obs) || [];
          const sen = (match.players[index].posData && match.players[index].posData.sen) || [];
          const stroke = isRadiant(match.players[index].player_slot) ? 'green' : 'red';
          obs.forEach(ward => obsIcons.push(obsWard(style(ward), stroke, iconSize)));
          sen.forEach(ward => senIcons.push(senWard(style(ward), stroke, iconSize)));
        }
      }
    });
    return (<Row>
      <Col md={6}>
        <div
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            width: this.props.width,
          }}
        >
          <img width={this.props.width} src="/assets/images/map.png" role="presentation" />
          {obsIcons}
          {senIcons}
        </div>
      </Col>
      <Col md={6}>
        {this.props.match.players.map((player, i) => (<div>
          <span>
            <Checkbox
              checkedIcon={<Visibility />}
              uncheckedIcon={<VisibilityOff />}
              onCheck={(event, checked) => this.updateMap(event, checked, i)}
            />
          </span>
          <span>
            {transformations.hero_id(player, 'hero_id', player.hero_id)}
          </span>
        </div>))
        }
      </Col>
    </Row>);
  }
}

export default function ({
  match,
  width = 500,
}) {
  return <VisionMap match={match} width={width} />;
}
