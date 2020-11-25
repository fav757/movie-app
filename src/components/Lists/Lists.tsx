import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './Lists.module.scss';
import PostersGrid from '../PostersGrid/PostersGrid';

interface ListsInterface {
  lists: Record<string, string[]>;
}

const Lists: React.FC<ListsInterface> = ({ lists }) => {
  const [links, setLinks] = useState<string[]>([]);

  const location = useLocation();
  const category = location.search.slice(1) || 'favorite';

  useEffect(() => {
    const data = lists[category].map((element: string) => {
      const [id, type] = element.split(' ');
      return `https://api.themoviedb.org/3/${type}/${id}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`;
    });
    setLinks(data);
  }, [lists, category]);

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

const mapStateToProps = (state: Record<string, any>) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(Lists);
