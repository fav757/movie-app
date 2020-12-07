import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { generateGuestSession } from '../../api/movieDB/movieDB';
import styles from './GuestCreator.module.scss';

const GuestCreator: React.FC = () => {
  const [status, setStatus] = useState(!!localStorage.getItem('sessionId'));

  const handleClick: MouseEventHandler & KeyboardEventHandler = () => {
    if (status) return;
    generateGuestSession().then((sessionId) => setStatus(sessionId));
  };

  return (
    <i
      title={
        status
          ? 'You have successfuly generated guest session'
          : "Looks like you didn't generate you guest session or an error has occured"
      }
      role="button"
      aria-label="guest session creator"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleClick}
      className={`${styles.icon} fas fa-user-${status ? 'check' : 'times'}`}
    />
  );
};

export default GuestCreator;
