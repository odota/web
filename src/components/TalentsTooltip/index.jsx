import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import LevelGroup from './LevelGroup';
import constants from '../constants';

const Wrapper = styled.div`
  width: 280px;
  padding: 12px;
`;

const TalentsTooltip = ({ talents, ttId }) => (
  <ReactTooltip id={ttId} effect="solid" place="bottom">
    <Wrapper>
      <LevelGroup talents={talents[3]} level="25" />
      <LevelGroup talents={talents[2]} level="20" />
      <LevelGroup talents={talents[1]} level="15" />
      <LevelGroup talents={talents[0]} level="10" />
    </Wrapper>
  </ReactTooltip>
);

TalentsTooltip.propTypes = {
  talents: propTypes.shape({}).isRequired,
  ttId: propTypes.string.isRequired,
};

export default TalentsTooltip;
