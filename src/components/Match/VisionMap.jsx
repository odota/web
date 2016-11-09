import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {
  isRadiant,
  // transformations,
  gameCoordToUV,
  extractTransitionClasses,
} from 'utility';
import { PlainTable as Table } from 'components/Table';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
// import heroes from 'dotaconstants/json/heroes.json';
import strings from 'lang';
import styles from './Match.css';
import { Fixed } from 'utility/components';

const style = (width, iconSize, ward) => {
  const gamePos = gameCoordToUV(ward.x, ward.y);
  return {
    position: 'absolute',
    top: ((width / 127) * gamePos.y) - iconSize/2,
    left: ((width / 127) * gamePos.x) - iconSize/2,
  }
};

const WardLogPin = ({ width, iconSize, log }) => {
  const stroke = log.entered.player_slot < 5 ? styles.green : styles.red;
  const fill = log.type == "observer" ? styles.yelo : styles.blue;
  return (
    <svg style={style(width, iconSize, log.entered)}
         width={iconSize}
         height={iconSize}
         xmlns="http://www.w3.org/2000/svg">
      <g>
        <title>Observer</title>
        <circle fill={fill}
                strokeWidth="2"
                stroke={stroke}
                r={iconSize * 0.4}
                cy={iconSize / 2}
                cx={iconSize / 2}
                fillOpacity="0.4" />
      </g>
      <defs>
        <filter id="_blur">
          <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  )
};
  

// sen = #0000ff;

const FixedTable = Fixed(Table);

// TODO Hero icon on ward circles?
class VisionMap extends React.Component {
  shouldComponentUpdate(newProps) {
    if (newProps.wardsLog.length == this.props.wardsLog.length) return false;
    return true;
  }
  
  render() {
    const width = this.props.width;
    const iconSize = width / 12;
    const obsIcons = this.props.wardsLog.map(w => <WardLogPin key={w.key} width={width} iconSize={iconSize} log={w} />);
    //const senIcons = this.props.wardsLog.map(w => senWard(width)(stroke, iconSize)(w.entered))
    const transition = extractTransitionClasses(styles);
    return (
      <ReactCSSTransitionGroup component="div"
                               transitionName={transition("ward-pin")}
                               transitionEnterTimeout={150}
                               transitionLeaveTimeout={150}
                               style={{
                                 position: 'relative',
                                 width: this.props.width,
                                 height: this.props.width,
                                 background: 'url("/assets/images/map.png")',
                                 backgroundSize: 'contain',
                               }}>
        {obsIcons}
      </ReactCSSTransitionGroup>
    );
  }
}

VisionMap.defaultProps = {
  width: 400,
}

export default VisionMap;
