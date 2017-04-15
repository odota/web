/* global API_HOST fetch */
import React from 'react';

const shouldShow = (props) => props.loggedInId && props.loggedInId !== props.playerId;

const getData = (props, context) => {
  if (shouldShow(props)) {
    fetch(`${API_HOST}/api/players/${props.loggedInId}/wl?included_account_id=${props.playerId}`)
    .then(resp => resp.json())
    .then(json => context.setState({...context.state, ...json}));
  }
};

class PlayedWith extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    getData(this.props, this);
  }
  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(nextProps, this);
    }
  }
  render () {
    return (<div style={{ display: shouldShow(this.props) ? 'block' : 'none'}}>
    <span>MY RECORD IN GAMES WITH THIS PLAYER: </span>
    <span>{this.state.win}</span>
    <span>-</span>
    <span>{this.state.lose}</span>
    </div>);
  }
}

export default PlayedWith;