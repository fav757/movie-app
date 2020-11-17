import React from 'react';
import styles from './ArrowToTop.module.scss';

const ArrowToTop: React.FC = () => {
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <i
      role="button"
      tabIndex={0}
      aria-label="arrow to top"
      onClick={handleClick}
      onKeyPress={handleClick}
      className={`${styles.container} far fa-arrow-alt-circle-up`}
    />
  );
};

export default ArrowToTop;
