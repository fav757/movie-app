import React, { useCallback, useState } from 'react';
import Logotype from '../Logotype/Logotype';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';
import GuestCreator from '../GuestCreator/GuestCreator';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = useCallback(() => setShowMenu((state) => !state), []);
  const closeModal = () => setShowMenu(false);

  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Logotype />
        <button
          type="button"
          onClick={handleClick}
          aria-label="burger menu"
          className={`${styles.burger} fas fa-bars`}
        />
        <div className={`${styles.menu} ${showMenu || styles.hidden}`}>
          <Navigation closeModal={closeModal} />
          <Search closeModal={closeModal} />
          <GuestCreator closeModal={closeModal} />
        </div>
      </div>
    </header>
  );
};

export default Header;
