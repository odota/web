import styled from 'styled-components';
import constants from '../../constants';

export const StyledContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
`;

export const KDAContainer = StyledContainer.extend`
  width: calc(300% + 50px);
  left: -10px;
`;

export const TitleContainer = styled.div`
  align-self: center;
  line-height: 0;

  & small {
    color: ${constants.colorMutedLight};
  }
`;

export const PercentContainer = styled.div`
  width: 100%;
  height: 4px;
  position: absolute;
  background-color: ${constants.colorMuted};
  align-self: flex-end;
  bottom: -1px;
  left: 0;

  & > div {
    height: 100%;
  }
`;

export const KDAPercentContainer = PercentContainer.extend`
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
