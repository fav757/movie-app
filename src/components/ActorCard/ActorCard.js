import React from 'react';
import PopularityLine from '../PopularityLine/PopularityLine';
import styles from './ActorCard.module.scss';
import avatarPlaceholder from './avatarPlaceholder.png';
import { Link } from 'react-router-dom';

function ActorCard({ actor = {} }) {
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
          <div data-testid='actor name'>
            {actor.name || 'No Name'}{' '}
            <i
              className={`fas fa-${actor.gender === 1 ? 'venus' : 'mars'}`}
              title='gender'
            ></i>
          </div>
          <div data-testid='character | popularity'>
            (
            {actor.character || (
              <PopularityLine popularity={actor.popularity} />
            )}
            )
          </div>
          {(actor.known_for || []).length > 0 ? (
            <Link to={{ pathname: '/search', state: actor.known_for }}>
              Known for
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ActorCard;
