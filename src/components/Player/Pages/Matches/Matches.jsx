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
import strings from 'lang';
import playerMatchesColumns from './playerMatchesColumns';

const Matches = ({
  playerId,
  data,
}) => (
  <div>
    <TableFilterForm id={playerId} page="matches" />
    <TableContainer title={strings.heading_matches}>
      <Table paginated columns={playerMatchesColumns} data={data} />
    </TableContainer>
  </div>
);

const getData = (props) => {
  props.getPlayerMatches(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.accountId !== nextProps.accountId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
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
