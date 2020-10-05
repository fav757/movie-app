import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <ul className={styles.list}>
      <li>
        <NavLink to='/tranding' activeClassName={styles.activeLink}>
          Trending
        </NavLink>
      </li>
      <li>
        <NavLink to='/movie-top' activeClassName={styles.activeLink}>
          Top films
        </NavLink>
      </li>
      <li>
        <NavLink to='/tv-top' activeClassName={styles.activeLink}>
          Top tv
        </NavLink>
      </li>
      <li>
        <NavLink to='/list' activeClassName={styles.activeLink}>
          My list
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
