import React from 'react';
import PropTypes from 'prop-types';
import { Graph } from 'components/Visualizations';
import strings from 'lang';

const getXAxis = columns =>
  ({
    label: strings.th_filter_date,
    tick: {
      format: x => columns[x].x.toDateString(),
    },
  });

const MMRGraph = ({ columns }) => (
  <Graph
    type="line"
    columns={columns}
    name={strings.th_solo_mmr}
    colors={{
      [strings.th_solo_mmr]: '#66BBFF',
      [strings.th_party_mmr]: '#FF4C4C',
    }}
    noX
    hidePoints
    xAxis={getXAxis(columns)}
    otherColumnNames={[{ name: strings.th_party_mmr, property: 'competitiveRank' }]}
  />
);

MMRGraph.propTypes = {
  columns: PropTypes.arrayOf().isRequired,
};

export default MMRGraph;
