import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PlayerStatsCard } from './Styled';
import constants from '../../constants';
import config from '../../../config';

const shouldShow = props => props.loggedInId && props.loggedInId !== props.playerId;

const getData = (props, context) => {
  if (shouldShow(props)) {
    fetch(`${config.VITE_API_HOST}/api/players/${props.loggedInId}/wl?included_account_id=${props.playerId}`)
      .then(resp => resp.json())
      .then(json => context.setState({ ...context.state, ...json }));
  }
};

const inlineStyle = { display: 'inline' };

class PlayedWith extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    loggedInId: PropTypes.string,
    strings: PropTypes.shape({}),
  }

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    getData(this.props, this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.playerId !== prevProps.playerId) {
      getData(this.props, this);
    }
  }
  render() {
    const { strings } = this.props;
    return (
      <div style={{ display: shouldShow(this.props) ? 'inline' : 'none', marginLeft: '10px' }}>
        <PlayerStatsCard
          subtitle={
            <div>
              <div style={{ ...inlineStyle, color: constants.colorGreen }}>{this.state.win}</div>
              <div style={inlineStyle}> - </div>
              <div style={{ ...inlineStyle, color: constants.colorRed }}>{this.state.lose}</div>
            </div>
        }
          title={<Link to={`/players/${this.props.loggedInId}/matches?included_account_id=${this.props.playerId}`}>{strings.th_played_with}</Link>}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayedWith);
