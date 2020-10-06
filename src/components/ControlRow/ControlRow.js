import React from 'react';
import styles from './ControlRow.module.scss';

function ControlRow({ id }) {
  return (
    <div className={styles.controls}>
      <i className={styles.icon + ' fas fa-heart'}></i>
      <i className={styles.icon + ' fas fa-check'}></i>
      <i className={styles.icon + ' fas fa-clock'}></i>
    </div>
  );
}

export default ControlRow;
