import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class DeferredContainer extends PureComponent {
      static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node),
      }

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
