import React from 'react';
import { connect } from 'react-redux';
import { string, oneOfType, number, bool, shape } from 'prop-types';
import playerColors from 'dotaconstants/build/player_colors.json';
import heroes from 'dotaconstants/build/heroes.json';
import styled from 'styled-components';
import constants from '../../constants';
import config from '../../../config';

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

const PlayerThumb = (props) => {
  const {
    name,
    personaname,
    hideText,
    strings,
  } = props;
  const playerSlot = props.player_slot;
  const heroId = props.hero_id;
  return (
    <StyledAside style={{ color: playerColors[playerSlot] }}>
      <StyledImg
        src={heroes[heroId]
          ? `${config.VITE_IMAGE_CDN}${heroes[heroId].icon}`
          : '/assets/images/blank-1x1.gif'
        }
        alt=""
      />
      {!hideText && (name || personaname || strings.general_anonymous)}
    </StyledAside>
  );
};

PlayerThumb.propTypes = {
  player_slot: oneOfType([string, number]),
  hero_id: oneOfType([string, number]),
  name: string,
  personaname: string,
  hideText: bool,
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayerThumb);
