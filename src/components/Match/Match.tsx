import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { List } from 'react-content-loader';
import TabbedContent from '../TabbedContent';
import { getMatch } from '../../actions';
import MatchHeader from './MatchHeader/MatchHeader';
import matchPages from './matchPages';
import FourOhFour from '../../components/FourOhFour/FourOhFour';

type MatchProps = {
  loading: boolean,
  error: boolean,
  matchData: Match,
  match: {
    params: {
      info?: string,
    },
  },
  user: any,
  getMatch: Function,
  matchId: string,
  strings: Strings,
};

class RequestLayer extends React.Component<MatchProps> {
  componentDidMount() {
    this.props.getMatch(this.props.matchId);
  }

  componentDidUpdate(prevProps: MatchProps) {
    if (this.props.matchId !== prevProps.matchId) {
      this.props.getMatch(this.props.matchId);
    }
  }

  render() {
    const { loading, matchId, matchData, error, strings, match, user } =
      this.props;
    const info = match.params.info || 'overview';
    const page = matchPages(matchId, null, strings).find(
      (_page) => _page.key.toLowerCase() === info,
    );
    const pageTitle = page ? `${matchId} - ${page.name}` : matchId;
    if (error && !loading) {
      return <FourOhFour msg={strings.request_invalid_match_id} />;
    }
    return loading ? (
      <List primaryColor="#666" width={250} height={120} />
    ) : (
      <div>
        <Helmet title={pageTitle} />
        <MatchHeader match={matchData} />
        <TabbedContent
          info={info}
          tabs={matchPages(matchId, matchData, strings)}
          match={matchData}
          content={page && page.content(matchData)}
          skeleton={page && page.skeleton}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  matchData: state.app.match.data,
  loading: state.app.match.loading,
  error: state.app.match.error,
  user: state.app.metadata.data.user,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMatch: (matchId: string) => dispatch(getMatch(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
