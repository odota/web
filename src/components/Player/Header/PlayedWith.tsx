import React from 'react';
import querystring from 'querystring';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PlayerStatsCard } from './Styled';
import constants from '../../constants';
import config from '../../../config';
import { paramsWithTurbo } from '../../../utility.js';

const shouldShow = (props: PlayedWithProps) =>
  props.loggedInId && props.loggedInId !== props.playerId;

const getData = (props: PlayedWithProps, context: any) => {
  if (shouldShow(props)) {
    const params = { included_account_id: props.playerId };
    fetch(
      `${config.VITE_API_HOST}/api/players/${props.loggedInId}/wl?${querystring.stringify(paramsWithTurbo(params))}`,
    )
      .then((resp) => resp.json())
      .then((json) => context.setState({ ...context.state, ...json }));
  }
};

const inlineStyle = { display: 'inline' };

type PlayedWithProps = {
  playerId: string,
  loggedInId: string,
  strings: Strings,
};

class PlayedWith extends React.Component<PlayedWithProps, { win: number, lose: number }> {
  constructor(props: PlayedWithProps) {
    super(props);
  }

  componentDidMount() {
    getData(this.props, this);
  }

  componentDidUpdate(prevProps: PlayedWithProps) {
    if (this.props.playerId !== prevProps.playerId) {
      getData(this.props, this);
    }
  }
  render() {
    const { strings } = this.props;
    return (
      <div
        style={{
          display: shouldShow(this.props) ? 'inline' : 'none',
          marginLeft: '10px',
        }}
      >
        <PlayerStatsCard
          subtitle={
            <div>
              <div style={{ ...inlineStyle, color: constants.colorGreen }}>
                {this.state.win}
              </div>
              <div style={inlineStyle}> - </div>
              <div style={{ ...inlineStyle, color: constants.colorRed }}>
                {this.state.lose}
              </div>
            </div>
          }
          title={
            <Link
              to={`/players/${this.props.loggedInId}/matches?included_account_id=${this.props.playerId}`}
            >
              {strings.th_played_with}
            </Link>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayedWith);
