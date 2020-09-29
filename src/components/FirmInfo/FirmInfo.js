import React from 'react';
import styles from './FirmInfo.module.scss';

function FirmInfo({ companies = [] }) {
  const result = companies.map((company) => {
    return (
      <div className={styles.company} key={company.name}>
        <span className={styles.name}>
          {company.name}{' '}
          {company.origin_country ? '(' + company.origin_country + ')' : null}
        </span>
      </div>
    );
  });
  return <div className={styles.container}>{result}</div>;
}

export default FirmInfo;
