import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import styles from './NavBar.css';
import { openMenu } from '../../actions';
import constants from '../../constants';

const pages = {
  "request": {
    "name": "Request",
    "path": "/request"
  },
  "rankings": {
    "name": "Rankings",
    "path": "/rankings",
    "new-feature": true
  },
  "benchmarks": {
    "name": "Benchmarks",
    "path": "/benchmarks"
  },
  "distributions": {
    "name": "Distributions",
    "path": "/distributions"
  },
  "picks": {
    "name": "Picks",
    "path": "/picks"
  },
  "mmstats": {
    "name": "MMStats",
    "path": "/mmstats"
  },
  "carry": {
    "name": "Carry",
    "path": "/carry"
  },
  "search": {
    "name": "Search",
    "path": "/search"
  }
};

export default function NavBar({ toggleMenu })
{
    const links = Object.keys(pages).map((link, index) => (
      <Link key={index} to={pages[link].path} onTouchTap={toggleMenu}>
        <li className={styles.listItem}>
          {pages[link].name}
        </li>
        <Divider style={{ backgroundColor: styles.dividerColor }} />
      </Link>
      ));
    return (
    <div>
    { links }
    </div>
  );
}
