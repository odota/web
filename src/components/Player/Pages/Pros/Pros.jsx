import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerPros,
} from 'actions';
import { playerPros } from 'reducers';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import playerProsColumns from './playerProsColumns';

const Pros = ({ data, playerId, error, loading }) => (
  <Container title={strings.heading_pros} error={error} loading={loading}>
    <Table paginated columns={playerProsColumns(playerId)} data={data} />
  </Container>
);

const getData = (props) => {
  props.getPlayerPros(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Pros {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  getPlayerPros: (playerId, options) => dispatch(getPlayerPros(playerId, options)),
});

const mapStateToProps = (state, { playerId }) => ({
  data: playerPros.getProsList(state, playerId),
  error: playerPros.getError(state, playerId),
  loading: playerPros.getLoading(state, playerId),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
