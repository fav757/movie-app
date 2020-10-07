import React from 'react';
import styles from './Poster.module.scss';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import { Link } from 'react-router-dom';
import noPoster from './noPoster.png';

function Poster({ data }) {
  const posterImg = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  const showType = data.first_air_date ? 'tv' : 'movie';
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Link
      to={`/${showType}?id=${data.id}`}
      className={styles.container}
      onClick={handleClick}
    >
      <i className={'fas fa-spinner ' + styles.spinner}></i>
      <img
        loading='lazy'
        className={styles.poster}
        src={data.poster_path ? posterImg : noPoster}
        alt='poster'
      />
      <div className={styles.desriptionWrap}>
        <div className={styles.desription}>
          <h3>{data.title || data.name}</h3>
          <p>
            {(data.release_date || data.first_air_date || 'xxxx').slice(0, 4)}
          </p>
          <b>
            {(data.genre_ids || [])
              .map((ganre) => ganresIdDatabase[ganre])
              .join(', ')}
          </b>
          <p>{data.overview}</p>
        </div>
      </div>
    </Link>
  );
}

export default Poster;
