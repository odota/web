import React from 'react';
import { string, shape, func, bool, arrayOf, number } from 'prop-types';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { getHeroDurations } from '../../actions';
import { HistogramGraph } from '../Visualizations';

const DurationsSkeleton = props => (
  <ContentLoader
    height={200}
    width={500}
    primaryColor="#371b68"
    secondaryColor="#371b68"
    animate={false}
    {...props}
  >
    <rect x="150" y="50" rx="5" ry="5" width="5" height="100" />
    <rect x="160" y="45" rx="5" ry="5" width="5" height="105" />
    <rect x="170" y="41" rx="5" ry="5" width="5" height="109" />
    <rect x="180" y="37" rx="5" ry="5" width="5" height="113" />
    <rect x="190" y="33" rx="5" ry="5" width="5" height="117" />
    <rect x="200" y="29" rx="5" ry="5" width="5" height="121" />
    <rect x="210" y="25" rx="5" ry="5" width="5" height="125" />
    <rect x="220" y="21" rx="5" ry="5" width="5" height="129" />
    <rect x="230" y="18" rx="5" ry="5" width="5" height="132" />
    <rect x="240" y="15" rx="5" ry="5" width="5" height="135" />
    <rect x="250" y="14" rx="5" ry="5" width="5" height="136" />
    <rect x="260" y="14" rx="5" ry="5" width="5" height="136" />
    <rect x="270" y="15" rx="5" ry="5" width="5" height="135" />
    <rect x="280" y="18" rx="5" ry="5" width="5" height="132" />
    <rect x="290" y="21" rx="5" ry="5" width="5" height="129" />
    <rect x="300" y="25" rx="5" ry="5" width="5" height="125" />
    <rect x="310" y="29" rx="5" ry="5" width="5" height="121" />
    <rect x="320" y="33" rx="5" ry="5" width="5" height="117" />
    <rect x="330" y="37" rx="5" ry="5" width="5" height="113" />
    <rect x="340" y="41" rx="5" ry="5" width="5" height="109" />
    <rect x="350" y="45" rx="5" ry="5" width="5" height="105" />
  </ContentLoader>
);

class Durations extends React.Component {
  static propTypes = {
    match: shape({
      params: shape({
        heroId: string,
      }),
    }),
    onGetHeroDurations: func,
    isLoading: bool,
    data: arrayOf(shape({
      duration_bin: number,
      gamed_played: number,
      wins: number,
    })),
    strings: shape({}),
  }

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

    const result = data.map(item => ({
      win: item.wins,
      games: item.games_played,
      x: (item.duration_bin / 60),
    })).sort((a, b) => a.x - b.x);

    return (
      <div>
        <HistogramGraph columns={result} xAxisLabel={strings.hero_duration_x_axis} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetHeroDurations: getHeroDurations,
};

const mapStateToProps = ({ app }) => ({
  isLoading: app.heroDurations.loading,
  data: Object.values(app.heroDurations.data),
  strings: app.strings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Durations);
