import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Spinner from '../Spinner';
import Error from '../Error';
import { API_HOST } from '../../config';
import { player } from '../../reducers';
import styles from './AccountWidget.css';

const LoggedIn = ({ loading, error, playerId, playerName, playerPicture }) => {
  const getPlayerWidget = () => {
    if (error) return <Error />;
    if (loading) return <Spinner color='#fff' size={.5} />;

    return (
      <div className={styles.verticalAlign}>
        <Link to={`/players/${playerId}/overview`} className={styles.playerProfile}>
          <FlatButton
            label={playerName}
            labelPosition="before"
            labelStyle={{
              display: 'inline-block',
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            hoverColor="#1976D2"
            icon={<Avatar src={playerPicture} size={30} />}
          />
        </Link>
        <IconButton
          href={`${API_HOST}/logout`}
          tooltip="Logout"
          tooltipPosition="bottom-center"
          style={{ zIndex: 3200 }}
        >
          <ActionExitToApp />
        </IconButton>
      </div>
    );
  };

  return getPlayerWidget();
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  playerName: player.getPlayerName(state, ownProps.playerId),
  playerPicture: player.getPicture(state, ownProps.playerId),
  playerId: ownProps.playerId,
});

export default connect(mapStateToProps)(LoggedIn);
