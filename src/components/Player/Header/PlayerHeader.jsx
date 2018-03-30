import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import styled from 'styled-components';
import { rankTierToString } from '../../../utility';
import strings from '../../../lang';
import Error from '../../Error';
import Spinner from '../../Spinner';
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

.rankTierContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rankMedal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 30px;
  -webkit-filter: drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3))
  drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3))
  drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3));

  &[data-hint-position="top"] {
    &::after {
      margin-bottom: 3px;
      margin-left: 52px;
    }

    &::before {
      top: -3px;
      margin-left: 57px;
    }
  }
  & img {
    width: 124px;
    height: 124px;
  }
  &-icon {

  }
  &-board {
    position: absolute;
    align-self: center;
    margin-top: 45px;
    font-size: 22px;
    color: #ECD9C8;
    text-shadow: 0 0 10px black;
  }
  &-star {
    position: absolute;
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

const getRankTierMedal = (rankTier, leaderboardRank) => {
  let medalElement = null;
  const imgDescription = rankTierToString(rankTier);
  if (rankTier && rankTier > 9) {
    let iconPath;
    if (leaderboardRank && leaderboardRank <= 10) {
      iconPath = '/assets/images/dota2/rank_icons/rank_icon_7c.png'; // Divine Top 10
    } else if (leaderboardRank && leaderboardRank <= 100) {
      iconPath = '/assets/images/dota2/rank_icons/rank_icon_7b.png'; // Divine Top 100
    }
    if (rankTier === 76) {
      iconPath = iconPath || '/assets/images/dota2/rank_icons/rank_icon_7a.png'; // Divine Elite
      medalElement = (
        <div className="rankTierContainer">
          <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
            <img className="rankMedal-icon" src={iconPath} alt="icon" />
            {leaderboardRank && <span className="rankMedal-board">{leaderboardRank}</span>}
          </div>
        </div>
      );
    } else {
      const intRankTier = parseInt(rankTier, 10);
      const star = parseInt(intRankTier % 10, 10);
      let correctStar = 0;
      if (!iconPath) {
        if (star <= 0) {
          correctStar = 0;
        } else if (star >= 5) {
          correctStar = 5;
        } else {
          correctStar = star;
        }
      }
      const starPath = `/assets/images/dota2/rank_icons/rank_star_${correctStar}.png`;
      iconPath = iconPath || `/assets/images/dota2/rank_icons/rank_icon_${parseInt(intRankTier / 10, 10)}.png`;
      medalElement = (
        <div className="rankTierContainer">
          <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
            <img className="rankMedal-icon" src={iconPath} alt="icon" />
            {(correctStar !== 0) ? <img className="rankMedal-star" src={starPath} alt="star" /> : ''}
            {leaderboardRank && <span className="rankMedal-board">{leaderboardRank}</span>}
          </div>
        </div>
      );
    }
  } else {
    const iconPath = '/assets/images/dota2/rank_icons/rank_icon_0.png';
    medalElement = (
      <div className="rankTierContainer">
        <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
          <img className="rankMedal-icon" src={iconPath} alt="icon" />
        </div>
      </div>
    );
  }
  return medalElement;
};

const PlayerHeader = ({
  playerName, officialPlayerName, playerId, picture, registered, loading, error, small, playerSoloCompetitiveRank, loggedInUser, rankTier, leaderboardRank,
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
    marginRight: small ? 30 : 0,
  };

  if (!small) {
    badgeStyle = {
      ...badgeStyle,
      marginLeft: -1 * (LARGE_IMAGE_SIZE / 2) * 0.75,
    };
  }

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
              <span className="playerName">{officialPlayerName || playerName}</span>
              <PlayerBadges playerId={playerId} />
            </div>
            <PlayerStats playerId={playerId} loggedInId={loggedInUser && String(loggedInUser.account_id)} compact={!small} />
            <PlayerButtons playerId={playerId} playerSoloCompetitiveRank={playerSoloCompetitiveRank} compact={!small} />
          </div>
          {getRankTierMedal(rankTier, leaderboardRank)}
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
  playerSoloCompetitiveRank: PropTypes.number,
  loggedInUser: PropTypes.shape({}),
  rankTier: PropTypes.number,
  leaderboardRank: PropTypes.number,
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
  loggedInUser: state.app.metadata.data.user,
  rankTier: state.app.player.data.rank_tier,
  leaderboardRank: state.app.player.data.leaderboard_rank,
});

export default connect(mapStateToProps)(PlayerHeader);
