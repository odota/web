import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {
  isRadiant,
  gameCoordToUV,
  extractTransitionClasses,
  unpackPositionData,
} from 'utility';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
// import heroes from 'dotaconstants/json/heroes.json';
import strings from 'lang';
import styles from './Match.css';
import Measure from 'react-measure';

// with the actual game size, the width parameters is optional
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

// TODO Hero icon on ward circles?
class VisionMap extends React.Component {
  shouldComponentUpdate(newProps) {
    return newProps.wardsLog.length !== this.props.wardsLog.length;
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.forceUpdate());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.forceUpdate());
  }

  renderWardPins(width) {
    const iconSize = width / 12;
    return this.props.wardsLog.map(w => <WardLogPin key={w.key} width={width} iconSize={iconSize} log={w} />);
  }
  
  render() {
    const transition = extractTransitionClasses(styles);
    return (
      <Measure>
        {dimension => (
           <ReactCSSTransitionGroup component="div"
                                    transitionName={transition("ward-pin")}
                                    transitionEnterTimeout={150}
                                    transitionLeaveTimeout={150}
                                    style={{
                                      position: 'relative',
                                      height: dimension.width,
                                      background: 'url("/assets/images/map.png")',
                                      backgroundSize: 'contain',
                                    }}>
             {this.renderWardPins(dimension.width)}
           </ReactCSSTransitionGroup>
         )}
      </Measure>
    );
  }
}

VisionMap.defaultProps = {
  width: 400,
}

export default VisionMap;
