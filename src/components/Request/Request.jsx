import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { requestSubmit, setMatchId } from 'actions';

// TODO localize strings
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
        <Helmet title="Request a Parse" />
        <h1>Request a Parse</h1>
        <TextField
          id="match_id"
          floatingLabelText="Match ID"
          errorText={error ? 'Failed to get match data' : false}
          value={matchId}
          onChange={e => dispatchMatchId(e.target.value)}
        />
        <div>{loading ? progressIndicator : <RaisedButton style={{ }} label="Submit" onClick={submit} />}</div>
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
