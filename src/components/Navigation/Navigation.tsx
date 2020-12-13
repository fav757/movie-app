import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <ul className={styles.list}>
      <li>
        <NavLink
          to="/home/trending"
          onClick={closeModal}
          activeClassName={styles.activeLink}
        >
          Trending
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home/movie-top"
          onClick={closeModal}
          activeClassName={styles.activeLink}
        >
          Top films
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/home/tv-top"
          onClick={closeModal}
          activeClassName={styles.activeLink}
        >
          Top tv
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/lists"
          onClick={closeModal}
          activeClassName={styles.activeLink}
        >
          My lists
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
