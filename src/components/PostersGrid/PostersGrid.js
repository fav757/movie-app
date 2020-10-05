import React, { useEffect, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';

function PostersGrid({ requestLink, header }) {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [postersStyle, setPostersStyle] = useState(styles.posters);
  const [page, setPage] = useState(1);

  const changePage = (reduce) => {
    setPage(() => {
      if (reduce) {
        return page + 1;
      } else {
        return page - 1 <= 0 ? 1 : page - 1;
      }
    });
  };

  useEffect(() => {
    (async function () {
      try {
        const request = await fetch(
          header === 'Tranding' ? requestLink : requestLink + page
        );
        const response = await request.json();

        if (!response.results.length) {
          throw new Error('Films array is empty!');
        }
        response.results.sort((a, b) => (a.vote_count < b.vote_count ? 1 : -1));

        const films = response.results.map((film) => (
          <Poster key={film.id} data={film} />
        ));

        setTrandingFilms(films);
      } catch (e) {
        console.log(e);
        setPostersStyle(styles.canNotLoad);
        setTrandingFilms(
          <h3>
            <span role='img' aria-label='crying emoji'>
              😢
            </span>{' '}
            Looks like we can't find films you were looking for.
          </h3>
        );
      }
    })();
  }, [page, header, requestLink]);

  return (
    <section className={styles.container}>
      <div className={styles.tranding}>
        <h2>{header}</h2>
        <div className={postersStyle}>{trandingFilms}</div>
        <div className={styles.pagesRow}>
          <i
            onClick={() => changePage(false)}
            className='fas fa-arrow-circle-left'
          ></i>
          <span>{page}</span>
          <i
            onClick={() => changePage(true)}
            className='fas fa-arrow-circle-right'
          ></i>
        </div>
      </div>
    </section>
  );
}

export default PostersGrid;
