import React from 'react';
import styles from './PopularityLine.module.scss';

type PopularityLineType = {
  popularity: number;
};

const PopularityLine: React.FC<PopularityLineType> = ({ popularity }) => {
  return (
    <div className={styles.container}>
      <i className="fas fa-user-circle" />
      <span> {Math.floor(popularity)}</span>
    </div>
  );
};

export default PopularityLine;
