import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    z-index:1000;
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

const GaugeChart = ({ value, caption }) => (
  <Styled percent={computeMeterPercent(value)} meterColor={computeMeterColor(value)}>
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
