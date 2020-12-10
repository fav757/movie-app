import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { generateGuestSession } from '../../api/movieDB/movieDB';
import { changeGuestId } from '../../redux/actions/guestIdActions';
import styles from './GuestCreator.module.scss';

const GuestCreator: React.FC<{
  guestId: string;
  setGuestId: (id: string) => void;
}> = ({ guestId, setGuestId }) => {
  const handleClick = useCallback(() => {
    if (guestId) return;
    generateGuestSession().then((sessionId) => setGuestId(sessionId));
  }, [guestId, setGuestId]);

  return (
    <button
      title={
        guestId
          ? 'You have successfuly generated guest session'
          : "Looks like you didn't generate you guest session or an error has occured"
      }
      type="button"
      aria-label="guest session creator"
      onClick={handleClick}
      onKeyPress={handleClick}
      className={`${styles.icon} fas fa-user-${guestId ? 'check' : 'times'}`}
    />
  );
};

const mapStateToProps = (state: Record<string, any>) => ({
  guestId: state.guestSession,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGuestId: (id: string) => dispatch(changeGuestId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestCreator);
