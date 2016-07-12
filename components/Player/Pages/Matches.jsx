import React from 'react';
import { connect } from 'react-redux';
import { createTable, TableContainer } from '../../Table';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
} from '../../../actions';
import { playerMatchesColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
} from '../../../selectors';
import { playerMatches } from '../../../reducers';

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);

const Matches = ({ playerId }) => (
  <TableContainer title="recent matches">
    <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
  </TableContainer>
);

const getData = props => {
  props.getPlayerMatches(props.playerId);
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
    return <Matches {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayerMatches: (playerId, numMatches) => dispatch(getPlayerMatches(playerId, numMatches)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
