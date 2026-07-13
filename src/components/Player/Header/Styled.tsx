import { CardHeader } from "@mui/material";
import styled from "styled-components";
import constants from "../../constants";

export const PlayerStatsCard = styled(CardHeader)`
  & span:last-child {
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 24px !important;
    color: rgba(255, 255, 255, 0.87) !important;
    line-height: 36px !important;
  }

  & span:first-child {
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeSmall};
    color: rgba(255, 255, 255, 0.54) !important;
    line-height: 1 !important;
    text-transform: uppercase;
  }
`;

export default PlayerStatsCard;
