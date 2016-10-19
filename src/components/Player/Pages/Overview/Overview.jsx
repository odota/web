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

const MAX_OVERVIEW_ROWS = 20;

const Overview = ({
  matchesData,
  heroesData,
}) => (
  <div>
    <TableFilterForm />
    <div className={styles.overviewContainer}>
      <TableContainer
        title={strings.heading_matches}
        className={styles.matchesTableContainer}
      >
        <Table
          columns={playerMatchesColumns}
          data={matchesData}
          maxRows={MAX_OVERVIEW_ROWS}
        />
      </TableContainer>
      <TableContainer
        title={strings.heading_heroes}
        className={styles.heroesTableContainer}
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
  props.getPlayerMatches(props.playerId, { ...props.location.query, limit: MAX_OVERVIEW_ROWS });
  props.getPlayerHeroes(props.playerId, props.location.query);
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
    return <Overview {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  matchesData: playerMatches.getMatchList(state, playerId),
  heroesData: playerHeroes.getHeroList(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options) => dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
