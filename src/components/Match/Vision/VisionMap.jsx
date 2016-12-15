import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  gameCoordToUV,
  extractTransitionClasses,
} from 'utility';
import ReactTooltip from 'react-tooltip';
import Measure from 'react-measure';
import strings from 'lang';
import styles from './Vision.css';

// with the actual game size, the width parameters is optional
const style = (width, iconSize, ward) => {
  const gamePos = gameCoordToUV(ward.x, ward.y);
  return {
    position: 'absolute',
    top: ((width / 127) * gamePos.y) - (iconSize / 2),
    left: ((width / 127) * gamePos.x) - (iconSize / 2),
  };
};

const WardLogPin = ({ width, iconSize, log }) => {
  const stroke = log.entered.player_slot < 5 ? styles.green : styles.red;
  const fill = log.type === 'observer' ? styles.yelor : styles.blue;

  const strokeWidth = log.type === 'observer' ? '2.5' : '2';
  const wardSize = log.type === 'observer' ? iconSize * (1600 / 850) : iconSize;
  console.log(log);

  const id = `${log.entered.player_slot}${log.entered.time}`;

  return (
    <div>
      <svg
        style={style(width, wardSize, log.entered)}
        width={wardSize}
        height={wardSize}
        data-tip
        data-for={id}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle
            fill={fill}
            strokeWidth={strokeWidth}
            stroke={stroke}
            r={wardSize * 0.4}
            cy={wardSize / 2}
            cx={wardSize / 2}
            fillOpacity="0.3"
          />
        </g>
        <defs>
          <filter id="_blur">
            <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>
      <ReactTooltip
        id={id}
        effect="solid"
        border
      >
        {log.type === 'observer' ? strings.th_ward_observer : strings.th_ward_sentry} planted at {log.entered.time} by {log.entered.player_slot}
      </ReactTooltip>
    </div>
  );
};

// TODO Hero icon on ward circles?
class VisionMap extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate());
  }

  shouldComponentUpdate(newProps) {
    return newProps.wardsLog.length !== this.props.wardsLog.length;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.forceUpdate());
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
          <ReactCSSTransitionGroup
            component="div"
            transitionName={transition('ward-pin')}
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
            style={{
              position: 'relative',
              height: dimension.width,
              background: 'url("/assets/images/map.png")',
              backgroundSize: 'contain',
            }}
          >
            {this.renderWardPins(dimension.width)}
          </ReactCSSTransitionGroup>
         )}
      </Measure>
    );
  }
}

VisionMap.defaultProps = {
  width: 400,
};

export default VisionMap;
