import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Error from '../../Error';
import Spinner from '../../Spinner';
import {
  IconCheese,
  IconSteam,
  IconContributor,
  IconCheckCircle,
} from '../../Icons';
import constants from '../../constants';

const Styled = styled.div`
  .iconButton {
    padding-bottom: 0;
    cursor: default;
    &:not(:first-of-type) {
      margin-left: 8px;
    }

    & svg {
      width: auto !important;
      height: 18px !important;
      vertical-align: middle;
      fill: ${constants.primaryTextColor};
      margin: 0 6px;
      transition: ${constants.normalTransition};
    }

    &:hover svg {
      opacity: 0.6;
    }

    @media only screen and (max-width: 900px) {
      & svg {
        margin: 0 12px 0 0;
      }
    }

    @media only screen and (max-width: 660px) {
      & svg {
        margin: 0 5px;
      }

      & svg:first-child {
        margin: 0 5px 0 10px;
      }

      & svg:last-child {
        margin: 0 10px 0 5px;
      }
    }
  }

  .playerBadges {
    display: flex;
    flex-direction: row;
    margin-left: 16px;
    align-items: center;
    height: 90%;

    @media only screen and (max-width: 660px) {
      margin-left: 0;
      margin-top: 6px;
    }

    & .iconButton {
      position: relative;

      & .iconConfirmed {
        fill: ${constants.golden} !important;
      }

      & .iconSteam {
        cursor: default;

        & a:hover {
          cursor: pointer;
        }
      }

      &[data-hint-position='top'] {
        &::before {
          margin-left: 8px;
        }

        &::after {
          margin-left: -30px;
        }
      }
    }

    & .iconContributor {
      & svg {
        height: 24px !important;
        margin-top: 4px;
        -webkit-filter: drop-shadow(0 0 4px rgba(102, 187, 255, 1));
        filter: drop-shadow(0 0 4px rgba(102, 187, 255, 1));
        fill: ${constants.colorBlue};
      }

      &[data-hint-position='top'] {
        &::before {
          margin-left: 11px;
          top: -1px;
        }

        &::after {
          margin-left: -32px;
          margin-bottom: 1px;
        }
      }
    }
  }

  .icon {
    fill: ${constants.colorMutedLight} !important;
  }

  .cheese {
    -webkit-filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.6));
    filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.6));
  }
`;

export const PlayerBadgesIcons = ({
  loading,
  error,
  cheese,
  isContributor,
  isSubscriber,
  tracked,
  steamLink,
  officialPlayerName,
  strings,
}) => {
  const getPlayerBadges = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <Styled>
        <div className="playerBadges">
          {officialPlayerName && (
            <div
              className="iconButton"
              data-hint={`${strings.app_confirmed_as} ${officialPlayerName}`}
              data-hint-position="top"
            >
              <IconCheckCircle className="iconConfirmed" />
            </div>
          )}
          <div
            className="iconButton iconSteam"
            data-hint={strings.app_steam_profile}
            data-hint-position="top"
          >
            <a rel="noopener noreferrer" target="_blank" href={steamLink}>
              <IconSteam className="icon" />
            </a>
          </div>
          {cheese > 0 && (
            <div
              className="iconButton"
              data-hint={`${cheese} ${strings.app_cheese_bought}`}
              data-hint-position="top"
            >
              <IconCheese className="cheese icon" />
            </div>
          )}
          {isSubscriber && (
            <div
              className="iconButton iconContributor"
              data-hint={`${strings.app_subscriber}`}
              data-hint-position="top"
            >
              <IconContributor
                className="icon"
                dColor="#FFD700"
                oColor="#212121"
              />
            </div>
          )}
          {isContributor && (
            <div
              className="iconButton iconContributor"
              data-hint={`${strings.app_contributor}`}
              data-hint-position="top"
            >
              <IconContributor
                className="icon"
                dColor="#21be93"
                oColor="#212121"
              />
            </div>
          )}
        </div>
      </Styled>
    );
  };

  return getPlayerBadges();
};

const mapStateToProps = (state) => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  cheese: (state.app.player.data.profile || {}).cheese,
  isContributor: (state.app.player.data.profile || {}).is_contributor,
  isSubscriber: (state.app.player.data.profile || {}).is_subscriber,
  tracked: state.app.player.data.tracked_until,
  steamLink: (state.app.player.data.profile || {}).profileurl,
  officialPlayerName: (state.app.player.data.profile || {}).name,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayerBadgesIcons);
