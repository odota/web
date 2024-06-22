import styled from 'styled-components';
import constants from '../constants';

export const StyledAbilityUpgrades = styled.div`
  margin: -8px;

  & .ability {
    position: relative;
    display: inline-block;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }

    & > div {
      background-color: ${constants.darkPrimaryColor};
      height: 30px;
      width: 30px;
      text-align: center;
      bottom: 0;
      left: 0;
      font-size: 10px;
    }

    & .placeholder {
      background-color: transparent;
    }
  }

  /* React-tooltip ability upgrades */
  & > div {
    pointer-events: auto !important;
    /*margin-left: 3px !important;
    margin-top: 1px !important;
    /*padding: 6px 12px 2px !important;*/

    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }

    &::after {
      border-width: 20px !important;
      right: 0 !important;
      top: 0 !important;
    }
  }

  & svg {
    padding-left: 7px;
  }
`;

export const StyledAghanimsBuffs = styled.div`
  min-height: 44px;

  > img {
    width: 24px;
  }

  .__react_component_tooltip {
    opacity: 1 !important;
    padding: 0px !important;
  }
`

export const StyledLevel = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  .circular_chart {
    position: absolute;
    fill: none;
    width: 70%;
  }

  .circle {
    stroke: #a9a9a94d;
    stroke-width: 2.8;
    stroke-linecap: round;
  }
`

export const StyledCosmetic = styled.div`
  display: inline-block;
  margin: 5px;

  & img {
    height: 42px;
  }

  & > div {
    font-size: ${constants.fontSizeCommon};

    & span > span {
      font-size: ${constants.fontSizeSmall};
      color: ${constants.colorMutedLight};
      text-transform: capitalize;
      display: block;
    }
  }

  & a {
    transition: ${constants.normalTransition};
    position: relative;

    &:hover {
      cursor: pointer;
      opacity: 0.8;

      & svg {
        display: block !important;
      }
    }
  }

  & svg {
    position: absolute;

    /* override material-ui */
    fill: ${constants.primaryLinkColor} !important;
    display: none !important;
    width: 18px !important;
    height: 18px !important;
    filter: drop-shadow(0 0 3px ${constants.darkPrimaryColor});
    right: 2px;
    bottom: 6px;
  }
`;

export const StyledUnusedItem = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const StyledGoldIcon = styled.span`
  img {
    height: 10px;
    margin-right: 4px;
  }
`;
export const StyledRunes = styled.div`
  display: inline-block;

  & img {
    height: 24px;
    vertical-align: middle;
    margin-right: 5px;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.08));
  }

  & span {
    text-transform: none;
    font-weight: ${constants.fontWeightNormal};
  }
`;

export const StyledDivClearBoth = styled.div`
  min-width: 240px;
  > div {
    clear: both;
  }
`;
export const StyledBackpack = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    position: relative;

    &[data-hint] {
      &::before {
        left: 14px;
      }

      &::after {
        margin-left: -34px;
      }
    }
  }

  & svg {
    position: relative;
    top: 2px;
    width: 17px;
    height: 16px;
    fill: ${constants.colorMutedLight};
    margin: 0 4px 0 0;
  }
`;
export const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: visible;

  @media only screen and (min-width: 800px) {
    flex-direction: row;
  }
`;
export const StyledFlexElement = styled.div`
  flex: 1;
  margin-right: 5px;
`;
export const StyledFlexElementFullWidth = styled.div`-
  margin-right: 5px;
  width: 100%;
`;

export const StyledTeamIconContainer = styled.span`
  vertical-align: top;
  height: 26px !important;
  width: 26px !important;
  margin-right: 6px;
  opacity: 0.8;
  fill: ${constants.textColorPrimary};
`;
export const StyledPlayersDeath = styled.div`
  position: relative;
  float: left;
  margin: 1px;
  height: 29px;

  & img {
    height: 29px;
  }
`;
export const StyledEmote = styled.img.attrs({
  alt: props => props.emote,
  src: props => `/assets/images/dota2/emoticons/${props.emote}.gif`,
})`
  width: 20px;
  height: 20px;
  vertical-align: bottom;
`;

export const StyledStorySpan = styled.span`
  white-space: nowrap;
  color: ${props =>
    (props.isRadiant ? constants.colorGreen : constants.colorRed)};
  svg,
  img {
    vertical-align: middle;
    max-height: 20px;
    margin-right: 2px;
    fill: ${constants.textColorPrimary};
  }
  svg {
    opacity: 0.8;
    height: 20px;
  }
`;
export const StyledStoryWrapper = styled.div`
  line-height: 30px;

  > div {
    margin-bottom: 20px;
  }
`;
export const StyledStoryNetWorthBar = styled.div`

  display: flex;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 13px;
    background-color: white;
    left: 50%;
    margin-left: -2px;
  }

 > div {
  display: inline-block;
  height: 7px;

 > div:first-child {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;

 > div:last-child {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
`;
export const StyledStoryNetWorthText = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  ${props => (props.color ? `background-color:${props.color}` : '')};
  ${props => (props.left ? `left:${props.left}%` : '')};
  width: ${props => props.width}%;

  > div {
    display: inline-block;
  }

  > div:nth-child(2) {
    position: absolute;
    transform: translateX(-50%);

    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
`;
export const StyledStoryGoldAmount = styled.span`
  color: ${constants.colorGolden};
`;
export const StyledLogFilterForm = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  flex-wrap: wrap;
  border-radius: 4px;
  border: 1px solid rgb(255, 255, 255, 0.06);
  background: ${constants.colorBoxBlue};

  
  & > div {
    padding: 10px;
  }

  & .title {
    width: 100%;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgb(255, 255, 255, 0.06);
  }
`;

export const StyledDmgTargetInflictor = styled.div`
  .inflictorWithValue {
    object {
    max-width: 27px !important;
    }
  }
`;

export const StyledDmgTargetRow = styled.div`
  > div {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #heroTargetValue {
    display: none;
  }

  #row:hover {
    svg {
      opacity: 1 !important;
      transition: opacity 0.2s ease !important;
      backface-visibility: hidden;
    }

    #target {
      img {
      background: rgba(74, 149, 247, 0.5) !important;
      transition: background 0.2s ease !important;
      box-shadow: 0px 0px 10px rgba(74, 149, 247, 0.5);
      }
    }

    #targetvalue {
      background-color: black !important;
    }

    #heroTargetValue {
      display: inline !important;
    }

    #totalValue {
      display: none !important;
    }

    .inflictorWithValue {
      & .overlay {
        background-color: black;
      }
    }
  }
`;

export const StyledLineWinnerSpan = styled.span`
  & svg {
    width: 20px !important;
    height: 20px !important;
    fill: ${constants.colorGolden};
  }
`;
