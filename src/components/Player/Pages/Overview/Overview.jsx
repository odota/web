import React from 'react';
import {
  connect
} from 'react-redux';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
  getPlayerHeroes,
  setPlayerHeroesSort,
} from 'actions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from 'selectors';
import {
  playerMatches,
  playerHeroes
} from 'reducers';
import {
  createTable,
  TableContainer
} from 'components/Table';
import {
  TableFilterForm
} from 'components/Form';
import playerMatchesColumns from 'components/Player/Pages/Matches/playerMatchesColumns';
import {
  playerHeroesOverviewColumns
} from 'components/Player/Pages/Heroes/playerHeroesColumns';
import styles from './Overview.css';

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);
const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId, 20)(state) : transformPlayerHeroesById(playerId, 20)(state)),
  setPlayerHeroesSort
);

const getPlayerMatchesAndHeroes = (playerId, options) => dispatch => {
  dispatch(getPlayerMatches(playerId, options));
  dispatch(getPlayerHeroes(playerId, options));
};

const Overview = ({
  playerId
}) => (
  <div>
    <TableFilterForm submitAction={getPlayerMatchesAndHeroes} id={playerId} page="overview" />
    <div className={styles.overviewContainer}>
      <TableContainer title="Recent matches" style={{ width: '70%' }}>
        <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
      </TableContainer>
      <TableContainer title="Heroes played" style={{ marginLeft: 30, width: '30%' }}>
        <PlayerHeroesTable columns={playerHeroesOverviewColumns} id={playerId} />
      </TableContainer>
    </div>
  </div>
);

const getData = props => {
  props.getPlayerMatches(props.playerId);
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
    return <Overview {...this.props} />;
  }
}

const defaultOptions = {
  limit: [20]
};

const mapDispatchToProps = (dispatch) => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: (playerId) => dispatch(getPlayerHeroes(playerId)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
