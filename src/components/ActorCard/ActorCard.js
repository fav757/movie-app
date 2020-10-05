import React from 'react';
import PopularityLine from '../PopularityLine/PopularityLine';
import styles from './ActorCard.module.scss';
import avatarPlaceholder from './avatarPlaceholder.png';
import { Link } from 'react-router-dom';

function ActorCard({ actor }) {
  return (
    <div className={styles.actorCard} key={actor.name}>
      <div className={styles.spinnerContainer}>
        <i className={'fas fa-spinner ' + styles.spinner}></i>
      </div>
      <img
        loading='lazy'
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : avatarPlaceholder
        }
        alt='actor avatar'
      />
      <div className={styles.actorInfo}>
        <div>
          {actor.name}{' '}
          <i className={`fas fa-${actor.gender === 1 ? 'venus' : 'mars'}`}></i>
        </div>
        <div>
          ({actor.character || <PopularityLine popularity={actor.popularity} />}
          )
        </div>
        {actor.known_for ? (
          <Link to={{ pathname: '/search', state: actor.known_for }}>
            Known for
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default ActorCard;
