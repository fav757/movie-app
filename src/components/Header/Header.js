import React from 'react';
import Logotype from '../Logotype/Logotype';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logotype />
      </div>
    </header>
  );
}

export default Header;
