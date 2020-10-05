import React, { useEffect, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';
import { useLocation } from 'react-router-dom';

function PostersGrid() {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [postersStyle, setPostersStyle] = useState(styles.posters);
  const [page, setPage] = useState(1);
  const location = useLocation();
  console.log(location);

  const changePage = (reduce) => {
    setPage(() => {
      if (reduce) {
        return page + 1;
      } else {
        return page - 1 <= 0 ? 1 : page - 1;
      }
    });
  };

  let requestLink, header;
  switch (location.pathname) {
    case '/home/tv-top': {
      header = 'Top rated tv series';
      requestLink = `https://api.themoviedb.org/3/tv/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=${page}`;
      break;
    }
    case '/tv': {
      header = 'Similar tv series';
      requestLink = `https://api.themoviedb.org/3/tv/${location.search.slice(
        4
      )}/similar?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=${page}`;
      break;
    }
    case '/home/movie-top': {
      header = 'Top rated movies';
      requestLink = `https://api.themoviedb.org/3/movie/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=${page}`;
      break;
    }
    case '/movie': {
      header = 'Similar movies';
      requestLink = `https://api.themoviedb.org/3/movie/${location.search.slice(
        4
      )}/similar?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=${page}`;
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
  }, [requestLink, page]);

  return (
    <section className={styles.container}>
      <div className={styles.tranding}>
        <h2>{header}</h2>
        <div className={postersStyle}>{trandingFilms}</div>
        <div className={styles.pagesRow}>
          <i
            onClick={() => changePage(false)}
            className='fas fa-arrow-circle-left'
          ></i>
          <span>{page}</span>
          <i
            onClick={() => changePage(true)}
            className='fas fa-arrow-circle-right'
          ></i>
        </div>
      </div>
    </section>
  );
}

export default PostersGrid;
