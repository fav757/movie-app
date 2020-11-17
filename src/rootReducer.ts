import { ADD_TO_LIST, REMOVE_FROM_LIST } from './rootActions';

function setObjToArrayObject(obj: Record<string, Set<string>>) {
  const result = {} as Record<string, unknown>;

  Object.keys(obj).forEach((key) => {
    result[key] = [...obj[key]];
  });

  return result;
}

export default function (
  state: Record<string, any>,
  action: {
    type: string;
    payload?: any;
  },
): Record<string, unknown> {
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
