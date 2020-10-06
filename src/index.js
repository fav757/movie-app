import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom';
import { GlobalContext } from './globalState';

ReactDOM.render(
  <GlobalContext>
    <HashRouter hashType='noslash'>
      <Route component={App} />
    </HashRouter>
  </GlobalContext>,
  document.getElementById('root')
);

serviceWorker.unregister();
