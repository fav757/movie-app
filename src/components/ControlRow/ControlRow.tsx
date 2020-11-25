import React, { MouseEvent, KeyboardEvent } from 'react';
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

  const handleClick = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    const { category } = (event.target as HTMLElement).dataset;
    if (lists[category || 'favorite'].includes(name)) {
      removeFilm(name, category as string);
    } else {
      addFilm(name, category as string);
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

const mapStateToProps = (state: Record<string, any>) => ({
  lists: state.lists,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addFilm: (id: string, category: string) => dispatch(addToList(id, category)),
  removeFilm: (id: string, category: string) =>
    dispatch(removeFromList(id, category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlRow);
