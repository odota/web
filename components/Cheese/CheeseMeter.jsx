import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Spinner from '../Spinner';
import styles from './Cheese.css';

const CheeseMeter = ({ donations, error, loading }) => {
  const { goal, cheese } = donations;
  const percent = (cheese / goal) * 100;

  return (
    <div>
      {error && <Error />}
      {loading && <Spinner />}
      {!error && !loading && percent}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, error, donations } = state[REDUCER_KEY].gotMetadata;

  return {
    loading,
    error,
    donations,
  };
};

export default connect(mapStateToProps)(CheeseMeter);
