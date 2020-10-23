import React, { createContext, useReducer } from 'react';
import rootReducer from './rootReducer';

const initialState = {
  favorite: new Set(),
  watched: new Set(),
  later: new Set(),
};

export const GlobalState = createContext(initialState);

export const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      {children}
    </GlobalState.Provider>
  );
};
