import React from 'react';
import Heading from '../Heading';
import Error from '../Error/Error';
import ContainerSkeleton from '../Skeletons/ContainerSkeleton';

type ContainerProps = {
  title?: string,
  subtitle?: string,
  style?: any,
  className?: string,
  loading?: Boolean,
  error?: Boolean,
  children?: React.ReactNode,
  hide?: Boolean,
  titleTo?: string,
  loaderWidth?: number,
  loaderHeight?: number,
};

const Container = ({
  title,
  subtitle,
  style,
  className,
  children,
  error,
  loading,
  hide,
  titleTo,
  loaderWidth,
  loaderHeight,
}: ContainerProps) =>
  !hide ? (
    <div className={className} style={{ ...style }}>
      {title && <Heading title={title} subtitle={subtitle} titleTo={titleTo} />}
      {error && <Error />}
      {!error && loading && (
        <ContainerSkeleton
          width={loaderWidth || 400}
          height={loaderHeight || 160}
        />
      )}
      {!error && !loading && children}
    </div>
  ) : null;

export default Container;
