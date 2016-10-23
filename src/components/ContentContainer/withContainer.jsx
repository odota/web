import React from 'react';
import ContentContainer from './ContentContainer';

const withContentContainer = Component =>
  ({ loading, error, ...rest }) => (
    <ContentContainer {...{ loading, error }}>
      <Component {...rest} />
    </ContentContainer>
  );

export default withContentContainer;
