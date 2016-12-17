import React from 'react';
import {
  gameCoordToUV,
  formatSeconds,
} from 'utility';
import ReactTooltip from 'react-tooltip';
import Measure from 'react-measure';
import strings from 'lang';
import PlayerThumb from 'components/Match/PlayerThumb';
import styles from './Vision.css';

const wardStyle = (width, log) => {
  const gamePos = gameCoordToUV(log.entered.x, log.entered.y);
  const stroke = log.entered.player_slot < 5 ? styles.green : styles.red;

  let fill, strokeWidth, wardSize;

  if (log.type === 'observer') {
    wardSize = (width / 12) * (1600 / 850);
    fill = styles.yelorMuted;
    strokeWidth = 2.5;
  }
  else {
    wardSize = (width / 12);
    fill = styles.blueMuted;
    strokeWidth = 2;
  }

  return {
    position: 'absolute',
    width: wardSize,
    height: wardSize,
    top: ((width / 127) * gamePos.y) - (wardSize / 2),
    left: ((width / 127) * gamePos.x) - (wardSize / 2),
    background: fill,
    borderRadius: '50%',
    border: `${strokeWidth}px solid ${stroke}`,
  };
};

const WardTooltipEnter = ({ player, log }) => {
  return (
    <div className={styles.tooltipContainer}>
      <PlayerThumb {...player} />
      <div>placed </div>
      <div>{log.type === 'observer' ? strings.th_ward_observer : strings.th_ward_sentry} </div>
      <div>at </div>
      <div>{formatSeconds(log.entered.time)}</div>
    </div>
  );
};

const WardTooltipLeft = ({ log }) => {
  let expired;
  const age = log.left.time - log.entered.time;

  if (log.type === 'observer') {
    expired = (age > 360) ? true : false;
  }
  else {
    expired = (age > 240) ? true : false;
  }

  return (
    <div className={styles.tooltipContainer}>
      <div>{expired ? 'Expired after ' : 'Destroyed after '}</div>
      <div>{formatSeconds(age)}</div>
    </div>
  );
};

const WardLogPin = ({ match, width, log }) => {
  const id = `ward-${log.entered.player_slot}-${log.entered.time}`;
  const sideName = log.entered.player_slot < 5 ? 'radiant' : 'dire';

  return (
    <div>
      <div
        style={wardStyle(width, log)}
        data-tip
        data-for={id}
      >
      </div>
      <ReactTooltip
        id={id}
        effect="solid"
        border
        class={styles[`${sideName}WardTooltip`]}
      >
        <WardTooltipEnter player={match.players[log.player]} log={log} />
        {log.left && <WardTooltipLeft log={log} />}
      </ReactTooltip>
    </div>
  );
};

class VisionMap extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate());
  }

  shouldComponentUpdate(newProps) {
    return newProps.wards.length !== this.props.wards.length;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.forceUpdate());
  }

  render() {
    return (
      <Measure>
        {dimension => (
          <div
            style={{
              position: 'relative',
              height: dimension.width,
              background: 'url("/assets/images/map.png")',
              backgroundSize: 'contain',
            }}
          >
            {this.props.wards.map(w => <WardLogPin match={this.props.match} key={w.key} width={dimension.width} log={w} />)}
          </div>
        )}
      </Measure>
    );
  }
}

VisionMap.defaultProps = {
  width: 400,
};

export default VisionMap;
