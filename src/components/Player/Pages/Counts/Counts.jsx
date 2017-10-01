import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPlayerCounts,
} from 'actions';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import playerCountsColumns from './playerCountsColumns';
import styles from './Counts.css';

const Counts = ({ counts, error, loading }) => (
  <div className={styles.countsContainer}>
    {Object.keys(counts).map((key, index) => (
      <div key={index} className={styles.countTable}>
        <Container title={strings[`heading_${key}`]} error={error} loading={loading}>
          <Table columns={playerCountsColumns} data={counts[key].list} />
        </Container>
      </div>
    ))}
  </div>
);

Counts.propTypes = {
  counts: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  error: PropTypes.string,
  loading: PropTypes.bool,
};

const getData = (props) => {
  props.getPlayerCounts(props.playerId, props.location.search);
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
    return (
      <Counts {...this.props} />
    );
  }
}

RequestLayer.propTypes = {
  playerId: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  counts: state.app.playerCounts.data,
  error: state.app.playerCounts.error,
  loading: state.app.playerCounts.loading,
});

const mapDispatchToProps = dispatch => ({
  getPlayerCounts: (playerId, options) => dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
