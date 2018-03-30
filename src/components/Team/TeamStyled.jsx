import styled from 'styled-components';
import { CardTitle } from 'material-ui/Card';
import Container from '../Container';
import constants from '../constants';

export const TeamStatsCard = styled(CardTitle)`
  display: inline-block;
  padding: 0 !important;
  margin-right: 25px;
  margin-top: 15px;

  .textSuccess {
    color: ${constants.colorGreen}
  }

  .textDanger {
    color: ${constants.colorRed}
  }

  & span:last-child {
    font-size: 24px !important;
    color: rgba(255, 255, 255, 0.87) !important;
    line-height: 36px !important;
  }

  & span:first-child {
    font-size: 14px !important;
    color: rgba(255, 255, 255, 0.54) !important;
    line-height: 1 !important;
    text-transform: uppercase;
  }
`;

export const Logo = styled.img`
  margin-left: 30px;
  margin-right: 30px;
  width: 124px;
  @media only screen and (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const TableImage = styled.img`
  margin-right: 10px;
  width: 35px;
  max-height: 45px;
`;

export const TeamName = styled.span`
  color: rgba(245, 245, 245, 0.870588);
  font-size: 28px;
  @media only screen and (max-width: 768px) {
    text-align:center;
  }
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MatchesContainer = styled.div`
  width: calc(65% - 15px);
  margin-right: 15px;

  @media only screen and (max-width: 1080px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const MemberAndHeroContainer = styled.div`
  width: 35%;

  @media only screen and (max-width: 1080px) {
    width: 100%;
  }
`;
