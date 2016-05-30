import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { getPlayer } from '../../actions';
import { Link } from 'react-router';

// Maybe we can factor out this ternary into a function?
const AccountWidget = ({ loading, error, user }) => (
  <div>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user ? (
      <div>
        <li><Link to={`/players/${user.account_id}`}>Profile</Link></li>
        <li><a href="/logout">Logout</a></li>
      </div>
    )
    : <li><a href="/login">Login</a></li>
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
