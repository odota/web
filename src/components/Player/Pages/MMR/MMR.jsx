import React from 'react';
import { connect } from 'react-redux';
import { MMRGraph } from 'components/Visualizations';
import { getPlayerMMR } from 'actions';
import { playerMMR } from 'reducers';
import strings from 'lang';
import Container from 'components/Container';

const MMR = ({ columns, error, loading }) => (
  <div style={{ fontSize: 10 }}>
    <Container title={strings.heading_mmr} error={error} loading={loading}>
      <MMRGraph columns={columns} />
    </Container>
  </div>
);

const getData = (props) => {
  props.getPlayerMMR(props.playerId, props.location.query);
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
    return <MMR {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  columns: playerMMR.getList(state, playerId),
  loading: playerMMR.getLoading(state, playerId),
  error: playerMMR.getError(state, playerId),
});

export default connect(mapStateToProps, { getPlayerMMR })(RequestLayer);
