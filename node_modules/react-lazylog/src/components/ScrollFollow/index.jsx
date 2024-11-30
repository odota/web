import { Component, Fragment } from 'react';
import { bool, func } from 'prop-types';

export default class ScrollFollow extends Component {
  static propTypes = {
    /**
     * Render a component based on the function's arguments
     *
     *   - `follow: bool` This value is `true` or `false`
     *   based on whether the component should be auto-following.
     *   This value can be passed directly to the Lazy component's
     *   `follow` prop.
     *
     *   - `onScroll: func`: This function is used to listen for scrolling
     *   events and turn off auto-following (`follow`).
     *   This value can be passed directly to the Lazy component's
     *   `onScroll` prop.
     *
     *   - `startFollowing: func`: A helper function for manually re-starting
     *   `follow`ing. Is not used by a Lazy component;
     *   rather this can be invoked whenever you need to turn back on
     *   auto-following, but cannot reliably do this from the `startFollowing`
     *   prop. e.g `startFollowing();`
     *
     *   - `stopFollowing: func`: A helper function for manually stopping
     *   `follow`ing. Is not used by a Lazy component;
     *   rather this can be invoked whenever you need to turn off
     *   auto-following, but cannot reliably do this from the `startFollowing`
     *   prop. e.g `stopFollowing();`
     */
    render: func.isRequired,
    /**
     * The initial follow action; defaults to `false`.
     * The value provided here will inform the initial `follow`
     * property passed to the child function.
     */
    startFollowing: bool,
  };

  static defaultProps = {
    startFollowing: false,
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      follow: nextProps.startFollowing,
    };
  }

  state = {
    follow: false,
  };

  handleScroll = ({ scrollTop, scrollHeight, clientHeight }) => {
    if (this.state.follow && scrollHeight - scrollTop !== clientHeight) {
      this.setState({ follow: false });
    }
  };

  startFollowing = () => {
    this.setState({ follow: true });
  };

  stopFollowing = () => {
    this.setState({ follow: false });
  };

  render() {
    const { render } = this.props;
    const { follow } = this.state;

    return (
      <Fragment>
        {render({
          follow,
          onScroll: this.handleScroll,
          startFollowing: this.startFollowing,
          stopFollowing: this.stopFollowing,
        })}
      </Fragment>
    );
  }
}
