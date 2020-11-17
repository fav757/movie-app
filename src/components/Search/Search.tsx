import React, { KeyboardEventHandler, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlePress: KeyboardEventHandler = ({ key, target }) => {
    if (key === 'Enter') {
      setSearchQuery((target as HTMLInputElement).value);
    }
  };

  return (
    <div className={styles.container}>
      <i className={`${styles.icon} fas fa-search`} />
      <input
        onKeyPress={handlePress}
        className={styles.input}
        placeholder="What do you whant to find?"
      />
      {searchQuery ? <Redirect to={`/search?${searchQuery}`} /> : null}
    </div>
  );
};

export default Search;
