import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MMRGraph } from '../../../Visualizations';
import { getPlayerMmr } from '../../../../actions';
import Container from '../../../Container';
import Info from '../../../Alerts/Info';

const MMRInfo = strings => (
  <Info>
    <a href="https://blog.opendota.com/2016/01/13/opendota-mmr-and-you/" target="_blank" rel="noopener noreferrer">
      {strings.mmr_not_up_to_date}
    </a>
  </Info>);

const MMR = ({
  columns, error, loading, strings,
}) => (
  <div>
    <Container title={strings.heading_mmr} subtitle={MMRInfo(strings)} error={error} loading={loading}>
      <MMRGraph columns={columns} />
    </Container>
  </div>
);

MMR.propTypes = {
  columns: PropTypes.arrayOf({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};


const getData = (props) => {
  props.getPlayerMmr(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    playerId: PropTypes.string,
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.playerId !== prevProps.playerId || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
    }
  }

  render() {
    return <MMR {...this.props} />;
  }
}


const mapStateToProps = state => ({
  columns: state.app.playerMmr.data,
  loading: state.app.playerMmr.loading,
  error: state.app.playerMmr.error,
  strings: state.app.strings,
});

export default connect(mapStateToProps, { getPlayerMmr })(RequestLayer);
