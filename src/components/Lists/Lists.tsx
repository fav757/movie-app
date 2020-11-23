import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../globalState';
import styles from './Lists.module.scss';
import PostersGrid from '../PostersGrid/PostersGrid';

const Lists: React.FC = () => {
  const { state } = useContext(GlobalState) as any;
  const [films, setFilms] = useState([] as Record<string, unknown>[]);

  const location = useLocation();
  const category = location.search.slice(1) || 'favorite';

  useEffect(() => {
    (async () => {
      try {
        const requests = [] as Promise<Response>[];
        state[category].forEach((element: string) => {
          const [id, type] = element.split(' ');
          requests.push(
            fetch(
              `https://api.themoviedb.org/3/${type}/${id}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`,
            ),
          );
        });
        const responses = await Promise.all(requests);
        const jsons = responses.map((element) => element.json());
        const data = await Promise.all(jsons);
        setFilms(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [category, state]);

  return (
    <div className={styles.container}>
      <h1>Select the list you want to explore</h1>
      <div className={styles.lists}>
        <div className={styles.controls}>
          <Link
            title="favorite"
            to={{ search: 'favorite' }}
            className={`${styles.icon} fas fa-heart`}
          />
          <Link
            title="watched"
            to={{ search: 'watched' }}
            className={`${styles.icon} fas fa-check`}
          />
          <Link
            title="later"
            to={{ search: 'later' }}
            className={`${styles.icon} fas fa-clock`}
          />
        </div>
        <PostersGrid header={category} filmsList={films} />
      </div>
    </div>
  );
};

export default Lists;