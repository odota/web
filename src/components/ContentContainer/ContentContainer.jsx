import React, { PropTypes } from 'react';
import Spinner from 'components/Spinner';
import Error from 'components/Error';

const ContentContainer = ({ loading, error, children }) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Spinner />;
  }
  return children;
};

const { bool, node } = PropTypes;

ContentContainer.propTypes = {
  loading: bool,
  error: bool,
  children: node,
};

export default ContentContainer;
