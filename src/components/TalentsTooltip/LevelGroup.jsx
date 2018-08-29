import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import constants from '../constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(to right,rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05));
  border-radius: 2px;
  min-height: 40px;

  &:not(:last-child) {
    margin-bottom: 14px;
  }
`;

const Level = styled.div`
  align-items: center;
  border-radius: 50%;
  color: ${constants.colorGolden};
  text-shadow: 0 0 5px ${constants.colorGolden};
  background-color: #080D15;
  box-shadow: 0 0 10px #b79a00;
  display: flex;
  flex: 0 0 24px;
  font-size: 16px;
  height: 24px;
  justify-content: center;
  position: relative;
  width: 24px;
  z-index: 2;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 5px;
`;

const TalentContent = styled.div`
  flex: 1 1 100%;
  font-size: 12px;
  text-align: center;
  align-items: center;

  &:first-child {
    padding-right: 12px;
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
