import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPlayerCounts } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import playerCountsColumns from './playerCountsColumns';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledTableContainer = styled.div`
  flex-grow: 1;
  overflow-x: auto;
  box-sizing: border-box;
  padding: 5px;
`;

const Counts = ({
  counts, error, loading, strings,
}) => (
  <StyledContainer>
    {Object.keys(counts).map(key => (
      <StyledTableContainer key={key}>
        <Container title={strings[`heading_${key}`]} error={error} loading={loading}>
          <Table columns={playerCountsColumns(strings)} data={counts[key].list} />
        </Container>
      </StyledTableContainer>
    ))}
  </StyledContainer>
);

Counts.propTypes = {
  counts: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array,
  ]),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerCounts(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.playerId !== prevProps.playerId || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
    }
  }

  render() {
    return (
      <Counts {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  counts: state.app.playerCounts.data,
  error: state.app.playerCounts.error,
  loading: state.app.playerCounts.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerCounts: (playerId, options) => dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
