export const ADD_TO_LIST = 'ADD_TO_LIST';
export const addToList = (id, category) => {
  return {
    type: ADD_TO_LIST,
    payload: { id, category },
  };
};

export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';
export const removeFromList = (id, category) => {
  return {
    type: REMOVE_FROM_LIST,
    payload: { id, category },
  };
};
