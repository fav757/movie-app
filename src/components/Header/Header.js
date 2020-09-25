import React from 'react';
import Logotype from '../Logotype/Logotype';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logotype />
        <Navigation />
        <Search />
      </div>
    </header>
  );
}

export default Header;
