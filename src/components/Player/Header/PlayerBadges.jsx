import React from 'react';
import { connect } from 'react-redux';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { IconCheese, IconSteam, IconEye, IconEyeInactive } from 'components/Icons';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import strings from 'lang';
import styled from 'styled-components';
import constants from '../../constants';

const Styled = styled.div`
.iconButton {
  padding-bottom: 0;
  cursor: default;
  margin: 0 5px 4px;

  & svg {
    width: auto !important;
    height: 16px;
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
  margin-left: 10px;
  align-items: center;

  @media only screen and (max-width: 660px) {
    margin-left: 0;
    margin-top: 6px;
  }

  & .iconButton {
    position: relative;

    & .IconTrophy {
      fill: ${constants.colorGolden} !important;
    }

    & .iconSteam {
      cursor: default;

      & a:hover {
        cursor: pointer;
      }
    }

    &[data-hint-position="top"] {
      &::before {
        margin-left: 8px;
      }

      &::after {
        margin-left: -30px;
      }
    }
  }

  & .iconEye {
    & svg {
      height: 22px;
      margin-top: 4px;
    }

    &[data-hint-position="top"] {
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

  & .iconEyeTracked {
    fill: ${constants.colorSuccess};
  }
}

.icon {
  fill: ${constants.colorMutedLight} !important;
}

.cheese {
  -webkit-filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.6));
  filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.6));
  height: 18;
}
`;

export const PlayerBadgesIcons = ({
  loading, error, cheese, tracked, steamLink, officialPlayerName,
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
              <CheckCircle className="icon IconTrophy" />
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
          {Math.round(new Date().getTime() / 1000.0) >= Number(tracked) ? (
            <div
              className="iconButton iconEye"
              data-hint={strings.app_untracked}
              data-hint-position="top"
            >
              <IconEyeInactive className="icon" />
            </div>
          ) : (
            <div
              className="iconButton iconEye"
              data-hint={strings.app_tracked}
              data-hint-position="top"
            >
              <IconEye className="iconEyeTracked" />
            </div>
          )
          }
          {cheese > 0 && (
            <div
              className="iconButton"
              data-hint={`${cheese} ${strings.app_cheese_bought}`}
              data-hint-position="top"
            >
              <IconCheese className="cheese icon" />
            </div>
          )}
        </div>
      </Styled>
    );
  };

  return getPlayerBadges();
};

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  cheese: (state.app.player.data.profile || {}).cheese,
  tracked: state.app.player.data.tracked_until,
  steamLink: (state.app.player.data.profile || {}).profileurl,
  officialPlayerName: (state.app.player.data.profile || {}).name,
});

export default connect(mapStateToProps)(PlayerBadgesIcons);
