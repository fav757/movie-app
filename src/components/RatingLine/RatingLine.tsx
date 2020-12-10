import React from 'react';
import styles from './RatingLine.module.scss';

const RatingLine: React.FC<{ rating?: number }> = ({ rating = 0 }) => {
  let smileIcon: string;

  if (rating > 6.66) {
    smileIcon = 'smile';
  } else if (rating > 3.33) {
    smileIcon = 'meh';
  } else {
    smileIcon = 'frown';
  }

  return (
    <div className={`${styles.container} ${smileIcon}`}>
      <i className={`far fa-${smileIcon}`} />
      <span> {rating}</span>
    </div>
  );
};

export default RatingLine;
