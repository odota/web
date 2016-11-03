import React from 'react';

export const Fixed = (Component) => class extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <Component {...this.props} />
  }
};
 
export const Pure = (Component) => class extends React.PureComponent {
  render() {
    return <Component {...this.props} />
  }
};
