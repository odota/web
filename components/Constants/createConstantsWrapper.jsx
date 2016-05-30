import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Spinner from '../Spinner';
import Error from '../Error';

export default (Component) => {
  const ConstantsWrapper = (props) => {
    const { error, loading, ...realProps } = props;
    return (
      <div>
        {loading && !error && <Spinner />}
        {error && <Error />}
        {!loading && !error && <Component {...realProps} />}
      </div>
    );
  };

  const mapStateToProps = (state) => {
    const { error, loading } = state[REDUCER_KEY].gotConstants;

    return {
      error,
      loading,
    };
  };

  return connect(mapStateToProps)(ConstantsWrapper);
};
