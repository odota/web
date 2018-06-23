import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GaugeChart from './../../../Visualizations/GaugeChart';

const Styled = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;

    > div {
        margin-top: 3px;
    }
`;

const Summary = ({ data }) => (
  <Styled>
    {data.map(el => <GaugeChart value={el.winPercent} caption={el.category} />)}
  </Styled>
);

Summary.propTypes = {
  data: PropTypes.arrayOf({}),
};

export default Summary;
