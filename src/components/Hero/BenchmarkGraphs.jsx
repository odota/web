import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import BenchmarkGraph from './BenchmarkGraph';
import constants from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 48px -8px;

  @media screen and (max-width: ${constants.wrapMobile}) {
    display: block;
    margin-left: 0;
    margin-right: 0;
  }
`;

const mapData = (data, key) => data.map(item => ({ Percentage: (`${item.percentile * 100}%`), Value: typeof item[key] === 'number' && Number(item[key].toFixed(2)) }));

const getData = (data, strings) => [
  { title: strings.tooltip_gold_per_min, data: mapData(data, 'gold_per_min'), color: constants.golden },
  { title: strings.tooltip_xp_per_min, data: mapData(data, 'xp_per_min'), color: constants.blue },
  { title: strings.tooltip_hero_damage_per_min, data: mapData(data, 'hero_damage_per_min'), color: constants.red },
  { title: strings.tooltip_hero_healing_per_min, data: mapData(data, 'hero_healing_per_min'), color: constants.green },
  { title: strings.tooltip_kills_per_min, data: mapData(data, 'kills_per_min'), color: constants.yelor },
  { title: strings.tooltip_last_hits_per_min, data: mapData(data, 'last_hits_per_min'), color: constants.colorBlueGray },
  { title: strings.tooltip_lhten, data: mapData(data, 'lhten'), color: constants.golden },
  { title: strings.tooltip_stuns_per_min, data: mapData(data, 'stuns_per_min'), color: constants.red },
];

const renderGraphs = data => data.map(graphData => <BenchmarkGraph key={graphData.title} data={graphData} />);

const BenchmarkGraphs = ({ data, strings }) => {
  const mappedData = getData(data, strings);

  return (
    <Wrapper>
      { renderGraphs(mappedData) }
    </Wrapper>
  );
};

BenchmarkGraphs.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({})),
  strings: propTypes.shape({}),
};

export default BenchmarkGraphs;
