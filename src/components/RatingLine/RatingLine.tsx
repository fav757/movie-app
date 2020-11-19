import React from 'react';
import styles from './RatingLine.module.scss';

interface RatingLineType {
  rating?: number;
}

const RatingLine: React.FC<RatingLineType> = ({ rating = 0 }) => {
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
