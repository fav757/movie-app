import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noPoster from '../../assets/images/posterPlaceholder.png';
import styles from './Poster.module.scss';
import ControlRow from '../ControlRow/ControlRow';
import { ganres, getImage } from '../../api/movieDB/movieDB';
import { FilmInfo } from '../../@types/movieDB';

const Poster: React.FC<{ data: FilmInfo }> = ({ data }) => {
  const [displayControlRow, setDisplayControlRow] = useState(false);
  const showType = data.first_air_date || data.last_air_date ? 'tv' : 'movie';

  const closeModal = useCallback((e) => {
    if (!(e.target as HTMLLinkElement).closest(styles.container)) {
      setDisplayControlRow(false);
    }
  }, []);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setDisplayControlRow(!displayControlRow);
      document.addEventListener('click', closeModal, { once: true });
    },
    [displayControlRow, closeModal],
  );

  useEffect(() => () => document.removeEventListener('click', closeModal), [
    closeModal,
  ]);

  return (
    <Link
      to={data.id ? `/${showType}?id=${data.id}` : '/error'}
      className={styles.container}
      onContextMenu={handleContextMenu}
    >
      {displayControlRow && data.id && (
        <ControlRow name={`${data.id} ${showType}`} isAbsolute />
      )}
      <i className={`fas fa-spinner ${styles.spinner}`} />
      <img
        loading="lazy"
        className={styles.poster}
        src={data.poster_path ? getImage(true, data.poster_path) : noPoster}
        alt="poster"
      />
      <div className={styles.desriptionWrap}>
        <div className={styles.desription}>
          <h3>{data.title || data.name || 'No title'}</h3>
          <p data-testid="date paragraph">
            {(data.release_date || data.first_air_date || 'xxxx').slice(0, 4)}
          </p>
          <b>
            {(data.genre_ids || []).map((ganre) => ganres[ganre]).join(', ')}
          </b>
          <p data-testid="overview paragraph">
            {data.overview || 'no description'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Poster;
