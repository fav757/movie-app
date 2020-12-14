import React, { useEffect, useState } from 'react';
import styles from './FilmBanner.module.scss';
import RatingLine from '../RatingLine/RatingLine';
import PopularityLine from '../PopularityLine/PopularityLine';
import FirmInfo from '../FirmInfo/FirmInfo';
import noPoster from '../../assets/images/posterPlaceholder.png';
import ControlRow from '../ControlRow/ControlRow';
import RateFilmRow from '../RateFilmRow/RateFilmRow';
import { getImage, getUrl, loadData } from '../../api/movieDB/movieDB';
import { FilmInfo } from '../../@types/movieDB';

const FilmBanner: React.FC<{ showId: number; showType: string }> = ({
  showId,
  showType,
}) => {
  const [details, setDeatails] = useState({} as FilmInfo);

  useEffect(() => {
    loadData(
      getUrl([showType, showId.toString()]),
      setDeatails as (data: unknown) => void,
    );
  }, [showType, showId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: details.backdrop_path
          ? `linear-gradient(to right, rgba(24, 28, 29, 1), rgba(24, 28, 29, 0.75)),
            url(${getImage(false, details.backdrop_path)})`
          : '',
      }}
      data-loaded={!!(details === false || details.title || details.name)}
    >
      <div className={styles.filmPage}>
        <div className={styles.posterContainer}>
          <i className={`fas fa-spinner ${styles.spinner}`} />
          <img
            src={
              details.poster_path
                ? getImage(false, details.poster_path)
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
          <RateFilmRow showId={showId} showType={showType} />
        </div>
      </div>
    </div>
  );
};

export default FilmBanner;
