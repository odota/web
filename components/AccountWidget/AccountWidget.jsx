import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { getPlayer } from '../../actions';
import { Link } from 'react-router';
import styles from './AccountWidget.css';
import FontIcon from 'material-ui/FontIcon';
import { PlayerPicture } from '../Player';

// Maybe we can factor out this ternary into a function?
const AccountWidget = ({ loading, error, user }) => (
  <div className={styles.container}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user ? (
      <div className={styles.flexContainer}>
        <PlayerPicture noSteamLink link={`/players/${user.account_id}`} user />
        <a href="/logout" className={styles.logout}>
          <FontIcon style={{ fontSize: 40 }} className="material-icons">
            exit_to_app
          </FontIcon>
        </a>
      </div>
    )
    : <a href="/login">Login</a>
    }
  </div>
);

export { AccountWidget };

const mapStateToProps = (state) => {
  const { error, loading, user } = state[REDUCER_KEY].gotMetadata;

  return {
    loading,
    error,
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidget);
