import React, { useEffect, useState } from 'react';
import styles from './CastRow.module.scss';
import ActorCard from '../ActorCard/ActorCard';
import useFetchData from '../../hooks/fetchData';

function CastRow({ filmId, showType }) {
  const [people, setPeople] = useState({ cast: [] });

  useFetchData(
    `https://api.themoviedb.org/3/${showType}/${filmId}/credits?api_key=09ecd60e9326551324881d2239a8f12a`,
    setPeople
  );

  const castCards = people.cast.map((actor) => (
    <ActorCard key={actor.name} actor={actor} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.cast}>
        <h2>Cast</h2>
        <div className={styles.row}>
          {castCards.length ? castCards : 'No information about the cast'}
        </div>
      </div>
    </div>
  );
}

export default CastRow;
