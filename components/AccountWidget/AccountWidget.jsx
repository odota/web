import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { getPlayer } from '../../actions';
import { Link } from 'react-router';

// Maybe we can factor out this ternary into a function?
const AccountWidget = ({ loading, error, player }) => (
  <menu>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && player ? (
      [
        <li><Link to={`/players/${player.account_id}`}>Profile</Link></li>,
        <li><a href="/logout">Logout</a></li>
      ]
    )
    : <li><a href="/login">Login</a></li>
    }
  </menu>
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
