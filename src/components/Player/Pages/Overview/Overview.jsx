import React from 'react';
import {
  connect,
} from 'react-redux';
import strings from 'lang';
import {
  getPlayerMatches,
  getPlayerHeroes,
} from 'actions';
import {
  playerMatches,
  playerHeroes,
} from 'reducers';
import Table, {
  TableContainer,
} from 'components/Table';
import {
  TableFilterForm,
} from 'components/Form';
import playerMatchesColumns from 'components/Player/Pages/Matches/playerMatchesColumns';
import {
  playerHeroesOverviewColumns,
} from 'components/Player/Pages/Heroes/playerHeroesColumns';
import styles from './Overview.css';

const getPlayerMatchesAndHeroes = (playerId, options) => (dispatch) => {
  dispatch(getPlayerMatches(playerId, options));
  dispatch(getPlayerHeroes(playerId, options));
};

const Overview = ({
  playerId,
  matchesData,
  heroesData,
}) => (
  <div>
    <TableFilterForm submitAction={getPlayerMatchesAndHeroes} id={playerId} page="overview" />
    <div className={styles.overviewContainer}>
      <TableContainer title={strings.heading_matches} style={{ width: '70%' }}>
        <Table paginated sorted columns={playerMatchesColumns} data={matchesData} />
      </TableContainer>
      <TableContainer title={strings.heading_heroes} style={{ marginLeft: 30, width: '30%' }}>
        <Table sorted columns={playerHeroesOverviewColumns} data={heroesData} />
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
  heroesData: playerHeroes.getHeroList(state, playerId).slice(0, 20),
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: playerId => dispatch(getPlayerHeroes(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
