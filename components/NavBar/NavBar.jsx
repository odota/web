import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { REDUCER_KEY } from '../../reducers';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import styles from './NavBar.css';

const NavBar = ({ loading, error, links }) => {
  const getNavLinks = (navLinks) =>
    navLinks.map((link, index) => (
      <div key={index}>
        <li className={styles.listItem}>
          <Link to={link.path}>{link.name}</Link>
        </li>
        <Divider />
      </div>
    ));

  return (
    <div>
      {loading && !error && <Spinner />}
      {error && <Error />}
      {!loading && !error && getNavLinks(links)}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, error, links } = state[REDUCER_KEY].gotConstants;

  return {
    loading,
    error,
    links,
  };
};

export default connect(mapStateToProps, null)(NavBar);
