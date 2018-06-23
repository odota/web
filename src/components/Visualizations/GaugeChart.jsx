import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Styled = styled.div` 
   font-size: 60%;
   padding: 5px;
   margin-right: 15px;
   position: relative;

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
  .gauge:before { border-radius:5em 5em 0 0; background:${constants.colorRed}; }
  
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
  
  .percentage .meter { background:${constants.colorGreen}; }
  .percentage-container {
    position:absolute;
    bottom:-.75em;
    left:2.5em;
    z-index:1000;
    width:5em;
    height:2.5em;
    overflow:hidden;
  }
  
  .percentage-indicator {
    font:bold 1.25em/1.6 sans-serif;
    color:${constants.colorGreen};
    
    white-space:pre;
    vertical-align:baseline;
    user-select:none;
    text-align: center;
  }

  .caption {
      text-align: center;
      color: rgb(179,179,179);
      font-size: 12;
  }

  .win {
    position:absolute;
    left:0.9em;
    bottom: 2em;
    color: rgb(245, 245, 245);
    
  }

  .loss {
    position:absolute;
    right:0.8em;
    bottom: 2em;
    color: rgb(245, 245, 245);
    
  }
`;
const computeMeterPercent = value => 0.005 * value;

const GaugeChart = ({ value, caption }) => (
  <Styled percent={computeMeterPercent(value)}>
    <div className="gauge percentage">
      <div className="meter" />
      <div className="percentage-container">
        <div className="percentage-indicator">
          {`${Math.round(value * 10) / 10}%`}
        </div>
      </div>
    </div>
    <div className="caption">{caption}</div>
    <div className="win">Win</div>
    <div className="loss">Loss</div>
  </Styled>
);

GaugeChart.propTypes = {
  value: PropTypes.number,
  caption: PropTypes.string,
};

export default GaugeChart;
