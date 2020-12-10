import React from 'react';
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../../assets/images/actorAvatar.png';
import styles from './ActorCard.module.scss';
import PopularityLine from '../PopularityLine/PopularityLine';
import { getImage, getUrl } from '../../api/movieDB/movieDB';
import { Actor } from '../../@types/movieDB';

const ActorCard: React.FC<{ actor: Actor }> = ({ actor }) => {
  const knownFor = (actor.known_for || []).map((film) =>
    getUrl([film.media_type, film.id.toString()]),
  );

  return (
    <div className={styles.actorCard} key={actor.name}>
      <div className={styles.spinnerContainer}>
        <i className={`fas fa-spinner ${styles.spinner}`} />
      </div>
      <img
        loading="lazy"
        src={
          actor.profile_path
            ? getImage(true, actor.profile_path)
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
          {actor.known_for && (
            <Link to={{ pathname: '/search', state: knownFor }}>Known for</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
