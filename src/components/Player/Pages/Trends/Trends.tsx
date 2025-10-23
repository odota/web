import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TrendGraph } from '../../../Visualizations';
import { getPlayerTrends } from '../../../../actions';
import ButtonGarden from '../../../ButtonGarden';
import trendNames from '../matchDataColumns';
import Heading from '../../../Heading';
import Container from '../../../Container';
import useStrings from '../../../../hooks/useStrings.hook';

const Trend = ({
  routeParams,
  columns,
  playerId,
  error,
  loading,
  history,
}: TrendsProps) => {
  const strings = useStrings();
  const selectedTrend = routeParams.subInfo || trendNames[0];
  return (
    <div>
      <Heading
        title={strings.trends_name}
        subtitle={strings.trends_description}
      />
      <ButtonGarden
        onClick={(buttonName: string) =>
          history.push(
            `/players/${playerId}/trends/${buttonName}${window.location.search}`,
          )
        }
        buttonNames={trendNames}
        selectedButton={selectedTrend}
      />
      <Container error={error} loading={loading}>
        <TrendGraph
          columns={columns}
          name={selectedTrend}
          // onClick={(p) => {
          //   const matchId = columns[p.index].match_id;
          //   history.push(`/matches/${matchId}`);
          // }}
        />
      </Container>
    </div>
  );
};

const getData = (props: TrendsProps) => {
  const trendName = props.routeParams.subInfo || trendNames[0];
  props.getPlayerTrends(props.playerId, props.location.search, trendName);
};

type TrendsProps = {
  playerId: string,
  routeParams: any,
  getPlayerTrends: Function,
  columns: any[],
  error: string,
  loading: boolean,
  trendName: string,
} & RouterProps;

class RequestLayer extends React.Component<TrendsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: TrendsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Trend {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  columns: state.app.playerTrends.data,
  loading: state.app.playerTrends.loading,
  error: state.app.playerTrends.error,
});

export default withRouter(
  connect(mapStateToProps, { getPlayerTrends })(RequestLayer),
);
