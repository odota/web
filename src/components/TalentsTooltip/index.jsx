import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import LevelGroup from './LevelGroup';

const Wrapper = styled.div`
  .__react_component_tooltip {
  opacity: 1 !important;
  padding: 0px !important;
  }
`;

const Content = styled.div`
  position: relative;
  width: 400px;
  background: linear-gradient(135deg, #131519, #1f2228);
  padding: 9px;
  overflow: hidden;
  border: 2px solid #27292b;
`;
const Background = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  height: 100%;
  width: 100%;
  background-image: url('/assets/images/dota2/talent_tree.svg');
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.08;
`;

const TalentsTooltip = ({ talents, ttId }) => (
  <Wrapper>
    <ReactTooltip id={ttId} effect="solid" place="left">
      <Content>
        <Background />
        <LevelGroup talents={talents[3]} level="25" />
        <LevelGroup talents={talents[2]} level="20" />
        <LevelGroup talents={talents[1]} level="15" />
        <LevelGroup talents={talents[0]} level="10" />
      </Content>
    </ReactTooltip>
  </Wrapper>
);

TalentsTooltip.propTypes = {
  talents: propTypes.oneOfType([
    propTypes.object,
    propTypes.array,
  ]).isRequired,
  ttId: propTypes.string.isRequired,
};

export default TalentsTooltip;
