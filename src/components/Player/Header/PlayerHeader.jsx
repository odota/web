import React from 'react';
import { connect } from 'react-redux';
import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import ReactTooltip from 'react-tooltip';
import { player } from 'reducers';
import strings from 'lang';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import styles from './PlayerHeader.css';
import PlayerStats from './PlayerStats';
import PlayerBadges from './PlayerBadges';
import PlayerButtons from './PlayerButtons';

export const HEADER_MD_BREAK = 900;
export const HEADER_SM_BREAK = 660;
const LARGE_IMAGE_SIZE = 124;

const getRegistrationBadge = registered => registered && (
  <div>
    <div
      data-tip data-for="registered"
      style={{
        width: 18,
        height: 18,
      }}
    />
    <ReactTooltip id="registered" place="top" type="light" effect="solid">
      {strings.registered_user_tooltip}
    </ReactTooltip>
  </div>
);

const getTitle = (playerName, playerId, width) => {
  if (width <= HEADER_SM_BREAK) {
    return null;
  }
  if (width > HEADER_MD_BREAK) {
    return (
      <div>
        <div className={styles.titleNameButtons}>
          {playerName}
          <PlayerBadges playerId={playerId} />
          <PlayerButtons />
        </div>
      </div>
    );
  }
  return playerName;
};

const getSubTitle = (playerId, width) => {
  if (width <= HEADER_SM_BREAK) {
    return null;
  }
  if (width > HEADER_MD_BREAK) {
    return <PlayerStats playerId={playerId} />;
  }
  return <PlayerBadges playerId={playerId} />;
};

const getSubContainerContents = (playerName, playerId, width) => {
  if (width <= HEADER_SM_BREAK) {
    return (
      <div className={styles.smallSubContainerContents}>
        <span className={styles.playerName}>{playerName}</span>
        <PlayerBadges playerId={playerId} />
        <PlayerStats playerId={playerId} compact />
      </div>
    );
  }
  if (width <= HEADER_MD_BREAK) {
    return <PlayerStats playerId={playerId} />;
  }
  return null;
};

// TODO localize strings
const PlayerName = ({ playerName, playerId, picture, registered, loading, error, width }) => {
  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    let badgeStyle = {
      fontSize: 20,
      top: 5,
      left: 40,
      background: registered ? styles.green : 'transparent',
      width: 18,
      height: 18,
    };

    let avatarStyle = {
      marginLeft: width > HEADER_MD_BREAK ? 30 : 0,
      marginRight: width > HEADER_SM_BREAK ? 30 : 0,
    };

    let cardHeaderStyle = {
      padding: 0,
    };
    if (width <= HEADER_MD_BREAK) {
      badgeStyle = {
        ...badgeStyle,
        marginLeft: -1 * (LARGE_IMAGE_SIZE / 2) * 0.75,
      };
    }
    if (width <= HEADER_SM_BREAK) {
      cardHeaderStyle = {
        ...cardHeaderStyle,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      };
      avatarStyle = {
        ...avatarStyle,
        marginLeft: LARGE_IMAGE_SIZE * 0.75,
      };
      badgeStyle = {
        ...badgeStyle,
        marginLeft: LARGE_IMAGE_SIZE * 0.5,
      };
    }

    return (
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <CardHeader
            style={cardHeaderStyle}
            avatar={
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
                  size={width > HEADER_MD_BREAK || width <= HEADER_SM_BREAK ? LARGE_IMAGE_SIZE : LARGE_IMAGE_SIZE / 2}
                  className={styles.oreviewAvatar}
                />
              </Badge>
            }
            title={getTitle(playerName, playerId, width)}
            titleStyle={{ fontSize: 28, marginTop: width > HEADER_MD_BREAK ? 6 : 0 }}
            subtitle={getSubTitle(playerId, width)}
          />
          {getSubContainerContents(playerName, playerId, width)}
        </div>
        {width <= HEADER_MD_BREAK && (
          <div className={styles.playerButtonsContainer}>
            <PlayerButtons />
          </div>
        )}
      </div>
    );
  };

  return getPlayerName();
};

// metadata.getUserId(state)
const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  playerName: player.getPlayerName(state, ownProps.playerId),
  picture: player.getPictureFull(state, ownProps.playerId),
  registered: player.getLastLogin(state, ownProps.playerId),
  width: state.browser.width,
});

export default connect(mapStateToProps)(PlayerName);
