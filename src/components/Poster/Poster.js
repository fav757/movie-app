import React from 'react';
import styles from './Poster.module.scss';

function Poster({ data }) {
  const posterImg = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  const handleLoad = ({ target }) =>
    target.parentElement.classList.toggle(styles.loaded);

  return (
    <div className={styles.container}>
      <i className={'fas fa-spinner ' + styles.spinner}></i>
      <img
        onLoad={handleLoad}
        className={styles.poster}
        src={posterImg}
        alt='poster'
      />
    </div>
  );
}

export default Poster;
