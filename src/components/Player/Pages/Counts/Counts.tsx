import React from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPlayerCounts } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import playerCountsColumns from './playerCountsColumns';
import useStrings from '../../../../hooks/useStrings.hook';

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

const Counts = ({ counts, error, loading }: CountsProps) => {
  const strings = useStrings();
  return (
    <StyledContainer>
      {Object.keys(counts).map((key) => (
        <StyledTableContainer key={key}>
          <Container
            title={strings[`heading_${key}` as keyof Strings]}
            error={error}
            loading={loading}
          >
            <Table
              columns={playerCountsColumns(strings)}
              data={counts[key].list}
            />
          </Container>
        </StyledTableContainer>
      ))}
    </StyledContainer>
  );
};

type CountsProps = {
  counts: Record<string, any>;
  error: string;
  loading: boolean;
  getPlayerCounts: Function;
  playerId: string;
  location: {
    key?: string;
    search?: string;
  };
};

const getData = (props: CountsProps) => {
  props.getPlayerCounts(props.playerId, props.location.search);
};

class RequestLayer extends React.Component<CountsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: CountsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Counts {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  counts: state.app.playerCounts.data,
  error: state.app.playerCounts.error,
  loading: state.app.playerCounts.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerCounts: (playerId: string, options: any) =>
    dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
