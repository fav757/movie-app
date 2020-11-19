import React from 'react';
import styles from './PopularityLine.module.scss';

type PopularityLineType = {
  popularity?: number;
};

const PopularityLine: React.FC<PopularityLineType> = ({ popularity = 0 }) => {
  return (
    <div className={styles.container}>
      <i className="fas fa-user-circle" />
      <span> {Math.floor(popularity)}</span>
    </div>
  );
};

export default PopularityLine;
