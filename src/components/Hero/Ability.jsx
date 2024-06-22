import React from 'react';
import styled from 'styled-components';
import nanoid from 'nanoid';
import propTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import constants from '../constants';
import AbilityTooltip from '../AbilityTooltip';
import config from '../../config';

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${constants.colorBlueMuted}, ${constants.primarySurfaceColor});
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
  position: relative;

  .__react_component_tooltip {
  opacity: 1 !important;
  padding: 0px !important;
}
`;

const AbilityIcon = styled.img`
  border-radius: 4px;
  display: block;
  height: auto;
  opacity: .7;
  overflow: hidden;
  transition: opacity .2s, box-shadow .4s, transform .2s;
  width: 100%;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 150px rgba(255, 255, 255, .4);
    transform: scale(1.1);
  }
`;

const AbilityManaComsumption = styled.div`
  background: ${constants.colorBlackMuted};
  color: ${constants.colorMana};
  border-radius: 2px 0 0 0;
  font-weight: 600;
  bottom: 0;
  font-size: 10px;
  line-height: 1;
  padding: 1px 4px;
  position: absolute;
  right: 0;
`;

const Ability = (props) => {
  const ttId = nanoid();
  const showMana = (props.mc && parseInt(props.mc, 0) > 0);
  let manaString = false;

  if (showMana) {
    manaString = ((typeof props.mc === 'object') ? props.mc[0] : props.mc);
  }

  return (
    <Wrapper data-tip data-for={ttId}>
      <AbilityIcon src={config.VITE_IMAGE_CDN + props.img} />
      {(showMana) && <AbilityManaComsumption>{manaString}</AbilityManaComsumption>}
      <ReactTooltip id={ttId} effect="solid" place="bottom">
        <AbilityTooltip ability={props} />
      </ReactTooltip>
    </Wrapper>
  );
};

Ability.propTypes = {
  mc: propTypes.oneOfType([
    propTypes.object,
    propTypes.array,
    propTypes.string,
  ]),
  img: propTypes.string.isRequired,
};

export default Ability;
