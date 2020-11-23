import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  return (
    <ul className={styles.list}>
      <li>
        <NavLink to="/home/trending" activeClassName={styles.activeLink}>
          Trending
        </NavLink>
      </li>
      <li>
        <NavLink to="/home/movie-top" activeClassName={styles.activeLink}>
          Top films
        </NavLink>
      </li>
      <li>
        <NavLink to="/home/tv-top" activeClassName={styles.activeLink}>
          Top tv
        </NavLink>
      </li>
      <li>
        <NavLink to="/lists" activeClassName={styles.activeLink}>
          My lists
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;