import React from 'react';
import styles from './ArrowToTop.module.scss';

function ArrowToTop() {
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <i
      onClick={handleClick}
      className={styles.container + ' far fa-arrow-alt-circle-up'}
    ></i>
  );
}

export default ArrowToTop;
