import React from 'react';
import Logotype from '../Logotype/Logotype';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Logotype />
        <input
          id={styles.burgerCheckbox}
          className={styles.burgerCheckbox}
          type="checkbox"
        />
        <label htmlFor={styles.burgerCheckbox} className={styles.burger}>
          <i className="fas fa-bars" />
        </label>
        <div className={styles.menu}>
          <Navigation />
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
