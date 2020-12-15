import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { rateTitle } from '../../api/movieDB/movieDB';
import styles from './RateFilmRow.module.scss';

const RateFilmRow: React.FC<{
  showId: number;
  showType: string;
  guestId: string;
}> = ({ showId, showType, guestId }) => {
  const [requestStatus, setRequestStatus] = useState('');
  const handleClick = useCallback(
    ({ target }) => {
      if (!guestId) return;
      rateTitle(
        (target as HTMLElement).title,
        showId,
        showType,
        guestId,
        setRequestStatus as (data: string) => void,
      );
    },
    [showId, showType, guestId],
  );

  const buttons: JSX.Element[] = [];
  for (let i = 10; i > 0; i -= 1) {
    buttons.push(
      <button
        key={i}
        title={String(i)}
        type="button"
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
        {guestId ? (
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

const mapStateToProps = (state: Record<string, any>) => ({
  guestId: state.guestSession,
});

export default connect(mapStateToProps)(RateFilmRow);
