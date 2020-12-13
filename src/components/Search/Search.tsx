import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Search.module.scss';

const Search: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [needToRedirect, setNeedToRedirect] = useState(false);

  const handlePress = useCallback(
    ({ key }) => {
      if (key === 'Enter' && searchQuery) {
        setNeedToRedirect(true);
        closeModal();
      }
    },
    [searchQuery],
  );

  const handleClick = useCallback(() => {
    if (!searchQuery) return;
    setNeedToRedirect(true);
    closeModal();
  }, [searchQuery]);

  const handleChange = useCallback(({ target }) => {
    setSearchQuery((target as HTMLInputElement).value);
  }, []);

  useEffect(() => {
    if (needToRedirect) {
      setNeedToRedirect(false);
    }
  }, [needToRedirect]);

  return (
    <div className={styles.container}>
      <button
        type="button"
        aria-label="search button"
        onClick={handleClick}
        className={`${styles.icon} fas fa-search`}
      />
      <input
        onKeyPress={handlePress}
        onChange={handleChange}
        className={styles.input}
        placeholder="What do you whant to find?"
      />
      {needToRedirect && <Redirect to={`/search?${searchQuery}`} />}
    </div>
  );
};

export default Search;
