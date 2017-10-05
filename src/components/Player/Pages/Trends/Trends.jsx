/* global API_HOST */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TrendGraph } from 'components/Visualizations';
import {
  getPlayerTrends,
} from 'actions';
import ButtonGarden from 'components/ButtonGarden';
import trendNames from 'components/Player/Pages/matchDataColumns';
import Heading from 'components/Heading';
import Container from 'components/Container';
import strings from 'lang';
import styled from 'styled-components';
import constants from '../../../constants';

const TooltipStylesDiv = styled.div`
.tooltipWrapper {
  background-color: ${constants.defaultPrimaryColor};
  color: ${constants.textColorPrimary} !important;
  font-size: ${constants.fontSizeMedium};
  min-width: 250px;
}

.value {
  text-align: center;
  background-color: ${constants.colorBlueMuted};
  height: 30px;
  line-height: 30px;
  font-size: ${constants.fontSizeCommon};
}

.match {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.win {
  color: ${constants.colorSuccess};
}

.loss {
  color: ${constants.colorDanger};
}

.time {
  color: ${constants.colorMutedLight};
  font-size: ${constants.fontSizeTiny};
}

.matchValue {
  font-weight: bold;
}

.hero {
  height: 50px;
  width: 88.88px; /* ratio */
  background-color: ${constants.almostBlack};
}

.heroImg {
  height: 100%;
}

.noData {
  text-align: center;
  padding-top: 30px;
  font-size: ${constants.fontSizeCommon};
}
`;

const Trend = ({ routeParams, columns, playerId, error, loading, history }) => {
  const selectedTrend = routeParams.subInfo || trendNames[0];
  return (
    <div style={{ fontSize: 10 }}>
      <Heading title={strings.trends_name} subtitle={strings.trends_description} />
      <ButtonGarden
        onClick={buttonName => history.push(`/players/${playerId}/trends/${buttonName}${window.location.search}`)}
        buttonNames={trendNames}
        selectedButton={selectedTrend}
      />
      <Container
        style={{ fontSize: 10, minHeight: '320px' }}
        error={error}
        loading={loading}
      >
        <TooltipStylesDiv>
          <TrendGraph
            columns={columns}
            name={selectedTrend}
            onClick={(p) => {
              const matchId = columns[p.index].match_id;
              history.push(`/matches/${matchId}`);
            }}
          />
        </TooltipStylesDiv>
      </Container>
    </div>
  );
};

Trend.propTypes = {
  routeParams: PropTypes.shape({}),
  columns: PropTypes.arrayOf({}),
  playerId: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.shape({}),
};

const getData = (props) => {
  const trendName = props.routeParams.subInfo || trendNames[0];
  props.getPlayerTrends(props.playerId, props.location.search, trendName);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId
      || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Trend {...this.props} />;
  }
}

RequestLayer.propTypes = {
  playerId: PropTypes.string,
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  columns: state.app.playerTrends.data,
  loading: state.app.playerTrends.loading,
  error: state.app.playerTrends.error,
});

export default withRouter(connect(mapStateToProps, { getPlayerTrends })(RequestLayer));
