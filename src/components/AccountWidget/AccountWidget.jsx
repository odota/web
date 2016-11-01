/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import { getPlayer } from 'actions';
import strings from 'lang';
import Spinner from '../Spinner';
import Error from '../Error';
import LoggedIn from './LoggedIn';
// import styles from './AccountWidget.css';
// import FontIcon from 'material-ui/FontIcon';
// import { PlayerPicture } from '../Player';

// Maybe we can factor out this ternary into a function?
/*
        <PlayerPicture noSteamLink link={`/players/${user.account_id}/overview`} playerId={user.account_id} />
        <FontIcon style={{ fontSize: 40 }} className="material-icons">
          exit_to_app
        </FontIcon>
        <FlatButton
            label={strings.app_login}
            icon={<IconSteam />}
            href={`${API_HOST}/login`}
          />
*/
const AccountWidget = ({ loading, error, user, style }) => (
  <div style={style}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user ? (
      <LoggedIn playerId={user.account_id} />
      )
      : <a href={`${API_HOST}/login`}>{strings.app_login}</a>
    }
  </div>
);

const mapStateToProps = (state) => {
  const { error, loading, user } = state.app.metadata;

  return {
    loading,
    error,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
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
