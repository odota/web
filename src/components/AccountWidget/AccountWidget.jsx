/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
// import { getPlayer } from 'actions';
import strings from 'lang';
import { IconSteam } from 'components/Icons';
import Spinner from '../Spinner';
import Error from '../Error';
import LoggedIn from './LoggedIn';
import styles from './AccountWidget.css';

const AccountWidget = ({ loading, error, user, style }) => (
  <div style={style}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user
      ? <LoggedIn playerId={user.account_id} />
      : <a href={`${API_HOST}/login`} className={styles.iconButton}>
        <IconSteam />
        {strings.app_login}
      </a>
    }
  </div>
);

const mapStateToProps = (state) => {
  const { error, loading, data } = state.app.metadata;
  return {
    loading,
    error,
    user: data.user,
  };
};

/*
const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
});
*/

class RequestLayer extends React.Component {
  componentWillUpdate() {
  }

  render() {
    return <AccountWidget {...this.props} />;
  }
}

export default connect(mapStateToProps, null)(RequestLayer);
