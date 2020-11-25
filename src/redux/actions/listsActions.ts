export type ListActionType = (
  id: string,
  category: string,
) => {
  type: string;
  payload: {
    id: string;
    category: string;
  };
};

export const addToList: ListActionType = (id, category) => {
  return {
    type: 'ADD_TO_LIST',
    payload: { id, category },
  };
};

export const removeFromList: ListActionType = (id, category) => {
  return {
    type: 'REMOVE_FROM_LIST',
    payload: { id, category },
  };
};
