import React, { useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster, { PosterData } from '../Poster/Poster';
import ActorCard, { Actor } from '../ActorCard/ActorCard';
import useFetchData from '../../hooks/fetchData';

interface PostersGridInterface {
  header: string;
  requestLink: string | string[];
}

interface TrandingFilmsState {
  results: PosterData[];
  status_message?: string;
}

const PostersGrid: React.FC<PostersGridInterface> = ({
  requestLink,
  header,
}) => {
  const [trandingFilms, setTrandingFilms] = useState<TrandingFilmsState>({
    results: [],
  });
  const [page, setPage] = useState(1);

  const changePage = (reduce: boolean) => {
    setPage(() => {
      if (reduce) {
        return page + 1;
      }
      return page - 1 <= 0 ? 1 : page - 1;
    });
  };

  const isLinkValid =
    Array.isArray(requestLink) || !/&page=$/.test(requestLink);

  let request;
  if (isLinkValid) {
    request = requestLink;
  } else {
    request = (requestLink as string) + page;
  }

  useFetchData(request, setTrandingFilms);

  const films = (trandingFilms.results || trandingFilms || []).map(
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
        {isLinkValid ? null : (
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
