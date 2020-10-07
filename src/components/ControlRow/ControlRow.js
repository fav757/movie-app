import React, { useContext } from 'react';
import { GlobalState } from '../../globalState';
import { addToList, removeFromList } from '../../rootActions';
import styles from './ControlRow.module.scss';

function ControlRow({ name }) {
  const { state, dispatch } = useContext(GlobalState);

  const isFavorite = !state.favorite.has(name);
  const isWatched = !state.watched.has(name);
  const isLater = !state.later.has(name);

  const handleClick = ({ target }) => {
    state[target.dataset.category].has(name)
      ? dispatch(removeFromList(name, target.dataset.category))
      : dispatch(addToList(name, target.dataset.category));
  };

  return (
    <div className={styles.controls}>
      <div className={styles.wrap}>
        <i
          onClick={handleClick}
          data-category='favorite'
          className={styles.icon + ' fas fa-heart '}
        ></i>
        <i
          className={
            styles.cross + ' fas fa-times ' + (isFavorite && styles.hidden)
          }
        ></i>
      </div>
      <div className={styles.wrap}>
        <i
          onClick={handleClick}
          data-category='watched'
          className={styles.icon + ' fas fa-check'}
        ></i>
        <i
          className={
            styles.cross + ' fas fa-times ' + (isWatched && styles.hidden)
          }
        ></i>
      </div>
      <div className={styles.wrap}>
        <i
          onClick={handleClick}
          data-category='later'
          className={styles.icon + ' fas fa-clock'}
        ></i>
        <i
          className={
            styles.cross + ' fas fa-times ' + (isLater && styles.hidden)
          }
        ></i>
      </div>
    </div>
  );
}

export default ControlRow;
