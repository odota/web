import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import {
  getPlayerMatches,
  getPlayerHeroes,
} from 'actions';
import {
  playerMatches,
  playerHeroes,
} from 'reducers';
import Table, { TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import playerMatchesColumns from 'components/Player/Pages/Matches/playerMatchesColumns';
import { playerHeroesOverviewColumns } from 'components/Player/Pages/Heroes/playerHeroesColumns';
import styles from './Overview.css';

const getPlayerMatchesAndHeroes = (playerId, options) => (dispatch) => {
  dispatch(getPlayerMatches(playerId, options));
  dispatch(getPlayerHeroes(playerId, options));
};

const MAX_OVERVIEW_ROWS = 20;
const OVERVIEW_TABLES_BREAK_SIZE = 1224;

const Overview = ({
  playerId,
  matchesData,
  heroesData,
  width,
}) => (
  <div>
    <TableFilterForm submitAction={getPlayerMatchesAndHeroes} id={playerId} page="overview" />
    <div className={styles.overviewContainer}>
      <TableContainer
        title={strings.heading_matches}
        style={{
          width: width >= OVERVIEW_TABLES_BREAK_SIZE ? 'calc(70% - 30px)' : '100%',
          marginRight: width >= OVERVIEW_TABLES_BREAK_SIZE ? 30 : 0,
        }}
      >
        <Table
          columns={playerMatchesColumns}
          data={matchesData}
          maxRows={MAX_OVERVIEW_ROWS}
        />
      </TableContainer>
      <TableContainer
        title={strings.heading_heroes}
        style={{ width: width >= OVERVIEW_TABLES_BREAK_SIZE ? '30%' : '100%' }}
      >
        <Table
          columns={playerHeroesOverviewColumns}
          data={heroesData}
          maxRows={MAX_OVERVIEW_ROWS}
        />
      </TableContainer>
    </div>
  </div>
);

const getData = (props) => {
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
  limit: [20],
};

const mapStateToProps = (state, { playerId }) => ({
  matchesData: playerMatches.getMatchList(state, playerId),
  heroesData: playerHeroes.getHeroList(state, playerId),
  width: state.browser.width,
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: playerId => dispatch(getPlayerHeroes(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
