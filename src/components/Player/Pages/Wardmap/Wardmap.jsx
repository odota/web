import React from 'react';
import { connect } from 'react-redux';
import { getPlayerWardmap } from 'actions';
import { playerWardmap } from 'reducers';
import Heading from 'components/Heading';

const getData = (props) => {
  props.getPlayerWardmap(props.playerId);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(nextProps);
    }
  }

  render() {
    return (<div>
      <Heading title="Wardmap" />
      {JSON.stringify(this.props.data)}
    </div>);
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerWardmap.getPlayerWardmapById(state, playerId),
  loading: playerWardmap.getLoading(state, playerId),
  error: playerWardmap.getError(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerWardmap: playerId => dispatch(getPlayerWardmap(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
