import React, { createContext, useReducer } from 'react';
import rootReducer from './rootReducer';

const intialState = {
  favorite: new Set(['1402 tv', '76479 tv']),
  watched: new Set(['337401 movie']),
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
