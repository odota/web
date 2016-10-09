import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import {
  getPlayerHeroes,
} from 'actions';
import { playerHeroes } from 'reducers';
import Table, { TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import { playerHeroesColumns } from './playerHeroesColumns';

const Heroes = ({ playerId, data }) => (
  <div>
    <TableFilterForm submitAction={getPlayerHeroes} id={playerId} page="heroes" />
    <TableContainer title={strings.heading_heroes}>
      <Table paginated columns={playerHeroesColumns} data={data} />
    </TableContainer>
  </div>
);

const getData = (props) => {
  props.getPlayerHeroes(props.playerId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(this.props);
    }
  }

  render() {
    return <Heroes {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerHeroes.getHeroList(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
