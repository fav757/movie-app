import React, { useState } from 'react';
import styles from './FilmBanner.module.scss';
import RatingLine from '../RatingLine/RatingLine';
import PopularityLine from '../PopularityLine/PopularityLine';
import FirmInfo, { Company } from '../FirmInfo/FirmInfo';
import noPoster from '../Poster/noPoster.png';
import ControlRow from '../ControlRow/ControlRow';
import useFetchData from '../../hooks/fetchData';

type FilmBannerType = {
  showId: number;
  showType: string;
};

type FilmInfo = {
  name?: string;
  title?: string;
  status?: string;
  backdrop_path?: string;
  poster_path?: string;
  homepage?: string;
  adult?: boolean;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  vote_average?: number;
  popularity?: number;
  overview?: string;
  production_companies: Company[];
};

const FilmBanner: React.FC<FilmBannerType> = ({ showId, showType }) => {
  const [details, setDeatails] = useState({} as FilmInfo);

  useFetchData(
    `https://api.themoviedb.org/3/${showType}/${showId}?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`,
    setDeatails,
  );

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: details.backdrop_path
          ? `linear-gradient(to right, rgba(24, 28, 29, 1), rgba(24, 28, 29, 0.75)),
            url('https://image.tmdb.org/t/p/original${details.backdrop_path}`
          : '',
      }}
      data-loaded={!!(details.title || details.name)}
    >
      <div className={styles.filmPage}>
        <div className={styles.posterContainer}>
          <i className={`fas fa-spinner ${styles.spinner}`} />
          <img
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/original${details.poster_path}`
                : noPoster
            }
            alt="poster"
          />
          <ControlRow name={`${showId} ${showType}`} />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={details.homepage || '#'}
            >
              {details.title || details.name}
            </a>
            <span>
              (
              {new Date(
                details.release_date || details.first_air_date || new Date(),
              ).getFullYear()}
              )
            </span>
          </h2>
          <div className={styles.facts}>
            <i
              className={`fas fa-baby ${details.adult ? styles.adult : null}`}
              title={details.adult ? 'Only for adults' : 'For all ages'}
            />
            {showType === 'tv' ? (
              <span>
                {details.first_air_date || '?'} - {details.last_air_date || '?'}
              </span>
            ) : (
              <span>{details.release_date || '?'}</span>
            )}
            <span>
              {(details.genres || [])
                .map((ganre: { name: string }) => ganre.name)
                .join(', ') || 'no ganres'}
            </span>
            <span>
              {showType === 'tv'
                ? `${details.number_of_episodes || '?'} episodes. Seasons: ${
                    details.number_of_seasons || '?'
                  }`
                : `${details.runtime || '?'} minutes`}
            </span>
          </div>
          {details.status === 'Released' ? (
            <div>
              Status: <i className="fas fa-check" /> Realesed
            </div>
          ) : (
            <div>
              Status: <i className="fas fa-clock" /> In production
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
};

export default FilmBanner;
