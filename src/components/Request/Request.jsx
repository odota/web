import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { requestSubmit, setMatchId } from 'actions';

const Request = ({ error, matchId, loading, progress, dispatchRequest, dispatchMatchId }) => {
  function submit() {
    dispatchRequest(matchId);
    dispatchMatchId('');
  }
  const progressIndicator = (progress ?
    <CircularProgress value={progress} mode="determinate" /> :
      <CircularProgress value={progress} mode="indeterminate" />);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Request a Parse</h1>
      <TextField
        id="match_id"
        floatingLabelText="Match ID"
        errorText={error ? 'Failed to get match data.' : false}
        value={matchId}
        onChange={e => dispatchMatchId(e.target.value)}
      />
      {loading ? progressIndicator : <RaisedButton label="Submit" onClick={submit} />}
    </div>
  );
};

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
