import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GaugeChart from './../../../Visualizations/GaugeChart';
import constants from '../../../constants';

const Styled = styled.div`
    border: 1px solid rgb(0, 0, 0, 0.12);
    background-color: rgba(255,255,255,0.03);
    overflow: hidden;
    position: relative;

    .gauge-container {
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
    }

    @media only screen and (min-width: ${constants.appWidth}px) {
      .gauge-chart:nth-child(even)::after {
        content: "";
        width: 2px;
        height: 300px;
        position: absolute;
        background: rgb(39, 39, 58);
        bottom: -50px;
        right: -13px;
      }
    }
`;

const Summary = ({ data }) => (
  <Styled>
    <div className="gauge-container">
      {data.map(el => <GaugeChart number={el.matches} percent={el.winPercent} caption={el.category} />)}
    </div>
  </Styled>
);

Summary.propTypes = {
  data: PropTypes.arrayOf({}),
};

export default Summary;
