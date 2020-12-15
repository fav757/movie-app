import { combineReducers } from 'redux';
import guestIdReducer from './reducers/guestIdReducer';
import listReducer from './reducers/listsReducer';

const rootReducer = combineReducers({
  lists: listReducer,
  guestSession: guestIdReducer,
});

export default rootReducer;
