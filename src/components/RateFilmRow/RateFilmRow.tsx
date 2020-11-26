import React, { EventHandler, SyntheticEvent, useState } from 'react';
import styles from './RateFilmRow.module.scss';

interface RateFilmRowInterface {
  showId: number;
  showType: string;
}

const RateFilmRow: React.FC<RateFilmRowInterface> = ({ showId, showType }) => {
  const [requestStatus, setRequestStatus] = useState({
    status_message: null,
    message: null,
  });
  const sessionId = localStorage.getItem('sessionId');

  const handleClick: EventHandler<SyntheticEvent> = ({ target }) => {
    fetch(
      `https://api.themoviedb.org/3/${showType}/${showId}/rating?api_key=09ecd60e9326551324881d2239a8f12a&guest_session_id=${sessionId}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        method: 'POST',
        body: JSON.stringify({
          value: (target as HTMLElement).title,
        }),
      },
    )
      .then((response) => response.json())
      .then((json) => setRequestStatus(json))
      .catch((e) => setRequestStatus(e));
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
      <p>{requestStatus.status_message || requestStatus.message}</p>
    </div>
  );
};

export default RateFilmRow;
