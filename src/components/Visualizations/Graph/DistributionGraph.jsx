import React from 'react';
import PropTypes from 'prop-types';
// import strings from 'lang';
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ComposedChart,
  CartesianGrid,
  Label,
} from 'recharts';

// TODO add tooltips
const DistributionTooltipContent = ({ payload }) => (<div />);
DistributionTooltipContent.propTypes = {
  payload: PropTypes.arrayOf({}),
};

const DistributionGraph = ({
  data,
}) => {
  const mmr = data && data.mmr && data.mmr.rows;
  if (mmr) {
    /*
      const counts = mmr.map(d => (d.count));
      const count = counts.reduce((c, n) => (c + n), 0);
      const names = mmr.map(d => (d.bin_name));
      const pcts = mmr.map(d => ((d.cumulative_sum / count) * 100));
      const options = {
        data: {
          x: strings.th_mmr,
          columns: [
            [strings.th_mmr].concat(names), [strings.th_players].concat(counts), [strings.th_percentile].concat(pcts),
          ],
          type: 'bar',
          types: {
            Percentile: 'spline',
          },
          axes: {
            Players: 'y',
            Percentile: 'y2',
          },
          groups: [
            [strings.th_players, strings.th_percentile],
          ],
        },
        bar: {
          width: {
            ratio: 0.8,
          },
        },
        axis: {
          x: {
            label: strings.th_mmr,
          },
          y: {
            label: strings.th_players,
          },
          y2: {
            show: true,
            label: strings.th_percentile,
          },
        },
        tooltip: {
          format: {
            value: function tooltip(value, ratio, id) {
              // also has ind param
              if (id === strings.th_percentile) {
                return value.toFixed(2);
              }
              return value;
            },
          },
        },
      };
      */
    console.log(mmr);
    return (<ComposedChart
      width={1200}
      height={600}
      data={mmr}
      margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
    >
      <XAxis dataKey="x" interval={1}>
        <Label value="" position="insideTopRight" />
      </XAxis>
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <CartesianGrid
        stroke="#505050"
        strokeWidth={1}
        opacity={0.5}
      />

      <Tooltip content={<DistributionTooltipContent />} />
      <Bar
        dataKey="count"
        yAxisId="left"
      />
      <Line
        dataKey="cumulative_sum"
        yAxisId="right"
      />
    </ComposedChart>
    );
  }
  return null;
};

DistributionGraph.propTypes = {
  data: PropTypes.arrayOf(),
};

export default DistributionGraph;
