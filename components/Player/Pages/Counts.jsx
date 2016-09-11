import React from 'react';
import { connect } from 'react-redux';
import { createTables } from '../../Table';
import {
  getPlayerCounts,
  setPlayerCountsSort,
} from '../../../actions';
import playerCountsColumns from './playerCountsColumns';
import {
  sortPlayerCounts,
  transformPlayerCountsById,
} from '../../../selectors';
import { playerCounts } from '../../../reducers';
import { TableFilterForm } from '../../Form';
import styles from './Counts.css';

const Counts = ({ playerId, tables }) => (
  <div>
    <TableFilterForm submitAction={getPlayerCounts} id={playerId} page="counts" />
    <div className={styles.countsContainer}>
      {tables.map((Table, index) => (
        <div key={index} className={index % 2 === 0 ? styles.countTableLeft : styles.countTableRight}>
          {Table}
        </div>
      ))}
    </div>
  </div>
);

const getData = props => {
  props.getPlayerCounts(props.playerId);
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
    return <Counts {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  tables: createTables(
    playerCounts.getPlayerCountsById(state, ownProps.playerId),
    playerCountsColumns,
    ownProps.playerId
  )(
    playerCounts,
    // (state, sortState, playerId) => playerCounts.getPlayerCountsById(state, playerId),
    listName => (state, sortState, playerId) => (sortState ?
      sortPlayerCounts(listName)(playerId)(state) :
      transformPlayerCountsById(listName)(playerId)(state)),
    listName => setPlayerCountsSort(listName)
  ),
});

const mapDispatchToProps = (dispatch) => ({
  getPlayerCounts: (playerId, options) => dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
