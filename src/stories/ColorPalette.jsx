import React from 'react';
import { string } from 'prop-types';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import constants from '../constants';

const StyledPanel = styled.div`
  background-color: ${props => props.color};
  color: ${props => props.textColor};
  min-height: 64px;
  width: 192px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

StyledPanel.propTypes = {
  color: string.isRequired,
  textColor: string.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial;
  font-size: 14px;
`;

const Title = styled.h1`
  color: white;
  font-family: Arial;
`;

storiesOf('Color Palette').add('../constantns.js', () => (
  <div>
    <Title>This is colors from components/constants</Title>
    <Wrapper>
      <StyledPanel color={constants.colorSuccess} textColor="white">
        colorSuccess
      </StyledPanel>
      <StyledPanel color={constants.colorDanger} textColor="white">
        colorDanger
      </StyledPanel>
      <StyledPanel color={constants.colorGreen} textColor="white">
        colorGreen
      </StyledPanel>
      <StyledPanel color={constants.colorRed} textColor="white">
        colorRed
      </StyledPanel>
      <StyledPanel color={constants.colorBlue} textColor="white">
        colorBlue
      </StyledPanel>
      <StyledPanel color={constants.colorMuted} textColor="white">
        colorMuted
      </StyledPanel>
      <StyledPanel color={constants.colorYelor} textColor="white">
        colorYelor
      </StyledPanel>
      <StyledPanel color={constants.colorGolden} textColor="white">
        colorGolden
      </StyledPanel>
      <StyledPanel color={constants.green} textColor="white">
        green
      </StyledPanel>
      <StyledPanel color={constants.blue} textColor="white">
        blue
      </StyledPanel>
      <StyledPanel color={constants.golden} textColor="white">
        golden
      </StyledPanel>
      <StyledPanel color={constants.yelor} textColor="white">
        yelor
      </StyledPanel>
      <StyledPanel color={constants.red} textColor="white">
        red
      </StyledPanel>
      <StyledPanel color={constants.lightGray} textColor="white">
        lightGray
      </StyledPanel>
      <StyledPanel color={constants.colorBlueMuted} textColor="white">
        colorBlueMuted
      </StyledPanel>
      <StyledPanel color={constants.colorYelorMuted} textColor="white">
        colorYelorMuted
      </StyledPanel>
      <StyledPanel color={constants.colorMutedLight} textColor="white">
        colorMutedLight
      </StyledPanel>
      <StyledPanel color={constants.primaryLinkColor} textColor="white">
        primaryLinkColor
      </StyledPanel>
      <StyledPanel color={constants.textColorPrimary} textColor="black">
        textColorPrimary
      </StyledPanel>
      <StyledPanel color={constants.primaryTextColor} textColor="black">
        primaryTextColor
      </StyledPanel>
      <StyledPanel color={constants.textColorSecondary} textColor="white">
        textColorSecondary
      </StyledPanel>
      <StyledPanel color={constants.secondaryTextColor} textColor="white">
        secondaryTextColor
      </StyledPanel>
      <StyledPanel color={constants.primarySurfaceColor} textColor="white">
        primarySurfaceColor
      </StyledPanel>
      <StyledPanel color={constants.secondarySurfaceColor} textColor="white">
        secondarySurfaceColor
      </StyledPanel>
      <StyledPanel color={constants.tableHeaderSurfaceColor} textColor="white">
        tableHeaderSurfaceColor
      </StyledPanel>
      <StyledPanel color={constants.tableRowOddSurfaceColor} textColor="white">
        tableRowOddSurfaceColor
      </StyledPanel>
      <StyledPanel color={constants.tableRowEvenSurfaceColor} textColor="white">
        tableRowEvenSurfaceColor
      </StyledPanel>
      <StyledPanel color={constants.sliderTicksColor} textColor="white">
        sliderTicksColor
      </StyledPanel>
      <StyledPanel color={constants.dividerColor} textColor="white">
        dividerColor
      </StyledPanel>
      <StyledPanel color={constants.tableHeaderSurfaceColor} textColor="white">
        tableHeaderSurfaceColor
      </StyledPanel>
    </Wrapper>
  </div>
));
