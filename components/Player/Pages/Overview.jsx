import React from 'react';
import { connect } from 'react-redux';
import { createTable } from '../../Table';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
  getPlayerHeroes,
  setPlayerHeroesSort,
} from '../../../actions';
import { playerMatchesColumns, playerHeroesOverviewColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from '../../../selectors';
import { playerMatches, playerHeroes } from '../../../reducers';
import { Text } from '../../Text';
import { Card } from 'material-ui/Card';
import styles from './Overview.css';

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);
const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId)(state) : transformPlayerHeroesById(playerId)(state)),
  setPlayerHeroesSort
);

const Overview = ({ playerId }) => (
  <div className={styles.overviewContainer}>
    <div className={styles.overviewMatches}>
      <Text className={styles.tableHeading}>RECENT MATCHES</Text>
      <Card className={styles.card}>
        <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
      </Card>
    </div>
    <div className={styles.overviewHeroes}>
      <div className={styles.heroesContainer}>
        <Text className={styles.tableHeading}>HERO STATS</Text>
        <Card className={styles.card}>
          <PlayerHeroesTable columns={playerHeroesOverviewColumns} id={playerId} numRows={20} />
        </Card>
      </div>
    </div>
  </div>
);

const getData = props => {
  props.getPlayerMatches(props.playerId, 20);
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

const mapDispatchToProps = (dispatch) => ({
  getPlayerMatches: (playerId, numMatches) => dispatch(getPlayerMatches(playerId, numMatches)),
  getPlayerHeroes: (playerId) => dispatch(getPlayerHeroes(playerId)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
