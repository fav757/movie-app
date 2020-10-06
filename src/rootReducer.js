import { ADD_TO_LIST, REMOVE_FROM_LIST } from './rootActions';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_TO_LIST: {
      const newState = { ...state };
      newState[action.payload.category].add(action.payload.id);
      return newState;
    }
    case REMOVE_FROM_LIST: {
      const newState = { ...state };
      newState[action.payload.category].delete(action.payload.id);
      return newState;
    }
    default: {
      return state;
    }
  }
}
