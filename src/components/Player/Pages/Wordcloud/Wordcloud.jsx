import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayerWordcloud,
} from 'actions';
import {
  playerWordcloud,
} from 'reducers';
import Container from 'components/Container';
import Wordcloud from 'components/Wordcloud';
import strings from 'lang';

const getData = (props) => {
  props.getPlayerWordcloud(props.playerId, props.location.query);
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
    const { error, loading, data } = this.props;
    return (
      <div>
        <Container title={strings.heading_wordcloud_said} error={error} loading={loading}>
          <Wordcloud counts={data.my_word_counts} />
        </Container>
        <Container title={strings.heading_wordcloud_read} error={error} loading={loading}>
          <Wordcloud counts={data.all_word_counts} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, {
  playerId,
}) => ({
  data: playerWordcloud.getPlayerWordcloud(state, playerId),
  loading: playerWordcloud.getLoading(state, playerId),
  error: playerWordcloud.getError(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerWordcloud: (playerId, options) => dispatch(getPlayerWordcloud(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
