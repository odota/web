import styled from 'styled-components';
import constants from '../constants';

export const StyledDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 4px;
  margin-left: 3px;

  &.top-heading {
    width: 100vw;
    margin: -57px -50vw 50px -50vw;
    margin-top: 0px;
    position: relative;
    left: 50%;
    right: 50%;
    padding: 15px 0px 15px 20px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: baseline;
    letter-spacing: 10px;
    font-weight: bold; 
    background-color: rgba(14, 84, 113, 37%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &.with-tabbar {
      margin-top: -30px;
    }
  }

  .winner {
    position: relative;
    bottom: 1px;
    background: rgb(25, 25, 25);
    font-size: 10px;
    padding: 1px;
    padding-right: 4px;
    margin-left: 10px;
    margin-right: 5px;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .winner:after {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-right-color: rgb(25, 25, 25);
    border-width: 8px;
    margin-top: -8px;
  }

  & svg {
    height: 20px !important;
    width: 20px !important;
    position: relative;
    margin-right: 6px;
    top: 2px;
    opacity: 0.8;
    fill: ${constants.textColorPrimary};
  }

  & a {
    color: ${constants.primaryTextColor};
    text-decoration: none;

    &:hover {
      color: ${constants.primaryLinkColor};
    }
  }

  & .title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  &.top-heading .title {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1px;
    margin-left: 52px;

    &::before {
      content: "▶";
      margin-right: 4px;
    }
  }

  & .subtitle {
    margin-left: 5px;
    font-size: ${constants.fontSizeMedium};
    color: ${constants.colorMutedLight};
  }

  &.top-heading .subtitle {
    margin-left: 10px;
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    letter-spacing: normal;
    font-weight: normal;
    margin-left: 51px;
  }

  .sponsor-button {
    margin: 0px 5px;
    
    /* Material-ui buttons */
    @media only screen and (max-width: 620px) {
      & a {
        min-width: 24px !important;
  
        & span {
          font-size: 0 !important;
          padding-left: 0 !important;
          padding-right: 12px !important;
        }
      }
    }
  }
  
  & .info {
    margin-left: 5px;
    font-size: ${constants.fontSizeMedium};
    color: ${constants.colorMuted};
    border-bottom: 1px dotted ${constants.colorMuted};
  }
`;

export const TwoLineDiv = styled(StyledDiv)`
  text-align: center;
  padding: 10px 0 15px;

  & span:last-child {
    display: block;
    text-transform: lowercase;
  }
`;
