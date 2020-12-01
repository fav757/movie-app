import React, { useState } from 'react';
import styles from './HeroSection.module.scss';
import randomNumberInRange from '../RandomNubmerInRange/RandomNumberInRange';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import RatingLine from '../RatingLine/RatingLine';
import PopularityLine from '../PopularityLine/PopularityLine';
import useFetchData from '../../hooks/fetchData/fetchData';
import { GanresIdDatabaseType } from '../Poster/Poster';

type Movie = {
  title?: string;
  backdrop_path?: string;
  release_date?: string;
  genre_ids?: Array<string>;
  overview?: string;
  vote_average?: number;
  popularity?: number;
};

const HeroSection: React.FC = () => {
  const [movieData, setmovieData] = useState({ results: [] });

  useFetchData(
    'https://api.themoviedb.org/3/movie/popular?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1',
    setmovieData,
  );

  const randomMovie: Movie = (movieData.results || []).length
    ? movieData.results[randomNumberInRange(0, 19)]
    : {};

  return (
    <section
      data-loaded={!!(randomMovie.title || movieData instanceof Error)}
      className={styles.container}
      style={{
        backgroundImage: randomMovie.backdrop_path
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
          : '',
      }}
    >
      <div className={styles.wrap}>
        <div className={styles.descriptor}>
          <h1>{randomMovie.title || 'Error'}</h1>
          <b data-testid="bold film data">
            {randomMovie.release_date || new Date().toLocaleDateString()} |{' '}
            {(randomMovie.genre_ids || ['0'])
              .map((ganre) => (ganresIdDatabase as GanresIdDatabaseType)[ganre])
              .join(', ')}
          </b>
          <p data-testid="movie overview">
            {randomMovie.overview ||
              'We are sorry, that you see this page. Unfortunately, the site cannot receive data from the server'}
          </p>
          <div data-testid="movie ratings" className={styles.ratingsRow}>
            <RatingLine rating={randomMovie.vote_average} />
            <PopularityLine popularity={randomMovie.popularity} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
