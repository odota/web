import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import {
  gameCoordToUV,
  formatSeconds,
  getWardSize
} from '../../../utility';
import PlayerThumb from '../PlayerThumb';
import DotaMap from '../../DotaMap';
import constants from '../../constants';

const Styled = styled.div`
.tooltipContainer {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  margin: -8px -12px;

  & > * {
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  & > div {
    margin: 0;
    color: ${constants.colorMutedLight};
  }
}

.radiantWardTooltip {
  border-width: 2px !important;
  border-color: ${constants.colorSuccess} !important;
}

.direWardTooltip {
  border-width: 2px !important;
  border-color: ${constants.colorDanger} !important;
}

div > img {
  width: 18px;
}
`;

const wardStyle = (width, log) => {
  const gamePos = gameCoordToUV(log.entered.x, log.entered.y);
  const stroke = log.entered.player_slot < 5 ? constants.colorGreen : constants.colorRed;

  let fill;
  let strokeWidth;

  const wardSize = getWardSize(log.type, width);

  if (log.type === 'observer') {
    fill = constants.colorYelorMuted;
    strokeWidth = 2.5;
  } else {
    fill = constants.colorBlueMuted;
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const wardIcon = (log) => {
  const side = log.entered.player_slot < 5 ? 'goodguys' : 'badguys';
  return `/assets/images/dota2/map/${side}_${log.type}.png`;
};

const WardTooltipEnter = ({ player, log, strings }) => (
  <div className="tooltipContainer">
    <PlayerThumb {...player} />
    <div>{log.type === 'observer' ? strings.vision_placed_observer : strings.vision_placed_sentry}</div>
    <div>{` ${formatSeconds(log.entered.time)}`}</div>
  </div>
);

WardTooltipEnter.propTypes = {
  player: PropTypes.shape({}),
  log: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const WardTooltipLeft = ({ log, strings }) => {
  let expired;
  const age = log.left.time - log.entered.time;

  if (log.type === 'observer') {
    expired = age > 360;
  } else {
    expired = age > 240;
  }

  return (
    <div className="tooltipContainer">
      <div>{expired ? strings.vision_expired : strings.vision_destroyed}</div>
      <div>{` ${formatSeconds(age)}`}</div>
    </div>
  );
};

WardTooltipLeft.propTypes = {
  log: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const WardPin = ({
  match, width, log, strings,
}) => {
  const id = `ward-${log.entered.player_slot}-${log.entered.time}`;
  const sideName = log.entered.player_slot < 5 ? 'radiant' : 'dire';

  return (
    <Styled>
      <div
        style={wardStyle(width, log)}
        data-tip
        data-for={id}
      >
        <img
          src={wardIcon(log)}
          alt={log.type === 'observer' ? 'O' : 'S'}
        />
      </div>
      <ReactTooltip
        id={id}
        effect="solid"
        border
        class={`${sideName}WardTooltip`}
      >
        <WardTooltipEnter player={match.players[log.player]} log={log} strings={strings} />
        {log.left && <WardTooltipLeft log={log} strings={strings} />}
      </ReactTooltip>
    </Styled>
  );
};

WardPin.propTypes = {
  match: PropTypes.shape({}),
  width: PropTypes.number,
  log: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};


class VisionMap extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      start_time: PropTypes.number,
    }),
    wards: PropTypes.arrayOf({}),
    strings: PropTypes.shape({}),
  }

  shouldComponentUpdate(newProps) {
    return newProps.wards.length !== this.props.wards.length;
  }

  render() {
    const { strings } = this.props;
    const width = 550;
    return (
      <div style={{ height: width }}>
        <DotaMap
          startTime={this.props.match.start_time}
          maxWidth={width}
          width={width}
        >
          {this.props.wards.map(w => <WardPin match={this.props.match} key={w.key} width={width} log={w} strings={strings} />)}
        </DotaMap>
      </div>
    );
  }
}

VisionMap.defaultProps = {
  width: 400,
};

export default VisionMap;
