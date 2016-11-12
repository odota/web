/*eslint-disable*/

import React from 'react';

export const Fixed = Component => class extends React.Component {
  shouldComponentUpdate(newProps) {
    return this.props.style !== newProps.style;
  }
  render() {
    return <Component {...this.props} />;
  }
};
