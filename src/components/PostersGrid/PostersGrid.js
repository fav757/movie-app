import React, { useEffect, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';

function PostersGrid({
  requestLink = 'https://api.themoviedb.org/3/trending/all/day?api_key=09ecd60e9326551324881d2239a8f12a',
  header = 'Trending now',
}) {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [postersStyle, setPostersStyle] = useState(styles.posters);

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(requestLink);
        const response = await request.json();

        if (!response.results.length) {
          throw new Error('Films array is empty!');
        }
        response.results.sort((a, b) => (a.vote_count < b.vote_count ? 1 : -1));

        const films = response.results.map((film) => (
          <Poster key={film.id} data={film} />
        ));

        setTrandingFilms(films);
      } catch (e) {
        console.log(e);
        setPostersStyle(styles.canNotLoad);
        setTrandingFilms(
          <h3>
            <span role='img' aria-label='crying emoji'>
              😢
            </span>{' '}
            Looks like we can't find films you were looking for.
          </h3>
        );
      }
    })();
  }, [requestLink]);

  return (
    <section className={styles.container}>
      <div className={styles.tranding}>
        <h2>{header}</h2>
        <div className={postersStyle}>{trandingFilms}</div>
      </div>
    </section>
  );
}

export default PostersGrid;
