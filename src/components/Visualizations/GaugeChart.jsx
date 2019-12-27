import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { abbreviateNumber } from '../../utility';

const Styled = styled.div` 
   font-size: 60%;
   margin: 5px 19px 15px 5px;
   position: relative;
   display: inline-block;
   
  :last-child {
    margin-right: 5px !important;
  }

  .gauge {
    display:inline-block;
    position:relative;
    width:10em;
    height:5em;
    overflow:hidden;  
  }
  
  .gauge:before, .gauge:after, .meter {
    position:absolute;
    display:block;
    content:"";
  }
  
  .gauge:before, .meter { width:10em; height:5em; }
  .gauge:before { border-radius:5em 5em 0 0; background:#2a2a2a; }
  
  .gauge:after {
    position:absolute;
    bottom:0;
    left:2.5em;
    width:5em;
    height:2.5em;
    background:rgb(33, 34, 44);
    border-radius:2.5em 2.5em 0 0;
  }
  
  .meter {
    top:100%;
    transform-origin:center top;
    border-radius:0 0 6em 6em;
    transform:rotate(${props => props.percent}turn);
  }
  
  .percentage .meter { background:${props => props.meterColor}; }
  .percentage-container {
    position:absolute;
    bottom:-.75em;
    left:2.5em;
    z-index:1;
    width:5em;
    height:2.5em;
    overflow:hidden;
  }
  
  .percentage-indicator {
    font:bold 1.25em/1.6 sans-serif;
    color:${props => props.meterColor};
    
    white-space:pre;
    vertical-align:baseline;
    user-select:none;
    text-align: center;
  }

  .caption {
      position: relative;
      text-align: center;
      color: rgb(179,179,179);
      font-size: 12px;
      bottom: 5px;
      text-transform: uppercase;
      width: 96px;
      max-height: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 2px;
  }

  .win-number {
    position:absolute;
    left:0px;
    text-align: center;
    color: rgb(144, 144, 144);
    font-family: Tahoma;
    width: 24px;
    

    ::before {
      position: absolute;
      bottom: 1.8em;
      left: 8px;
      content: "W";
      color: white;
      text-shadow: 1px 1px black;
    }
  }

  .loss-number {
    position:absolute;
    right:0px;
    text-align: center;
    color: rgb(144, 144, 144);
    font-family: Tahoma;
    width: 24px;

    ::before {
      position: absolute;
      bottom: 1.8em;
      right: 8px;
      content: "L";
      color: white;
      text-shadow: 1px 1px black;
    }
  }
`;

const computeMeterPercent = value => 0.005 * value;

const computeMeterColor = (value) => {
  if (value < 45) {
    return 'rgb(179,132,91)';
  } else if (value < 50) {
    return 'rgb(156,148,96)';
  } else if (value < 53) {
    return 'rgb(140,159,99)';
  }
  return 'rgb(117,176,103)';
};

const GaugeChart = ({ number, percent, caption }) => (
  <Styled className="gauge-chart" percent={computeMeterPercent(percent)} meterColor={computeMeterColor(percent)}>
    <div className="caption">{caption}</div>
    <div className="gauge percentage">
      <div className="meter" />
      <div className="percentage-container">
        <div className="percentage-indicator">
          {`${Math.round(percent * 10) / 10}%`}
        </div>
      </div>
    </div>
    <div className="win-number">{abbreviateNumber(Math.round((number / 100) * percent))}</div>
    <div className="loss-number">{abbreviateNumber(Math.round((number / 100) * (100 - percent)))}</div>
  </Styled>
);

GaugeChart.propTypes = {
  percent: PropTypes.number,
  number: PropTypes.number,
  caption: PropTypes.string,
};

export default GaugeChart;
