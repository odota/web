import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { REDUCER_KEY } from '../../reducers';
import { Link } from 'react-router';

const NavBar = ({ loading, error, links }) => {
  const getNavLinks = (links) => {
    return (
      links.map((link, index) => (
        <li key={index}>
          <Link to={'/'+link}>{link.name}</Link>
        </li>
      ))
    );
  };

  return (
    <div>
      { loading && !error && <Spinner /> }
      { error && <div>Error</div> }
      { !loading && !error && getNavLinks(links) }
    </div>
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
