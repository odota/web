import React from 'react';
import { API_HOST } from '../../yasp.config';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { requestStart, setMatchId } from '../../actions';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';

const Request = ({error, match_id, loading, progress, dispatchRequest, dispatchMatchId }) => {
    return (
      <div>
        <h1>Request a Parse</h1>
        <TextField
          id="match_id"
          floatingLabelText="Match ID"
          value={match_id}
          onChange={e => dispatchMatchId(e)}
        />
        <div className="subText">Only works for public matches with replay available in client</div>
        <div>{error}</div>
        {loading ? <CircularProgress value={progress} /> : <RaisedButton label="Submit" onClick={dispatchRequest} />}
      </div>);
};

const mapStateToProps = (state) => {
  const { error, match_id, loading, progress } = state[REDUCER_KEY].request;
  return {
    error,
    match_id,
    loading,
    progress,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchRequest: () => dispatch(requestStart),
  dispatchMatchId: (match_id) => dispatch(setMatchId(match_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);