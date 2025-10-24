import React from 'react';

import { connect } from 'react-redux';
import { calculateResponsiveState } from 'redux-responsive';
import styled from 'styled-components';
import { unpackPositionData } from '../../../../utility';
import { getPlayerWardmap } from '../../../../actions';
import Heatmap from '../../../Heatmap/Heatmap';
import Container from '../../../Container';
import constants from '../../../constants';

const MAX_WIDTH = constants.appWidth;
const HALF_WIDTH = constants.appWidth * 0.483;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  .heatmap {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover img {
      box-shadow: 0px 0px 5px #fff;
    }
  }

  .heatmap-clicked {
    display: none;
  }
`;

const getData = (props: WardmapProps) => {
  props.getPlayerWardmap(props.playerId, props.location.search);
};

type WardmapProps = {
  updateWindowSize: (this: Window, ev: UIEvent) => any,
  error: string,
  loading: boolean,
  data: { obs: any, sen: any },
  browser: any,
  playerId: string,
  location: {
    key?: string,
    search?: string,
  },
  strings: Strings,
  getPlayerWardmap: Function,
};

class RequestLayer extends React.Component<WardmapProps, { clicked?: string }> {
  state = {
    clicked: undefined,
  };

  componentDidMount() {
    getData(this.props);
    window.addEventListener('resize', this.props.updateWindowSize);
  }

  componentDidUpdate(prevProps: WardmapProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.updateWindowSize);
  }

  getClickProperties(mapId: string) {
    return {
      className:
        this.state.clicked && this.state.clicked !== mapId
          ? 'heatmap-clicked'
          : 'heatmap',
      onClick: this.handleClick(mapId),
    };
  }

  handleClick = (mapId: string) => () => {
    this.setState({
      clicked: !this.state.clicked && mapId,
    });
  };

  render() {
    const { error, loading, data, browser, strings } = this.props;
    const heatmapWidth = browser.width - 50;
    return (
      <StyledContainer>
        <div {...this.getClickProperties('observers')}>
          <Container
            title={strings.th_ward_observer}
            error={error}
            loading={loading}
          >
            <Heatmap
              points={unpackPositionData(data.obs)}
              width={Math.min(
                this.state.clicked === 'observers' ? MAX_WIDTH : HALF_WIDTH,
                heatmapWidth,
              )}
              key={this.state.clicked} // force update
            />
          </Container>
        </div>
        <div {...this.getClickProperties('sentries')}>
          <Container
            title={strings.th_ward_sentry}
            error={error}
            loading={loading}
          >
            <Heatmap
              points={unpackPositionData(data.sen)}
              width={Math.min(
                this.state.clicked === 'sentries' ? MAX_WIDTH : HALF_WIDTH,
                heatmapWidth,
              )}
              key={this.state.clicked}
            />
          </Container>
        </div>
      </StyledContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerWardmap.data,
  loading: state.app.playerWardmap.loading,
  error: state.app.playerWardmap.data.error,
  browser: state.browser,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerWardmap: (playerId: string, options: any) =>
    dispatch(getPlayerWardmap(playerId, options)),
  updateWindowSize: () => dispatch(calculateResponsiveState(window)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
