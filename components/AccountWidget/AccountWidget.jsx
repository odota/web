import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { getPlayer } from '../../actions';
import styles from './AccountWidget.css';
import { Link } from 'react-router';
import { API_HOST } from '../../yasp.config';
// import FontIcon from 'material-ui/FontIcon';
// import { PlayerPicture } from '../Player';

// Maybe we can factor out this ternary into a function?
/*
        <PlayerPicture noSteamLink link={`/players/${user.account_id}/overview`} playerId={user.account_id} />
        <FontIcon style={{ fontSize: 40 }} className="material-icons">
          exit_to_app
        </FontIcon>
*/
const AccountWidget = ({ loading, error, user }) => (
  <div className={styles.container}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user ? (
      <div className={`${styles.flexContainer} ${styles.tab}`}>
        <Link to={`/players/${user.account_id}`}>{"Profile"}</Link>
        <a href={`${API_HOST}/logout`} className={styles.logout}>{"Logout"}</a>
      </div>
    )
    : <a href={`${API_HOST}/login`}>Login</a>
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
