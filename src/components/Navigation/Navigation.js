import React from 'react';
import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <ul className={styles.list}>
      <li>Trend</li>
      <li>New</li>
      <li>My list</li>
    </ul>
  );
}

export default Navigation;
