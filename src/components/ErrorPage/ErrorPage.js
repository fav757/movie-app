import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h2>Unfortunately, we cant find such page on this website.</h2>
        <p>
          We're sorry to inform you that we can't display the page you looked
          for.
        </p>
        <p>
          Also you continue from the <Link to='/'>main page</Link>.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
