import React from 'react';
import { player_colors as playerColors } from 'dotaconstants';
import { heroes } from 'dotaconstants';
import styled from 'styled-components';
import constants from '../../constants';
import config from '../../../config';
import useStrings from '../../../hooks/useStrings.hook';

const StyledAside = styled.aside`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${constants.fontWeightMedium};
`;

const StyledImg = styled.img`
  height: 24px;
  margin-right: 4px;
`;

const PlayerThumb = (props: {
  player_slot?: number,
  hero_id?: string,
  name?: string,
  personaname?: string,
  hideText?: boolean,
}) => {
  const strings = useStrings();
  const { name, personaname, hideText } = props;
  const playerSlot = props.player_slot;
  const heroId = props.hero_id;
  return (
    <StyledAside style={{ color: playerColors[playerSlot as unknown as keyof typeof playerColors] }}>
      <StyledImg
        src={
          heroes[heroId as keyof Heroes]
            ? `${config.VITE_IMAGE_CDN}${heroes[heroId as keyof Heroes].icon}`
            : '/assets/images/blank-1x1.gif'
        }
        alt=""
      />
      {!hideText && (name || personaname || strings.general_anonymous)}
    </StyledAside>
  );
};

export default PlayerThumb;
