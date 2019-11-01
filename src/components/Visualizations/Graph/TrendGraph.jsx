import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  Label,
  ResponsiveContainer,
} from 'recharts';
import heroes from 'dotaconstants/build/heroes.json';
import styled from 'styled-components';
import { formatSeconds, fromNow, formatGraphValueData } from '../../../utility';
import constants from '../../constants';
import HeroImage from '../HeroImage';

const TooltipStylesDiv = styled.div`
  .tooltipWrapper {
    background-color: ${constants.defaultPrimaryColor};
    color: ${constants.textColorPrimary} !important;
    font-size: ${constants.fontSizeMedium};
    min-width: 250px;
  }

  .value {
    text-align: center;
    background-color: ${constants.colorBlueMuted};
    height: 30px;
    line-height: 30px;
    font-size: ${constants.fontSizeCommon};
  }

  .match {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .win {
    color: ${constants.colorSuccess};
  }

  .loss {
    color: ${constants.colorDanger};
  }

  .time {
    color: ${constants.colorMutedLight};
    font-size: ${constants.fontSizeTiny};
  }

  .matchValue {
    font-weight: bold;
  }

  .hero {
    height: 50px;
    width: 88.88px; /* ratio */
    background-color: ${constants.almostBlack};
  }

  .heroImg {
    height: 100%;
  }

  .noData {
    text-align: center;
    padding-top: 30px;
    font-size: ${constants.fontSizeCommon};
  }
`;
const TrendTooltipContent = ({ payload, name, strings }) => {
  const data = payload && payload[0] && payload[0].payload;
  if (data) {
    const hero = heroes[data.hero_id] || {};
    const trendStr = strings[`heading_${name}`];
    const unit = data.name === 'win_rate' ? '%' : '';
    return (
      <TooltipStylesDiv>
        <div className="tooltipWrapper">
          <div className="value">
            {data.name === 'win_rate' ? '' : strings.trends_tooltip_average}
            {` ${trendStr}: ${formatGraphValueData(Number(data.value.toFixed(2)), name)}${unit}`}
          </div>
          <div className="match">
            <div>
              <div>
                <span className={data.win ? 'win' : 'loss'}>
                  {data.win ? strings.td_win : strings.td_loss}
                </span>
                <span className="time">{` ${fromNow(data.start_time)}`}</span>
              </div>
              <div>{strings[`game_mode_${data.game_mode}`]}</div>
              <div>{formatSeconds(data.duration)}</div>
              {data.name === 'win_rate' || name === 'duration' ? (
                ''
              ) : (
                <div className="matchValue">
                  {`${trendStr}: ${formatGraphValueData(Number(data.independent_value.toFixed(2)), name)}${unit}`}
                </div>
              )}
            </div>
            <div className="hero">
              <HeroImage id={hero.id} className="heroImg" />
            </div>
          </div>
        </div>
      </TooltipStylesDiv>
    );
  }
  return null;
};
TrendTooltipContent.propTypes = {
  payload: PropTypes.arrayOf({}),
  name: PropTypes.string,
  strings: PropTypes.shape({}),
};

const TrendGraph = ({ columns, name, strings }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart
      data={columns}
      margin={{
        top: 5,
        right: 30,
        left: 30,
        bottom: 5,
      }}
    >
      <XAxis interval={49}>
        <Label value="" position="insideTopRight" />
      </XAxis>
      <YAxis domain={['auto', 'auto']} />
      <CartesianGrid stroke="#505050" strokeWidth={1} opacity={0.5} />

      <Tooltip content={<TrendTooltipContent name={name} strings={strings} />} />
      <Line
        dot={false}
        dataKey="value"
        stroke="#66BBFF"
        strokeWidth={2}
        name={strings[`heading_${name}`]}
      />
      <Legend />
    </LineChart>
  </ResponsiveContainer>
);

TrendGraph.propTypes = {
  columns: PropTypes.arrayOf({}),
  name: PropTypes.string,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(TrendGraph);
