import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './FilmPage.module.scss';

const initialPage = {
  backdrop_path: null,
  poster_path: null,
  title: 'Film title',
  adult: false,
  release_date: new Date().toLocaleDateString(),
  genres: [{ name: 'loading' }],
};

function FilmPage() {
  const [details, setDeatails] = useState(initialPage);

  const showType = window.location.href.match(/(?<=#)[^?]+/)[0];
  const showId = window.location.href.match(/(?<=\?id=)[0-9]+/)[0];

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/${showType}/${showId}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`
        );
        const response = await request.json();
        response.backdrop_path = `linear-gradient(to right, rgba(24, 28, 29, 1), rgba(24, 28, 29, 0.75)),
          url('https://image.tmdb.org/t/p/original${response.backdrop_path}`;
        setDeatails(response);
      } catch (e) {
        console.log(e);
      }
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
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={details.homepage}
            >
              {details.title || details.name}
            </a>
            <span>
              (
              {new Date(
                details.release_date || details.first_air_date
              ).getFullYear()}
              )
            </span>
          </h2>
          <div className={styles.facts}>
            <i
              className={'fas fa-baby ' + (details.adult ? styles.adult : null)}
              title={details.adult ? 'Only for adults' : 'For all ages'}
            ></i>
            {showType === 'tv' ? (
              <span>
                {details.first_air_date} - {details.last_air_date}
              </span>
            ) : (
              <span>{details.release_date}</span>
            )}
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
