import React from 'react';
import styles from './Search.module.scss';

function Search() {
  return (
    <div className={styles.container}>
      <i className={styles.icon + ' fas fa-search'}></i>
      <input
        className={styles.input}
        placeholder='What do you whant to find?'
      />
      
    </div>
  );
}

export default Search;
