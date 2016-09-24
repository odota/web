import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Spinner from '../Spinner';
import Error from '../Error';
import { API_HOST } from '../../config';
import { getPlayer } from '../../actions';
import { REDUCER_KEY } from '../../reducers';
import LoggedIn from './LoggedIn';
import styles from './AccountWidget.css';
// import FontIcon from 'material-ui/FontIcon';
// import { PlayerPicture } from '../Player';

// Maybe we can factor out this ternary into a function?
/*
        <PlayerPicture noSteamLink link={`/players/${user.account_id}/overview`} playerId={user.account_id} />
        <FontIcon style={{ fontSize: 40 }} className="material-icons">
          exit_to_app
        </FontIcon>
*/
const AccountWidget = ({ loading, error, user, style }) => (
  <div style={style} className={styles.tabContainer}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user ? (
      <LoggedIn playerId={user.account_id} />
    )
    :
      <FlatButton
        href={`${API_HOST}/login`}
        label="Login"
        hoverColor="#1976D2"
      />
    }
  </div>
);

const mapStateToProps = (state) => {
  const { error, loading, user } = state[REDUCER_KEY].metadata;

  return {
    loading,
    error,
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId)),
});

class RequestLayer extends React.Component {
  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user.account_id) {
      this.props.getPlayer(nextProps.user.account_id);
    }
  }

  render() {
    return <AccountWidget {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
