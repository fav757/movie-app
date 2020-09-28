import React, { useEffect, useState } from 'react';
import styles from './HeroSection.module.scss';
import randomNumberInRange from '../RandomNubmerInRange/RandomNumberInRange';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import RatingLine from '../RatingLine/RatingLine';
import backdropPlaceholder from './backdropPlaceholder.jpg';

const moviePlaceholder = {
  title: 'Money plane',
  release_date: '2020-08-25',
  backdrop_path: '/pq0JSpwyT2URytdFG0euztQPAyR.jpg',
  genre_ids: ['28', '53'],
  overview:
    "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
};

function HeroSection() {
  const [movieData, setmovieData] = useState(moviePlaceholder);

  useEffect(() => {
    const randomNumber = randomNumberInRange(0, 20);

    (async function () {
      try {
        const request = await fetch(`
          https://api.themoviedb.org/3/movie/popular?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1
        `);
        const response = await request.json();
        setmovieData(response.results[randomNumber]);
      } catch (e) {
        console.log(e, "Can't recive data from server");
      }
    })();
  }, []);

  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: movieData
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url('https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
          : backdropPlaceholder,
      }}
    >
      <div className={styles.wrap}>
        <div className={styles.descriptor}>
          <h1>{movieData.title}</h1>
          <b>
            {movieData.release_date} |
            {movieData.genre_ids
              .map((ganre) => ganresIdDatabase[ganre])
              .join(', ')}
          </b>
          <p>{movieData.overview}</p>
          <div>
            <RatingLine rating={movieData.vote_average} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
