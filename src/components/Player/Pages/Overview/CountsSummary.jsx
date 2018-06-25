import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GaugeChart from './../../../Visualizations/GaugeChart';

const Styled = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid rgb(52, 50, 50);
    background-color: rgb(46, 47, 64);

    > div {
        margin-top: 3px;
    }
`;

const Summary = ({ data }) => (
  <Styled>
    {data.map(el => <GaugeChart number={el.matches} percent={el.winPercent} caption={el.category} />)}
  </Styled>
);

Summary.propTypes = {
  data: PropTypes.arrayOf({}),
};

export default Summary;
