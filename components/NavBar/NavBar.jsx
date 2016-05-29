import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { REDUCER_KEY } from '../../reducers';
import { Link } from 'react-router';

const NavBar = ({ loading, error, links }) => {
  const getNavLinks = (navLinks) =>
    navLinks.map((link, index) => (
      <li key={index}>
        <Link to={link.path}>{link.name}</Link>
      </li>
    ));

  return (
    <menu>
      {loading && !error && <Spinner />}
      {error && <li>Error</li>}
      {!loading && !error && getNavLinks(links)}
    </menu>
  );
};

const mapStateToProps = (state) => {
  const { loading, error, links } = state[REDUCER_KEY].gotMetadata;

  return {
    loading,
    error,
    links
  };
};

export default connect(mapStateToProps, null)(NavBar);
