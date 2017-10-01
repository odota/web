/* global API_HOST */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import strings from 'lang';
// import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Spinner from '../Spinner';
import styles from './AccountWidget.css';

const LoggedIn = ({ playerId }) => {
  if (!playerId) {
    return <Spinner color="#fff" size={0.5} />;
  }
  return (
    <div className={styles.group}>
      <Link to={`/players/${playerId}`}>
        <FlatButton
          label={strings.app_my_profile}
          // labelPosition="before"
          className={styles.account}
          hoverColor="transparent"
        />
      </Link>
    </div>
  );
};

LoggedIn.propTypes = {
  playerId: PropTypes.number,
};

export default connect()(LoggedIn);
