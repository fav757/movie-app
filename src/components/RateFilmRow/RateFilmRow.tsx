import React, { EventHandler, SyntheticEvent, useState } from 'react';
import { rateTitle } from '../../api/movieDB/movieDB';
import styles from './RateFilmRow.module.scss';

interface RateFilmRowInterface {
  showId: number;
  showType: string;
}

const RateFilmRow: React.FC<RateFilmRowInterface> = ({ showId, showType }) => {
  const [requestStatus, setRequestStatus] = useState('');
  const sessionId = localStorage.getItem('sessionId');

  const handleClick: EventHandler<SyntheticEvent> = ({ target }) => {
    if (!sessionId) return;
    rateTitle(
      (target as HTMLElement).title,
      showId,
      showType,
      sessionId,
      setRequestStatus as (data: string) => void,
    );
  };

  const buttons: JSX.Element[] = [];
  for (let i = 10; i > 0; i -= 1) {
    buttons.push(
      <i
        key={i}
        title={String(i)}
        role="button"
        tabIndex={0}
        aria-label="rate button"
        className={`${styles.star} fas fa-star`}
        onClick={handleClick}
        onKeyPress={handleClick}
      />,
    );
  }

  return (
    <div className={styles.container}>
      <h3>Please rate the {showType}:</h3>
      <div className={styles.starsWrap}>
        {sessionId ? (
          buttons
        ) : (
          <span>
            Too rate media you needed to create guest session (it doesn&apos;t
            reqiure registaration, just click on user icon in the top menu)
          </span>
        )}
      </div>
      <p>{requestStatus}</p>
    </div>
  );
};

export default RateFilmRow;
