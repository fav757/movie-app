import React, { useEffect, useState } from 'react';
import styles from './CastRow.module.scss';
import ActorCard, { Actor } from '../ActorCard/ActorCard';
import { getUrl, loadData } from '../../api/movieDB/movieDB';

interface CastRowInterface {
  filmId: number;
  showType: string;
}

const CastRow: React.FC<CastRowInterface> = ({ filmId, showType }) => {
  const [people, setPeople] = useState({ cast: [] as Array<Actor> });

  useEffect(() => {
    loadData(
      getUrl([showType, filmId.toString(), 'credits']),
      setPeople as (data: unknown) => void,
    );
  }, [filmId, showType]);

  const castCards =
    people.cast &&
    people.cast.map((actor) => <ActorCard key={actor.name} actor={actor} />);

  return (
    <div className={styles.container}>
      <div className={styles.cast}>
        <h2>Cast</h2>
        <div className={styles.row}>
          {people.cast ? castCards : 'No information about the cast'}
        </div>
      </div>
    </div>
  );
};

export default CastRow;
