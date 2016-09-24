import React from 'react';
import { connect } from 'react-redux';
import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import { green500 } from 'material-ui/styles/colors';
import ReactTooltip from 'react-tooltip';
import { player } from 'reducers';
import styles from './PlayerHeader.css';
import Error from '../Error';
import Spinner from '../Spinner';
import PlayerStats from './PlayerStats';
import PlayerBadges from './PlayerBadges';
import PlayerButtons from './PlayerButtons';

const PlayerName = ({ playerName, playerId, picture, registered, loading, error }) => {
  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    return (
      <div style={{ width: '100%' }} className={styles.container}>
        <div style={{ width: '70%' }}>
          <CardHeader
            style={{ padding: 0 }}
            avatar={
              <Badge
                badgeContent={registered ?
                  <div>
                    <div
                      data-tip data-for="registered"
                      style={{
                        width: 18,
                        height: 18,
                      }}
                    />
                    <ReactTooltip id="registered" place="top" type="light" effect="float">
                      Registered user.
                    </ReactTooltip>
                  </div>
                  : ''
                }
                badgeStyle={{
                  fontSize: 20,
                  top: 5,
                  left: 40,
                  background: registered ? green500 : 'transparent',
                  width: 18,
                  height: 18,
                }}
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <Avatar
                  src={picture}
                  size={124}
                  className={styles.oreviewAvatar}
                />
              </Badge>
            }
            title={
              <div>
                {playerName}
                <PlayerBadges playerId={playerId} />
              </div>
            }
            titleStyle={{ fontSize: 28, marginTop: 6 }}
            subtitle={<PlayerStats playerId={playerId} />}
          />
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
});

export default connect(mapStateToProps)(PlayerName);
