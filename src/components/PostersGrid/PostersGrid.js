import React, { useEffect, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';

function PostersGrid({ requestLink, header }) {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [postersStyle, setPostersStyle] = useState(styles.posters);

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(requestLink);
        const response = await request.json();
        const films = response.results.map((film) => (
          <Poster key={film.id} data={film} />
        ));
        setTrandingFilms(films);
      } catch (e) {
        setTrandingFilms(
          <h3>
            <span role='img' aria-label='crying emoji'>
              😢
            </span>{' '}
            Can't load films. Sorry, for displaying this page. Please, try to
            reload the site.
          </h3>
        );
        setPostersStyle(styles.canNotLoad);
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
