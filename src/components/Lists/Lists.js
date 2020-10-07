import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../globalState';
import styles from './Lists.module.scss';
import PostersGrid from '../PostersGrid/PostersGrid';

function Lists() {
  const { state } = useContext(GlobalState);
  const location = useLocation();

  const category = location.search.slice(1) || 'favorite';
  state[category].forEach((id) => {
    console.log(id);
  });

  return (
    <div className={styles.container}>
      <h1>Select the list you want to explore</h1>
      <div className={styles.lists}>
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
        <PostersGrid />
      </div>
    </div>
  );
}

export default Lists;
