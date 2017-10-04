import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPlayerCounts,
} from 'actions';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import styled from 'styled-components';
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

const Counts = ({ counts, error, loading }) => (
  <StyledContainer>
    {Object.keys(counts).map((key, index) => (
      <StyledTableContainer key={index}>
        <Container title={strings[`heading_${key}`]} error={error} loading={loading}>
          <Table columns={playerCountsColumns} data={counts[key].list} />
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
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
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
