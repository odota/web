import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TabbedContent from '../TabbedContent/TabbedContent';
import { getMatch } from '../../actions';
import MatchHeader from './MatchHeader/MatchHeader';
import matchPages from './matchPages';
import FourOhFour from '../../components/FourOhFour/FourOhFour';
import ErrorBox from '../Error/ErrorBox';
import Spinner from '../Spinner/Spinner';

type MatchProps = {
  loading: boolean;
  error: string;
  matchData: Match;
  match: {
    params: {
      info?: string;
    };
  };
  user: any;
  getMatch: Function;
  matchId: string;
  strings: Strings;
  beta: boolean;
};

class MatchPage extends React.Component<MatchProps> {
  componentDidMount() {
    this.props.getMatch(this.props.matchId);
  }

  componentDidUpdate(prevProps: MatchProps) {
    if (this.props.matchId !== prevProps.matchId) {
      this.props.getMatch(this.props.matchId);
    }
  }

  render() {
    const { loading, matchId, matchData, error, strings, match, user, beta } =
      this.props;
    const info = match.params.info || 'overview';
    const page = matchPages(matchId, null, strings, beta).find(
      (_page) => _page.key.toLowerCase() === info,
    );
    const pageTitle = page ? `${matchId} - ${page.name}` : matchId;
    // Server error or rate limit
    if (String(error) === '429' || String(error) === '500') {
      return <ErrorBox text={error} />;
    }
    // Can't find the match
    if (error && !loading) {
      return <FourOhFour msg={strings.request_invalid_match_id} />;
    }
    return loading ? (
      <Spinner />
    ) : (
      <div>
        <Helmet title={pageTitle} />
        <MatchHeader match={matchData} />
        <TabbedContent
          info={info}
          tabs={matchPages(matchId, matchData, strings)}
          matchData={matchData}
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
  beta: state.app.metadata.data.beta,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMatch: (matchId: string) => dispatch(getMatch(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchPage);
