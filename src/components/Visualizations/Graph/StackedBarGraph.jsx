import React from 'react';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Heading from 'components/Heading';
import strings from 'lang';
import constants from 'components/constants';
import { StyledHolder } from './Styled';

const category10 = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

const StackedBarGraph = ({
  columns,
  heading,
  type,
}) => {
  columns.sort((a, b) => {
    const aSum = Object.values(a).map(Number).filter(v => !Number.isNaN(v)).reduce((a, b) => a + b);
    const bSum = Object.values(b).map(Number).filter(v => !Number.isNaN(v)).reduce((a, b) => a + b);
    return bSum - aSum;
  });
  return (
    <StyledHolder>
      <Heading title={heading} />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          height={400}
          data={columns}
          margin={{
      top: 5, right: 30, left: 30, bottom: 5,
    }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid
            stroke="#505050"
            strokeWidth={1}
            opacity={0.5}
          />
          <Tooltip
            cursor={{ opacity: '0.06' }}
            wrapperStyle={{ backgroundColor: constants.darkPrimaryColor, border: 'none' }}
          />
          {Object.keys(strings).filter(str => str.indexOf(`${type}_`) === 0).map((gr, i) => (
            <Bar
              dataKey={gr.substring(`${type}_`.length)}
              name={strings[gr]}
              stackId={gr === 'gold_reasons_1' || gr === 'gold_reasons_2' ? 'a' : 'b'}
              fill={category10[i]}
            />
        ))}
        </BarChart>
      </ResponsiveContainer>
    </StyledHolder>);
};

StackedBarGraph.propTypes = {
  columns: PropTypes.arrayOf(),
  heading: PropTypes.string,
  type: PropTypes.string,
};

export default StackedBarGraph;
