import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { REDUCER_KEY } from '../../reducers';
import { getUser } from '../../actions';
import { Link } from 'react-router';

const AccountWidget = ({ loading, error, user }) => {
  return (
    <div>
      { loading && !error && <Spinner />}
      { error && <div >Error</div>}
      { !error && !loading && user ? (
          <div>
            <li><Link href={`/players/${user.account_id}`}>Profile</Link></li>
            <li><a href='/logout'>Logout</a></li>
          </div>
        )
        : <li><a href='/login'>Login</a></li>
      }
    </div>
  );
};

class AccountWidgetWrapper extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.userId);
  }

  render() {
    return <AccountWidget { ...this.props } />;
  }
};

export { AccountWidget };

const mapStateToProps = (state) => {
  const { error, loading, user } = state[REDUCER_KEY].gotUser;

  return {
    loading,
    error,
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(getUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountWidgetWrapper);
