import React from 'react';

import { connect } from 'react-redux';
import ActivityCalendar from './ActivityCalendar';
import { getPlayerMatches } from '../../../../actions';
import Container from '../../../Container';
import useStrings from '../../../../hooks/useStrings.hook';

const defaultOptions = {
  limit: null,
};

const Activity = ({ error, loading, data }: ActivityProps) => {
  const strings = useStrings();
  return <Container
    title={strings.tab_activity}
    subtitle={strings.activity_subtitle}
    error={error}
    loading={loading}
  >
    <ActivityCalendar strings={strings} data={data} />
  </Container>
};

const getData = (props: ActivityProps) => {
  props.getPlayerMatches(props.playerId, props.location.search);
};

type ActivityProps = {
  playerId:string,
  location: {
    key: string,
    search?: string,
  },
  getPlayerMatches: Function,
  error: string,
  loading: boolean,
  data: any[],
};

class RequestLayer extends React.Component<ActivityProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: ActivityProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Activity {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerMatches.data,
  loading: state.app.playerMatches.loading,
  error: state.app.playerMatches.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerMatches: (playerId: string, options = defaultOptions) =>
    dispatch(getPlayerMatches(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
