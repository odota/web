import React from 'react';
import fetch from 'isomorphic-fetch';
import { API_HOST } from '../../yasp.config';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

function jsonResponse(response) {
  return response.json();
}

class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      replay_blob: null,
      match_id: window.location.hash.slice(1) || 0,
      progress: 0,
      error: '',
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  }
  handleChange(event) {
    this.setState(Object.assign({}, this.state, {
      match_id: event.target.value,
    }));
  }
  handleSubmit() {
    let checker;
    // const grecaptcha = grecaptcha;

    function showError(data) {
      this.setState(Object.assign({}, this.state, { isLoading: false, error: data }));
      clearInterval(checker);
      // grecaptcha.reset();
    }

    function poll(jobId) {
      fetch(`${API_HOST}/api/request_job?id=${jobId}`).then(jsonResponse).then((json) => {
        if (json.state === 'completed') {
          window.history.pushState(`/matches/${(json.data.payload.replay_blob_key || json.data.payload.match_id)}`);
        } else if (json.error) {
          showError(json.error);
        } else if (json.state === 'failed') {
          showError('Failed to parse replay.  Please make sure the replay is available in client and has not expired.');
        } else if (json.progress) {
          this.setState(Object.assign({}, this.state, { progress: json.progress }));
        }
      });
    }

    this.setState(Object.assign({}, this.state, { isLoading: true }));
    fetch(`${API_HOST}/api/request_job`, {
      method: 'post',
      headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        match_id: this.state.match_id,
        replay_blob: this.state.replay_blob,
      }),
    }).then(jsonResponse).then((json) => {
      if (json.error) {
        this.showError(json.error);
      } else {
        checker = setInterval(() => {
          poll(json.job.jobId);
        }, 2000);
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Request a Parse</h1>
        <TextField
          id="match_id"
          floatingLabelText="Match ID"
          value={this.state.match_id}
          onChange={this.handleChange}
        />
        <ul>
          <li>Only works for public matches with replay available in client</li>
        </ul>
        <div>{this.state.error}</div>
        {this.state.isLoading ? <CircularProgress value={this.state.progress} /> : <RaisedButton label="Submit" onClick={this.handleSubmit} />}
      </div>);
  }
}

export default Request;

/*
  script(src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit",async,defer)
  //script(src="/socket.io/socket.io.js")
  script.
    requestForm();
    var onloadCallback = function()
    {
        grecaptcha.render('recaptcha',
        {
            sitekey: $('#recaptcha').attr('data-sitekey'),
            theme: "dark",
            callback: requestSubmit
        });
    };
          <g-recaptcha id="recaptcha"data-sitekey="6LekswATAAAAAKXO0shvsAXPFNjYBaVcKTuS4TFi" data-theme="dark" data-callback="requestSubmit">
      </g-recaptcha>
      <p className="lead">OR</p>
      <span id="file-select-button" class="btn btn-block btn-primary btn-file"/>
      <span id="file-select-text">Select Replay File</span>
      <input id="file-select" type="file" name="replay_blob" class="form-control" />
      <ul>
         <li>Uploads have incomplete data and eventually expire</li>
         <li>Uploads do not count toward player statistics</li>
      </ul>
*/
