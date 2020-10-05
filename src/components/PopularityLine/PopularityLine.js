import React from 'react';
import styles from './PopularityLine.module.scss';

function PopularityLine({ popularity }) {
  return (
    <div className={styles.container}>
      <i className='fas fa-user-circle'></i>
      <span> {Math.floor(popularity)}</span>
    </div>
  );
}

export default PopularityLine;
