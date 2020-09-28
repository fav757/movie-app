import React, { useEffect, useState } from 'react';
import styles from './FilmPage.module.scss';

const initialPage = {
  backdrop_path: null,
  poster_path: null,
  title: 'Film title',
  adult: false,
  release_date: new Date().toLocaleDateString(),
  genres: [{ name: 'loading' }],
};

function FilmPage({ id }) {
  const [details, setDeatails] = useState(initialPage);

  useEffect(() => {
    (async function () {
      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`
      );
      const response = await request.json();
      console.log(response);
      response.backdrop_path = `linear-gradient(to right, rgba(24, 28, 29, 1), rgba(24, 28, 29, 0.75)),
        url('https://image.tmdb.org/t/p/original${response.backdrop_path}`;
      setDeatails(response);
    })();
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: details.backdrop_path,
      }}
    >
      <div className={styles.filmPage}>
        <div className={styles.posterContainer}>
          <img
            src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
            alt='poster'
          />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>
            <a target='_blank' href={details.homepage}>
              {details.title || details.name}
            </a>
            <span> ({new Date(details.release_date).getFullYear()})</span>
          </h2>
          <div className={styles.facts}>
            <i
              className={'fas fa-baby ' + (details.adult ? styles.adult : null)}
              title={details.adult ? 'Only for adults' : 'For all ages'}
            ></i>
            <span>{details.release_date}</span>
            <span>{details.genres.map((ganre) => ganre.name).join(', ')}</span>
            <span>{details.runtime} minutes</span>
          </div>
          <div className={styles.tagline}>
            {details.tagline || 'Description:'}
          </div>
          <div>{details.overview}</div>
        </div>
      </div>
    </div>
  );
}

export default FilmPage;
