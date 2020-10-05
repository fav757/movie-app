import React from 'react';
import styles from './ActorCard.module.scss';
import avatarPlaceholder from './avatarPlaceholder.png';

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
        <p>({actor.character})</p>
      </div>
    </div>
  );
}

export default ActorCard;
