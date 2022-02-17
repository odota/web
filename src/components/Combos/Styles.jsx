import styled from 'styled-components';
import constants from '../constants';

export const StyledCombos = styled.div`
  margin-bottom: 150px;

  .submit-section {
    display: inline-block;
    margin-bottom: 23px;
    margin-top: 15px;
  }

  .main-section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
    margin-bottom: 10px;
  }

  .hero-overview {
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(auto-fill,50px);
    margin-bottom: 50px;
    @media screen and (max-width: ${constants.wrapMobile}) {
      grid-template-columns: repeat(auto-fill,60px);
    }
  }
`;

export const StyledInputFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  .container {
    background: #1313135c;
    padding: 0px 7px 3px 7px;
    border-radius: 5px;
    border: 1px solid #e3e3e421;
  }

  .reset-button {
    display: inline-block;
    font-size: 22px;
    opacity: 0.5;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      opacity: 1;
    }
  }
`;

export const StyledHeroSelector = styled.div`
  ${props => (props.isFiltered || props.selected) && 
    `pointer-events: none; 
    filter: grayscale(1) brightness(0.4);
    opacity: 0.5;`
  }
  height: 60px;
  overflow: hidden;
  border-radius: 4px;
  backface-visibility: hidden;
  box-sizing: border-box;
  transition: transform .1s ease-in-out;
  border: 1px solid transparent;

  @media screen and (min-width: ${constants.wrapMobile}) {
    :hover {
      transform: scale(2);
      box-shadow: 0px 0px 8px 5px #000000b0;
      z-index: 100;
      border: 1px solid #d2d2d2a6;

      & img {
        opacity: 1 !important;
      }
    }
  }

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff1a;
  position: relative;
  line-height: 0px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }

  .ts-container {
    z-index: 1000;
    outline: none;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    white-space: normal;
    transition: opacity 0.2s ease-out;
    &:hover {
      opacity: 1;
      background-color: #0000005e;
    }
    @media screen and (max-width: ${constants.wrapMobile}) {
      opacity: 1;
    }
  }

  .name-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7));

    & .name {
      position: relative;
      text-align: center;
      font-size: 10px;
      white-space: nowrap;
      line-height: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      top: 75%;
    }


    & .team-indicator {
      position: absolute;
      top: 10px;
      opacity: 0.8;
      text-shadow: 1px 1px 2px black;
      font-size: 15px;

      &.team-a {
        left: 10px;
      }
      &.team-b {
        right: 10px;
      }
    }
  }

  &:hover .name {
    display: none;
  }
  &:hover .team-indicator {
    display: none;
  }

  .ts {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.1s ease-out;
    vertical-align: top;
    outline: none;
    color: #ffffffeb;
    text-shadow: 1px 1px black;

    &:hover {
      color: white;
      text-shadow: 1px 1px 1px black;

      &.ts-left {
        background: linear-gradient(to left,rgb(17 84 115 / 74%) 40%, transparent);
      }
      &.ts-right {
        background: linear-gradient(to right,rgb(191 74 26 / 65%) 40%, transparent);
      }
    }
  }

  .ts.no-event {
    pointer-events: none;
  }
`;


export const StyledSelectedHeroes = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;

  .hero-placeholder {
    display: inline-block;
    height: 60px;
    width: 106px;
    background: rgba(18, 24, 37, 0.98);
    box-shadow: inset 0px 0px 5px rgba(21, 21, 21, 0.61);
    border-radius: 4px;
  }

  .hero-img {
    margin-top: 3px;
    margin-right: 5px;
    position: relative;
    border-radius: 4px;
  }

  img {
    height: 60px;
    width: 106px;
    cursor: pointer;
    backface-visibility: hidden;
    &:hover {
      opacity: 0.3;
    }
  }

  .seperator {
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-top: 10px;
    flex-basis: 60px;
    justify-content: center;
    flex-shrink: 0;
  }

  .team-container {
    margin-top: -3px;
    margin-right: -5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 5px;

    &.left {
      background: linear-gradient(45deg, rgb(48 241 241 / 16%), transparent);
      border-top: 3px solid #087f9263;
    }
    &.right {
      background: linear-gradient(225deg, rgb(189 98 3 / 16%), transparent);
      border-top: 3px solid #a22f0c63;
    }

    & div {
      text-align: center;
    }

    & .team-title {
      flex-basis: 100%;
      font-size: 20px;
      opacity: 0.6;

      &.team-a {
        color : #5dfff8;
      }
      &.team-b {
        color: #ff815b;
      }
    }
  }
`;
