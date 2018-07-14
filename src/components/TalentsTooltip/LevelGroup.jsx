import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import constants from '../constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0;
  position: relative;

  &:before {
    background: ${constants.colorGolden};
    content: '';
    height: 100%;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
  }
`;

const Level = styled.div`
  align-items: center;
  background: ${constants.almostBlack};
  border-radius: 50%;
  border: 1px solid ${constants.colorGolden};
  color: ${constants.colorGolden};
  display: flex;
  flex: 0 0 24px;
  font-size: 10px;
  height: 24px;
  justify-content: center;
  position: relative;
  width: 24px;
  z-index: 2;
`;

const TalentContent = styled.div`
  flex: 1 1 100%;
  font-size: 12px;
  padding-top: 4px;

  &:first-child {
    padding-right: 12px;
    text-align: right;
  }

  &:last-child {
    padding-left: 12px;
  }
`;

const LevelGroup = ({ talents, level }) => (
  <Wrapper>
    <TalentContent>{talents && talents[0] && talents[0].name}</TalentContent>
    <Level>{level}</Level>
    <TalentContent>{talents && talents[1] && talents[1].name}</TalentContent>
  </Wrapper>
);

LevelGroup.propTypes = {
  level: propTypes.string.isRequired,
  talents: propTypes.oneOfType([
    propTypes.object,
    propTypes.array,
  ]).isRequired,
};

export default LevelGroup;
