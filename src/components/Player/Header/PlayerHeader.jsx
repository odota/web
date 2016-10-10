import React from 'react';
import { connect } from 'react-redux';
import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import ReactTooltip from 'react-tooltip';
import { player } from 'reducers';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import styles from './PlayerHeader.css';
import PlayerStats from './PlayerStats';
import PlayerBadges from './PlayerBadges';
import PlayerButtons from './PlayerButtons';

const BREAKPOINT_SIZE = 850;

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
      Registered user.
    </ReactTooltip>
  </div>
);

const getTitle = (playerName, playerId, width) => (width > BREAKPOINT_SIZE ? (
  <div>
    {playerName}
    <PlayerBadges playerId={playerId} />
  </div>
) : playerName);

// TODO localize strings
const PlayerName = ({ playerName, playerId, picture, registered, loading, error, width }) => {
  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    const badgeStyle = {
      fontSize: 20,
      top: 5,
      left: 40,
      background: registered ? styles.green : 'transparent',
      width: 18,
      height: 18,
    };

    return (
      <div className={styles.container}>
        <div>
          <CardHeader
            style={{ padding: 0 }}
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
                  style={{
                    marginLeft: width > BREAKPOINT_SIZE ? 30 : 0,
                    marginRight: 30,
                  }}
                  size={width > BREAKPOINT_SIZE ? 124 : 62}
                  className={styles.oreviewAvatar}
                />
              </Badge>
            }
            title={getTitle(playerName, playerId, width)}
            titleStyle={{ fontSize: 28, marginTop: 6 }}
            subtitle={width > BREAKPOINT_SIZE ?
              <PlayerStats playerId={playerId} /> :
              <PlayerBadges playerId={playerId} />
            }
          />
          {width <= BREAKPOINT_SIZE && <PlayerStats playerId={playerId} />}
        </div>
        <PlayerButtons />
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
