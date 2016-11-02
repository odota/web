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
import Table from 'components/Table';
import Container from 'components/Container';
import { TableFilterForm } from 'components/Form';
import playerMatchesColumns from 'components/Player/Pages/Matches/playerMatchesColumns';
import { playerHeroesOverviewColumns } from 'components/Player/Pages/Heroes/playerHeroesColumns';
import styles from './Overview.css';

const MAX_OVERVIEW_ROWS = 10;

const Overview = ({
  matchesData,
  matchesLoading,
  matchesError,
  heroesData,
  heroesLoading,
  heroesError,
}) => (
  <div>
    <TableFilterForm />
    <div className={styles.overviewContainer}>
      <Container
        title={strings.heading_matches}
        className={styles.matchesContainer}
        loading={matchesLoading}
        error={matchesError}
      >
        <Table
          columns={playerMatchesColumns}
          data={matchesData}
          maxRows={MAX_OVERVIEW_ROWS}
        />
      </Container>

      <Container
        title={strings.heading_heroes}
        className={styles.heroesContainer}
        loading={heroesLoading}
        error={heroesError}
      >
        <Table
          columns={playerHeroesOverviewColumns}
          data={heroesData}
          maxRows={MAX_OVERVIEW_ROWS}
        />
      </Container>
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
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Overview {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  matchesData: playerMatches.getMatchList(state, playerId),
  matchesLoading: playerMatches.getLoading(state, playerId),
  matchesError: playerMatches.getError(state, playerId),
  heroesData: playerHeroes.getHeroList(state, playerId),
  heroesLoading: playerHeroes.getLoading(state, playerId),
  heroesError: playerHeroes.getError(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options) => dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
