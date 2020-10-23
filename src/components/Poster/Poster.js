import React, { useState } from 'react';
import styles from './Poster.module.scss';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import { Link } from 'react-router-dom';
import noPoster from './noPoster.png';
import ControlRow from '../ControlRow/ControlRow';

function Poster({ data }) {
  const [displayControlRow, setDisplayControlRow] = useState(false);

  const posterImg = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  const showType = data.first_air_date || data.last_air_date ? 'tv' : 'movie';

  const handleContextMenu = (event) => {
    event.preventDefault();
    setDisplayControlRow(!displayControlRow);

    document.addEventListener(
      'click',
      (event) => {
        if (!event.target.closest(styles.container)) {
          setDisplayControlRow(false);
        }
      },
      { once: true }
    );
  };

  return (
    <Link
      to={`/${showType}?id=${data.id}`}
      className={styles.container}
      onContextMenu={handleContextMenu}
    >
      {displayControlRow && (
        <ControlRow name={data.id + ' ' + showType} isAbsolute={true} />
      )}
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
