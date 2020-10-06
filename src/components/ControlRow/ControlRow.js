import React, { useContext } from 'react';
import { GlobalState } from '../../globalState';
import { addToList } from '../../rootActions';
import styles from './ControlRow.module.scss';

function ControlRow({ id }) {
  const { dispatch } = useContext(GlobalState);
  const handleClick = ({ target }) =>
    dispatch(addToList(id, target.dataset.category));

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
