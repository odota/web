import styled from 'styled-components';
import constants from '../constants';

export const StyledDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 4px;
  margin-left: 3px;

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

  & .subtitle {
    margin-left: 5px;
    font-size: ${constants.fontSizeMedium};
    color: ${constants.colorMutedLight};
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
