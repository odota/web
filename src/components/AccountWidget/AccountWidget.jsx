import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import { getPlayer } from '../../actions';
import strings from '../../lang';
import { IconSteam } from '../Icons';
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

const AccountWidget = ({
  loading, error, user, style,
}) => (
  <div style={style}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user
      ? <LoggedIn style={style} playerId={user.account_id} />
      :
      <IconButtonLink href={`${process.env.REACT_APP_API_HOST}/login`}>
        <IconSteam />
        {strings.app_login}
      </IconButtonLink>
    }
  </div>
);

AccountWidget.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.shape({}),
  style: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { error, loading, data } = state.app.metadata;
  return {
    loading,
    error,
    user: data.user,
  };
};

function RequestLayer(props) {
  return <AccountWidget {...props} />;
}

/*
const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
});


class RequestLayer extends React.Component {
  UNSAFE_componentWillUpdate() {
  }

  render() {
    return <AccountWidget {...this.props} />;
  }
}
*/

export default connect(mapStateToProps, null)(RequestLayer);
