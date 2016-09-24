import { connect } from 'react-redux';
import { openMenu } from 'actions';
import Header from './Header';

const mapDispatchToProps = (dispatch) => ({
  openMenu: () => dispatch(openMenu()),
});

export default connect(null, mapDispatchToProps)(Header);
