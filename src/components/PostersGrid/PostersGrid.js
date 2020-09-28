import React, { useEffect, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';

function PostersGrid() {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [postersStyle, setPostersStyle] = useState(styles.posters);

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=09ecd60e9326551324881d2239a8f12a`
        );
        const response = await request.json();
        console.log(response.results[0]);
        const films = response.results.map((film) => (
          <Poster key={film.id} data={film} />
        ));
        setTrandingFilms(films);
      } catch (e) {
        setTrandingFilms(<h3>Can't load films</h3>);
        setPostersStyle(styles.canNotLoad);
      }
    })();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.tranding}>
        <h2>Trending now</h2>
        <div className={postersStyle}>{trandingFilms}</div>
      </div>
    </section>
  );
}

export default PostersGrid;
