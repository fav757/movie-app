import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  addToList,
  ListActionType,
  removeFromList,
} from '../../redux/actions/listsActions';
import styles from './ControlRow.module.scss';

interface ControlRowInterface {
  name: string;
  isAbsolute?: boolean;
  lists: Record<string, string[]>;
  addFilm: ListActionType;
  removeFilm: ListActionType;
}

const ControlRow: React.FC<ControlRowInterface> = ({
  name,
  isAbsolute,
  lists,
  addFilm,
  removeFilm,
}) => {
  const isFavorite = !lists.favorite.includes(name);
  const isWatched = !lists.watched.includes(name);
  const isLater = !lists.later.includes(name);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      const ariaLabel = (event.currentTarget as HTMLButtonElement).getAttribute(
        'aria-label',
      ) as string;
      if (lists[ariaLabel].includes(name)) {
        removeFilm(name, ariaLabel);
      } else {
        addFilm(name, ariaLabel);
      }
    },
    [lists, name, removeFilm, addFilm],
  );

  return (
    <div
      data-testid="controll row"
      className={`${styles.controls} ${isAbsolute && styles.absolute}`}
    >
      <button
        className={styles.wrap}
        type="button"
        aria-label="favorite"
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        <i className={`${styles.icon} fas fa-heart`} />
        <i
          className={`${styles.cross} fas fa-times ${
            isFavorite && styles.hidden
          }`}
        />
      </button>
      <button
        className={styles.wrap}
        type="button"
        aria-label="watched"
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        <i className={`${styles.icon} fas fa-check`} />
        <i
          className={`${styles.cross} fas fa-times ${
            isWatched && styles.hidden
          }`}
        />
      </button>
      <button
        className={styles.wrap}
        type="button"
        aria-label="later"
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        <i className={`${styles.icon} fas fa-clock`} />
        <i
          className={`${styles.cross} fas fa-times ${isLater && styles.hidden}`}
        />
      </button>
    </div>
  );
};

const mapStateToProps = (state: Record<string, any>) => ({
  lists: state.lists,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addFilm: (id: string, category: string) => dispatch(addToList(id, category)),
  removeFilm: (id: string, category: string) =>
    dispatch(removeFromList(id, category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlRow);
