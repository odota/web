import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import Heading from '../Heading';
import Error from '../Error';

const {
  bool, node, string, shape, number,
} = PropTypes;

const ContainerSkeleton = props => (
  <ContentLoader
    primaryColor="#371b68"
    secondaryColor="#371b68"
    animate={false}
    {...props}
  >
    <rect x="0" y="10" rx="5" ry="5" width="200" height="5" />
    <rect x="0" y="25" rx="5" ry="5" width="200" height="5" />
    <rect x="0" y="40" rx="5" ry="5" width="200" height="5" />
    <rect x="0" y="55" rx="5" ry="5" width="200" height="5" />
    <rect x="0" y="70" rx="5" ry="5" width="200" height="5" />
  </ContentLoader>
);

const Container = ({
  title, subtitle, style, className, children, error, loading, hide, titleTo, loaderWidth, loaderHeight,
}) => (!hide ? (
  <div className={className} style={{ ...style }}>
    {title && <Heading title={title} subtitle={subtitle} titleTo={titleTo} />}
    {error && <Error />}
    {!error && loading && <ContainerSkeleton width={loaderWidth || 400} height={loaderHeight || 160} />}
    {!error && !loading && children}
  </div>
) : null);

Container.propTypes = {
  title: string,
  subtitle: string,
  style: shape({}),
  className: string,
  loading: bool,
  error: bool,
  children: node,
  hide: bool,
  titleTo: string,
  loaderWidth: number,
  loaderHeight: number,
};

export default Container;
