import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import styled from 'styled-components';
import { Facebook } from 'react-content-loader';
import { rankTierToString } from '../../../utility';
import Error from '../../Error';
import PlayerStats from './PlayerStats';
import PlayerBadges from './PlayerBadges';
import PlayerButtons from './PlayerButtons';
import constants from '../../constants';

const Styled = styled.div`
width: 100vw;
margin: 0px -50vw;
position: relative;
left: 50%;
right: 50%;
display: grid;
padding-top: 35px;
background-color: rgba(14,84,113,37%);
grid-template-columns: 1fr minmax(min-content, ${constants.appWidth}px) 1fr;

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
  grid-column: 2;
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

.dotaPlusMedal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-filter: drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3))
  drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3))
  drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3));

  @media only screen and (max-width: 768px) {
    flex-wrap: nowrap;
  }

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
    width: 65px;
    height: 75px;
  }
}

.rankMedal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 25px;
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
    margin-top: 80px;
    margin-left: 1px;
    font-size: 22px;
    color: #ECD9C8;
    text-shadow: 2px 2px 2px black;
  }
  &-star {
    position: absolute;
  }
}

`;

const LARGE_IMAGE_SIZE = 124;

const getRegistrationBadge = (registered, strings) => registered && (
  <div
    className="registered"
    data-hint={strings.tooltip_registered_user}
    data-hint-position="top"
  />
);

const getDotaPlusBadge = (plus, strings) => plus && (
  <div
    className="dotaPlusMedal"
    data-hint={strings.tooltip_dotaplus}
    data-hint-position="top"
  >
    <img
      src="/assets/images/dota2/dota_plus_icon.png"
      alt="Dota Plus icon"
    />
  </div>
);

const getRankTierMedal = (rankTier, leaderboardRank) => {
  let medalElement = null;
  const imgDescription = rankTierToString(rankTier);
  if (rankTier) { // if the players ranktier is 0 they are uncalibrated
    let iconPath;

    if (leaderboardRank) { // if the player is on leaderboard ie. immortal
      if (leaderboardRank <= 10) { // top 10 and top 100 positions have different icons
        iconPath = '/assets/images/dota2/rank_icons/rank_icon_8c.png';
      } else if (leaderboardRank <= 100) {
        iconPath = '/assets/images/dota2/rank_icons/rank_icon_8b.png';
      } else {
        iconPath = '/assets/images/dota2/rank_icons/rank_icon_8.png';
      }
      medalElement = (
        <div className="rankTierContainer">
          <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
            <img className="rankMedal-icon" src={iconPath} alt="Immortal medal icon" />
            {leaderboardRank && <span className="rankMedal-board">{leaderboardRank}</span>}
          </div>
        </div>
      );
    } else { // everyone who isn't immortal has an icon and some number of stars
      const intRankTier = parseInt(rankTier, 10);
      let star = intRankTier % 10;

      if (star < 1) { // I'm not sure if ranktier can give a number outside this range but better safe than sorry
        star = 1;
      } else if (star > 7) {
        star = 7;
      }

      const starPath = `/assets/images/dota2/rank_icons/rank_star_${star}.png`;
      iconPath = `/assets/images/dota2/rank_icons/rank_icon_${Math.floor(intRankTier / 10)}.png`;
      medalElement = (
        <div className="rankTierContainer">
          <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
            <img className="rankMedal-icon" src={iconPath} alt="Ranked medal icon" />
            {(star !== 0) ? <img className="rankMedal-star" src={starPath} alt="Ranked medal stars " /> : ''}
            {leaderboardRank && <span className="rankMedal-board">{leaderboardRank}</span>}
          </div>
        </div>
      );
    }
  } else { // uncalibrated players
    const iconPath = '/assets/images/dota2/rank_icons/rank_icon_0.png';
    medalElement = (
      <div className="rankTierContainer">
        <div className="rankMedal" data-hint={imgDescription} data-hint-position="top">
          <img className="rankMedal-icon" src={iconPath} alt="Uncalibrated medal" />
        </div>
      </div>
    );
  }
  return medalElement;
};

const PlayerHeader = ({
  playerName,
  officialPlayerName,
  playerId,
  picture,
  registered,
  plus,
  loading,
  error,
  small,
  playerSoloCompetitiveRank,
  loggedInUser,
  rankTier,
  leaderboardRank,
  strings,
}) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Facebook primaryColor="#666" secondaryColor="#ecebeb" width={400} height={60} animate />;
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
              badgeContent={getRegistrationBadge(registered, strings)}
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
          <div style={{ display: 'flex' }}>
            {getDotaPlusBadge(plus, strings)}
            {getRankTierMedal(rankTier, leaderboardRank)}
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
  plus: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  small: PropTypes.bool,
  playerSoloCompetitiveRank: PropTypes.number,
  loggedInUser: PropTypes.shape({}),
  rankTier: PropTypes.number,
  leaderboardRank: PropTypes.number,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  playerName: (state.app.player.data.profile || {}).personaname,
  officialPlayerName: (state.app.player.data.profile || {}).name,
  playerSoloCompetitiveRank: state.app.player.data.solo_competitive_rank,
  picture: (state.app.player.data.profile || {}).avatarfull,
  registered: (state.app.player.data.profile || {}).last_login,
  plus: (state.app.player.data.profile || {}).plus,
  small: state.browser.greaterThan.small,
  loggedInUser: state.app.metadata.data.user,
  rankTier: state.app.player.data.rank_tier,
  leaderboardRank: state.app.player.data.leaderboard_rank,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayerHeader);
