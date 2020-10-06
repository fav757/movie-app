import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import { createStore } from 'redux';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType='noslash'>
      <Route component={App} />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
