import React from 'react';
import {
  gameCoordToUV,
  formatSeconds,
} from 'utility';
import ReactTooltip from 'react-tooltip';
import Measure from 'react-measure';
import strings from 'lang';
import PlayerThumb from 'components/Match/PlayerThumb';
import DotaMap from 'components/DotaMap';
import styles from './Vision.css';

const wardStyle = (width, log) => {
  const gamePos = gameCoordToUV(log.entered.x, log.entered.y);
  const stroke = log.entered.player_slot < 5 ? styles.green : styles.red;

  let fill;
  let strokeWidth;
  let wardSize;

  if (log.type === 'observer') {
    wardSize = (width / 12) * (1600 / 850);
    fill = styles.yelorMuted;
    strokeWidth = 2.5;
  } else {
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

const WardTooltipEnter = ({ player, log }) => (
  <div className={styles.tooltipContainer}>
    <PlayerThumb {...player} />
    <div>{log.type === 'observer' ? strings.vision_placed_observer : strings.vision_placed_sentry}</div>
    <div>{` ${formatSeconds(log.entered.time)}`}</div>
  </div>
);

const WardTooltipLeft = ({ log }) => {
  let expired;
  const age = log.left.time - log.entered.time;

  if (log.type === 'observer') {
    expired = age > 360;
  } else {
    expired = age > 240;
  }

  return (
    <div className={styles.tooltipContainer}>
      <div>{expired ? strings.vision_expired : strings.vision_destroyed}</div>
      <div>{` ${formatSeconds(age)}`}</div>
    </div>
  );
};

const WardPin = ({ match, width, log }) => {
  const id = `ward-${log.entered.player_slot}-${log.entered.time}`;
  const sideName = log.entered.player_slot < 5 ? 'radiant' : 'dire';

  return (
    <div>
      <div
        style={wardStyle(width, log)}
        data-tip
        data-for={id}
      />
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
  shouldComponentUpdate(newProps) {
    return newProps.wards.length !== this.props.wards.length;
  }

  render() {
    return (
      <Measure>
        {({ width }) => (
          <div style={{ height: width }}>
            <DotaMap
              startTime={this.props.match.start_time}
              maxWidth="100%"
              width="100%"
            >
              {this.props.wards.map(w => <WardPin match={this.props.match} key={w.key} width={width} log={w} />)}
            </DotaMap>
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
