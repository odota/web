import React from 'react';
import { connect } from 'react-redux';
import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import FontIcon from 'material-ui/FontIcon';
import Cheese from '../Cheese/Cheese.css';
import styles from './PlayerHeader.css';
// import PlayerPicture from './PlayerPicture';
import Error from '../Error';
import Spinner from '../Spinner';
import { player } from '../../reducers';
// import styles from './PlayerHeader.css';
import PlayerStats from './PlayerStats';

const PlayerName = ({ playerName, playerId, picture, registered, cheese, steamLink, loading, error }) => {
  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    const nameSteam = (
      <span>
        {playerName}
        <a className={styles.steamLink} href={steamLink} rel="noopener noreferrer" target="_blank">
          <img alt="Steam" style={{ marginLeft: '14px' }} src="/assets/steam_icon.png" width="16" height="16" />
        </a>
      </span>
    );

    return (
      <div style={{ width: '100%' }} className={styles.container}>
        <div style={{ width: '100%' }}>
          <CardHeader
            style={{ padding: 0 }}
            avatar={
              <Avatar
                src={picture}
                size={124}
                style={{
                  WebkitBoxShadow: '0px 0px 15px 2px rgba(0,0,0,0.4)',
                  MozBoxShadow: '0px 0px 15px 2px rgba(0,0,0,0.4)',
                  BoxShadow: '0px 0px 15px 2px rgba(0,0,0,0.4)',
                  margin: '0 30px',
                }}
              />
            }
            title={
              registered ?
                <div>
                  {nameSteam}
                  <div style={{ opacity: '.6', float: 'right' }}>
                    {cheese ?
                      <div style={{ float: 'right', lineHeight: 1 }}>
                        <FontIcon
                          className={Cheese.cheese}
                          style={{ fontSize: '18px', margin: 0, fontWeight: '600', textShadow: 'none' }}
                        />
                        <span style={{ fontSize: '16px', marginLeft: '8px' }}>X {cheese}</span>
                      </div> :
                    null}
                    <IconButton
                      tooltip="This user is registered!"
                      touch={true}
                      disableTouchRipple={true}
                      tooltipPosition="top-right"
                      style={{
                        display: 'block',
                        float: 'right',
                        marginTop: '-8px',
                        marginLeft: '-2px',
                        cursor: 'default',
                      }}
                    >
                      <ActionPermIdentity />
                    </IconButton>
                  </div>
                </div> :
              nameSteam
            }
            titleStyle={{ fontSize: '28px', marginTop: '8px' }}
            subtitle={<PlayerStats playerId={playerId} />}
          />
        </div>
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
  registered: player.getLastLogin(state, ownProps.playerId),
  picture: player.getPictureFull(state, ownProps.playerId),
  steamLink: player.getSteamLink(state, ownProps.playerId),
  cheese: player.getCheese(state, ownProps.playerId),
  playerId: ownProps.playerId,
});

export default connect(mapStateToProps)(PlayerName);
