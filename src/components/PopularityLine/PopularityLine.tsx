import React from 'react';
import styles from './PopularityLine.module.scss';

const PopularityLine: React.FC<{ popularity?: number }> = ({
  popularity = 0,
}) => {
  return (
    <div className={styles.container}>
      <i className="fas fa-user-circle" />
      <span> {Math.floor(popularity)}</span>
    </div>
  );
};

export default PopularityLine;
