import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { CircularProgress } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { postRequest } from '../../actions/requestActions';

type RequestProps = {
  dispatchPostRequest: Function,
  progress: number,
  error: string,
  loading: boolean,
  strings: Strings,
};

class Request extends React.Component<RequestProps, { matchId: string }> {
  constructor(props: RequestProps) {
    super(props);
    this.state = { matchId: window.location.hash.slice(1) };
  }

  componentDidMount() {
    if (this.state.matchId) {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    const { dispatchPostRequest } = this.props;
    dispatchPostRequest(this.state.matchId);
  };

  render() {
    const { progress, error, loading, strings } = this.props;
    const progressIndicator = progress ? (
      <CircularProgress value={progress} variant="determinate" />
    ) : (
      <CircularProgress value={progress} variant="indeterminate" />
    );
    return (
      <div style={{ textAlign: 'center' }}>
        <Helmet title={strings.title_request} />
        <h1>{strings.request_title}</h1>
        <TextField
          id="match_id"
          label={strings.request_match_id}
          error={Boolean(error)}
          helperText={error && !loading ? strings.request_error : false}
          value={this.state.matchId}
          onChange={(e) => this.setState({ matchId: e.target.value })}
        />
        <div style={{ marginTop: '8px' }}>
          {loading ? (
            progressIndicator
          ) : (
            <Button
              variant="contained"
              onClick={this.handleSubmit}
            >{strings.request_submit}</Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { error, loading, progress } = state.app.request;
  return {
    error,
    loading,
    progress,
    strings: state.app.strings,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchPostRequest: (matchId: string) => dispatch(postRequest(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
