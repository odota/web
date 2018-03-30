import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calculateResponsiveState } from 'redux-responsive';
import { unpackPositionData } from 'utility';
import styled from 'styled-components';
import { getPlayerWardmap } from '../../../../actions';
import Heatmap from '../../../Heatmap';
import Container from '../../../Container';
import strings from '../../../../lang';

const MAX_WIDTH = 1200;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`;

const StyledInner = styled(Container)`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 50%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

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
    const {
      error, loading, data, browser,
    } = this.props;
    const heatmapWidth = browser.width - 50;

    return (
      <StyledContainer>
        <StyledInner
          title={strings.th_ward_observer}
          error={error}
          loading={loading}
        >
          <Heatmap
            points={unpackPositionData(data.obs)}
            width={Math.min(MAX_WIDTH, heatmapWidth)}
          />
        </StyledInner>
        <StyledInner
          title={strings.th_ward_sentry}
          error={error}
          loading={loading}
        >
          <Heatmap
            points={unpackPositionData(data.sen)}
            width={Math.min(MAX_WIDTH, heatmapWidth)}
          />
        </StyledInner>
      </StyledContainer>
    );
  }
}

RequestLayer.propTypes = {
  updateWindowSize: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.arrayOf({}),
  browser: PropTypes.shape({}),
  playerId: PropTypes.string,
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
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
