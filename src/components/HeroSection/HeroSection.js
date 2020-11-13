import React, { useEffect, useState } from 'react';
import styles from './HeroSection.module.scss';
import randomNumberInRange from '../RandomNubmerInRange/RandomNumberInRange';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import RatingLine from '../RatingLine/RatingLine';
import PopularityLine from '../PopularityLine/PopularityLine';

function HeroSection() {
  const [movieData, setmovieData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(`
          https://api.themoviedb.org/3/movie/popular?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1
        `);
        const response = await request.json();
        const data = response.results[randomNumberInRange(0, 19)];

        setmovieData(data);
      } catch (e) {
        console.log(e, "Can't recive data from server");
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  return (
    <section
      data-loaded={isLoaded || null}
      className={styles.container}
      style={{
        backgroundImage: movieData.backdrop_path
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
          : null,
      }}
    >
      <div className={styles.wrap}>
        <div className={styles.descriptor}>
          <h1>{movieData.title || 'Error'}</h1>
          <b data-testid='bold film data'>
            {movieData.release_date || new Date().toLocaleDateString()} |{' '}
            {(movieData.genre_ids || ['0'])
              .map((ganre) => ganresIdDatabase[ganre])
              .join(', ')}
          </b>
          <p data-testid='movie overview'>
            {movieData.overview ||
              'We are sorry, that you see this page. Unfortunately, the site cannot receive data from the server'}
          </p>
          <div data-testid='movie ratings' className={styles.ratingsRow}>
            <RatingLine rating={movieData.vote_average || 0} />
            <PopularityLine popularity={movieData.popularity || 0} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
