import styled from 'styled-components';
import constants from '../../constants';

export const StyledContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
`;

export const KDAContainer = styled(StyledContainer)`
  width: calc(300% + 10px);
  left: -10px;
  pointer-events: none;
`;

export const TitleContainer = styled.div`
  align-self: center;
  white-space: nowrap;

  & small {
    color: ${constants.colorMutedLight};
    margin-left: 1px;
  }
`;

export const PercentContainer = styled.div`
  width: 100%;
  height: 4px;
  position: absolute;
  background-color: ${constants.colorMuted};
  align-self: flex-end;
  bottom: -10px;
  left: 0;
  pointer-events: auto !important;

  & > div {
    height: 100%;
  }
`;

export const SparklineContainer = styled.div`
  overflow: visible !important;
  pointer-events: auto !important;

`;

export const KDAPercentContainer = styled(PercentContainer)`
  display: flex;

  &[data-hint-position="top"] {
    &::before {
      top: -8px;
      margin-left: 10px;
    }

    &::after {
      margin-bottom: 8px;
      margin-left: 0;
    }
  }
`;
