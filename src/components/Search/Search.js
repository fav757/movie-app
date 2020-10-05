import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Search.module.scss';

function Search() {
  const [searchQuery, setSearchQuery] = useState(null);

  const handlePress = ({ key, target }) => {
    if (key === 'Enter') {
      setSearchQuery(target.value);
    }
  };

  return searchQuery ? (
    <Redirect to={'/search?' + searchQuery} />
  ) : (
    <div className={styles.container}>
      <i className={styles.icon + ' fas fa-search'}></i>
      <input
        onKeyPress={handlePress}
        className={styles.input}
        placeholder='What do you whant to find?'
      />
    </div>
  );
}

export default Search;
