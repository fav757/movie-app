import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import 'normalize.css';
import './index.css';
import rootReducer from './redux/rootReducer';
import * as serviceWorker from './serviceWorker';
import App from './App';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
