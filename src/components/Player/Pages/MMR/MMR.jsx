import React from 'react';
import { connect } from 'react-redux';
import { MMRGraph } from 'components/Visualizations';
import { getPlayerMMR } from 'actions';
import { playerMMR } from 'reducers';
import strings from 'lang';
import Heading from 'components/Heading';

const MMR = ({ columns }) => (
  <div style={{ fontSize: 10 }}>
    <Heading title={strings.heading_mmr} />
    <MMRGraph columns={columns} />
  </div>
);

const getData = (props) => {
  props.getPlayerMMR(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.accountId !== nextProps.accountId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <MMR {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  columns: playerMMR.getList(state, playerId),
  loading: playerMMR.getLoading(state, playerId),
  error: playerMMR.getError(state, playerId),
});

export default connect(mapStateToProps, { getPlayerMMR })(RequestLayer);
