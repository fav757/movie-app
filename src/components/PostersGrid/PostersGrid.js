import React, { useEffect, useRef, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';
import ActorCard from '../ActorCard/ActorCard';

function PostersGrid({ requestLink, header, filmsList }) {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [postersStyle, setPostersStyle] = useState(styles.posters);
  const [page, setPage] = useState(1);
  const sectionStartRef = useRef();

  const changePage = (reduce) => {
    setPage(() => {
      if (reduce) {
        return page + 1;
      } else {
        return page - 1 <= 0 ? 1 : page - 1;
      }
    });

    sectionStartRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    (async function () {
      if (Array.isArray(filmsList)) {
        const films = filmsList.map((result) => {
          return result.known_for_department ? (
            <ActorCard key={result.name} actor={result} />
          ) : (
            <Poster key={result.id} data={result} />
          );
        });

        setTrandingFilms(films);
        return;
      }

      try {
        const request = await fetch(
          header === 'Tranding' ? requestLink : requestLink + page
        );
        const response = await request.json();

        if (!response.results.length) {
          throw new Error('Films array is empty!');
        }
        response.results.sort((a, b) => (a.vote_count < b.vote_count ? 1 : -1));

        const films = response.results.map((result) => {
          return result.known_for_department ? (
            <ActorCard key={result.name} actor={result} />
          ) : (
            <Poster key={result.id} data={result} />
          );
        });

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
  }, [page, header, requestLink, filmsList]);

  return (
    <section className={styles.container}>
      <div ref={sectionStartRef} className={styles.tranding}>
        <h2>{header}</h2>
        <div className={postersStyle}>{trandingFilms}</div>
        {header === 'Tranding' || !Array.isArray(trandingFilms) ? null : (
          <div className={styles.pagesRow}>
            <i
              onClick={() => changePage(false)}
              className={
                (page > 1 ? styles.arrowNav : styles.hidden) +
                ' fas fa-arrow-circle-left'
              }
            ></i>
            <span>{page}</span>
            <i
              onClick={() => changePage(true)}
              className={
                (trandingFilms.length >= 20 ? styles.arrowNav : styles.hidden) +
                ' fas fa-arrow-circle-right'
              }
            ></i>
          </div>
        )}
      </div>
    </section>
  );
}

export default PostersGrid;
