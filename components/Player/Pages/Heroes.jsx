import React from 'react';
import { connect } from 'react-redux';
import { createTable } from '../../Table';
import {
  getPlayerHeroes,
  setPlayerHeroesSort,
} from '../../../actions';
import { playerHeroesColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from '../../../selectors';
import { playerHeroes } from '../../../reducers';
import { Text } from '../../Text';
import { Card } from 'material-ui/Card';
import styles from './Heroes.css';

const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId)(state) : transformPlayerHeroesById(playerId)(state)),
  setPlayerHeroesSort
);

const Overview = ({ playerId }) => (
  <div>
    <div className={styles.heroesContainer}>
      <Text className={styles.tableHeading}>HERO STATS</Text>
      <Card className={styles.card}>
        <PlayerHeroesTable columns={playerHeroesColumns} id={playerId} />
      </Card>
    </div>
  </div>
);

const getData = props => {
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
  getPlayerHeroes: (playerId) => dispatch(getPlayerHeroes(playerId)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
