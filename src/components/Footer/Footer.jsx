import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppLogo from '../App/AppLogo';
import PageLinks from './PageLinks';
// import Cheese from './Cheese';
import SocialLinks from './SocialLinks';
import { IconSteam } from '../Icons';
import constants from '../constants';

const StyledFooter = styled.footer`
  padding: 0px 50px 15px;
  background-color: ${constants.defaultPrimaryColor};
  color: ${constants.primaryTextColor};
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  & p {
    padding: 2px 0 5px;
    margin: 0;
    font-size: ${constants.fontSizeMedium};
  }

  & .links,
  & .cheese {
    margin-top: 12px;
  }

  & .mobile {
    & img {
      &:hover {
      opacity: 0.6;
      }
    }
  }

  & .links {
    & .logoNsocial {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      position: relative;

      & a {
        cursor: pointer;

        &[data-hint-position="top"] {
          &::before {
            margin-left: 18px;
          }
        }
      }
    }

    & svg {
      height: 18px;
      margin-left: 15px;
      vertical-align: text-top;
      fill: ${constants.textColorPrimary};
      transition: ${constants.normalTransition};

      &:hover {
        opacity: 0.6;
      }
    }

    & small {
      color: ${constants.colorMutedLight};
      font-size: ${constants.fontSizeSmall};

      & svg {
        height: 13px;
        margin-left: 8px;
        vertical-align: sub;
        transition: ${constants.normalTransition};
      }
    }

    & .pages {
      font-size: ${constants.fontSizeMedium};
      margin-bottom: 4px;

      & a {
        display: inline-block;

        &:hover {
          color: ${constants.textColorPrimary};
        }

        &::after {
          content: "•";
          margin: 0 8px;
          opacity: 0.6;
          color: ${constants.primaryTextColor};
        }

        &:last-child {
          &::after {
            content: "";
            margin: 0;
          }
        }
      }
    }
  }

  & .cheese {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > div:first-of-type {
      margin-right: 20px;
    }
  }

  & .SocialLinks a {
    position: relative;

    &[data-hint] {
      cursor: pointer;

      &::before {
        margin-left: 16px;
      }
    }
  }

  @media only screen and (max-width: 960px) {
    padding: 20px 25px 15px;
    flex-direction: column;

    & .links,
    & .cheese {
      width: 100%;
    }

    & .cheese {
      margin-top: 20px;
    }
  }
`;

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  opacity: 0.1;
  margin: 10px 0;
  background: linear-gradient(to right, ${constants.primaryTextColor}, rgba(0, 0, 0, 0));
`;

const Footer = ({ strings }) => (
  <StyledFooter>
    <div className="links">
      <div className="logoNsocial">
        <AppLogo />
        <SocialLinks strings={strings} />
        <div className="mobile">
          <a
            href="https://play.google.com/store/apps/details?id=com.opendota.mobile&hl=en"
            style={{ position: 'relative', left: '13px', top: '12px' }}
          >
            <img src="/assets/images/google_play_store.png" alt="download the android app on google play store" height="46px" />
          </a>
          <a
            href="https://itunes.apple.com/us/app/opendota/id1354762555?ls=1&mt=8"
            style={{ position: 'relative', left: '20px', top: '5px' }}
          >
            <img src="/assets/images/apple_app_store.png" alt="download the iOS app on the app store" height="31px" />
          </a>
        </div>
      </div>
      <small className="about">
        <span id="app-description">{strings.app_description}</span>
        {' - '}
        <span id="app-powered-by">{strings.app_powered_by}</span>
        <a href="http://steampowered.com" aria-describedby="app-description app-powered-by" target="_blank" rel="noopener noreferrer">
          <IconSteam />
        </a>
      </small>
      <StyledHr />
      <div className="pages">
        <PageLinks />
      </div>
    </div>
    {/* <Cheese /> */}
  </StyledFooter>
);

Footer.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Footer);
