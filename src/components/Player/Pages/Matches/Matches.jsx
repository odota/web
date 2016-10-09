import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayerMatches,
} from 'actions';
import {
  playerMatches,
} from 'reducers';
import Table, {
  TableContainer,
} from 'components/Table';
import {
  TableFilterForm,
} from 'components/Form';
import playerMatchesColumns from './playerMatchesColumns';

const Matches = ({
  playerId,
  data,
}) => (
  <div>
    <TableFilterForm submitAction={getPlayerMatches} id={playerId} page="matches" />
    <TableContainer title="Recent Matches">
      <Table paginated sorted columns={playerMatchesColumns} data={data} />
    </TableContainer>
  </div>
);

const getData = (props) => {
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
  limit: null,
};

const mapStateToProps = (state, { playerId }) => ({
  data: playerMatches.getMatchList(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerMatches(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
