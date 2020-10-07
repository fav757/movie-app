import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Lists.module.scss';

function Lists() {
  return (
    <div className={styles.container}>
      <div className={styles.lists}>
        <h1>Select the list you want to explore</h1>
        <div className={styles.controls}>
          <Link
            to={{ search: 'favorite' }}
            className={styles.icon + ' fas fa-heart'}
          ></Link>
          <Link
            to={{ search: 'watched' }}
            className={styles.icon + ' fas fa-check'}
          ></Link>
          <Link
            to={{ search: 'later' }}
            className={styles.icon + ' fas fa-clock'}
          ></Link>
        </div>
      </div>
    </div>
  );
}

export default Lists;
