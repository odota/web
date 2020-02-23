import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import constants from '../../../constants';
import { getDOY, getLocalizedWeekdayStrings, getLocalizedMonthStrings } from './../../../../utility/index';
import Table from './../../../Table/Table';
import playerMatchesColumns from '../Matches/playerMatchesColumns';
import { WeeksContainer, DayContainer, Week, Styled, Content, WeekDayLabels } from './Styled';

const langCode = window.localStorage.getItem('localization') || 'en-US';
const weekDayStrings = getLocalizedWeekdayStrings();
const monthStrings = getLocalizedMonthStrings();

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

const getTooltip = (date, data) => {
  const dateString =
    date &&
    date.toLocaleDateString(langCode, {
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

  return `<div class="tt-container">
    <div>${dateString}</div>
    <div class="result">
      <span class="win">${win}</span>
      <span> - <span>
      <span class="loss"> ${loss}</span>
    </div>
  <div>`;
};

const Day = ({
  year,
  normalizationRatio,
  strings,
  handleMonthHoverOn,
  handleMonthHoverOff,
  hoveredMonth,
  day,
  handleDayClick,
  clickedDay,
}) => {
  const {
    month, date, data, firstDayOfMonth,
  } = day;
  const radius = circleRadius(data, normalizationRatio);
  const fillColor = circleColor(data);
  const tooltip = getTooltip(date, data, strings);
  const doy = date && getDOY(date);

  return (
    <DayContainer
      onClick={data && handleDayClick(doy)}
      className={date && 'active'}
      style={{
        opacity: hoveredMonth !== null && hoveredMonth !== month ? '0.2' : '1',
        outline: doy === clickedDay && `1px solid ${constants.colorBlue}`,
      }}
    >
      {firstDayOfMonth && (
        <div
          className="month"
          onMouseEnter={handleMonthHoverOn}
          onMouseLeave={handleMonthHoverOff}
        >
          {monthStrings[month]}
          {month === 0 && <span className="year">{year}</span>}
        </div>
      )}
      <svg
        height="15"
        width="15"
        data-tip={tooltip}
        data-html
        data-effect="float"
      >
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
  handleDayClick: PropTypes.func,
  clickedDay: PropTypes.number,
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
      (year < todayYear || i <= todayDays + 1)
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
  };

  state = { hoveredMonth: null, clickedDay: null };

  handleMonthHoverOn = month => () => {
    this.setState({ hoveredMonth: month });
  };

  handleMonthHoverOff = () => {
    this.setState({ hoveredMonth: null });
  };

  handleDayClick = clickedDay => () => {
    this.setState({
      clickedDay: clickedDay === this.state.clickedDay ? null : clickedDay,
    });
  };

  hideTable = () => {
    this.setState({ clickedDay: null });
  };

  render() {
    const { year, strings, data } = this.props;
    const { clickedDay } = this.state;
    const normalizationRatio = getNormalizationRatio(data);

    return (
      <React.Fragment>
        {mapDays2Weeks(year, data).map(week => (
          <Week>
            {week.map((day) => {
              const { firstDayOfMonth, month } = day;

              return (
                <Day
                  strings={strings}
                  handleMonthHoverOn={
                    firstDayOfMonth && this.handleMonthHoverOn(month)
                  }
                  handleMonthHoverOff={
                    firstDayOfMonth && this.handleMonthHoverOff
                  }
                  handleDayClick={this.handleDayClick}
                  hoveredMonth={this.state.hoveredMonth}
                  normalizationRatio={normalizationRatio}
                  day={day}
                  year={year}
                  clickedDay={clickedDay}
                />
              );
            })}
          </Week>
        ))}
        <div
          style={{
            transition: 'opacity 300ms ease-in-out',
            opacity: !clickedDay && 0,
            pointerEvents: clickedDay ? 'auto' : 'none',
            outline: 'none',
          }}
          id="hide-table"
          onClick={this.hideTable}
          onKeyPress={this.hideTable}
          role="button"
          tabIndex={0}
        >
          &#8613;
        </div>
        <div
          style={{
            transition: 'height 300ms ease-in-out',
            height:
              clickedDay !== null
                ? `${(data[clickedDay].matches.length * 48) + 48}px`
                : 0,
            width: 940,
            marginLeft: 44,
            overflow: 'hidden',
          }}
        >
          {clickedDay !== null && (
            <Table
              columns={playerMatchesColumns(strings, false)}
              data={data[clickedDay].matches}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const aggregateByYear = (matches) => {
  const data = {};
  matches.forEach((match) => {
    const { radiant_win: radiantWin, player_slot: playerSlot } = match;
    const date = new Date(match.start_time * 1000);
    const doy = getDOY(date);
    const year = date.getFullYear();

    if (year > 2012) {
      data[year] = data[year] || [];
      data[year][doy] = data[year][doy] || { win: 0, loss: 0, matches: [] };
      data[year][doy].matches.push(match);
      data[year][doy][radiantWin === (playerSlot < 5) ? 'win' : 'loss'] += 1;
    }
  });

  return data;
};

const ActivityCalendar = ({ strings, data }) => {
  const aggregatedData = aggregateByYear(data);

  return (
    <Styled>
      <ReactTooltip
        sanitizeHtmlOptions={{ allowedAttributes: false, allowedTags: false }}
        offset={{ right: 2 }}
      />
      {Object.keys(aggregatedData)
        .reverse()
        .map(year => (
          <Content>
            <WeeksContainer>
              <WeekDayLabels>
                {[...Array(7)].map((_, i) => (
                  <div>{weekDayStrings[i]}</div>
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
