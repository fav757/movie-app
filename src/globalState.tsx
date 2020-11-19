import React, { createContext, useReducer } from 'react';
import rootReducer from './rootReducer';

const storageData = JSON.parse(localStorage.getItem('state') || '{}');
let initialState = {} as Record<string, any>;
const storageDataEntries = Object.entries(storageData);

if (storageDataEntries.length) {
  storageDataEntries.forEach((entry) => {
    initialState[entry[0]] = new Set(entry[1] as string[]);
  });
} else {
  initialState = {
    favorite: new Set(),
    watched: new Set(),
    later: new Set(),
  };
}

export const GlobalState = createContext(initialState);

interface GlobalContextInterface {
  children: JSX.Element;
}
export const GlobalContext: React.FC<GlobalContextInterface> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      {children}
    </GlobalState.Provider>
  );
};
