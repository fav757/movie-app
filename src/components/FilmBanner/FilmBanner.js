import React, { useState } from 'react';
import styles from './FilmBanner.module.scss';
import RatingLine from '../RatingLine/RatingLine';
import PopularityLine from '../PopularityLine/PopularityLine';
import FirmInfo from '../FirmInfo/FirmInfo';
import noPoster from '../Poster/noPoster.png';
import ControlRow from '../ControlRow/ControlRow';
import useFetchData from '../../hooks/fetchData';

function FilmBanner({ showId, showType }) {
  const [details, setDeatails] = useState({});

  useFetchData(
    `https://api.themoviedb.org/3/${showType}/${showId}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`,
    setDeatails
  );

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: details.backdrop_path
          ? `linear-gradient(to right, rgba(24, 28, 29, 1), rgba(24, 28, 29, 0.75)),
            url('https://image.tmdb.org/t/p/original${details.backdrop_path}`
          : null,
      }}
      data-loaded={!!(details.title || details.name)}
    >
      <div className={styles.filmPage}>
        <div className={styles.posterContainer}>
          <i className={'fas fa-spinner ' + styles.spinner}></i>
          <img
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/original${details.poster_path}`
                : noPoster
            }
            alt='poster'
          />
          <ControlRow name={showId + ' ' + showType} />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={details.homepage || '#'}
            >
              {details.title || details.name || 'Movie title'}
            </a>
            <span>
              (
              {new Date(
                details.release_date || details.first_air_date || new Date()
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
            <span>
              {(details.genres || []).map((ganre) => ganre.name).join(', ')}
            </span>
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
          <div>
            {details.overview ||
              "Looks like this we can't fetch data for this title"}
          </div>
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
