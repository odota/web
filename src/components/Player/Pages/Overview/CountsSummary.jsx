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
