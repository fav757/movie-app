import { combineReducers } from 'redux';
import listReducer from './reducers/listsReducer';

const rootReducer = combineReducers({
  lists: listReducer,
});

export default rootReducer;
