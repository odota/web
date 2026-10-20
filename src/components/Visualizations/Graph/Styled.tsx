import styled from "styled-components";
import constants from "../../constants";

export const LaningXpDifference = styled.span<{ $difference: number }>`
  font-weight: 600;
  color: ${({ $difference }) =>
    $difference > 0
      ? constants.colorSuccess
      : $difference < 0
        ? constants.golden
        : "inherit"};
`;

export const HeroLevelBadge = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 3px;
  box-sizing: border-box;
  border: 1px solid rgba(128, 128, 128, 0.4);
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.12);
  color: ${constants.golden};
  font-size: 10px;
  font-weight: 600;
  line-height: 1;

  .milestone-dots {
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2px;
  }

  .milestone-dots > span {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.65;
  }
`;

export const PhaseHero = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${constants.primaryTextColor};
  font-weight: 500;

  img {
    width: 1em;
    height: 1em;
    object-fit: contain;
  }
`;

export const LaningCaptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 16px;
  margin-top: 24px;
  color: ${constants.primaryTextColor};
  font-family: ${constants.fontFamilyFuturistic};
  font-size: 12px;
  line-height: 1.7;

  > p {
    grid-column: 1 / -1;
    margin: 0;
    color: ${constants.colorGreyMuted};
    font-size: 12px;
  }
`;

export const LaningCaptionCard = styled.section<{ $isRadiant: boolean }>`
  padding: 20px;
  background: ${constants.primarySurfaceColor};
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-top: 3px solid
    ${({ $isRadiant }) =>
      $isRadiant ? constants.colorSuccess : constants.colorDanger};
  border-radius: 8px;
  min-width: 0;

  h4 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }

  h5 {
    margin: 16px 0 6px;
    font-size: 12px;
    color: ${constants.primaryTextColor};
  }


  h3 {
    margin: 0 0 12px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 14px;
    color: ${({ $isRadiant }) =>
      $isRadiant ? constants.colorSuccess : constants.colorDanger};
  }

  p {
    margin: 0 0 16px;
  }

  dl {
    margin: 0;
  }

  dl > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 4px 12px;
    padding: 10px 0;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
  }

  dt {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    color: ${constants.colorGreyMuted};
  }

  dd {
    margin: 0;
    color: ${constants.colorGreyMuted};
    font-weight: 400;
  }
`;

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
  font-family: ${constants.fontFamilyFuturistic};
  font-size: ${constants.fontSizeCommon};
  color: ${constants.colorWhite};
`;
export const StyledDire = styled.span`
  position: absolute;
  bottom: 60px;
  left: 100px;
  filter: drop-shadow(0 0 5px ${constants.colorDanger});
  font-family: ${constants.fontFamilyFuturistic};
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

export const PerspectiveHeader = styled.header`
  & {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    grid-column: 1 / -1;
  }

  h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 400;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-left: auto;
    padding: 6px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${constants.primaryTextColor};
    font: inherit;
    cursor: pointer;

    &:hover {
      background: rgba(128, 128, 128, 0.15);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }
  }
`;
