import React, { useEffect, useState } from 'react';
import styles from './HeroSection.module.scss';
import randomNumberInRange from '../RandomNubmerInRange/RandomNumberInRange';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import RatingLine from '../RatingLine/RatingLine';
import backdropPlaceholder from './backdropPlaceholder.jpg';
import PopularityLine from '../PopularityLine/PopularityLine';

const moviePlaceholder = {
  title: 'Trying to load film data',
  release_date: new Date().toLocaleDateString(),
  backdrop_path: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('${backdropPlaceholder}`,
  genre_ids: ['0'],
  vote_average: 0,
  popularity: 0,
  overview: "If page doesn't load for a long time, please, reload it",
};

function HeroSection() {
  const [movieData, setmovieData] = useState(moviePlaceholder);

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(`
          https://api.themoviedb.org/3/movie/popular?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1
        `);
        const response = await request.json();
        const data = response.results[randomNumberInRange(0, 20)];
        data.backdrop_path = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('https://image.tmdb.org/t/p/original${data.backdrop_path}`;
        setmovieData(data);
      } catch (e) {
        console.log(e, "Can't recive data from server");
      }
    })();
  }, []);

  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: movieData.backdrop_path,
      }}
    >
      <div className={styles.wrap}>
        <div className={styles.descriptor}>
          <h1>{movieData.title}</h1>
          <b>
            {movieData.release_date} |{' '}
            {movieData.genre_ids
              .map((ganre) => ganresIdDatabase[ganre])
              .join(', ')}
          </b>
          <p>{movieData.overview}</p>
          <div className={styles.ratingsRow}>
            <RatingLine rating={movieData.vote_average} />
            <PopularityLine popularity={movieData.popularity} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
