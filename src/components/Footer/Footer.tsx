import React from 'react';
import styles from './Footer.module.scss';
import signLogo from '../../assets/images/signLogo.png';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.description}>
          <img alt="sign logo" src={signLogo} />
          <span>This project was made for studying purposes</span>
        </div>
        <ul className={styles.list}>
          <li className="fab fa-github">
            <a
              href="https://github.com/fav757/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li className="fab fa-telegram">
            <a
              href="https://t.me/sapalsky"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          </li>
          <li className="fab fa-skype">
            <a
              href="https://join.skype.com/invite/oqtijn3HjK0A"
              target="_blank"
              rel="noopener noreferrer"
            >
              Skype
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
