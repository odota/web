import React from 'react';
import { connect } from 'react-redux';
import { getPlayerWardmap } from 'actions';
import Heatmap from 'components/Heatmap';
import Container from 'components/Container';
import strings from 'lang';
import { unpackPositionData } from 'utility';
import styles from './Wardmap.css';

const getData = (props) => {
  props.getPlayerWardmap(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    const { error, loading, data } = this.props;
    return (
      <div className={styles.wardmaps}>
        <Container
          title={strings.th_ward_observer}
          className={styles.wardmapContainer}
          error={error}
          loading={loading}
        >
          <Heatmap points={unpackPositionData(data.obs)} />
        </Container>
        <Container
          title={strings.th_ward_sentry}
          className={styles.wardmapContainer}
          error={error}
          loading={loading}
        >
          <Heatmap points={unpackPositionData(data.sen)} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.app.playerWardmap.data,
  loading: state.app.playerWardmap.loading,
  error: state.app.playerWardmap.data.error,
});

const mapDispatchToProps = dispatch => ({
  getPlayerWardmap: (playerId, options) => dispatch(getPlayerWardmap(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
