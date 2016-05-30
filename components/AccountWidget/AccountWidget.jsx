import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { getPlayer } from '../../actions';
import { Link } from 'react-router';
import styles from './AccountWidget.css';

// Maybe we can factor out this ternary into a function?
const AccountWidget = ({ loading, error, user }) => (
  <div className={styles.container}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user ? (
      <ul>
        <li><Link to={`/players/${user.account_id}`}>Profile</Link></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
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
