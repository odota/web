import React from "react";
import styled from "styled-components";
import { abbreviateNumber } from "../../utility";
import constants from "../constants";

const Styled = styled.div<{ percent?: number; meterColor?: string }>`
  font-size: 60%;
  margin: 5px 19px 15px 5px;
  position: relative;
  display: inline-block;

  :last-child {
    margin-right: 5px !important;
  }

  .gauge {
    display: inline-block;
    position: relative;
    width: 10em;
    height: 5em;
    overflow: hidden;
  }

  .gauge:before,
  .gauge:after,
  .meter {
    position: absolute;
    display: block;
    content: "";
  }

  .gauge:before,
  .meter {
    width: 10em;
    height: 5em;
  }
  .gauge:before {
    border-radius: 5em 5em 0 0;
    background: #2a2a2a;
  }

  .gauge:after {
    position: absolute;
    bottom: 0;
    left: 2.5em;
    width: 5em;
    height: 2.5em;
    background: rgb(33, 34, 44);
    border-radius: 2.5em 2.5em 0 0;
  }

  .meter {
    top: 100%;
    transform-origin: center top;
    border-radius: 0 0 6em 6em;
    transform: rotate(${(props) => props.percent}turn);
  }

  .percentage .meter {
    background: ${(props) => props.meterColor};
  }
  .percentage-container {
    position: absolute;
    bottom: -0.75em;
    left: 2.5em;
    z-index: 1;
    width: 5em;
    height: 2.5em;
    overflow: hidden;
  }

  .percentage-indicator {
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1.75;
    color: ${(props) => props.meterColor};
    font-variant-numeric: tabular-nums;
    text-align: center;
  }

  .caption {
    color: #9ca3af;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 5px;
  }

  .win-number {
    width: 24px;
    position: absolute;
    left: 0px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 0.95em;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: #a8adb8;
    text-align: center;

    ::before {
      content: "W";
      position: absolute;
      bottom: 1.8em;
      left: 8px;
      font-family: ${constants.fontFamilyFuturistic};
      color: ${constants.colorWhite};
      text-shadow: none;
    }
  }

  .loss-number {
    width: 24px;
    position: absolute;
    right: 0px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 0.95em;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: #a8adb8;
    text-align: center;

    ::before {
      content: "L";
      position: absolute;
      bottom: 1.8em;
      right: 8px;
      font-family: ${constants.fontFamilyFuturistic};
      color: ${constants.colorWhite};
      text-shadow: none;
    }
  }

  .total-matches {
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 9px;
    color: ${constants.colorGreyMuted};
    text-align: center;
  }
`;

const computeMeterPercent = (value: number) => 0.005 * value;

const computeMeterColor = (value: number) => {
  if (value < 45) {
    return "#ef5350";
  } else if (value < 50) {
    return "#ffa726";
  } else if (value < 53) {
    return "#9ccc65";
  }
  return "#66bb6a";
};

const GaugeChart = ({
  number,
  percent,
  caption,
}: {
  number: number;
  percent: number;
  caption: string;
}) => (
  <Styled
    className="gauge-chart"
    percent={computeMeterPercent(percent)}
    meterColor={computeMeterColor(percent)}
  >
    <div className="caption">{caption}</div>
    <div className="gauge percentage">
      <div className="meter" />
      <div className="percentage-container">
        <div className="percentage-indicator">
          {`${Math.round(percent * 10) / 10}%`}
        </div>
      </div>
    </div>
    <div className="win-number">
      {abbreviateNumber(Math.round((number / 100) * percent))}
    </div>
    <div className="loss-number">
      {abbreviateNumber(Math.round((number / 100) * (100 - percent)))}
    </div>
    <div className="total-matches">{number}</div>
  </Styled>
);

export default GaugeChart;
