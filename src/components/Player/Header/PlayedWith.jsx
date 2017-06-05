/* global API_HOST fetch */
import React from 'react';
import strings from 'lang';
import {
  CardTitle,
} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import playerStatsStyles from 'components/Player/Header/PlayerStats.css';

const shouldShow = props => props.loggedInId && props.loggedInId !== props.playerId;

const getData = (props, context) => {
  if (shouldShow(props)) {
    fetch(`${API_HOST}/api/players/${props.loggedInId}/wl?included_account_id=${props.playerId}`)
    .then(resp => resp.json())
    .then(json => context.setState({ ...context.state, ...json }));
  }
};

const inlineStyle = { display: 'inline' };

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
  render() {
    return (<div style={{ display: shouldShow(this.props) ? 'block' : 'none' }}>
      <CardTitle
        className={playerStatsStyles.playerStats}
        subtitle={
          <div>
            <div style={inlineStyle} className={playerStatsStyles.textSuccess}>{this.state.win}</div>
            <div style={inlineStyle} > - </div>
            <div style={inlineStyle} className={playerStatsStyles.textDanger}>{this.state.lose}</div>
          </div>
        }
        title={<Link to={`/players/${this.props.loggedInId}/matches?included_account_id=${this.props.playerId}`}>{strings.th_played_with}</Link>}
      />
    </div>);
  }
}

export default PlayedWith;
