import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { postRequest } from '../../actions/requestActions';

class Request extends React.Component {
  static propTypes = {
    dispatchPostRequest: PropTypes.func,
    progress: PropTypes.number,
    error: PropTypes.string,
    loading: PropTypes.bool,
    strings: PropTypes.shape({}),
  }

  constructor() {
    super();
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
    const {
      progress, error, loading, strings,
    } = this.props;
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
          errorText={error && !loading ? strings.request_error : false}
          value={this.state.matchId}
          onChange={e => this.setState({ matchId: e.target.value })}
        />
        <div>{loading ? progressIndicator : <RaisedButton label={strings.request_submit} onClick={this.handleSubmit} />}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { error, loading, progress } = state.app.request;
  return {
    error,
    loading,
    progress,
    strings: state.app.strings,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchPostRequest: matchId => dispatch(postRequest(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
