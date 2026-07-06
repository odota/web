import styled from "styled-components";
import constants from "../../constants";

export const StyledTooltip = styled.div`
  position: relative;
  width: auto;
  padding: 16px 24px;
  box-sizing: border-box;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: ${constants.fontFamilyFuturistic};
  font-size: ${constants.fontSizeMedium};
  line-height: 1.6;
  color: ${constants.colorWhite};
`;
export const StyledTooltipTeam = styled.span`
  position: relative;
  margin-right: 8px;
  color: ${(props) => props.color};
  font-size: ${constants.fontSizeMedium};
  font-weight: 500;
`;
export const StyledRadiant = styled.span`
  position: absolute;
  top: 48px;
  left: 100px;
  filter: drop-shadow(0 0 5px ${constants.colorSuccess});
  font-family: ${constants.fontFamilySerif};
  font-size: ${constants.fontSizeCommon};
  color: ${constants.colorWhite};
`;
export const StyledDire = styled.span`
  position: absolute;
  bottom: 60px;
  left: 100px;
  filter: drop-shadow(0 0 5px ${constants.colorDanger});
  font-family: ${constants.fontFamilySerif};
  font-size: ${constants.fontSizeCommon};
  color: ${constants.colorWhite};
`;
export const StyledCustomizedTooltip = styled.div`
  position: relative;
  bottom: 25px;
  padding: 16px 24px;
  box-sizing: border-box;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: ${constants.fontFamilyFuturistic};
  font-size: 14px;
  line-height: 1.6;
  color: ${constants.colorWhite};
  div {
    margin-bottom: 5px;
  }

  .data {
    font-size: ${constants.fontSizeSmall};
    line-height: 1.6;
    padding: 7px;

    &.isRadiant {
      background: linear-gradient(to right, rgba(50, 82, 51, 0.2), transparent);
    }

    &.isDire {
      background: linear-gradient(to right, rgba(82, 51, 50, 0.2), transparent);
    }
  }
`;
export const StyledHolder = styled.div`
  position: relative;
`;
export const GoldSpan = styled.span`
  color: ${constants.golden};
`;
export const XpSpan = styled.span`
  color: #acc9ed;
`;
export const StyledTooltipNetworthLineEntry = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: ${constants.fontSizeMedium};
`;
export const StyledTooltipTime = styled.div`
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #505459;
  font-size: ${constants.fontSizeMedium};
  font-weight: 600;
  text-align: center;
`;
export const TooltipLabel = styled.div`
  padding-bottom: 4px;
  border-bottom: 1px solid #505459;
  font-size: ${constants.fontSizeMedium};
  text-align: center;
`;
export const TooltipLineEntry = styled.div<{ color: string }>`
  padding: 4px 0;
  display: flex;
  border-left: ${({ color }) => `8px solid ${color}`};
`;
export const TooltipLineEntryHeroName = styled.span<{ color: string }>`
  margin-right: 8px;
  font-size: ${constants.fontSizeMedium};
  color: ${({ color }) => color};
`;
export const TooltipLineEntryValue = styled.span`
  margin-left: auto;
  display: inline-block;
  font-size: ${constants.fontSizeMedium};
  color: ${constants.colorWhite};
`;
export const BinName = styled.div`
  color: ${constants.colorWhite};
  font-size: ${constants.fontSizeCommon};
  font-weight: 600;
  text-decoration: underline;
`;
export const NumPlayers = styled.div`
  font-size: ${constants.fontSizeMedium};
`;
export const Percentile = styled.div`
  font-size: ${constants.fontSizeMedium};
`;
export const HistogramTooltipDiv = styled.div<{
  color?: string;
  fontSize?: "small" | "medium";
}>`
  font-size: ${({ fontSize }) =>
    fontSize === "medium" ? constants.fontSizeMedium : constants.fontSizeSmall};
  color: ${({ color }) => color};
`;
