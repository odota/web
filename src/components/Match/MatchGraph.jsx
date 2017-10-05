import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
} from 'recharts';
import constants from '../constants';

const StyledRadiant = styled.span`
  color: white;
  position: absolute;
  top: 52px;
  left: 100px;
  filter: drop-shadow(0 0 5px ${constants.colorSuccess});
`;
const StyledDire = styled.span`
  position: absolute;
  top: 280px;
  left: 100px;
  color: white;
  filter: drop-shadow(0 0 5px ${constants.colorDanger});
`;
const StyledHolder = styled.div`position: relative;`;

const StyledTooltip = styled.div`
  position: relative;
  display: block;
  padding: 0.5em;
  background-color: ${constants.darkPrimaryColor};
`;
const StyledTooltipTeam = styled.span`
  position: relative;
  margin-right: 0.3em;
  color: ${props => props.color};
`;
const GoldSpan = styled.span`color: ${constants.golden};`;
const XpSpan = styled.span`color: #acc9ed;`;
const StyledTooltipGold = styled.div`display: inline-flex;`;

const generateDiffData = (match) => {
  const { radiant_gold_adv, radiant_xp_adv } = match;
  const data = [];
  radiant_xp_adv.forEach((rXpAdv, index) => {
    data.push({ time: index, rXpAdv, rGoldAdv: radiant_gold_adv[index] });
  });
  return data;
};
const TooltipContent = ({ payload }) => {
  try {
    const data = payload[0].payload;
    const xp = data.rXpAdv;
    const gold = data.rGoldAdv;
    return (
      <StyledTooltip>
        <StyledTooltipGold>
          <StyledTooltipTeam
            color={gold > 0 ? constants.colorSuccess : constants.colorDanger}
          >
            {gold > 0 ? 'Radiant' : 'Dire'}
          </StyledTooltipTeam>
          <GoldSpan>{Math.abs(gold)}</GoldSpan>
        </StyledTooltipGold>
        <br />
        <StyledTooltipGold>
          <StyledTooltipTeam
            color={xp > 0 ? constants.colorSuccess : constants.colorDanger}
          >
            {xp > 0 ? 'Radiant' : 'Dire'}
          </StyledTooltipTeam>
          <XpSpan>{Math.abs(xp)}</XpSpan>
        </StyledTooltipGold>
      </StyledTooltip>
    );
  } catch (e) {
    return null;
  }
};

TooltipContent.propTypes = {
  payload: PropTypes.object,
};
class XpNetworthGraph extends PureComponent {
  render() {
    const { match } = this.props;
    const matchData = generateDiffData(match);
    const maxY =
      Math.ceil(
        Math.max(...match.radiant_gold_adv, ...match.radiant_xp_adv) / 5000,
      ) * 5000;
    const minY =
      Math.floor(
        Math.min(...match.radiant_gold_adv, ...match.radiant_xp_adv) / 5000,
      ) * 5000;
    return (
      <StyledHolder>
        <StyledRadiant>The Radiant</StyledRadiant>
        <StyledDire>The Dire</StyledDire>
        <Heading title="Team XP and Net worth" />
        <LineChart
          width={this.props.width}
          height={320}
          data={matchData}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <ReferenceArea y1={0} y2={maxY} fill={'rgba(102, 187, 106, 0.12)'} />
          <ReferenceArea y1={0} y2={minY} fill={'rgba(255, 76, 76, 0.12)'} />
          <XAxis dataKey="time" interval={4} />
          <YAxis domain={[minY, maxY]} tickFormatter={Math.abs} />
          <ReferenceLine y={0} stroke="#505050" strokeWidth={2} opacity={1} />
          <CartesianGrid
            vertical={false}
            stroke="#505050"
            strokeWidth={1}
            opacity={0.5}
          />

          <Tooltip content={<TooltipContent />} />
          <Line
            dot={false}
            dataKey="rXpAdv"
            stroke="#acc9ed"
            strokeWidth={2}
            name="Xp"
          />
          <Line
            dot={false}
            dataKey="rGoldAdv"
            stroke="#ffd455"
            strokeWidth={2}
            name="Gold"
          />
          <Legend />
        </LineChart>
      </StyledHolder>
    );
  }
}
XpNetworthGraph.defaultProps = {
  width: 1200,
};
XpNetworthGraph.propTypes = {
  width: PropTypes.number,
  match: PropTypes.object,
};
export default XpNetworthGraph;
