import styled from 'styled-components';
import constants from '../../../constants';

export const Styled = styled.div`
  position: relative;
  text-align: center;
  padding: 10px;

  .tt-container {
    white-space: nowrap;
    text-align: center;
  }

  .result {
    font-size: 16px;
    font-weight: bold;
  }

  .win {
    color: ${constants.colorGreen};
  }

  .loss {
    color: ${constants.colorRed};
  }
`;

export const Content = styled.div`
  position: relative;
  overflow-x: auto;

  :not(:last-child) {
    margin-bottom: 20px;
  }

  .innerContainer {
    background-color: transparent !important;
  }
`;

export const Week = styled.div`
  position: relative;
  display: inline-block;
`;

export const WeekDayLabels = styled.div`
  position: relative;
  bottom: 2px;
  right: 10px;
  font-size: 11px;
  display: inline-block;
  direction: rtl;
  text-align: right;
  color: ${constants.colorMutedLight};

  div {
    line-height: 15px;
    margin-top: 2px;
  }
`;

export const WeeksContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  white-space: nowrap;
  padding-top: 30px;
  padding-bottom: 10px;
  width: 1000px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-top-left-radius: 5px;

  #hide-table {
    line-height: 0px;
    position: relative;
    top: 107px;
    right: 10px;
    float: right;
    color: ${constants.colorBlue};
    font-size: 30px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  table {
    & .__react_component_tooltip {
      display: none;
    }

    & tr,
    th,
    thead {
      background-color: transparent !important;
      border-style: none !important;
    }
  }
`;

export const DayContainer = styled.div`
  height: 15px;
  width: 15px;
  margin: 2px 0 2px 2px;
  line-height: 15px;
  font-size: 8px;
  transition: opacity 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.03);

  svg:hover {
    opacity: 0.3;
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .weekDay {
    position: absolute;
    font-size: 11px;
    right: 22px;
    direction: rtl;
    text-align: right;
    color: ${constants.colorMutedLight};
  }

  .month {
    position: absolute;
    top: -20px;
    margin-left: 1px;
    font-size: 11px;
    color: ${constants.colorMutedLight};
    cursor: crosshair;

    & .year {
      display: inline-block;
      color: #6192b9;
      margin-left: 3px;
    }
  }

  .circle {
    position: relative;
    top: 43%;
    line-height: 0px;
    color: #b72424;
  }
`;
