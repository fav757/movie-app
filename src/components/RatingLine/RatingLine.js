import React from 'react';
import styles from './RatingLine.module.scss';

function RatingLine(props) {
  const smileIcon =
    props.rating > 6.6 ? 'smile' : props.rating > 3.3 ? 'meh' : 'frown';

  return (
    <div className={styles.container + ' ' + smileIcon}>
      <i className={'far fa-' + smileIcon}></i>
      <span> {props.rating}</span>
    </div>
  );
}

export default RatingLine;
