import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Spinner from '../Spinner';

const LoggedIn = ({ playerId, style, strings }) => {
  if (!playerId) {
    return <Spinner color="#fff" size={0.5} />;
  }
  return (
    <Link style={style} to={`/players/${playerId}`}>
      <Button size="small" variant="text">{strings.app_my_profile}</Button>
    </Link>
  );
};

LoggedIn.propTypes = {
  playerId: PropTypes.number,
  style: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(LoggedIn);
