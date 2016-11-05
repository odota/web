import React from 'react';

export const Fixed = (Component) => class extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    return this.props.style != newProps.style;
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
