import React, { useEffect, useState } from 'react';
import styles from './HeroSection.module.scss';
import randomNumberInRange from '../RandomNubmerInRange/RandomNumberInRange';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';

function HeroSection() {
  const [movieData, setmovieData] = useState({});

  useEffect(() => {
    const randomNumber = randomNumberInRange(0, 20);

    fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1
    `)
      .then((response) => response.json())
      .then((json) => setmovieData(json.results[randomNumber]));
  }, []);

  return (
    <section
      className={styles.container}
      style={{
        backgroundImage:
          `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url('https://image.tmdb.org/t/p/original${movieData['backdrop_path']}
        ` || null,
      }}
    >
      <div className={styles.wrap}>
        <div className={styles.descriptor}>
          <h1>{movieData['title']}</h1>
          <b>
            {movieData['release_date']} |{' '}
            {(movieData['genre_ids'] || [])
              .map((ganre) => ganresIdDatabase[ganre])
              .join(', ')}
          </b>
          <p>{movieData['overview']}</p>
          <div>
            <span>Watch trailer</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
