import React, { useEffect, useState } from 'react';
import styles from './CastRow.module.scss';
import avatarPlaceholder from './avatarPlaceholder.png';

function CastRow({ filmId, showType }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/${showType}/${filmId}/credits?api_key=09ecd60e9326551324881d2239a8f12a`
        );
        const response = await request.json();
        setCast(response.cast);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [filmId, showType]);

  const castCards = cast.map((actor) => {
    return (
      <div className={styles.actorCard} key={actor.name}>
        <div className={styles.spinnerContainer}>
          <i className={'fas fa-spinner ' + styles.spinner}></i>
        </div>
        <img
          loading='lazy'
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : avatarPlaceholder
          }
          alt='actor avatar'
        />
        <div className={styles.actorInfo}>
          <div>
            {actor.name}{' '}
            <i
              className={`fas fa-${actor.gender === 1 ? 'venus' : 'mars'}`}
            ></i>
          </div>
          <p>({actor.character})</p>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.cast}>
        <h2>Cast</h2>
        <div className={styles.row}>{castCards}</div>
      </div>
    </div>
  );
}

export default CastRow;
