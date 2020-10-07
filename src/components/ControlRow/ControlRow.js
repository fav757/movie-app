import React, { useContext } from 'react';
import { GlobalState } from '../../globalState';
import { addToList, removeFromList } from '../../rootActions';
import styles from './ControlRow.module.scss';

function ControlRow({ id }) {
  const { state, dispatch } = useContext(GlobalState);
  console.log(state);

  const handleClick = ({ target }) => {
    state[target.dataset.category].has(id)
      ? dispatch(removeFromList(id, target.dataset.category))
      : dispatch(addToList(id, target.dataset.category));
  };

  return (
    <div className={styles.controls}>
      <i
        onClick={handleClick}
        data-category='favorite'
        className={styles.icon + ' fas fa-heart'}
      ></i>
      <i
        onClick={handleClick}
        data-category='watched'
        className={styles.icon + ' fas fa-check'}
      ></i>
      <i
        onClick={handleClick}
        data-category='later'
        className={styles.icon + ' fas fa-clock'}
      ></i>
    </div>
  );
}

export default ControlRow;
