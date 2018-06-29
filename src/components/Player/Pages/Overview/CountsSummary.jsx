import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GaugeChart from './../../../Visualizations/GaugeChart';

const Styled = styled.div`
    border: 1px solid rgb(52, 50, 50);
    background-color: rgb(46, 47, 64);
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    .gauge-container {
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
    }
    
    .divider-container {
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .divider {
      display: none;
      height: 88px;
      bottom: 0px;
      width: 2px;
      background: rgb(39, 39, 58);
      position: relative;
      margin-right: 240px;
      left: 234px;
    }

    @media only screen and (min-width: 1200px) {
      .divider {
        display: inline-block;
      }
    }
`;

const Summary = ({ data }) => (
  <Styled>
    <div className="divider-container">
      <div className="divider" />
      <div className="divider" />
      <div className="divider" />
      <div className="divider" />
    </div>
    <div className="gauge-container">
      {data.map(el => <GaugeChart number={el.matches} percent={el.winPercent} caption={el.category} />)}
    </div>
  </Styled>
);

Summary.propTypes = {
  data: PropTypes.arrayOf({}),
};

export default Summary;
