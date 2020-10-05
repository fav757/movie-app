import React, { useEffect, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';
import { useLocation } from 'react-router-dom';

function PostersGrid() {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [postersStyle, setPostersStyle] = useState(styles.posters);
  const location = useLocation();

  let requestLink, header;
  switch (location.pathname) {
    case '/home/tv-top': {
      header = 'Top rated tv series';
      requestLink =
        'https://api.themoviedb.org/3/tv/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1';
      break;
    }
    case '/home/movie-top': {
      header = 'Top rated movies';
      requestLink =
        'https://api.themoviedb.org/3/movie/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1';
      break;
    }
    case '/home/tranding':
    default: {
      header = 'Tranding';
      requestLink =
        'https://api.themoviedb.org/3/trending/all/day?api_key=09ecd60e9326551324881d2239a8f12a';
      break;
    }
  }

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
