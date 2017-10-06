import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/Heading';
import {
  ReferenceArea,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  CartesianGrid,
  ReferenceLine,
  Legend,
  Label,
} from 'recharts';
import constants from 'components/constants';
import strings from 'lang';
import heroes from 'dotaconstants/build/heroes.json';
import playerColors from 'dotaconstants/build/player_colors.json';
import { StyledTooltip, StyledTooltipTeam, StyledRadiant, StyledDire, StyledHolder, GoldSpan, XpSpan, StyledTooltipGold } from './Styled';

const formatGraphTime = minutes => `${minutes}:00`;

const generateDiffData = (match) => {
  const { radiant_gold_adv, radiant_xp_adv } = match;
  const data = [];
  radiant_xp_adv.forEach((rXpAdv, index) => {
    data.push({ time: index, rXpAdv, rGoldAdv: radiant_gold_adv[index] });
  });
  return data;
};

const XpTooltipContent = ({ payload }) => {
  try {
    const data = payload[0].payload;
    const xp = data.rXpAdv;
    const gold = data.rGoldAdv;
    const time = data.time;

    return (
      <StyledTooltip>
        <StyledTooltipGold>
          <span>{`${formatGraphTime(time)}`}</span>
        </StyledTooltipGold>
        <br />
        <StyledTooltipGold>
          <StyledTooltipTeam
            color={gold > 0 ? constants.colorSuccess : constants.colorDanger}
          >
            {gold > 0 ? strings.general_radiant : strings.general_dire}
          </StyledTooltipTeam>
          <GoldSpan>{Math.abs(gold)} {strings.heading_graph_gold}</GoldSpan>
        </StyledTooltipGold>
        <br />
        <StyledTooltipGold>
          <StyledTooltipTeam
            color={xp > 0 ? constants.colorSuccess : constants.colorDanger}
          >
            {xp > 0 ? strings.general_radiant : strings.general_dire}
          </StyledTooltipTeam>
          <XpSpan>{Math.abs(xp)} {strings.heading_graph_xp}</XpSpan>
        </StyledTooltipGold>
      </StyledTooltip>
    );
  } catch (e) {
    return null;
  }
};
XpTooltipContent.propTypes = {
  payload: PropTypes.shape({}),
};

const XpNetworthGraph = ({ match, width }) => {
  const matchData = generateDiffData(match);
  const maxY =
      Math.ceil(Math.max(...match.radiant_gold_adv, ...match.radiant_xp_adv) / 5000) * 5000;
  const minY =
      Math.floor(Math.min(...match.radiant_gold_adv, ...match.radiant_xp_adv) / 5000) * 5000;
  return (
    <StyledHolder>
      <StyledRadiant>{strings.general_radiant}</StyledRadiant>
      <StyledDire>{strings.general_dire}</StyledDire>
      <Heading title={strings.heading_graph_difference} />
      <LineChart
        width={width}
        height={400}
        data={matchData}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
      >
        <ReferenceArea y1={0} y2={maxY} fill={'rgba(102, 187, 106, 0.12)'} />
        <ReferenceArea y1={0} y2={minY} fill={'rgba(255, 76, 76, 0.12)'} />
        <XAxis dataKey="time" interval={4} tickFormatter={formatGraphTime}>
          <Label value={strings.th_time} position="insideTopRight" />
        </XAxis>
        <YAxis domain={[minY, maxY]} />
        <ReferenceLine y={0} stroke="#505050" strokeWidth={2} opacity={1} />
        <CartesianGrid
          stroke="#505050"
          strokeWidth={1}
          opacity={0.5}
        />

        <Tooltip content={<XpTooltipContent />} />
        <Line
          dot={false}
          dataKey="rXpAdv"
          stroke="#acc9ed"
          strokeWidth={2}
          name={strings.heading_graph_xp}
        />
        <Line
          dot={false}
          dataKey="rGoldAdv"
          stroke="#ffd455"
          strokeWidth={2}
          name={strings.heading_graph_gold}
        />
        <Legend />
      </LineChart>
    </StyledHolder>
  );
};
XpNetworthGraph.defaultProps = {
  width: 1200,
};
XpNetworthGraph.propTypes = {
  width: PropTypes.number,
  match: PropTypes.shape({}),
};

const PlayersGraph = ({ match, width, type }) => {
  const matchData = [];
  if (match.players && match.players[0] && match.players[0][`${type}_t`]) {
    match.players[0][`${type}_t`].forEach((value, index) => {
      const obj = { time: formatGraphTime(index) };
      match.players.forEach((player) => {
        const hero = heroes[player.hero_id] || {};
        obj[hero.localized_name] = player[`${type}_t`][index];
      });
      matchData.push(obj);
    });

    return (
      <StyledHolder>
        <Heading title={strings[`heading_graph_${type}`]} />
        <LineChart
          width={width}
          height={400}
          data={matchData}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <XAxis dataKey="time" interval={4} >
            <Label value={strings.th_time} position="insideTopRight" />
          </XAxis>
          <YAxis />
          <CartesianGrid
            stroke="#505050"
            strokeWidth={1}
            opacity={0.5}
          />

          <Tooltip
            itemSorter={(a, b) => a.value < b.value}
            wrapperStyle={{ backgroundColor: constants.darkPrimaryColor, border: 'none' }}
          />
          {match.players.map((player) => {
            const hero = heroes[player.hero_id] || {};
            const playerColor = playerColors[player.player_slot];
            return (<Line
              dot={false}
              dataKey={hero.localized_name}
              stroke={playerColor}
              strokeWidth={2}
              name={hero.localized_name}
            />);
          })}
          <Legend />
        </LineChart>
      </StyledHolder>
    );
  }
  return null;
};
PlayersGraph.propTypes = {
  width: PropTypes.number,
  match: PropTypes.shape({}),
  type: PropTypes.string,
};

const MatchGraph = ({ type, match, width }) => {
  if (type === 'difference') {
    return <XpNetworthGraph match={match} width={width} />;
  } else if (type === 'gold' || type === 'xp' || type === 'lh') {
    return <PlayersGraph type={type} match={match} width={width} />;
  }
  return null;
};
MatchGraph.defaultProps = {
  width: 1200,
};
MatchGraph.propTypes = {
  width: PropTypes.number,
  match: PropTypes.shape({}),
  type: PropTypes.string,
};

export default MatchGraph;
