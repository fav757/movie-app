import React from 'react';
import styles from './HeroSection.module.scss';

function HeroSection() {
  return (
    <section className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.descriptor}>
          <h1>Film name</h1>
          <b>2020 | Film janre</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div>
            <span>Link#1</span>
            <span>Link#2</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
