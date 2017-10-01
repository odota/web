/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
// import { getPlayer } from 'actions';
import strings from 'lang';
import { IconSteam } from 'components/Icons';
import styled from 'styled-components';
import Spinner from '../Spinner';
import Error from '../Error';
import LoggedIn from './LoggedIn';

const IconButtonLink = styled.a`
  padding: 0 !important;
  height: auto !important;
  width: auto !important;

  & svg:hover {
    opacity: 1;
  }

  &[data-hint-position="bottom"] {
    &::before {
      bottom: -9px;
      left: 8px;
    }

    &::after {
      margin-top: 9px;
    }
  }
`;

const AccountWidget = ({ loading, error, user, style }) => (
  <div style={style}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user
      ? <LoggedIn playerId={user.account_id} />
      : <IconButtonLink href={`${API_HOST}/login`}>
        <IconSteam />
        {strings.app_login}
      </IconButtonLink>
    }
  </div>
);

const mapStateToProps = (state) => {
  const { error, loading, data } = state.app.metadata;
  return {
    loading,
    error,
    user: data.user,
  };
};

/*
const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
});
*/

class RequestLayer extends React.Component {
  componentWillUpdate() {
  }

  render() {
    return <AccountWidget {...this.props} />;
  }
}

export default connect(mapStateToProps, null)(RequestLayer);
