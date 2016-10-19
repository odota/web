import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerPros,
} from 'actions';
import { playerPros } from 'reducers';
import Table, { TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import strings from 'lang';
import playerProsColumns from './playerProsColumns';

const Pros = ({ data }) => (
  <div>
    <TableFilterForm />
    <TableContainer title={strings.heading_pros}>
      <Table paginated columns={playerProsColumns} data={data} />
    </TableContainer>
  </div>
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
      getData(this.props);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
