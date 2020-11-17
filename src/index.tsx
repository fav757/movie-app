import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { GlobalContext } from './globalState';
import 'normalize.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <GlobalContext>
    <HashRouter hashType="noslash">
      <Route component={App} />
    </HashRouter>
  </GlobalContext>,
  document.getElementById('root'),
);

serviceWorker.unregister();
