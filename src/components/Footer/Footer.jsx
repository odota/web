import React from 'react';
import strings from 'lang';
import styled from 'styled-components';
import AppLogo from '../App/AppLogo';
import PageLinks from './PageLinks';
import Cheese from './Cheese';
import SocialLinks from './SocialLinks';
import { IconSteam } from '../Icons';
import constants from '../constants';

const StyledFooter = styled.footer`
  & main {
    padding: 20px 50px 15px;
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
      width: 50%;
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
  }
`;

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  opacity: 0.1;
  margin: 10px 0;
  background: linear-gradient(to right, ${constants.primaryTextColor}, rgba(0, 0, 0, 0));
`;

export default () => (
  <StyledFooter>
    {
      /*
      location.pathname !== '/' &&
      <section style={{ height: '250px' }}>
        <iframe
          style={{ border: 'none', margin: 0, width: '100%', height: 250 }}
          src="https://www.stanza.co/@dota2?embed=true&banner=true&site=opendota"
        />
      </section>
      */
    }
    <main>
      <div className="links">
        <div className="logoNsocial">
          <AppLogo />
          <SocialLinks />
        </div>
        <small className="about">
          {strings.app_description}
          {' - '}
          {strings.app_powered_by}
          <a href="http://steampowered.com" target="_blank" rel="noopener noreferrer">
            <IconSteam />
          </a>
        </small>
        <StyledHr />
        <div className="pages">
          <PageLinks />
        </div>
      </div>
      {/* <Cheese /> */}
    </main>
  </StyledFooter>
);
