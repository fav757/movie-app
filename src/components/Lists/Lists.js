import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../globalState';
import styles from './Lists.module.scss';
import PostersGrid from '../PostersGrid/PostersGrid';

function Lists() {
  const { state } = useContext(GlobalState);
  const [films, setFilms] = useState([]);
  const location = useLocation();

  const category = location.search.slice(1) || 'favorite';
  const requests = [];
  const responses = [];

  state[category].forEach((element) => {
    const [id, type] = element.split(' ');
    requests.push(
      fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`
      )
    );
  });

  Promise.all(requests)
    .then((result) =>
      result.forEach((element) => responses.push(element.json()))
    )
    .then(() =>
      Promise.all(responses)
        .then((results) => results.forEach((element) => films.push(element)))
        .then(() => setFilms(films))
    );

  return (
    <div className={styles.container}>
      <h1>Select the list you want to explore</h1>
      <div className={styles.lists}>
        <div className={styles.controls}>
          <Link
            to={{ search: 'favorite' }}
            className={styles.icon + ' fas fa-heart'}
          ></Link>
          <Link
            to={{ search: 'watched' }}
            className={styles.icon + ' fas fa-check'}
          ></Link>
          <Link
            to={{ search: 'later' }}
            className={styles.icon + ' fas fa-clock'}
          ></Link>
        </div>
        <PostersGrid header={category} filmsList={films} />
      </div>
    </div>
  );
}

export default Lists;
