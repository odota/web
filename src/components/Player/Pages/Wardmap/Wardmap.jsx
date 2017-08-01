import React from 'react';
import { connect } from 'react-redux';
import { getPlayerWardmap } from 'actions';
import Heatmap from 'components/Heatmap';
import Container from 'components/Container';
import strings from 'lang';
import { unpackPositionData } from 'utility';
import styles from './Wardmap.css';
import { calculateResponsiveState } from 'redux-responsive';

const getData = (props) => {
  props.getPlayerWardmap(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
    window.addEventListener('resize', this.props.updateWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.updateWindowSize);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
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
            width={heatmapWidth > 1440 ? 1440 : heatmapWidth}
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
            width={heatmapWidth > 1440 ? 1440 : heatmapWidth}
          />
        </Container>
      </div>
    );
  }
}

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
