/* global API_HOST */
import React from 'react';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  Label,
} from 'recharts';
import strings from 'lang';
import heroes from 'dotaconstants/build/heroes.json';
import { formatSeconds, fromNow } from 'utility';

// TODO enable click to go to match
// TODO apply styling
const TrendTooltipContent = ({ payload }) => {
  const data = (payload[0] || {}).payload;
  if (data && data.name && data.value) {
    const trendStr = strings[`heading_${data.name}`];
    const unit = data.name === 'win_rate' ? '%' : '';
    return (<div className="tooltipWrapper">
      <div className="value">
        {data.name === 'win_rate' ? '' : strings.trends_tooltip_average}
        {`${trendStr}: ${Number(data.value.toFixed(2))}${unit}`}
      </div>
      <div className="match">
        <div>
          <div>
            <span className={data.win ? 'win' : 'loss'}>
              {data.win ? strings.td_win : strings.td_loss}
            </span>
            <span className="time">
              {fromNow(data.start_time)}
            </span>
          </div>
          <div>
            {strings[`game_mode_${data.game_mode}`]}
          </div>
          <div>
            {formatSeconds(data.duration)}
          </div>
          {data.name === 'win_rate' ? '' : <div className="matchValue">
            {`${trendStr}: ${Number(data.independent_value.toFixed(2))}${unit}`}
          </div>}
        </div>
        <div className="hero">
          <img className="heroImg" src={`${API_HOST}${heroes[data.hero_id].img}`} alt="" />
        </div>
      </div>
    </div>);
  }
  return null;
};
TrendTooltipContent.propTypes = {
  payload: PropTypes.arrayOf({}),
};

const TrendGraph = ({ columns, name, onClick }) => (<LineChart
  width={1200}
  height={400}
  data={columns}
  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
>
  <XAxis dataKey="time" interval={4}>
    <Label value="" position="insideTopRight" />
  </XAxis>
  <YAxis />
  <CartesianGrid
    stroke="#505050"
    strokeWidth={1}
    opacity={0.5}
  />

  <Tooltip content={<TrendTooltipContent />} />
  <Line
    dot={false}
    dataKey="value"
    stroke="#66BBFF"
    strokeWidth={2}
    name={name}
  />
  <Legend />
</LineChart>
);

TrendGraph.propTypes = {
  columns: PropTypes.arrayOf({}),
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default TrendGraph;
