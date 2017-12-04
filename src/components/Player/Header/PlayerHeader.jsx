import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import strings from 'lang';
import { rankTierToString } from 'utility';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import styled from 'styled-components';
import PlayerStats from './PlayerStats';
import PlayerBadges from './PlayerBadges';
import PlayerButtons from './PlayerButtons';
import constants from '../../constants';

const Styled = styled.div`
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.playerName {
  color: rgba(245, 245, 245, 0.870588);
  font-size: 28px;
  text-align: center;
}

.titleNameButtons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

.imageContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.overviewAvatar {
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.4);

  @media only screen and (max-width: 768px) {
    margin-left: 0 !important;
  }
}

.icon {
  fill: ${constants.colorMutedLight} !important;
}

.topContainer {
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

.topButtons {
  margin-left: auto;
}

.playerInfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.registered {
  width: 18px;
  height: 18px;
  position: relative;

  &[data-hint-position="top"] {
    &::before {
      top: -7px;
      margin-left: 3px;
    }

    &::after {
      margin-bottom: 7px;
      margin-left: -7px;
    }
  }
}

`;

const LARGE_IMAGE_SIZE = 124;

const getRegistrationBadge = registered => registered && (
  <div
    className="registered"
    data-hint={strings.tooltip_registered_user}
    data-hint-position="top"
  />
);

const MedalStyled = styled.div`
  .rankMedal {
    position: relative;
    height: 37px;
    width:37px;
    top: 3px;
    margin-right: 5px;
    text-align: center;
    &[data-hint-position="top"] {
      &::after {
        margin-bottom: 3px;
        margin-left: -37px;
      }
  
      &::before {
        top: -3px;
        margin-left: 13px;
      }
    }
    &-icon {
      top: 0px;
      height: 100%;
      width: 100%;
    }
    &-star {
      position: absolute;
      left: 0px;
      height: 100%;
      width: 100%;
    }
  }
`;

const getRankTierMedal = (rankTier) => {
  let medalElement = null;
  const imgDescription = rankTierToString(rankTier);
  if (rankTier && rankTier > 9) {
    const intRankTier = parseInt(rankTier, 10);
    const iconPath = `/assets/images/dota2/rank_icons/rank_icon_${parseInt(intRankTier / 10, 10)}.png`;
    const star = parseInt(intRankTier % 10, 10);
    let correctStar = 0;
    if (star <= 0) {
      correctStar = 0;
    } else if (star >= 5) {
      correctStar = 5;
    } else {
      correctStar = star;
    }
    const starPath = `/assets/images/dota2/rank_icons/rank_star_${correctStar}.png`;
    medalElement = (
      <MedalStyled>
        <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
          <img className="rankMedal-icon" src={iconPath} alt="icon" />
          {(correctStar !== 0) ? <img className="rankMedal-star" src={starPath} alt="star" /> : ''}
        </div>
      </MedalStyled>
    );
  } else {
    const iconPath = '/assets/images/dota2/rank_icons/rank_icon_0.png';
    medalElement = (
      <MedalStyled>
        <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
          <img className="rankMedal-icon" src={iconPath} alt="icon" />
        </div>
      </MedalStyled>
    );
  }
  return medalElement;
};

const PlayerHeader = ({
  playerName, officialPlayerName, playerId, picture, registered, loading, error, small, extraSmall, playerSoloCompetitiveRank, loggedInUser, rankTier,
}) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Spinner />;
  }

  let badgeStyle = {
    fontSize: 20,
    top: 5,
    left: 40,
    background: registered ? constants.colorGreen : 'transparent',
    width: 18,
    height: 18,
  };

  const avatarStyle = {
    marginLeft: small ? 30 : 0,
    marginRight: extraSmall ? 30 : 0,
  };

  if (!small) {
    badgeStyle = {
      ...badgeStyle,
      marginLeft: -1 * (LARGE_IMAGE_SIZE / 2) * 0.75,
    };
  }

  const playerMedal = getRankTierMedal(rankTier);
  return (
    <Styled>
      <div className="container">
        <div className="topContainer">
          <div className="imageContainer">
            <Badge
              badgeContent={getRegistrationBadge(registered)}
              badgeStyle={badgeStyle}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <Avatar
                src={picture}
                style={avatarStyle}
                size={LARGE_IMAGE_SIZE}
                className="overviewAvatar"
              />
            </Badge>
          </div>
          <div className="playerInfo">
            <div className="titleNameButtons">
              {playerMedal}
              <span className="playerName">{officialPlayerName || playerName}</span>
              <PlayerBadges playerId={playerId} />
            </div>
            <PlayerStats playerId={playerId} loggedInId={loggedInUser && String(loggedInUser.account_id)} compact={!small} />
            <PlayerButtons playerId={playerId} playerSoloCompetitiveRank={playerSoloCompetitiveRank} compact={!small} />
          </div>
        </div>
      </div>
    </Styled>
  );
};

PlayerHeader.propTypes = {
  playerName: PropTypes.string,
  officialPlayerName: PropTypes.string,
  playerId: PropTypes.string,
  picture: PropTypes.string,
  registered: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  small: PropTypes.bool,
  extraSmall: PropTypes.bool,
  playerSoloCompetitiveRank: PropTypes.number,
  loggedInUser: PropTypes.shape({}),
  rankTier: PropTypes.number,
};

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  playerName: (state.app.player.data.profile || {}).personaname,
  officialPlayerName: (state.app.player.data.profile || {}).name,
  playerSoloCompetitiveRank: state.app.player.data.solo_competitive_rank,
  picture: (state.app.player.data.profile || {}).avatarfull,
  registered: (state.app.player.data.profile || {}).last_login,
  small: state.browser.greaterThan.small,
  extraSmall: state.browser.greaterThan.extraSmall,
  loggedInUser: state.app.metadata.data.user,
  rankTier: state.app.player.data.rank_tier,
});

export default connect(mapStateToProps)(PlayerHeader);
