import React, { useEffect, useState } from 'react';
import styles from './CastRow.module.scss';
import ActorCard from '../ActorCard/ActorCard';

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

  const castCards = cast.map((actor) => <ActorCard key={actor.name} actor={actor} />);

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
