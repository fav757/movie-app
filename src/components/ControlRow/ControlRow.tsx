import React, { MouseEvent, KeyboardEvent, useContext } from 'react';
import { GlobalState } from '../../globalState';
import { addToList, removeFromList } from '../../rootActions';
import styles from './ControlRow.module.scss';

interface ControlRowInterface {
  name: string;
  isAbsolute?: boolean;
}

const ControlRow: React.FC<ControlRowInterface> = ({ name, isAbsolute }) => {
  const { state, dispatch } = useContext(GlobalState) as any;

  const isFavorite = !state.favorite.has(name);
  const isWatched = !state.watched.has(name);
  const isLater = !state.later.has(name);

  const handleClick = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    const { category } = (event.target as HTMLElement).dataset;

    if (state[category || 'favorite'].has(name)) {
      dispatch(removeFromList(name, category as string));
    } else {
      dispatch(addToList(name, category as string));
    }
  };

  return (
    <div
      data-testid="controll row"
      className={`${styles.controls} ${isAbsolute && styles.absolute}`}
    >
      <div className={styles.wrap}>
        <i
          role="button"
          aria-label="add to favorite button"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleClick}
          data-category="favorite"
          className={`${styles.icon} fas fa-heart`}
        />
        <i
          className={`${styles.cross} fas fa-times ${
            isFavorite && styles.hidden
          }`}
        />
      </div>
      <div className={styles.wrap}>
        <i
          role="button"
          aria-label="add to watched button"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleClick}
          data-category="watched"
          className={`${styles.icon} fas fa-check`}
        />
        <i
          className={`${styles.cross} fas fa-times ${
            isWatched && styles.hidden
          }`}
        />
      </div>
      <div className={styles.wrap}>
        <i
          role="button"
          aria-label="add to favorite button"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleClick}
          data-category="later"
          className={`${styles.icon} fas fa-clock`}
        />
        <i
          className={`${styles.cross} fas fa-times ${isLater && styles.hidden}`}
        />
      </div>
    </div>
  );
};

export default ControlRow;
