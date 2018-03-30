import React from 'react';
import PropTypes from 'prop-types';
import { gameCoordToUV } from 'utility';
import DotaMap from '../DotaMap';
import styled from 'styled-components';
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
  let wardSize;

  if (log.type === 'observer') {
    wardSize = (width / 12) * (1600 / 850);
    fill = constants.colorYelorMuted;
    strokeWidth = 2.5;
  } else {
    wardSize = (width / 12);
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
  log: PropTypes.shape({}),
};

const LogHover = ward => (
  <div style={{ height: 300, position: 'absolute', bottom: '10px' }}>
    <DotaMap
      maxWidth={300}
      width={300}
    >
      <WardPin key={ward.key} width={300} log={ward} />
    </DotaMap>
  </div>
);

export default LogHover;
