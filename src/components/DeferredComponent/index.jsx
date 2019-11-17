import React from 'react';

export default function deferredComponent(WrappedComponent) {
  return class extends React.PureComponent {
        state = { shouldRender: false };

        componentDidMount() {
          requestAnimationFrame(() => {
            this.setState({ shouldRender: true });
          });
        }

        render() {
          return this.state.shouldRender ? <WrappedComponent {...this.props} /> : null;
        }
  };
}
