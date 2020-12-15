import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.scss';
import randomNumberInRange from '../../utilities/RandomNubmerInRange/RandomNumberInRange';
import RatingLine from '../RatingLine/RatingLine';
import PopularityLine from '../PopularityLine/PopularityLine';
import { ganres, getImage, getUrl, loadData } from '../../api/movieDB/movieDB';
import { FilmInfo } from '../../@types/movieDB';

const HeroSection: React.FC = () => {
  const [movieData, setmovieData] = useState<{ results: [] } | false>();

  useEffect(() => {
    loadData(
      getUrl(['movie', 'popular']),
      setmovieData as (data: unknown) => void,
    );
  }, []);

  const randomMovie: FilmInfo =
    movieData && Array.isArray(movieData.results)
      ? movieData.results[randomNumberInRange(0, 19)]
      : {};

  return (
    <section
      data-loaded={
        !!(
          movieData === false ||
          randomMovie.title ||
          movieData instanceof Error
        )
      }
      className={styles.container}
      style={{
        backgroundImage: randomMovie.backdrop_path
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${getImage(false, randomMovie.backdrop_path)})`
          : '',
      }}
    >
      <div className={styles.wrap}>
        <div className={styles.descriptor}>
          <h1>{randomMovie.title || 'Error'}</h1>
          <b data-testid="bold film data">
            {randomMovie.release_date || new Date().toLocaleDateString()} |{' '}
            {(randomMovie.genre_ids || [])
              .map((ganre) => ganres[ganre])
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
        <div className={styles.link}>
          <i className="far fa-play-circle" />
          <Link to={`/movie?id=${randomMovie.id}`}>Learn more</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
