import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Object } from 'core-js';
import constants from '../../../constants';
import { getDOY, toLoca } from './../../../../utility/index';

const Styled = styled.div`
  position: relative;
  text-align: center;
  padding: 10px;
`;

const Content = styled.div`
  position: relative;
  overflow-x: auto;

  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Week = styled.div`
  position: relative;
  display: inline-block;
`;

const WeekDayLabels = styled.div`
  position: relative;
  bottom: 2px;
  right: 10px;
  font-size: 11px;
  display: inline-block;
  direction: rtl;
  text-align: right;
  color: ${constants.colorMutedLight};

  div {
    line-height: 15px;
    margin-top: 2px;
  }
`;

const WeeksContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding-top: 30px;
  padding-bottom: 10px;
  width: 1000px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-top-left-radius: 5px;
`;

const DayContainer = styled.div`
  height: 15px;
  width: 15px;
  margin: 2px 0 2px 2px;
  line-height: 15px;
  font-size: 8px;
  transition: opacity 0.3s ease-in-out;

  svg:hover {
    opacity: 0.3;
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .weekDay {
    position: absolute;
    font-size: 11px;
    right: 22px;
    direction: rtl;
    text-align: right;
    color: ${constants.colorMutedLight};
  }

  .month {
    position: absolute;
    top: -20px;
    margin-left: 1px;
    font-size: 11px;
    color: ${constants.colorMutedLight};
    cursor: crosshair;

    & .year {
      display: inline-block;
      color: #6192b9;
      margin-left: 3px;
    }
  }

  .circle {
    position: relative;
    top: 43%;
    line-height: 0px;
    color: #b72424;
  }
`;

const circleRadius = (dayData, normalizationRatio) => {
  if (!dayData) {
    return 0;
  }
  const minRadius = 2;
  const maxRadius = 7;
  const sum = dayData.win + dayData.loss;

  return Math.max(minRadius, Math.min(maxRadius, sum / normalizationRatio));
};

const circleColor = (dayData) => {
  if (!dayData) {
    return 'transparent';
  }
  const { win, loss } = dayData;
  const sum = win + loss;
  const green = (win / sum) * 255;
  const red = 255 - green;

  return `rgb(${red},${green},0)`;
};

const getNormalizationRatio = (data) => {
  let maxValue = 0;
  data.forEach((day) => {
    const sum = day.win + day.loss;
    maxValue = maxValue < sum ? sum : maxValue;
  });

  return maxValue / 7;
};

const getTooltip = (date, data, strings) => {
  const dateString = date && date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  if (!date) {
    return null;
  } else if (!data) {
    return `${dateString}\n`;
  }
  const { win, loss } = data;

  return (
    `${dateString}\n` +
    `${strings.th_wins} - ${win}\n` +
    `${strings.th_losses} - ${loss}`
  );
};

const Day = ({
  year,
  normalizationRatio,
  strings,
  handleMonthHoverOn,
  handleMonthHoverOff,
  hoveredMonth,
  day,
}) => {
  const {
    month, date, data, firstDayOfMonth,
  } = day;
  const radius = circleRadius(data, normalizationRatio);
  const fillColor = circleColor(data);
  const tooltip = getTooltip(date, data, strings);


  return (
    <DayContainer
      className={date && 'active'}
      style={{
        opacity: hoveredMonth !== null && hoveredMonth !== month ? '0.2' : '1',
      }}
    >
      {firstDayOfMonth && (
        <div
          className="month"
          onMouseEnter={handleMonthHoverOn}
          onMouseLeave={handleMonthHoverOff}
        >
          {strings[`month_abbr_${month}`]}
          {month === 0 && <span className="year">{year}</span>}
        </div>
      )}
      <svg height="15" width="15" data-tip={tooltip}>
        <circle cx="8" cy="8" r={radius} fill={fillColor} />
      </svg>
    </DayContainer>
  );
};

Day.propTypes = {
  year: PropTypes.number,
  normalizationRatio: PropTypes.number,
  strings: PropTypes.shape({}),
  handleMonthHoverOn: PropTypes.func,
  handleMonthHoverOff: PropTypes.func,
  hoveredMonth: PropTypes.number,
  day: PropTypes.shape({}),
};

const mapDays2Weeks = (year, data) => {
  const firstDay = new Date(year, 0, 1).getDay();
  const lastDay = new Date(year, 11, 31).getDay();
  const today = new Date();
  const todayDays = getDOY(today);
  const todayYear = today.getFullYear();
  const weeks = [];
  let week = [];

  for (let i = 1; i <= 53 * 7; i += 1) {
    if (
      i >= firstDay + 1 &&
      i <= (53 * 7) - 6 + lastDay &&
      (year < todayYear || i <= todayDays)
    ) {
      const date = new Date(year, 0, i - firstDay);
      week.push({
        date,
        month: date.getMonth(),
        firstDayOfMonth: date.getDate() === 1,
        data: data[getDOY(date)],
      });
    } else {
      week.push({});
    }
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  return weeks;
};

class Weeks extends React.Component {
  static propTypes = {
    year: PropTypes.number,
    strings: PropTypes.shape({}),
    data: PropTypes.arrayOf(PropTypes.shape({})),
  }

  state = { hoveredMonth: null };

  handleMonthHoverOn = month => () => {
    this.setState({ hoveredMonth: month });
  };

  handleMonthHoverOff = () => {
    this.setState({ hoveredMonth: null });
  };

  render() {
    const { year, strings, data } = this.props;
    const normalizationRatio = getNormalizationRatio(data);

    return mapDays2Weeks(year, data).map(week => (
      <Week>
        {week.map((day) => {
          const { firstDayOfMonth, month } = day;

          return (
            <Day
              strings={strings}
              handleMonthHoverOn={
                firstDayOfMonth && this.handleMonthHoverOn(month)
              }
              handleMonthHoverOff={firstDayOfMonth && this.handleMonthHoverOff}
              hoveredMonth={this.state.hoveredMonth}
              normalizationRatio={normalizationRatio}
              day={day}
              year={year}
            />
          );
        })}
      </Week>
    ));
  }
}

const aggregateByYear = (matches) => {
  const data = {};
  matches.forEach((match) => {
    const { radiant_win: radiantWin, player_slot: playerSlot } = match;
    const date = new Date(match.start_time * 1000);
    const doy = getDOY(date);
    const year = date.getFullYear();

    data[year] = data[year] || [];
    data[year][doy] = data[year][doy] || { win: 0, loss: 0 };
    data[year][doy][radiantWin === (playerSlot < 5) ? 'win' : 'loss'] += 1;
  });

  return data;
};


const ActivityCalendar = ({ strings, data }) => {
  const aggregatedData = aggregateByYear(data);

  return (
    <Styled>
      <ReactTooltip />
      {Object.keys(aggregatedData)
        .reverse()
        .map(year =>
            year > 2012 && (
              <Content>
                <WeeksContainer>
                  <WeekDayLabels>
                    {[...Array(7)].map((_, i) => (
                      <div>{strings[`day_abbr_${i}`]}</div>
                    ))}
                  </WeekDayLabels>
                  <Weeks
                    year={year}
                    strings={strings}
                    data={aggregatedData[year]}
                  />
                </WeeksContainer>
              </Content>
            ))}
    </Styled>
  );
};

ActivityCalendar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  strings: PropTypes.shape({}),
};

export default ActivityCalendar;
