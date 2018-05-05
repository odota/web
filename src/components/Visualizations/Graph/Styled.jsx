import styled from 'styled-components';
import constants from '../../constants';

export const StyledTooltip = styled.div`
  position: relative;
  width:auto;
  display: block;
  padding: 0.5em;
  background-color: ${constants.darkPrimaryColor};
`;

export const StyledTooltipTeam = styled.span`
  position: relative;
  margin-right: 0.3em;
  color: ${props => props.color};
`;

export const StyledRadiant = styled.span`
  color: white;
  position: absolute;
  top: 52px;
  left: 100px;
  filter: drop-shadow(0 0 5px ${constants.colorSuccess});
`;
export const StyledDire = styled.span`
  position: absolute;
  bottom: 60px;
  left: 100px;
  color: white;
  filter: drop-shadow(0 0 5px ${constants.colorDanger});
`;
export const StyledHolder = styled.div`position: relative;`;
export const GoldSpan = styled.span`color: ${constants.golden};`;
export const XpSpan = styled.span`color: #acc9ed;`;
export const StyledTooltipGold = styled.div`display: inline-flex;`;
