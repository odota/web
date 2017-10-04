import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MMRGraph } from 'components/Visualizations';
import { getPlayerMmr } from 'actions';
import strings from 'lang';
import Container from 'components/Container';
import Info from 'components/Alerts/Info';

const MMRInfo = (<Info>
  <a href="https://blog.opendota.com/2016/01/13/opendota-mmr-and-you/" target="_blank" rel="noopener noreferrer">
    {strings.mmr_not_up_to_date}
  </a>
</Info>);

const MMR = ({ columns, error, loading }) => (
  <div style={{ fontSize: 10 }}>
    <Container title={strings.heading_mmr} subtitle={MMRInfo} error={error} loading={loading}>
      <MMRGraph columns={columns} />
    </Container>
  </div>
);

MMR.propTypes = {
  columns: PropTypes.arrayOf({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
};


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

RequestLayer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  playerId: PropTypes.string,
};


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
