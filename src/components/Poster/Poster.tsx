import React, { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import noPoster from './noPoster.png';
import styles from './Poster.module.scss';
import ganresIdDatabase from '../GanresIdDatabase/GanresIdDatabase.json';
import ControlRow from '../ControlRow/ControlRow';
import { getImage } from '../../api/movieDB/movieDB';

export type PosterData = {
  id?: number;
  name?: string;
  title?: string;
  poster_path?: string;
  first_air_date?: string;
  last_air_date?: string;
  release_date?: string;
  overview?: string;
  genre_ids?: Array<number>;
};

interface PosterType {
  data: PosterData;
}

export interface GanresIdDatabaseType {
  [key: string]: string;
}

const Poster: React.FC<PosterType> = ({ data }) => {
  const [displayControlRow, setDisplayControlRow] = useState(false);

  const showType = data.first_air_date || data.last_air_date ? 'tv' : 'movie';
  const handleContextMenu: MouseEventHandler = (event) => {
    event.preventDefault();
    setDisplayControlRow(!displayControlRow);

    document.addEventListener(
      'click',
      (e: MouseEvent) => {
        if (!(e.target as HTMLLinkElement).closest(styles.container)) {
          setDisplayControlRow(false);
        }
      },
      { once: true },
    );
  };

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
            {(data.genre_ids || [])
              .map((ganre) => (ganresIdDatabase as GanresIdDatabaseType)[ganre])
              .join(', ')}
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
