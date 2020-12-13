import React, { createRef, useCallback, useEffect, useState } from 'react';
import styles from './PostersGrid.module.scss';
import Poster from '../Poster/Poster';
import ActorCard from '../ActorCard/ActorCard';
import { loadData } from '../../api/movieDB/movieDB';
import { Actor, FilmInfo } from '../../@types/movieDB';

const PostersGrid: React.FC<{
  header: string;
  requestLink: string | string[];
}> = ({ requestLink, header }) => {
  const [trandingFilms, setTrandingFilms] = useState<{
    results: FilmInfo[];
    status_message?: string;
  }>({
    results: [],
  });
  const [page, setPage] = useState(1);
  const ref = createRef<HTMLElement>();

  const changePage = useCallback(
    (reduce: boolean) => {
      const element = ref.current || document.body;
      element.scrollIntoView({ behavior: 'smooth' });

      setPage(() => {
        if (reduce) {
          return page + 1;
        }
        return page - 1 <= 0 ? 1 : page - 1;
      });
    },
    [page, ref],
  );

  useEffect(() => {
    setPage(1);
  }, [header]);

  useEffect(() => {
    loadData(
      Array.isArray(requestLink)
        ? requestLink
        : (requestLink as string).replace(/page=\d*/, `page=${page}`),
      setTrandingFilms as (data: unknown) => void,
    );
  }, [requestLink, page]);

  const films =
    trandingFilms &&
    (trandingFilms.results || trandingFilms).map((result: FilmInfo & Actor) => {
      return result.known_for_department ? (
        <ActorCard key={result.id} actor={result} />
      ) : (
        <Poster key={result.id} data={result} />
      );
    });

  return (
    <section ref={ref} className={styles.container}>
      <div className={styles.tranding}>
        <h2 data-testid="posters header">{header}</h2>
        <div className={styles.posters}>
          {trandingFilms instanceof Error || !films.length ? (
            <h2 className={styles.noContent}>
              Sorry, but looks like we can&apos;t load information you were
              looking for
            </h2>
          ) : (
            films
          )}
        </div>
        <div className={styles.pagesRow}>
          <button
            type="button"
            aria-label="go to previous page"
            onClick={() => changePage(false)}
            onKeyPress={() => changePage(false)}
            className={`${
              page > 1 ? styles.arrowNav : styles.hidden
            } fas fa-arrow-circle-left`}
          />
          <span>{page}</span>
          <button
            type="button"
            aria-label="go to previous page"
            onClick={() => changePage(true)}
            onKeyPress={() => changePage(true)}
            className={`${
              films.length >= 20 ? styles.arrowNav : styles.hidden
            } fas fa-arrow-circle-right`}
          />
        </div>
      </div>
    </section>
  );
};

export default PostersGrid;
