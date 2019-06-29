import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Brush,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import heroes from 'dotaconstants/build/heroes.json';
import playerColors from 'dotaconstants/build/player_colors.json';
import Heading from '../../Heading';
import { StyledHolder, StyledCustomizedTooltip } from '../../Visualizations/Graph/Styled';

const formatGraphTime = minutes => `${minutes}:00`;

const CustomizedTooltip = ({ label, payload }) => (
  <StyledCustomizedTooltip>
    <div className="label">{label}</div>
    {payload.map((data, i) =>
    (
      <div value={data.value} className={`data ${i < 5 && 'isRadiant'}`} style={{ borderLeft: `8px solid ${data.color}` }}>
        {data.dataKey}: {data.value}
      </div>)).sort((a, b) => b.props.value - a.props.value)
    }
  </StyledCustomizedTooltip>
);
CustomizedTooltip.propTypes = {
  payload: PropTypes.shape({}),
  label: PropTypes.number,
};

const iconUrlFromHeroKey = (heroKey) => {
  const heroIds = Object.keys(heroes).filter((k) => heroes[k].name === heroKey);
  if (heroIds && heroIds[0] && heroes[heroIds[0]]) {
    return `${process.env.REACT_APP_API_HOST}${heroes[heroIds[0]].icon}`
  } else {
    return '/assets/images/blank-1x1.gif'
  }
}

const CustomizedDot = (props) => {
  const {
    cx, cy, payload
  } = props;

  const kills = props.killsLog.filter((l) => {
    const t = (l.time - l.time % 60) / 60;
    return formatGraphTime(t) === payload.time
  })

  if (kills.length > 0) {
    return (
      <svg x={cx - 16} y={(cy - 16*kills.length)} width={32} height={32*kills.length}>
        {kills.map((k,i) => <image cx={16} y={32*i} width={32} height={32} href={iconUrlFromHeroKey(k.key)} />)}
      </svg>
    );
  } else {
    return <svg />;
  }
};

class Graph extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { match, strings } = this.props;
    const { selectedPlayer } = this.props;

    const matchData = [];
    if (match.players && match.players[0] && match.players[0][`lh_t`]) {
      match.players[0][`lh_t`].forEach((value, index) => {
        if (index <= Math.floor(match.duration / 60)) {
          const obj = { time: formatGraphTime(index) };
          match.players.forEach((player) => {
            const hero = heroes[player.hero_id] || {};
            obj[hero.localized_name] = player[`lh_t`][index];
            obj[hero.localized_name] += player[`dn_t`][index];
          });
          matchData.push(obj);
        }
      });

      return (
        <StyledHolder>
          <Heading title={strings[`heading_graph_cs`]} />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={matchData}
              margin={{
                top: 5, right: 10, left: 10, bottom: 5,
              }}
            >
              <XAxis dataKey="time" />
              <YAxis mirror="true" />
              <CartesianGrid
                stroke="#505050"
                strokeWidth={1}
                opacity={0.5}
              />

              <Tooltip content={<CustomizedTooltip />} />
              {match.players.map((player) => {
                const hero = heroes[player.hero_id] || {};
                const playerColor = playerColors[player.player_slot];
                const isSelected = selectedPlayer === player.player_slot;
                const opacity = (isSelected) ? 1 : 0.25;
                const stroke = (isSelected) ? 4 : 2;
                return (<Line
                  dot={isSelected ? <CustomizedDot killsLog={player.kills_log} /> : false}
                  dataKey={hero.localized_name}
                  stroke={playerColor}
                  strokeWidth={stroke}
                  strokeOpacity={opacity}
                  name={hero.localized_name}
                />);
              })}
              <Legend />
              <Brush endIndex={12} height={20} />
            </LineChart>
          </ResponsiveContainer>
        </StyledHolder>
      );
    }

    return null;
  }
}


const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Graph);
