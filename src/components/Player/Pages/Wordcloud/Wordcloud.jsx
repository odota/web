import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlayerWordcloud } from '../../../../actions';
import Container from '../../../Container';
import Wordcloud from '../../../Wordcloud';

const getData = (props) => {
  props.getPlayerWordcloud(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool,
    data: PropTypes.shape({}),
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
    const {
      error, loading, data, strings,
    } = this.props;
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
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerWordcloud: (playerId, options) => dispatch(getPlayerWordcloud(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
