import { CardTitle } from 'material-ui/Card';
import styled from 'styled-components';

export const PlayerStatsCard = styled(CardTitle)`
  display: inline-block;
  padding: 0 !important;
  margin-right: 25px;
  margin-top: 15px;

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

export default PlayerStatsCard;
