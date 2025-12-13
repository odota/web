import React from "react";
import { connect } from "react-redux";
import { MMRGraph } from "../../../Visualizations";
import { getPlayerMmr } from "../../../../actions";
import Container from "../../../Container/Container";

const getData = (props: MMRProps) => {
  props.getPlayerMmr(props.playerId, props.location.search);
};

type MMRProps = {
  location: {
    key: string;
    search?: string;
  };
  playerId: string;
  columns: any[];
  loading: boolean;
  error: string;
  getPlayerMmr: Function;
  strings: Strings;
  currRank: number;
};

class MMRPage extends React.Component<MMRProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: MMRProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    const { strings, error, loading, columns, currRank } = this.props;
    const columnsToUse = !columns?.length
      ? [{ time: new Date().toISOString(), rank_tier: currRank }]
      : columns;
    return (
      <div>
        <Container title={strings.heading_mmr} error={error} loading={loading}>
          <MMRGraph columns={columnsToUse} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  columns: state.app.playerMmr.data,
  loading: state.app.playerMmr.loading,
  error: state.app.playerMmr.error,
  currRank: state.app.player.data.rank_tier,
  strings: state.app.strings,
});

export default connect(mapStateToProps, { getPlayerMmr })(MMRPage);
