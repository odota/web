import React from 'react';
import styled from 'styled-components';
import nanoid from 'nanoid';
import propTypes from 'prop-types';

import TalentsTooltip from '../TalentsTooltip';
import constants from '../constants';

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${constants.colorBlueMuted}, ${constants.primarySurfaceColor});
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
  position: relative;
`;

const Icon = styled.img`
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

const Talents = ({ talents }) => {
  const ttId = nanoid();

  return (
    <Wrapper data-tip data-for={ttId}>
      <Icon src="/assets/images/dota2/talent_tree.svg" alt="Talents" />
      <TalentsTooltip talents={talents} ttId={ttId} />
    </Wrapper>
  );
};

Talents.propTypes = {
  talents: propTypes.oneOfType([
    propTypes.object,
    propTypes.array,
  ]).isRequired,
};

export default Talents;
