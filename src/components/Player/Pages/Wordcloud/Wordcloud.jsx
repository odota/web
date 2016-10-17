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
import Heading from 'components/Heading';
import Wordcloud from 'components/Wordcloud';
import strings from 'lang';
import { TableFilterForm } from 'components/Form';
// import { Row, Col } from 'react-flexbox-grid';

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
      <TableFilterForm submitAction={getPlayerWordcloud} id={this.props.playerId} />
      <Heading title={strings.heading_wordcloud} />
      <Heading title={strings.heading_wordcloud_said} />
      <Wordcloud counts={this.props.data.my_word_counts} />
      <Heading title={strings.heading_wordcloud_read} />
      <Wordcloud counts={this.props.data.all_word_counts} />
    </div>);
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
  getPlayerWordcloud: playerId => dispatch(getPlayerWordcloud(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
