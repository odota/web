import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gameCoordToUV, getWardSize } from '../../../utility';
import DotaMap from '../../DotaMap';
import constants from '../../constants';

const hoverMapStyle = {
  height: 300,
  position: 'absolute',
  bottom: '25px',
  left: '25px',
  border: '5px solid rgb(21, 23, 27)',
  outline: '1px solid #0E0E0E',
};

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

export const WardPin = ({ width, log }) => {
  const id = `ward-${log.entered.player_slot}-${log.entered.time}`;
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
    </Styled>
  );
};

WardPin.propTypes = {
  width: PropTypes.number,
  log: PropTypes.shape({})
};

const LogHover = (ward, startTime) => (
  <div style={hoverMapStyle}>
    <DotaMap
      maxWidth={300}
      width={300}
      startTime={startTime}
    >
      <WardPin key={ward.key} width={300} log={ward} />
    </DotaMap>
  </div>
);

export default LogHover;
