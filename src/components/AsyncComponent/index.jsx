import React, { Component } from 'react';
import Spinner from '../Spinner';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async UNSAFE_componentWillMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <Spinner />;
    }
  }

  return AsyncComponent;
}
