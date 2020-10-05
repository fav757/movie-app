import React from 'react';
import styles from './Poster.module.scss';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import { Link } from 'react-router-dom';

function Poster({ data }) {
  const posterImg = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  const showType = data.first_air_date ? 'tv' : 'movie';

  return (
    <Link
      to={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        return `/${showType}?id=${data.id}`;
      }}
      className={styles.container}
    >
      <i className={'fas fa-spinner ' + styles.spinner}></i>
      <img
        loading='lazy'
        className={styles.poster}
        src={posterImg}
        alt='poster'
      />
      <div className={styles.desriptionWrap}>
        <div className={styles.desription}>
          <h3>{data.title || data.name}</h3>
          <p>{(data.release_date || data.first_air_date).slice(0, 4)}</p>
          <b>
            {data.genre_ids.map((ganre) => ganresIdDatabase[ganre]).join(', ')}
          </b>
          <p>{data.overview}</p>
        </div>
      </div>
    </Link>
  );
}

export default Poster;
