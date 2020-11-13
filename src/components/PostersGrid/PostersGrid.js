import React, { useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';
import ActorCard from '../ActorCard/ActorCard';
import useFetchData from '../../hooks/fetchData';

function PostersGrid({ requestLink, header, filmsList }) {
  const [trandingFilms, setTrandingFilms] = useState({ results: [] });
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

  const request = filmsList
    ? null
    : 'Tranding'
    ? requestLink
    : requestLink + page;
  useFetchData(request, setTrandingFilms);

  const films = (filmsList || trandingFilms.results || []).map((result) => {
    return result.known_for_department ? (
      <ActorCard key={result.id} actor={result} />
    ) : (
      <Poster key={result.id} data={result} />
    );
  });

  return (
    <section className={styles.container}>
      <div className={styles.tranding}>
        <h2 data-testid='posters header'>{header}</h2>
        <div className={styles.posters}>
          {!trandingFilms.status_message ? (
            films
          ) : (
            <h1 className={styles.noContent}>
              Sorry, but looks like we can't load information you were looking
              for
            </h1>
          )}
        </div>
        {header === 'Tranding' || !Array.isArray(films) ? null : (
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
                (films.length >= 20 ? styles.arrowNav : styles.hidden) +
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
