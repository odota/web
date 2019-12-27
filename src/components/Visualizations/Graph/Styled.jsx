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

export const StyledCustomizedTooltip = styled.div`
  background-color: #131519;
  border: 2px solid #27292b;
  bottom: 25px;
  position: relative;

  div {
    margin-bottom: 5px;
  }

  .label {
    text-align: center;
    border-bottom: 1px solid #505459;
  }

  .data {
    line-height: 30px;
    padding-right: 7px;
    padding-left: 7px;
    background: linear-gradient(to right, rgba(82, 51, 50, 0.8) ,transparent);

    &.isRadiant {
      background: linear-gradient(to right, rgba(50, 82, 51, 0.8) ,transparent);
    }
  }
`;

export const StyledHolder = styled.div`position: relative;`;
export const GoldSpan = styled.span`color: ${constants.golden};`;
export const XpSpan = styled.span`color: #acc9ed;`;
export const StyledTooltipGold = styled.div`display: inline-flex;`;
