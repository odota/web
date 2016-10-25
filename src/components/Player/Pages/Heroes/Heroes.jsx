import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import {
  getPlayerHeroes,
} from 'actions';
import { playerHeroes } from 'reducers';
import Table from 'components/Table';
import Container from 'components/Container';
import { TableFilterForm } from 'components/Form';
import { playerHeroesColumns } from './playerHeroesColumns';

const Heroes = ({ data, error, loading }) => (
  <div>
    <TableFilterForm />
    <Container title={strings.heading_heroes} error={error} loading={loading}>
      <Table paginated columns={playerHeroesColumns} data={data} />
    </Container>
  </div>
);

const getData = (props) => {
  props.getPlayerHeroes(props.playerId, props.location.query);
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
    return <Heroes {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerHeroes.getHeroList(state, playerId),
  error: playerHeroes.getError(state, playerId),
  loading: playerHeroes.getLoading(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
