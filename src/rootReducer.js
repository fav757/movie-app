import { ADD_TO_LIST, REMOVE_FROM_LIST } from './rootActions';

function setObjToArrayObject(obj) {
  const result = {};

  for (let key in obj) {
    result[key] = [...obj[key]];
  }

  return result;
}

export default function (state, action) {
  switch (action.type) {
    case ADD_TO_LIST: {
      const newState = { ...state };
      newState[action.payload.category].add(action.payload.id);
      localStorage.setItem('state', JSON.stringify(setObjToArrayObject(state)));
      return newState;
    }
    case REMOVE_FROM_LIST: {
      const newState = { ...state };
      newState[action.payload.category].delete(action.payload.id);
      localStorage.setItem('state', JSON.stringify(setObjToArrayObject(state)));
      return newState;
    }
    default: {
      return state;
    }
  }
}
