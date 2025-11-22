import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getOrdinal, transformations } from '../../utility';
import { getPlayers } from '../../actions';
import Heading from '../Heading';
import Table, { TableLink } from '../Table';
import { RankTierMedal } from '../Player/Header/PlayerHeader';
import { Link } from 'react-router-dom';

const columns = (strings: Strings) => [
  {
    displayName: strings.th_rank,
    displayFn: (row: any, col: number, field: any, index: number) =>
      getOrdinal(index + 1),
  },
  {
    displayName: strings.th_avatar,
    field: 'personaname',
    displayFn: (row: any) =>
      transformations.player({
        ...row,
        last_played:
          row.last_match_time && Number(new Date(row.last_match_time)) / 1000,
      }),
  },
  {
    displayName: strings.th_rank,
    field: 'rank_tier',
    sortFn: true,
    displayFn: (row: any, col: number, field: any) => (
      <div style={{ zoom: 0.5 }}>
        {
          <RankTierMedal
            rankTier={field}
            leaderboardRank={row.leaderboard_rank}
          />
        }
      </div>
    ),
  },
  {
    displayName: strings.th_rating,
    field: 'computed_mmr',
    sortFn: true,
    relativeBars: true,
    displayFn: (row: any, col: number, field: any) => Math.floor(field),
  },
  {
    displayName: strings.th_result,
    field: 'match_id',
    displayFn: (row: any, col: number, field: any) => (
      <>
        <Link to={'/matches/' + row.match_id}>{row.match_id}</Link>
        {row.delta && (
          <span
            style={{ color: row.delta > 0 ? 'green' : 'red' }}
          >{` (${row.delta > 0 ? '+' : '-'}${row.delta.toFixed(1)})`}</span>
        )}
      </>
    ),
  },
];

interface RequestLayerProps {
  dispatchPlayers: () => void;
  data: any[];
  loading: boolean;
  strings: any;
}

class RequestLayer extends React.Component<RequestLayerProps> {
  componentDidMount() {
    this.props.dispatchPlayers();
  }

  render() {
    const { strings, data, loading } = this.props;

    return (
      <div>
        <Helmet title={strings.header_players} />
        <Heading title={strings.heading_players} className="top-heading" />
        <Table columns={columns(strings)} data={data} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.players.data,
  loading: state.app.players.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchPlayers: () => dispatch(getPlayers()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RequestLayer);
