import { ChangeGuestIdAction } from '../actions/guestIdActions';

type GuestIdReducer = (state: string, action: ChangeGuestIdAction) => void;

const guestIdReducer: GuestIdReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_SESSION_ID':
      return action.payload;
    default:
      return state;
  }
};

export default guestIdReducer;
