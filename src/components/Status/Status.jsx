import React from 'react';
import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
// import Spinner from '../Spinner';

function jsonResponse(response) {
  return response.json();
}

class Status extends React.Component
{
  componentWillMount() {
    this.setState({
      loading: false,
      result: {},
    });
    fetch(`${API_HOST}/api/status`).then(jsonResponse).then(json => this.setState({ loading: false, result: json }));
  }
  render() {
    return (<pre>{JSON.stringify(this.state, null, 2)}</pre>);
  }
}

export default Status;
