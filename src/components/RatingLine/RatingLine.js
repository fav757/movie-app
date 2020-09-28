import React from 'react';
import styles from './RatingLine.module.scss';

function RatingLine(props) {
  const smileIcon =
    props.rating > 6.66 ? 'smile' : props.rating > 3.33 ? 'meh' : 'frown';

  return (
    <div className={styles.container + ' ' + smileIcon}>
      <i className={'far fa-' + smileIcon}></i>
      <span> {props.rating}</span>
    </div>
  );
}

export default RatingLine;
