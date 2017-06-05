import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayerWordcloud,
} from 'actions';
import Container from 'components/Container';
import Wordcloud from 'components/Wordcloud';
import strings from 'lang';

const getData = (props) => {
  props.getPlayerWordcloud(props.playerId, props.location.search);
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

const mapStateToProps = state => ({
  data: state.app.playerWordcloud.data,
  loading: state.app.playerWordcloud.loading,
  error: state.app.playerWordcloud.error,
});

const mapDispatchToProps = dispatch => ({
  getPlayerWordcloud: (playerId, options) => dispatch(getPlayerWordcloud(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
