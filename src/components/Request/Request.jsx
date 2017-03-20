import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { requestSubmit, setMatchId } from 'actions';
import strings from 'lang';

class Request extends React.Component {
  componentWillMount() {
    this.props.dispatchMatchId(window.location.hash.slice(1));
  }

  render() {
    const { progress, error, loading, matchId, dispatchMatchId, dispatchRequest } = this.props;
    function submit() {
      dispatchRequest(matchId);
      dispatchMatchId('');
    }
    const progressIndicator = (progress ?
      <CircularProgress value={progress} mode="determinate" /> :
      <CircularProgress value={progress} mode="indeterminate" />);
    return (
      <div style={{ textAlign: 'center' }}>
        <Helmet title={strings.title_request} />
        <h1>{strings.request_title}</h1>
        <TextField
          id="match_id"
          floatingLabelText={strings.request_match_id}
          errorText={error ? strings.request_error : false}
          value={matchId}
          onChange={e => dispatchMatchId(e.target.value)}
        />
        <div>{loading ? progressIndicator : <RaisedButton label={strings.request_submit} onClick={submit} />}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { error, matchId, loading, progress } = state.app.request;
  return {
    error,
    matchId,
    loading,
    progress,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchRequest: matchId => dispatch(requestSubmit(matchId)),
  dispatchMatchId: matchId => dispatch(setMatchId(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
