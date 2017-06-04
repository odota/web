/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import strings from 'lang';
// import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Spinner from '../Spinner';
import Error from '../Error';
import styles from './AccountWidget.css';

const LoggedIn = ({ loading, error, playerId }) => {
  const getPlayerWidget = () => {
    if (error) return <Error />;
    if (loading) return <Spinner color="#fff" size={0.5} />;
    return (
      <div className={styles.group}>
        <Link to={`/players/${playerId}`}>
          <FlatButton
            label={strings.app_my_profile}
            // labelPosition="before"
            className={styles.account}
            hoverColor="transparent"
            // icon={<Avatar src={playerPicture} size={30} />}
          />
        </Link>
      </div>
    );
  };

  return getPlayerWidget();
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  playerId: ownProps.playerId,
});

export default connect(mapStateToProps)(LoggedIn);
