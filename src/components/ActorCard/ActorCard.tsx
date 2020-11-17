import React from 'react';
import { Link } from 'react-router-dom';
import avatarPlaceholder from './avatarPlaceholder.png';
import styles from './ActorCard.module.scss';
import PopularityLine from '../PopularityLine/PopularityLine';

export type Actor = {
  known_for_department?: Array<string>;
  name?: string;
  profile_path?: string;
  gender?: number;
  character?: string;
  popularity?: number;
  known_for?: Array<string>;
}

type ActorCardType = {
  actor: Actor;
};

const ActorCard: React.FC<ActorCardType> = ({ actor }) => {
  return (
    <div className={styles.actorCard} key={actor.name}>
      <div className={styles.spinnerContainer}>
        <i className={`fas fa-spinner ${styles.spinner}`} />
      </div>
      <img
        loading="lazy"
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : avatarPlaceholder
        }
        alt="actor avatar"
      />
      <div className={styles.actorInfo}>
        <div>
          <div data-testid="actor name">
            {actor.name || 'No Name'}{' '}
            <i
              className={`fas fa-${actor.gender === 1 ? 'venus' : 'mars'}`}
              title="gender"
            />
          </div>
          <div data-testid="character | popularity">
            (
            {actor.character || (
              <PopularityLine popularity={actor.popularity || 0} />
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
};

export default ActorCard;
