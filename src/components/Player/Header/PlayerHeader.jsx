import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import { player } from 'reducers';
import strings from 'lang';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { getMetadataUser } from 'reducers/metadata';
import styles from './PlayerHeader.css';
import PlayerStats from './PlayerStats';
import PlayerBadges from './PlayerBadges';
import PlayerButtons from './PlayerButtons';

export const HEADER_SM_BREAK = 660;
export const HEADER_MD_BREAK = 900;
const LARGE_IMAGE_SIZE = 124;

const getRegistrationBadge = registered => registered && (
  <div
    className={styles.registered}
    data-hint={strings.tooltip_registered_user}
    data-hint-position="top"
  />
);

const PlayerHeader = ({ playerName, officialPlayerName, playerId, picture, registered, loading, error, width, playerSoloCompetitiveRank, loggedInUser }) => {
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
    marginLeft: width > HEADER_MD_BREAK ? 30 : 0,
    marginRight: width > HEADER_SM_BREAK ? 30 : 0,
  };

  if (width <= HEADER_MD_BREAK) {
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
          <PlayerStats playerId={playerId} loggedInId={loggedInUser && String(loggedInUser.account_id)} compact={width <= HEADER_SM_BREAK} />
          <PlayerButtons playerId={playerId} playerSoloCompetitiveRank={playerSoloCompetitiveRank} compact={width <= HEADER_SM_BREAK} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  playerId: ownProps.playerId,
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  playerName: player.getPlayerName(state, ownProps.playerId),
  officialPlayerName: player.getOfficialPlayerName(state, ownProps.playerId),
  playerSoloCompetitiveRank: player.getSoloCompetitiveRank(state, ownProps.playerId),
  picture: player.getPictureFull(state, ownProps.playerId),
  registered: player.getLastLogin(state, ownProps.playerId),
  width: state.browser.width,
  loggedInUser: getMetadataUser(state),
});

export default connect(mapStateToProps)(PlayerHeader);
