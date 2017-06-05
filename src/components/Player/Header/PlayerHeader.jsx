import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import strings from 'lang';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import styles from './PlayerHeader.css';
import PlayerStats from './PlayerStats';
import PlayerBadges from './PlayerBadges';
import PlayerButtons from './PlayerButtons';

const LARGE_IMAGE_SIZE = 124;

const getRegistrationBadge = registered => registered && (
  <div
    className={styles.registered}
    data-hint={strings.tooltip_registered_user}
    data-hint-position="top"
  />
);

const PlayerHeader = ({ playerName, officialPlayerName, playerId, picture, registered, loading, error, small, extraSmall, playerSoloCompetitiveRank, loggedInUser }) => {
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
    background: registered ? styles.green : 'transparent',
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

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.imageContainer}>
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
              className={styles.overviewAvatar}
            />
          </Badge>
        </div>
        <div className={styles.playerInfo}>
          <div className={styles.titleNameButtons}>
            <span className={styles.playerName}>{officialPlayerName || playerName}</span>
            <PlayerBadges playerId={playerId} />
          </div>
          <PlayerStats playerId={playerId} loggedInId={loggedInUser && String(loggedInUser.account_id)} compact={!small} />
          <PlayerButtons playerId={playerId} playerSoloCompetitiveRank={playerSoloCompetitiveRank} compact={!small} />
        </div>
      </div>
    </div>
  );
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
});

export default connect(mapStateToProps)(PlayerHeader);
