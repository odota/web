import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../components/Heading';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import stylePropType from 'react-style-proptype';

export const AsyncContainer = ({ loading, error, children }) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Spinner />;
  }
  return children;
};

const { bool, node, string } = PropTypes;

AsyncContainer.propTypes = {
  loading: bool,
  error: bool,
  children: node,
};

const Container = ({
  title, subtitle, style, className, children, error, loading, hide, titleTo,
}) => (!hide ? (
  <div className={className} style={{ ...style }}>
    {title && <Heading title={title} subtitle={subtitle} titleTo={titleTo} />}
    <AsyncContainer error={error} loading={loading}>
      {children}
    </AsyncContainer>
  </div>
) : null);

Container.propTypes = {
  title: string,
  subtitle: string,
  style: stylePropType,
  className: string,
  loading: bool,
  error: bool,
  children: node,
  hide: bool,
  titleTo: string,
};

export default Container;
