import React from 'react';
import { connect } from 'react-redux';
import { getPlayerWardmap } from 'actions';
import { playerWardmap } from 'reducers';
import Heatmap from 'components/Heatmap';
import Container from 'components/Container';
import { Row, Col } from 'react-flexbox-grid';
import strings from 'lang';
import { TableFilterForm } from 'components/Form';

const getData = (props) => {
  props.getPlayerWardmap(props.playerId, props.location.query);
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
      <div>
        <TableFilterForm />
        <Row>
          <Col md>
            <Container title={strings.th_ward_observer} error={error} loading={loading}>
              <Heatmap points={data.obs} />
            </Container>
          </Col>
          <Col md>
            <Container title={strings.th_ward_sentry} error={error} loading={loading}>
              <Heatmap points={data.sen} />
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerWardmap.getPlayerWardmap(state, playerId),
  loading: playerWardmap.getLoading(state, playerId),
  error: playerWardmap.getError(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerWardmap: (playerId, options) => dispatch(getPlayerWardmap(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
