const initialState = {
  favorite: [],
  watched: [],
  later: [],
};

type ListReducerType = (
  state: Record<string, string[]>,
  action: {
    type: string;
    payload: {
      id: string;
      category: string;
    };
  },
) => Record<string, string[]>;

const listReducer: ListReducerType = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_LIST': {
      const newState = { ...state };
      newState[action.payload.category].push(action.payload.id);
      return newState;
    }
    case 'REMOVE_FROM_LIST': {
      const newState = { ...state };
      const { category } = action.payload;
      newState[category] = newState[category].filter(
        (value: string) => value !== action.payload.id,
      );
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default listReducer;
