import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {
  isRadiant,
  // transformations,
} from 'utility';
import Table from 'components/Table';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
// import heroes from 'dotaconstants/json/heroes.json';
import strings from 'lang';
import {
  heroTdColumn,
} from './matchColumns';

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
    const iconSize = width / 12;
    const style = ward => ({
      position: 'absolute',
      top: ((width / 127) * ward.y) - (iconSize / 2),
      left: ((width / 127) * ward.x) - (iconSize / 2),
    });
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
        <Table
          data={this.props.match.players}
          columns={[
            { displayFn: row => (<Checkbox
              checkedIcon={<Visibility />}
              uncheckedIcon={<VisibilityOff />}
              checked={this.state.enabledIndex[this.props.match.players.findIndex(player => player.player_slot === row.player_slot)]}
              onCheck={(event, checked) =>
              this.updateMap(event, checked, this.props.match.players.findIndex(player => player.player_slot === row.player_slot))}
              label=""
            />) },
            heroTdColumn,
            {
              displayName: strings.th_ward_observer,
              field: 'obs_log',
              className: 'text-right',
              displayFn: (row, col, field) => (field && field.length),
            },
            {
              displayName: strings.th_ward_sentry,
              field: 'sen_log',
              className: 'text-right',
              displayFn: (row, col, field) => (field && field.length),
            },
          ]}
        />
      </Col>
    </Row>);
  }
}

// TODO use defaultprops and export directly
export default function ({
  match,
  width = 600,
}) {
  return <VisionMap match={match} width={width} />;
}
