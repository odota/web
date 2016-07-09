import React from 'react';
import { connect } from 'react-redux';
import { createTable } from '../../Table';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
} from '../../../actions';
import { playerMatchesColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
} from '../../../selectors';
import { playerMatches } from '../../../reducers';
import { Text } from '../../Text';
import { Card } from 'material-ui/Card';
import styles from './Matches.css';

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);

const Matches = ({ playerId }) => (
  <div>
    <Text className={styles.tableHeading}>RECENT MATCHES</Text>
    <Card className={styles.card}>
      <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
    </Card>
  </div>
);

const getData = props => {
  props.getPlayerMatches(props.playerId, 50);
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

const mapDispatchToProps = (dispatch) => ({
  getPlayerMatches: (playerId, numMatches) => dispatch(getPlayerMatches(playerId, numMatches)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
