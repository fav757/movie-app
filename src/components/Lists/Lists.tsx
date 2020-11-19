import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../globalState';
import styles from './Lists.module.scss';
import PostersGrid from '../PostersGrid/PostersGrid';

const Lists: React.FC = () => {
  const { state } = useContext(GlobalState);
  const [links, setLinks] = useState([] as string[]);

  const location = useLocation();
  const category = location.search.slice(1) || 'favorite';

  useEffect(() => {
    const data = [...state[category]].map((element: string) => {
      const [id, type] = element.split(' ');
      return `https://api.themoviedb.org/3/${type}/${id}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`;
    });
    setLinks(data);
  }, [state, category]);

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
        <PostersGrid header={category} requestLink={links} />
      </div>
    </div>
  );
};

export default Lists;
