import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerCounts,
} from 'actions';
import { deSnake } from 'utility';
import { playerCounts } from 'reducers';
import Table, { TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import playerCountsColumns from './playerCountsColumns';
import styles from './Counts.css';

const Counts = ({ playerId, counts, getPlayerCounts }) => (
  <div>
    <TableFilterForm submitAction={getPlayerCounts} id={playerId} page="counts" />
    <div className={styles.countsContainer}>
      {Object.keys(counts).map((key, index) => (
        <div key={index} className={styles.countTable}>
          <TableContainer title={deSnake(key)} />
          <Table paginated sorted columns={playerCountsColumns} data={counts[key].list} />
        </div>
      ))}
    </div>
  </div>
);

const getData = (props) => {
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

const mapStateToProps = (state, { playerId }) => ({
  counts: playerCounts.getOnlyData(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerCounts: (playerId, options) => dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
