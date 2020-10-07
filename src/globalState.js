import React, { createContext, useReducer } from 'react';
import rootReducer from './rootReducer';

const intialState = {
  favorite: new Set([1402, 76479]),
  watched: new Set(),
  later: new Set(),
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
