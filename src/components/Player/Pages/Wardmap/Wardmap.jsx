import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calculateResponsiveState } from 'redux-responsive';
import { getPlayerWardmap } from 'actions';
import Heatmap from 'components/Heatmap';
import Container from 'components/Container';
import strings from 'lang';
import { unpackPositionData } from 'utility';
import styles from './Wardmap.css';

const MAX_WIDTH = 1200;

const getData = (props) => {
  props.getPlayerWardmap(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
    window.addEventListener('resize', this.props.updateWindowSize);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.updateWindowSize);
  }

  render() {
    const { error, loading, data, browser } = this.props;
    const heatmapWidth = browser.width - 50;

    return (
      <div className={styles.wardmaps}>
        <Container
          title={strings.th_ward_observer}
          className={styles.wardmapContainer}
          error={error}
          loading={loading}
        >
          <Heatmap
            points={unpackPositionData(data.obs)}
            width={Math.min(MAX_WIDTH, heatmapWidth)}
          />
        </Container>
        <Container
          title={strings.th_ward_sentry}
          className={styles.wardmapContainer}
          error={error}
          loading={loading}
        >
          <Heatmap
            points={unpackPositionData(data.sen)}
            width={Math.min(MAX_WIDTH, heatmapWidth)}
          />
        </Container>
      </div>
    );
  }
}

RequestLayer.propTypes = {
  updateWindowSize: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.array,
  browser: PropTypes.object,
  playerId: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  data: state.app.playerWardmap.data,
  loading: state.app.playerWardmap.loading,
  error: state.app.playerWardmap.data.error,
  browser: state.browser,
});

const mapDispatchToProps = dispatch => ({
  getPlayerWardmap: (playerId, options) => dispatch(getPlayerWardmap(playerId, options)),
  updateWindowSize: () => dispatch(calculateResponsiveState(window)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
