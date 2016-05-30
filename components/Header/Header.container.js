import { connect } from 'react-redux';
import Header from './Header';
import { openMenu } from '../../actions';

const mapDispatchToProps = (dispatch) => ({
  openMenu: () => dispatch(openMenu()),
});

export default connect(null, mapDispatchToProps)(Header);
