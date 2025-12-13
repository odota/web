import React from "react";
import { connect } from "react-redux";
import { getHeroDurations } from "../../actions";
import { HistogramGraph } from "../Visualizations";
import DurationsSkeleton from "../Skeletons/DurationsSkeleton";

class Durations extends React.Component<{
  match: {
    params: {
      heroId: string;
    };
  };
  onGetHeroDurations: (heroId: string) => Promise<any>;
  isLoading: boolean;
  data: {
    duration_bin: number;
    games_played: number;
    wins: number;
  }[];
  strings: Strings;
}> {
  componentDidMount() {
    const { onGetHeroDurations, match } = this.props;

    if (match.params && match.params.heroId) {
      onGetHeroDurations(match.params.heroId);
    }
  }

  render() {
    const { isLoading, data, strings } = this.props;

    if (isLoading) {
      return <DurationsSkeleton />;
    }

    const result = data
      .map((item) => ({
        win: item.wins,
        games: item.games_played,
        x: item.duration_bin / 60,
      }))
      .sort((a, b) => a.x - b.x);

    return (
      <div>
        <HistogramGraph
          columns={result}
          xAxisLabel={strings.hero_duration_x_axis}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetHeroDurations: getHeroDurations,
};

const mapStateToProps = ({ app }: any) => ({
  isLoading: app.heroDurations.loading,
  data: Object.values(app.heroDurations.data) as any[],
  strings: app.strings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Durations);
