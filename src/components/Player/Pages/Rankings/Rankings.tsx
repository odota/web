import React from "react";
import { connect } from "react-redux";
import { getPlayerRankings } from "../../../../actions";
import Table from "../../../Table/Table";
import Container from "../../../Container/Container";
import playerRankingsColumns from "./playerRankingsColumns";
import useStrings from "../../../../hooks/useStrings.hook";

const Rankings = ({ data, error, loading }: RankingsProps) => {
  const strings = useStrings();
  return (
    <div>
      <Container
        title={strings.heading_rankings}
        subtitle={strings.rankings_description}
        error={error}
        loading={loading}
      >
        <Table
          columns={playerRankingsColumns(strings)}
          data={data}
          placeholderMessage={strings.rankings_none}
        />
      </Container>
    </div>
  );
};

type RankingsProps = {
  data: any[];
  error: string;
  loading: boolean;
  getPlayerRankings: Function;
  playerId: string;
  location: {
    key?: string;
    search?: string;
  };
};

const getData = (props: RankingsProps) => {
  props.getPlayerRankings(props.playerId, props.location.search);
};

class RankingsPage extends React.Component<RankingsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: RankingsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(prevProps);
    }
  }

  render() {
    return <Rankings {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerRankings.data,
  error: state.app.playerRankings.error,
  loading: state.app.playerRankings.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerRankings: (playerId: string, options: any) =>
    dispatch(getPlayerRankings(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingsPage);
