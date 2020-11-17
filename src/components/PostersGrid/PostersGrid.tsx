import React, { useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster, { PosterData } from '../Poster/Poster';
import ActorCard, { Actor } from '../ActorCard/ActorCard';
import useFetchData from '../../hooks/fetchData';

interface PostersGridInterface {
  header: string;
  requestLink?: string;
  filmsList?: PosterData[];
}

interface TrandingFilmsState {
  results: PosterData[] | PosterData[];
  status_message?: string;
}

const PostersGrid: React.FC<PostersGridInterface> = ({
  requestLink,
  header,
  filmsList,
}) => {
  const [trandingFilms, setTrandingFilms] = useState({
    results: [],
  } as TrandingFilmsState);
  const [page, setPage] = useState(1);

  const changePage = (reduce: boolean) => {
    setPage(() => {
      if (reduce) {
        return page + 1;
      }
      return page - 1 <= 0 ? 1 : page - 1;
    });
  };

  let request: string | null;
  if (filmsList) {
    request = null;
  } else if (header === 'Tranding') {
    request = requestLink || null;
  } else {
    request = (requestLink as string) + page;
  }
  useFetchData(request as string, setTrandingFilms);

  const films = (filmsList || trandingFilms.results || []).map(
    (result: PosterData & Actor) => {
      return result.known_for_department ? (
        <ActorCard key={result.id} actor={result} />
      ) : (
        <Poster key={result.id} data={result} />
      );
    },
  );

  return (
    <section className={styles.container}>
      <div className={styles.tranding}>
        <h2 data-testid="posters header">{header}</h2>
        <div className={styles.posters}>
          {trandingFilms instanceof Error || !films.length ? (
            <h1 className={styles.noContent}>
              Sorry, but looks like we can&apos;t load information you were
              looking for
            </h1>
          ) : (
            films
          )}
        </div>
        {header === 'Tranding' || !Array.isArray(films) ? null : (
          <div className={styles.pagesRow}>
            <i
              role="button"
              aria-label="go to previous page"
              tabIndex={0}
              onClick={() => changePage(false)}
              onKeyPress={() => changePage(false)}
              className={`${
                page > 1 ? styles.arrowNav : styles.hidden
              } fas fa-arrow-circle-left`}
            />
            <span>{page}</span>
            <i
              role="button"
              aria-label="go to previous page"
              tabIndex={0}
              onClick={() => changePage(true)}
              onKeyPress={() => changePage(true)}
              className={`${
                films.length >= 20 ? styles.arrowNav : styles.hidden
              } fas fa-arrow-circle-right`}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PostersGrid;
