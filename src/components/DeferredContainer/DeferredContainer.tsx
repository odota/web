import { PureComponent } from "react";

export default class DeferredContainer extends PureComponent {
  state = { shouldRender: false };

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ shouldRender: true });
    });
  }

  render() {
    return this.state.shouldRender ? this.props.children : null;
  }
}
