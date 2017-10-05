import React from 'react';
import PropTypes from 'prop-types';
import playerColors from 'dotaconstants/build/player_colors.json';
import heroes from 'dotaconstants/build/heroes.json';
import strings from 'lang';
import styled from 'styled-components';
import constants from '../../constants';

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

const PlayerThumb = ({ player_slot, hero_id, name, personaname, hideText }) => (
  <StyledAside style={{ color: playerColors[player_slot] }}>
    <StyledImg
      src={heroes[hero_id]
        ? `${API_HOST}${heroes[hero_id].icon}`
        : '/assets/images/blank-1x1.gif'
      }
      alt=""
    />
    {!hideText && (name || personaname || strings.general_anonymous)}
  </StyledAside>
);

const { string, oneOfType, number, bool } = PropTypes;

PlayerThumb.propTypes = {
  player_slot: oneOfType([string, number]),
  hero_id: oneOfType([string, number]),
  name: string,
  personaname: string,
  hideText: bool,
};

export default PlayerThumb;
