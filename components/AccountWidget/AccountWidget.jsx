import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { REDUCER_KEY } from '../../reducers';
import { getPlayer } from '../../actions';
import { Link } from 'react-router';

// Maybe we can factor out this ternary into a function?
const AccountWidget = ({ loading, error, player }) => (
  <menu>
    {loading && !error && <Spinner />}
    {error && <li>Error</li>}
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

class AccountWidgetWrapper extends React.Component {
  componentDidMount() {
    this.props.getPlayer(this.props.playerId);
  }

  render() {
    return <AccountWidget { ...this.props } />;
  }
}

export { AccountWidget };

const mapStateToProps = (state) => {
  const { error, loading, player } = state[REDUCER_KEY].gotPlayer;

  return {
    loading,
    error,
    player
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidgetWrapper);
