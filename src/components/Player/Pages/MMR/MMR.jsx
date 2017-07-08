import React from 'react';
import { connect } from 'react-redux';
import { MMRGraph } from 'components/Visualizations';
import { getPlayerMmr } from 'actions';
import strings from 'lang';
import Container from 'components/Container';

const MMR = ({ columns, error, loading }) => (
  <div style={{ fontSize: 10 }}>
    <Container title={strings.heading_mmr} error={error} loading={loading}>
      <MMRGraph columns={columns} />
    </Container>
  </div>
);

const getData = (props) => {
  props.getPlayerMmr(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <MMR {...this.props} />;
  }
}

const mapStateToProps = state => ({
  columns: state.app.playerMmr.data.map(mmr => ({
    value: mmr.solo_competitive_rank,
    x: new Date(mmr.time),
    competitiveRank: mmr.competitive_rank,
  })),
  loading: state.app.playerMmr.loading,
  error: state.app.playerMmr.error,
});

export default connect(mapStateToProps, { getPlayerMmr })(RequestLayer);
