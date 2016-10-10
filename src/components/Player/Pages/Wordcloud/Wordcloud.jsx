import React from 'react';
import { connect } from 'react-redux';
import { getPlayerWordcloud } from 'actions';
import { playerWordcloud } from 'reducers';
import Heading from 'components/Heading';

const getData = (props) => {
  props.getPlayerWordcloud(props.playerId);
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
      <Heading title="Wordcloud" />
      {JSON.stringify(this.props.data)}
    </div>);
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerWordcloud.getPlayerWordcloudById(state, playerId),
  loading: playerWordcloud.getLoading(state, playerId),
  error: playerWordcloud.getError(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerWordcloud: playerId => dispatch(getPlayerWordcloud(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
