import React from 'react';
import ArrowToTop from '../ArrowToTop/ArrowToTop';
import ContactForm from '../ContactForm/ContactForm';
import styles from './ControlPanel.module.scss';

const ControlPanel: React.FC = () => {
  return (
    <div className={styles.container}>
      <ArrowToTop />
      <ContactForm />
    </div>
  );
};

export default ControlPanel;
