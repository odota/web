import React from "react";
import { connect } from "react-redux";
import { Avatar } from "../../ui";
import { rankTierToString } from "../../../utility";
import ErrorBox from "../../Error/ErrorBox";
import PlayerStats from "./PlayerStats";
import PlayerBadges from "./PlayerBadges";
import PlayerButtons from "./PlayerButtons";
import useStrings from "../../../hooks/useStrings.hook";
import { LoadingOverlayUpper30 } from "../../LoadingOverlay";
import styles from "./PlayerHeader.module.css";

const LARGE_IMAGE_SIZE = 124;

const DotaPlusBadge = ({ plus }: { plus: boolean }) => {
  const strings = useStrings();
  return plus ? (
    <div
      className={styles.dotaPlusMedal}
      data-hint={strings.tooltip_dotaplus}
      data-hint-position="top"
    >
      <img src="/assets/images/dota2/dota_plus_icon.png" alt="Dota Plus icon" />
    </div>
  ) : null;
};

export const RankTierMedal = ({
  rankTier,
  leaderboardRank,
}: {
  rankTier: number;
  leaderboardRank: number;
}) => {
  let medalElement = null;
  const imgDescription = rankTierToString(rankTier);
  if (rankTier) {
    // if the players ranktier is 0 they are uncalibrated
    let iconPath;
    const intRankTier = parseInt(String(rankTier), 10);

    if (leaderboardRank && intRankTier === 80) {
      // if the player is on leaderboard ie. immortal
      if (leaderboardRank <= 10) {
        // top 10 and top 100 positions have different icons
        iconPath = "/assets/images/dota2/rank_icons/rank_icon_8c.png";
      } else if (leaderboardRank <= 100) {
        iconPath = "/assets/images/dota2/rank_icons/rank_icon_8b.png";
      } else {
        iconPath = "/assets/images/dota2/rank_icons/rank_icon_8.png";
      }
      medalElement = (
        <div className="rankTierContainer">
          <div
            className="rankMedal"
            data-hint={imgDescription}
            data-hint-position="top"
          >
            <img
              className="rankMedal-icon"
              src={iconPath}
              alt="Immortal medal icon"
            />
            {leaderboardRank && (
              <span className="rankMedal-board">{leaderboardRank}</span>
            )}
          </div>
        </div>
      );
    } else {
      // everyone who isn't immortal has an icon and some number of stars
      let star = intRankTier % 10;

      if (star < 1) {
        // I'm not sure if ranktier can give a number outside this range but better safe than sorry
        star = 1;
      } else if (star > 7) {
        star = 7;
      }

      const starPath = `/assets/images/dota2/rank_icons/rank_star_${star}.png`;
      iconPath = `/assets/images/dota2/rank_icons/rank_icon_${Math.floor(intRankTier / 10)}.png`;
      medalElement = (
        <div className="rankTierContainer">
          <div
            className="rankMedal"
            data-hint={imgDescription}
            data-hint-position="top"
          >
            <img
              className="rankMedal-icon"
              src={iconPath}
              alt="Ranked medal icon"
            />
            {star !== 0 ? (
              <img
                className="rankMedal-star"
                src={starPath}
                alt="Ranked medal stars "
              />
            ) : (
              ""
            )}
            {leaderboardRank && intRankTier === 80 && (
              <span className="rankMedal-board">{leaderboardRank}</span>
            )}
          </div>
        </div>
      );
    }
  } else {
    // uncalibrated players
    const iconPath = "/assets/images/dota2/rank_icons/rank_icon_0.png";
    medalElement = (
      <div className="rankTierContainer">
        <div
          className="rankMedal"
          data-hint={imgDescription}
          data-hint-position="top"
        >
          <img
            className="rankMedal-icon"
            src={iconPath}
            alt="Uncalibrated medal"
          />
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
  plus,
  loading,
  error,
  small,
  loggedInUser,
  rankTier,
  leaderboardRank,
}: {
  playerName: string;
  officialPlayerName: string;
  playerId: string;
  picture: string;
  plus: boolean;
  loading: boolean;
  error: string;
  small: boolean;
  loggedInUser: any;
  rankTier: number;
  leaderboardRank: number;
  location: any;
}) => {
  if (error) {
    return <ErrorBox />;
  }
  if (loading) {
    return <LoadingOverlayUpper30 />;
  }

  const avatarStyle = {
    marginLeft: small ? 30 : 0,
    marginRight: small ? 30 : 0,
  };

  return (
    <div className={styles.styled}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.imageContainer}>
            <Avatar
              src={picture}
              style={avatarStyle}
              sx={{ width: LARGE_IMAGE_SIZE, height: LARGE_IMAGE_SIZE }}
              className={styles.overviewAvatar}
            />
          </div>
          <div className={styles.playerInfo}>
            <div className={styles.titleNameButtons}>
              <span className={styles.playerName}>
                {officialPlayerName || playerName}
              </span>
              <PlayerBadges playerId={playerId} />
            </div>
            <PlayerStats
              playerId={playerId}
              loggedInId={loggedInUser && String(loggedInUser.account_id)}
              compact={!small}
            />
            <div style={{ marginLeft: 8 }}>
              <PlayerButtons playerId={playerId} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <DotaPlusBadge plus={plus} />
            <RankTierMedal
              rankTier={rankTier}
              leaderboardRank={leaderboardRank}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  playerName: (state.app.player.data.profile || {}).personaname,
  officialPlayerName: (state.app.player.data.profile || {}).name,
  playerSoloCompetitiveRank: state.app.player.data.solo_competitive_rank,
  picture: (state.app.player.data.profile || {}).avatarfull,
  plus: (state.app.player.data.profile || {}).plus,
  small: state.browser.greaterThan.small,
  loggedInUser: state.app.metadata.data.user,
  rankTier: state.app.player.data.rank_tier,
  leaderboardRank: state.app.player.data.leaderboard_rank,
});

export default connect(mapStateToProps)(PlayerHeader);
