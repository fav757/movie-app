import React, { useCallback, useState } from 'react';
import staticFormsRequest from '../../utilities/staticFormsRequest/staticFormsRequest';
import styles from './ContactForm.module.scss';

const ContactForm: React.FC = () => {
  const [responseStatus, setResponseStatus] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [renderForm, setRenderForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const isFieldsEmpty = !(formData.name && formData.email && formData.message);
  const responseStatusText = responseStatus
    ? 'Success'
    : 'Fail, try again please';

  const handleChange = useCallback(
    ({ target }) => {
      setFormData({ ...formData, [target.name]: target.value });
    },
    [formData],
  );
  const handleClick = useCallback(() => setRenderForm((state) => !state), []);
  const handleSend = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      staticFormsRequest(
        `?name=${formData.name}&email=${formData.email}&message=${formData.message}`,
      ).then((status) => {
        setResponseStatus(status);
        setIsLoading(false);
      });
    },
    [formData],
  );

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="contact"
        type="button"
        className={`${styles.contactButton} fas fa-at`}
      />
      {renderForm && (
        <form className={styles.modal}>
          <legend className={styles.legend}>
            <span>Contact me</span>
            <button
              onClick={handleClick}
              type="button"
              aria-label="close modal"
              className={`${styles.closeButton} fas fa-times`}
            />
          </legend>
          <fieldset className={styles.wrap}>
            <label htmlFor="name">
              <p>Name:</p>
              <input
                value={formData.name}
                onChange={handleChange}
                name="name"
                minLength={3}
              />
            </label>
            <label htmlFor="email">
              <p>Email:</p>
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                minLength={3}
              />
            </label>
            <label htmlFor="message">
              <p>Message:</p>
              <textarea
                value={formData.message}
                onChange={handleChange}
                name="message"
              />
            </label>
            {isFieldsEmpty && <p>Use should not leave empty inputs</p>}
            {isLoading && (
              <p>
                <span role="img" aria-label="wait for response">
                  ⏳
                </span>
                Please wait request is loading
              </p>
            )}
            <button
              disabled={!!responseStatus || isLoading || isFieldsEmpty}
              onClick={handleSend}
              className={styles.sendButton}
              type="button"
              aria-label="send message"
            >
              Send
            </button>
            {responseStatus === null || (
              <div className={styles.statusBar}>
                <i
                  className={`fas fa-${
                    responseStatusText === 'Success' ? 'check' : 'times'
                  }`}
                />
                <p>{responseStatusText}</p>
              </div>
            )}
          </fieldset>
        </form>
      )}
    </>
  );
};

export default ContactForm;
