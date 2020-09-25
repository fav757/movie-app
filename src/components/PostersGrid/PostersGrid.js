import React from 'react';
import styles from './PostersGrid.module.scss';
import poster from './poster-placeholder.jpg';

function PostersGrid() {
  return (
    <section className={styles.container}>
      <div className={styles.tranding}>
        <h2>Trending now</h2>
        <div className={styles.posters}>
          <div className={styles.imgContainer}>
            <img src={poster} alt='poster' />
          </div>
          <div className={styles.imgContainer}>
            <img src={poster} alt='poster' />
          </div>
          <div className={styles.imgContainer}>
            <img src={poster} alt='poster' />
          </div>
          <div className={styles.imgContainer}>
            <img src={poster} alt='poster' />
          </div>
          <div className={styles.imgContainer}>
            <img src={poster} alt='poster' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostersGrid;
