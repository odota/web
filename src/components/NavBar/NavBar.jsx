import React from 'react';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import styles from './NavBar.css';
import navbarPages from '../Header/Pages';

export default function NavBar({ toggleMenu }) {
  const links = navbarPages.map((p, index) => (
    <Link key={index} to={p.path} onTouchTap={toggleMenu}>
      <li className={styles.listItem}>
        {p.name}
      </li>
      <Divider style={{ backgroundColor: styles.dividerColor }} />
    </Link>
    ));
  return (
    <div>
      {links}
    </div>
  );
}
