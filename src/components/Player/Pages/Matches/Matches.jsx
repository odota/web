import React from 'react';
import {
  connect
} from 'react-redux';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
} from 'actions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
} from 'selectors';
import {
  playerMatches
} from 'reducers';
import {
  createTable,
  TableContainer
} from 'components/Table';
import {
  TableFilterForm
} from 'components/Form';
import playerMatchesColumns from './playerMatchesColumns';

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);

const Matches = ({
  playerId
}) => (
  <div>
    <TableFilterForm submitAction={getPlayerMatches} id={playerId} page="matches" />
    <TableContainer title="recent matches">
      <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
    </TableContainer>
  </div>
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

const defaultOptions = {
  limit: null
};

const mapDispatchToProps = (dispatch) => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerMatches(playerId, options)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
