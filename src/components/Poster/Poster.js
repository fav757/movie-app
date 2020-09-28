import React from 'react';
import styles from './Poster.module.scss';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';

function Poster({ data }) {
  console.log(data)
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
      <div className={styles.desriptionWrap}>
        <div className={styles.desription}>
          <h3>{data.title || data.name}</h3>
          <p>{data.release_date}</p>
          <b>
            {data.genre_ids.map((ganre) => ganresIdDatabase[ganre]).join(', ')}
          </b>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Poster;
