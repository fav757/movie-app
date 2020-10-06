import React, { createContext, useReducer } from 'react';
import rootReducer from './rootReducer';

const intialState = {
  favorite: [],
  watched: [],
  later: [],
};

export const GlobalState = createContext(intialState);

export const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      {children}
    </GlobalState.Provider>
  );
};
