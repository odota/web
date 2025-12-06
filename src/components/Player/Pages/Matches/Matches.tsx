import React from 'react';

import { connect } from 'react-redux';
import { getPlayerMatches } from '../../../../actions';
import Table from '../../../Table/Table';
import Container from '../../../Container/Container';
import playerMatchesColumns from './playerMatchesColumns';
import useStrings from '../../../../hooks/useStrings.hook';

const Matches = ({ data, error, loading }: MatchesProps) => {
  const strings = useStrings();
  return (
    <Container title={strings.heading_matches} error={error} loading={loading}>
      <Table
        paginated
        columns={playerMatchesColumns(strings, true)}
        data={data}
      />
    </Container>
  );
};

type MatchesProps = {
  data: any[];
  error: string;
  loading: boolean;
  getPlayerMatches: Function;
  location: {
    key?: string;
    search?: string;
  };
  playerId: string;
};

const getData = (props: MatchesProps) => {
  props.getPlayerMatches(props.playerId, props.location.search);
};

class MatchesPage extends React.Component<MatchesProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: MatchesProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Matches {...this.props} />;
  }
}

const defaultOptions = {
  limit: null,
};

const mapStateToProps = (state: any) => ({
  data: state.app.playerMatches.data,
  loading: state.app.playerMatches.loading,
  error: state.app.playerMatches.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerMatches: (playerId: string, options = defaultOptions) =>
    dispatch(getPlayerMatches(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage);
