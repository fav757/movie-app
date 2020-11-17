type AddToListType = (
  id: string,
  category: string,
) => { type: string; payload: { id: string; category: string } };

export const ADD_TO_LIST = 'ADD_TO_LIST';
export const addToList: AddToListType = (id, category) => {
  return {
    type: ADD_TO_LIST,
    payload: { id, category },
  };
};

type RemoveFromListType = (
  id: string,
  category: string,
) => {
  type: string;
  payload: { id: string; category: string };
};

export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';
export const removeFromList: RemoveFromListType = (id, category) => {
  return {
    type: REMOVE_FROM_LIST,
    payload: { id, category },
  };
};
