import React from 'react';
import styles from './ArrowToTop.module.scss';

const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const ArrowToTop: React.FC = () => {
  return (
    <button
      type="button"
      aria-label="move to top"
      onClick={handleClick}
      onKeyPress={handleClick}
      className={`${styles.container} far fa-arrow-alt-circle-up`}
    />
  );
};

export default ArrowToTop;
