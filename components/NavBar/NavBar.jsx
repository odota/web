import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import styles from './NavBar.css';
import { openMenu } from '../../actions';
import constants from '../../constants';

const navLinks = Object.keys(constants.navbar_pages).map(
  (key) => ({ path: `/${key}`, name: constants.navbar_pages[key].name })
);

const NavBar = ({ loading, error, links = navLinks, toggleMenu }) => {
  const getNavLinks = (navLinks) =>
    navLinks.map((link, index) => (
      <Link key={index} to={link.path} onTouchTap={toggleMenu}>
        <li className={styles.listItem}>
          {link.name}
        </li>
        <Divider />
      </Link>
    ));

  return (
    <div>
      {loading && !error && <Spinner />}
      {error && <Error />}
      {!loading && !error && getNavLinks(links)}
    </div>
  );
};

export default connect(null, { toggleMenu: openMenu })(NavBar);
