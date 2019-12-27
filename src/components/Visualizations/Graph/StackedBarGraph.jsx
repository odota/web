import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Heading from '../../Heading';
import constants from '../../constants';
import { StyledHolder } from './Styled';

const category10 = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

const StackedBarGraph = ({
  columns,
  heading,
  type,
  strings,
  tickElement,
  tooltipFormatter,
}) => {
  columns.sort((a, b) => {
    const aSum = Object.values(a).map(Number).filter(v => !Number.isNaN(v)).reduce((c, d) => c + d, 0);
    const bSum = Object.values(b).map(Number).filter(v => !Number.isNaN(v)).reduce((c, d) => c + d, 0);
    return bSum - aSum;
  });
  const xAxisProps = {};
  if (tickElement) {
    xAxisProps.tick = tickElement;
  }
  const tooltipProps = {};
  if (tooltipFormatter) {
    tooltipProps.labelFormatter = tooltipFormatter;
  }
  return (
    <StyledHolder>
      <Heading title={heading} />
      <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <ResponsiveContainer width="100%" height={400} minWidth={1000} >
          <BarChart
            height={400}
            data={columns}
            margin={{
              top: 15, right: 30, left: 30, bottom: 15,
            }}
          >
            <XAxis dataKey="name" {...xAxisProps} />
            <YAxis />
            <CartesianGrid
              stroke="#505050"
              strokeWidth={1}
              opacity={0.5}
            />
            <Tooltip
              cursor={{ opacity: '0.06' }}
              wrapperStyle={{ backgroundColor: constants.darkPrimaryColor, border: 'none' }}
              {...tooltipProps}
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
      </div>
    </StyledHolder>);
};

StackedBarGraph.propTypes = {
  columns: PropTypes.arrayOf(),
  heading: PropTypes.string,
  type: PropTypes.string,
  strings: PropTypes.shape({}),
  tickElement: PropTypes.func,
  tooltipFormatter: PropTypes.func,
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(StackedBarGraph);
