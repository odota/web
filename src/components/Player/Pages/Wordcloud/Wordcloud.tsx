import React from 'react';
import { connect } from 'react-redux';
import { getPlayerWordcloud } from '../../../../actions';
import Container from '../../../Container';
import Wordcloud from '../../../Wordcloud/Wordcloud';

type Props = {
  playerId: string;
  location: { key: string; search: any };
  error: string;
  loading: boolean;
  data: {
    my_word_counts: Record<string, number>;
    all_word_counts: Record<string, number>;
  };
  strings: Strings;
  getPlayerWordcloud: (playerId: string, params: any) => void;
};

const getData = (props: Props) => {
  props.getPlayerWordcloud(props.playerId, props.location.search);
};

class RequestLayer extends React.Component<Props> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    const { error, loading, data, strings } = this.props;
    return (
      <div>
        <Container
          title={strings.heading_wordcloud_said}
          error={error}
          loading={loading}
        >
          <Wordcloud counts={data.my_word_counts} />
        </Container>
        <Container
          title={strings.heading_wordcloud_read}
          error={error}
          loading={loading}
        >
          <Wordcloud counts={data.all_word_counts} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerWordcloud.data,
  loading: state.app.playerWordcloud.loading,
  error: state.app.playerWordcloud.error,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getPlayerWordcloud: (playerId: string, options: any) =>
    dispatch(getPlayerWordcloud(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
