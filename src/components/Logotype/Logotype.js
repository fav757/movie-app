import React from 'react';
import styles from './Logotype.module.scss';
import logo from './movie-app-logo.png';

function Logotype() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt='logo'/>
      <h2 className={styles.text}>
        MOVIE
        <span className={styles.subtext}>APP</span>
      </h2>
    </div>
  );
}

export default Logotype;
