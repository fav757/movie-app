import React from 'react';
import styles from './RatingLine.module.scss';

function RatingLine({ rating }: { rating: number }) {
  const smileIcon = rating > 6.66 ? 'smile' : rating > 3.33 ? 'meh' : 'frown';

  return (
    <div className={styles.container + ' ' + smileIcon}>
      <i className={'far fa-' + smileIcon}></i>
      <span> {rating}</span>
    </div>
  );
}

export default RatingLine;
