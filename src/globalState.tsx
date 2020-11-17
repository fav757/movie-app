import React, { createContext, useReducer } from 'react';
import rootReducer from './rootReducer';

const storageData = JSON.parse(localStorage.getItem('state') || '{}');
let initialState = {} as { [key: string]: any };

if (Object.keys(storageData).length) {
  for (let key in storageData) {
    initialState[key] = new Set(storageData[key]);
  }
} else {
  initialState = {
    favorite: new Set(),
    watched: new Set(),
    later: new Set(),
  };
}

export const GlobalState = createContext(initialState);

export const GlobalContext = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      {children}
    </GlobalState.Provider>
  );
};
