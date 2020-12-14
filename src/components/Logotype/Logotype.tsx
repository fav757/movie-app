import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logotype.module.scss';
import logo from '../../assets/images/logo192.png';

const Logotype: React.FC = () => {
  return (
    <Link to="/" className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h2 className={styles.text}>
        MOVIE
        <span className={styles.subtext}>APP</span>
      </h2>
    </Link>
  );
};

export default Logotype;
