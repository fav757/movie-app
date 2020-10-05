import React, { useEffect, useState } from 'react';
import styles from './FilmBanner.module.scss';
import RatingLine from '../RatingLine/RatingLine';
import PopularityLine from '../PopularityLine/PopularityLine';
import FirmInfo from '../FirmInfo/FirmInfo';

const initialPage = {
  backdrop_path: `linear-gradient(to right, rgba(24, 28, 29, 1), rgba(24, 28, 29, 0.75))`,
  poster_path: null,
  title: 'Loading title',
  adult: false,
  release_date: '1337/02/28',
  genres: [{ name: 'loading genres' }],
  runtime: 'wait few',
  tagline: 'You will see content as soon as possible',
  first_air_date: '10',
  last_air_date: '30 seconds to wait',
  number_of_episodes: 0,
  number_of_seasons: 0,
};

function FilmBanner({ showId, showType }) {
  const [details, setDeatails] = useState(initialPage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/${showType}/${showId}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`
        );
        const response = await request.json();
        response.backdrop_path = `linear-gradient(to right, rgba(24, 28, 29, 1), rgba(24, 28, 29, 0.75)),
          url('https://image.tmdb.org/t/p/original${response.backdrop_path}`;
        response.poster_path = `https://image.tmdb.org/t/p/original${response.poster_path}`;
        setDeatails(response);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [showType, showId]);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: details.backdrop_path }}
      data-loaded={isLoaded || null}
    >
      <div className={styles.filmPage}>
        <div className={styles.posterContainer}>
          <i className={'fas fa-spinner ' + styles.spinner}></i>
          {details.poster_path ? (
            <img src={details.poster_path} alt='poster' />
          ) : null}
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
            <span>
              {showType === 'tv'
                ? details.number_of_episodes +
                  ' episodes. Seasons: ' +
                  details.number_of_seasons
                : details.runtime + ' minutes'}
            </span>
          </div>
          {details.status === 'Released' ? (
            <div>
              Status: <i className='fas fa-check'></i> Realesed
            </div>
          ) : (
            <div>
              Status: <i className='fas fa-clock'></i> In production
            </div>
          )}
          <div className={styles.tagline}>
            {details.tagline || 'Description:'}
          </div>
          <div>{details.overview}</div>
          <div className={styles.popularity}>
            <RatingLine rating={details.vote_average} />
            <PopularityLine popularity={details.popularity} />
          </div>
          <FirmInfo companies={details.production_companies} />
        </div>
      </div>
    </div>
  );
}

export default FilmBanner;